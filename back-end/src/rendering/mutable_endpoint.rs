use askama::Template;

use crate::analysis::endpoints::{ReadonlyEndpointInput, ReadonlyEndpointOutput};

#[derive(Template)]
#[template(path = "mutable-endpoint.ts", escape = "none")]
struct ReadonlyEndpointTemplate<'a> {
    component_name: &'a String,
    endpoint_name: &'a String,
    inputs: &'a Vec<ReadonlyEndpointInput>,
    outputs: &'a Vec<ReadonlyEndpointOutput>,
}

pub fn render(
    component_name: &String,
    endpoint_name: &String,
    inputs: &Vec<ReadonlyEndpointInput>,
    outputs: &Vec<ReadonlyEndpointOutput>,
) -> String {
    let template = ReadonlyEndpointTemplate {
        component_name,
        endpoint_name,
        inputs,
        outputs,
    };

    template.render().unwrap()
}
