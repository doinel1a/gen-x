use askama::Template;

use crate::analysis::endpoints::EndpointIO;

#[derive(Template)]
#[template(path = "mutable-endpoint.ts", escape = "none")]
struct ReadonlyEndpointTemplate<'a> {
    component_name: &'a String,
    endpoint_name: &'a String,
    inputs: &'a Vec<EndpointIO>,
    outputs: &'a Vec<EndpointIO>,
}

pub fn render(
    component_name: &String,
    endpoint_name: &String,
    inputs: &Vec<EndpointIO>,
    outputs: &Vec<EndpointIO>,
) -> String {
    let template = ReadonlyEndpointTemplate {
        component_name,
        endpoint_name,
        inputs,
        outputs,
    };

    template.render().unwrap()
}
