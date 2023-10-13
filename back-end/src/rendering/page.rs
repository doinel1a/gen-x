use askama::Template;

use crate::analysis::endpoints::EndpointProps;
use crate::utils::string_mutation::StringMutation;

#[derive(Template)]
#[template(path = "page.tsx", escape = "none")]
struct PageTemplate<'a> {
    title: &'a String,
    endpoints: &'a Vec<EndpointProps>,
}

pub fn render(title: &String, endpoints: &Vec<EndpointProps>) -> String {
    let title = title.to_string().capitalize_first_letter();

    let template = PageTemplate {
        title: &title,
        endpoints,
    };

    template.render().unwrap()
}
