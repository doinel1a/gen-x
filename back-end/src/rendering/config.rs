use askama::Template;

#[derive(Template)]
#[template(path = "config.ts", escape = "none")]
struct ConfigTemplate<'a> {
    sc_address: &'a String,
}

pub fn render(sc_address: &String) -> String {
    let template = ConfigTemplate { sc_address };

    template.render().unwrap()
}
