use askama::Template;

use crate::{
    analysis::endpoints::{ReadonlyEndpointInput, ReadonlyEndpointOutput},
    utils::string_mutation::StringMutation,
};

#[derive(Template)]
#[template(path = "readonly-endpoint.ts", escape = "none")]
struct ReadonlyEndpointTemplate {
    hook_name: String,
    endpoint_name: String,
    does_outputs_includes_address: bool,
    inputs: Vec<ReadonlyEndpointInput>,
    outputs: Vec<ReadonlyEndpointOutput>,
}

pub fn render(
    endpoint_name: &String,
    inputs: Vec<ReadonlyEndpointInput>,
    outputs: Vec<ReadonlyEndpointOutput>,
) -> String {
    let endpoint_name = endpoint_name.to_string();
    let hook_name = endpoint_name.snake_to_camel_case();

    let does_outputs_includes_address = outputs
        .iter()
        .any(|output| output.getter.contains("Address"));

    let template = ReadonlyEndpointTemplate {
        hook_name,
        endpoint_name,
        does_outputs_includes_address,
        inputs,
        outputs,
    };

    template.render().unwrap()
}
