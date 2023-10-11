use std::io::{Cursor, Read, Write};

use actix_web::web::{Bytes, Json};
use actix_web::{post, Error, HttpResponse};
use serde::Deserialize;
use std::fs;
use std::path::Path;
use zip::write::FileOptions;
use zip::ZipWriter;

use crate::analysis::endpoints::get_readonly_endpoints_props;
use crate::models::sc_abi::sc_abi::SCAbi;
use crate::rendering::{page, readonly_endpoint};

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

    let sc_name = body.sc_abi.name();
    let endpoints = body.sc_abi.endpoints();

    add_dapp_bootstrapper_files(
        Path::new(&DAPP_BOOTSTRAPPER_URI),
        Path::new(&DAPP_BOOTSTRAPPER_URI),
        &mut zip_writer,
        zip_options,
    )?;

    let endpoints_props = get_readonly_endpoints_props(endpoints);

    for ((folder, page_name), ep_props) in endpoints_props {
        for props in &ep_props {
            let rendered_endpoint = readonly_endpoint::render(
                &props.hook_name,
                &props.name,
                &props.inputs,
                &props.outputs,
            );

            zip_writer
                .start_file(format!("/endpoints/{}.ts", &props.file_name), zip_options)
                .unwrap();
            zip_writer.write_all(rendered_endpoint.as_bytes()).unwrap();
        }

        if !folder.is_empty() && !page_name.is_empty() {
            let rendered_page = page::render(&page_name, &ep_props);

            zip_writer
                .start_file(format!("{}/{}.tsx", folder, page_name), zip_options)
                .unwrap();
            zip_writer.write_all(rendered_page.as_bytes()).unwrap();
        }
    }

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
