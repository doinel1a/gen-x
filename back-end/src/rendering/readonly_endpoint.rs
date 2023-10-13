use askama::Template;

use crate::{analysis::endpoints::EndpointIO, utils::string_mutation::StringMutation};

#[derive(Template)]
#[template(path = "readonly-endpoint.ts", escape = "none")]
struct ReadonlyEndpointTemplate<'a> {
    hook_name: &'a String,
    function_name: &'a String,
    endpoint_name: &'a String,
    does_outputs_include_address: &'a bool,
    inputs: &'a Vec<EndpointIO>,
    outputs: &'a Vec<EndpointIO>,
}

pub fn render(
    hook_name: &String,
    endpoint_name: &String,
    inputs: &Vec<EndpointIO>,
    outputs: &Vec<EndpointIO>,
) -> String {
    let function_name = &endpoint_name.snake_to_camel_case();
    let does_outputs_include_address = outputs
        .iter()
        .any(|output| output.getter.contains("Address"));

    let template = ReadonlyEndpointTemplate {
        hook_name,
        function_name,
        endpoint_name,
        does_outputs_include_address: &does_outputs_include_address,
        inputs,
        outputs,
    };

    template.render().unwrap()
}
