use askama::Template;

use crate::models::sc_abi::field::Field;

#[derive(Template)]
#[template(path = "custom-struct.ts", escape = "none")]
struct StructTemplate<'a> {
    name: &'a str,
    fields: &'a Vec<Field>,
}

pub fn render(name: &str, fields: &Vec<Field>) -> String {
    let template = StructTemplate { name, fields };

    template.render().unwrap()
}
