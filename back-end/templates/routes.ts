import Home from '../pages/home';
import Login from '../pages/login';

{% if routes.len() > 0 %}
  {% for route in routes %}
    import {{ route.page_name }} from '..{{ route.folder }}/{{ route.file_name }}';
  {% endfor %}
{% endif %}

export const routesName = {
  home: '/',
  login: '/login',
  {% if routes.len() > 0 %}
    {% for route in routes %}
      {{ route.file_name }}: 
        {% if route.folder == "/pages" %} 
          '/{{ route.file_name }}' 
        {% else %} 
          '{{ route.folder }}/{{ route.file_name }}' 
        {% endif %},
    {% endfor %}
  {% endif %}
};

export const routes = [
  {
    path: routesName.home,
    page: Home,
    label: 'Home'
  },
  {
    path: routesName.login,
    page: Login
  },
  {% if routes.len() > 0 %}
    {% for route in routes %}
      {
        path: routesName.{{ route.file_name }},
        page: {{ route.page_name }},
        label: '{{ route.page_name }}',
        authenticatedRoute: true
      },
    {% endfor %}
  {% endif %}
];
