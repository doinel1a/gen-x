use askama::Template;

use crate::utils::string_mutation::StringMutation;

#[derive(Template)]
#[template(path = "routes.ts", escape = "none")]
struct RoutesTemplate<'a> {
    routes: &'a Vec<Route>,
}

struct Route {
    folder: String,
    page_name: String,
    file_name: String,
}

pub fn render(routes: &Vec<(String, String)>) -> String {
    let mut _routes: Vec<Route> = Vec::new();

    for (folder, page_name) in routes {
        _routes.push(Route {
            folder: folder.to_string(),
            page_name: page_name.to_string().capitalize_first_letter(),
            file_name: page_name.to_string(),
        })
    }

    let template = RoutesTemplate { routes: &_routes };

    template.render().unwrap()
}
