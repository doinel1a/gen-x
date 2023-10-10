use actix_web::web::{Bytes, Json};
use actix_web::{get, Error, HttpResponse};

use serde::Deserialize;

use crate::models::sc_abi::sc_abi::SCAbi;

#[derive(Deserialize, Debug)]
struct Body {
    sc_abi: SCAbi,
}

#[get("/generate")]
async fn generate(body: Json<Body>) -> Result<HttpResponse, Error> {
    Ok(HttpResponse::Ok().body(Bytes::copy_from_slice(&Vec::<u8>::new())))
}

// commit GENERATE EP + SC ABI DEFINITION
