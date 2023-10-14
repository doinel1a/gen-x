export default interface I{{ name }} {
  {% for field in fields %}
    {{- field.name -}} : {{ field.type_ -}};
  {% endfor %}
}