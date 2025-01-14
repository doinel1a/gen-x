use askama::Template;

use crate::analysis::endpoints::EndpointIO;
use crate::utils::string_mutation::StringMutation;

#[derive(Template)]
#[template(path = "mutable-endpoint.ts", escape = "none")]
struct ReadonlyEndpointTemplate<'a> {
    component_name: &'a String,
    endpoint_name: &'a String,
    does_inputs_include_list: &'a bool,
    does_inputs_include_string: &'a bool,
    does_inputs_include_number: &'a bool,
    inputs: &'a Vec<EndpointIO>,
    outputs: &'a Vec<EndpointIO>,
}

pub fn render(
    component_name: &String,
    endpoint_name: &String,
    inputs: &Vec<EndpointIO>,
    outputs: &Vec<EndpointIO>,
) -> String {
    let does_inputs_include_list = inputs.iter().any(|input| input.type_.contains("[]"));
    let does_inputs_include_string = inputs.iter().any(|input| input.type_.contains("string"));
    let does_inputs_include_number = inputs.iter().any(|input| input.type_.contains("number"));

    let template = ReadonlyEndpointTemplate {
        component_name,
        endpoint_name,
        does_inputs_include_list: &does_inputs_include_list,
        does_inputs_include_string: &does_inputs_include_string,
        does_inputs_include_number: &does_inputs_include_number,
        inputs,
        outputs,
    };

    template.render().unwrap()
}
