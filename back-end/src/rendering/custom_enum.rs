use askama::Template;

use crate::models::sc_abi::variant::Variant;

#[derive(Template)]
#[template(path = "custom-enum.ts", escape = "none")]
struct EnumTemplate<'a> {
    name: &'a str,
    variants: &'a Vec<Variant>,
}

pub fn render(name: &str, variants: &Vec<Variant>) -> String {
    let template = EnumTemplate { name, variants };

    template.render().unwrap()
}
