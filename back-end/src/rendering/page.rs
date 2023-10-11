use askama::Template;

use crate::analysis::endpoints::{ReadonlyEndpointInput, ReadonlyEndpointOutput};
use crate::utils::string_mutation::StringMutation;

#[derive(Template)]
#[template(path = "page.tsx", escape = "none")]
struct PageTemplate<'a> {
    title: &'a String,
    hook_name: &'a String,
    file_name: &'a String,
    inputs: &'a Vec<ReadonlyEndpointInput>,
    outputs: &'a Vec<ReadonlyEndpointOutput>,
}

pub fn render(
    title: &String,
    hook_name: &String,
    file_name: &String,
    inputs: &Vec<ReadonlyEndpointInput>,
    outputs: &Vec<ReadonlyEndpointOutput>,
) -> String {
    let title = title.to_string().capitalize_first_letter();

    let template = PageTemplate {
        title: &title,
        hook_name,
        file_name,
        inputs,
        outputs,
    };

    template.render().unwrap()
}
