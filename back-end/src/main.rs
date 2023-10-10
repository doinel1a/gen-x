use actix_cors::Cors;
use actix_web::{get, middleware::Logger, web, App, HttpResponse, HttpServer, Responder};

const ADDRESS: &str = "0.0.0.0";
const PORT: u16 = 8080;

#[get("/test")]
async fn hello() -> impl Responder {
    HttpResponse::Ok().body("Hello, World!")
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    std::env::set_var("RUST_LOG", "debug");
    std::env::set_var("RUST_BACKTRACE", "1");
    env_logger::init();

    HttpServer::new(move || {
        let logger = Logger::default();

        App::new()
            .wrap(logger)
            .wrap(Cors::permissive())
            .service(web::scope("/api").service(web::scope("/v1").service(hello)))
    })
    .bind((ADDRESS, PORT))?
    .run()
    .await
    .map_err(|error| {
        let error_message = format!("~ SERVER ERROR: {}", error);

        println!("{}", error_message);

        std::io::Error::new(std::io::ErrorKind::Other, error_message)
    })
}
