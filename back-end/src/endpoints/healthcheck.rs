use actix_web::{get, HttpResponse, Responder};

#[get("/healthcheck")]
async fn healthcheck() -> impl Responder {
    HttpResponse::Ok().body("The server is OK.")
}
