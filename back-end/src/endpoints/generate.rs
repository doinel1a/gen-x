use std::collections::HashMap;
use std::io::{Cursor, Read, Write};

use actix_web::web::{Bytes, Json};
use actix_web::{post, Error, HttpResponse};
use serde::Deserialize;
use std::fs;
use std::path::Path;
use zip::write::FileOptions;
use zip::ZipWriter;

use crate::analysis::endpoints::{get_endpoints_props, EndpointProps};
use crate::analysis::enums::get_custom_enums;
use crate::models::sc_abi::sc_abi::SCAbi;
use crate::models::sc_abi::variant::Variant;
use crate::rendering::{custom_enum, mutable_endpoint, page, readonly_endpoint, routes};

const DAPP_BOOTSTRAPPER_URI: &str = "dapp_bootstrapper";

#[derive(Deserialize, Debug)]
struct Body {
    sc_abi: SCAbi,
}

#[post("/generate")]
async fn generate(body: Json<Body>) -> Result<HttpResponse, Error> {
    let mut zip_buffer = Vec::new();
    let buffer_cursor = Cursor::new(&mut zip_buffer);
    let mut zip_writer = ZipWriter::new(buffer_cursor);
    let zip_options = FileOptions::default();

    let sc_abi = &body.sc_abi;
    let sc_name = body.sc_abi.name();
    let endpoints = body.sc_abi.endpoints();
    let types = body.sc_abi.types();
    let custom_enums = get_custom_enums(types);
    let mut endpoints_props = get_endpoints_props(endpoints);

    let _ = add_dapp_bootstrapper_files(
        Path::new(&DAPP_BOOTSTRAPPER_URI),
        Path::new(&DAPP_BOOTSTRAPPER_URI),
        &mut zip_writer,
        zip_options,
    )?;

    let _ = add_sc_abi_file(&sc_abi, &mut zip_writer, zip_options)?;

    let _ = add_custom_enums_files(&custom_enums, &mut zip_writer, zip_options);

    let _ = add_pages_and_endpoints_files(&mut endpoints_props, &mut zip_writer, zip_options)?;

    let end_cursor = zip_writer.finish().unwrap();
    let zip_buffer = end_cursor.into_inner();

    let zip_archive_name = format!("{}-dapp.zip", sc_name.to_lowercase());
    let attachment_header = format!("attachment; filename={}", zip_archive_name);

    Ok(HttpResponse::Ok()
        .insert_header(("Content-Disposition", attachment_header))
        .content_type("application/zip")
        .body(Bytes::copy_from_slice(zip_buffer)))
}

fn add_dapp_bootstrapper_files(
    root_dir: &Path,
    current_dir: &Path,
    zip_writer: &mut ZipWriter<Cursor<&mut Vec<u8>>>,
    zip_options: FileOptions,
) -> Result<(), std::io::Error> {
    for entry in fs::read_dir(current_dir)? {
        let entry = entry?;
        let path = entry.path();

        let name = path.strip_prefix(root_dir).unwrap().to_str().unwrap();

        if path.is_file() {
            let cloned_path = path.clone();

            let mut file = fs::File::open(cloned_path)?;
            let mut content = Vec::new();

            file.read_to_end(&mut content)?;

            zip_writer.start_file(name, zip_options)?;
            zip_writer.write_all(&content)?;
        } else if path.is_dir() {
            zip_writer.add_directory(name, zip_options)?;

            add_dapp_bootstrapper_files(&root_dir, &path, zip_writer, zip_options)?;
        }
    }

    Ok(())
}

fn add_sc_abi_file(
    sc_abi: &SCAbi,
    zip_writer: &mut ZipWriter<Cursor<&mut Vec<u8>>>,
    zip_options: FileOptions,
) -> Result<(), std::io::Error> {
    let abi_file = serde_json::to_string(sc_abi).unwrap();

    zip_writer
        .start_file("src/contracts-abi/contract.abi.json", zip_options)
        .unwrap();
    zip_writer.write_all(&abi_file.as_bytes()).unwrap();

    Ok(())
}

fn add_custom_enums_files(
    custom_enums: &HashMap<String, Vec<Variant>>,
    zip_writer: &mut ZipWriter<Cursor<&mut Vec<u8>>>,
    zip_options: FileOptions,
) -> Result<(), std::io::Error> {
    for (name, variants) in custom_enums {
        let rendered_enum = custom_enum::render(name, variants);

        zip_writer
            .start_file(format!("src/enums/E{}.ts", name), zip_options)
            .unwrap();
        zip_writer.write_all(rendered_enum.as_bytes()).unwrap();
    }

    Ok(())
}

fn add_pages_and_endpoints_files(
    endpoints_props: &mut HashMap<(String, String), Vec<EndpointProps>>,
    zip_writer: &mut ZipWriter<Cursor<&mut Vec<u8>>>,
    zip_options: FileOptions,
) -> Result<(), std::io::Error> {
    let does_pages_contain_dashboard = endpoints_props
        .keys()
        .any(|(_, page_name)| page_name == "dashboard");

    if !does_pages_contain_dashboard {
        endpoints_props.insert(
            ("/pages".to_string(), "dashboard".to_string()),
            Vec::<EndpointProps>::new(),
        );
    }

    for ((folder, page_name), props) in &mut *endpoints_props {
        for prop in &mut *props {
            match prop.mutability.as_str() {
                "mutable" => {
                    let rendered_endpoint = mutable_endpoint::render(
                        &prop.import_export_name,
                        &prop.name,
                        &prop.inputs,
                        &prop.outputs,
                    );

                    zip_writer
                        .start_file(
                            format!("src/components/endpoints/{}.tsx", &prop.file_name),
                            zip_options,
                        )
                        .unwrap();
                    zip_writer.write_all(rendered_endpoint.as_bytes()).unwrap();
                }
                "readonly" => {
                    let rendered_endpoint = readonly_endpoint::render(
                        &prop.import_export_name,
                        &prop.name,
                        &prop.inputs,
                        &prop.outputs,
                    );

                    zip_writer
                        .start_file(format!("src/hooks/{}.ts", &prop.file_name), zip_options)
                        .unwrap();
                    zip_writer.write_all(rendered_endpoint.as_bytes()).unwrap();
                }
                _ => {}
            }
        }

        if !folder.is_empty() && !page_name.is_empty() {
            let rendered_page = page::render(&page_name, &props);

            zip_writer
                .start_file(format!("src{}/{}.tsx", folder, page_name), zip_options)
                .unwrap();
            zip_writer.write_all(rendered_page.as_bytes()).unwrap();
        }
    }

    let routes: Vec<(String, String)> = endpoints_props
        .keys()
        .filter(|(folder, page_name)| !folder.is_empty() && !page_name.is_empty())
        .cloned()
        .collect();

    add_dynamic_pages_to_routes(&routes, zip_writer, zip_options)?;

    Ok(())
}

fn add_dynamic_pages_to_routes(
    routes: &Vec<(String, String)>,
    zip_writer: &mut ZipWriter<Cursor<&mut Vec<u8>>>,
    zip_options: FileOptions,
) -> Result<(), std::io::Error> {
    let rendered_routes = routes::render(routes);

    zip_writer
        .start_file("src/config/routes.ts", zip_options)
        .unwrap();
    zip_writer.write_all(rendered_routes.as_bytes()).unwrap();

    Ok(())
}
