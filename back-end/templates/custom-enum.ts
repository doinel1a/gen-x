enum E{{ name }} {
  {% for variant in variants %}
    {{- variant.name -}},
  {% endfor %}
}

export default E{{ name }};
