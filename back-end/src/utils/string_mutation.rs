pub trait StringMutation {
    fn capitalize_first_letter(&self) -> String;
    fn lowerize_first_letter(&self) -> String;
    fn snake_to_camel_case(&self) -> String;
    fn snake_to_kebab_case(&self) -> String;
    fn camel_to_kebab_case(&self) -> String;
}

impl StringMutation for String {
    fn capitalize_first_letter(&self) -> String {
        if let Some(next_char) = self.chars().next() {
            if next_char.is_lowercase() {
                return next_char.to_uppercase().to_string() + &self[1..];
            }
        }

        self.to_string()
    }

    fn lowerize_first_letter(&self) -> String {
        if let Some(next_char) = self.chars().next() {
            if next_char.is_uppercase() {
                return next_char.to_lowercase().to_string() + &self[1..];
            }
        }

        self.to_string()
    }

    fn snake_to_camel_case(&self) -> String {
        let trimmed = self.trim_matches('_');
        let mut split = trimmed.split('_');

        let first_word = match split.next() {
            Some(word) => {
                let mut chars = word.chars();
                match chars.next() {
                    Some(first) => first.to_lowercase().collect::<String>() + chars.as_str(),
                    None => String::new(),
                }
            }
            None => String::new(),
        };

        let rest = split
            .map(|word| {
                let mut chars = word.chars();
                match chars.next() {
                    Some(first) => first.to_uppercase().collect::<String>() + chars.as_str(),
                    None => String::new(),
                }
            })
            .collect::<Vec<String>>()
            .join("");

        if first_word.is_empty() {
            rest
        } else {
            first_word + &rest
        }
    }

    fn snake_to_kebab_case(&self) -> String {
        self.trim_matches('_').replace('_', "-")
    }

    fn camel_to_kebab_case(&self) -> String {
        self.chars()
            .map(|c| {
                if c.is_uppercase() {
                    format!("-{}", c.to_lowercase())
                } else {
                    c.to_string()
                }
            })
            .collect::<Vec<String>>()
            .join("")
    }
}
