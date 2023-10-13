use askama::Template;

use crate::analysis::endpoints::{EndpointInput, EndpointOutput};

#[derive(Template)]
#[template(path = "mutable-endpoint.ts", escape = "none")]
struct ReadonlyEndpointTemplate<'a> {
    component_name: &'a String,
    endpoint_name: &'a String,
    inputs: &'a Vec<EndpointInput>,
    outputs: &'a Vec<EndpointOutput>,
}

pub fn render(
    component_name: &String,
    endpoint_name: &String,
    inputs: &Vec<EndpointInput>,
    outputs: &Vec<EndpointOutput>,
) -> String {
    let template = ReadonlyEndpointTemplate {
        component_name,
        endpoint_name,
        inputs,
        outputs,
    };

    template.render().unwrap()
}
