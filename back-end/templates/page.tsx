import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks';
import React from 'react';
import Layout from '../components/layout';

{% if endpoints.len() > 0 %}
  {% for endpoint in endpoints %}
    {% if endpoint.mutability == "mutable" %}
      import {{ endpoint.import_export_name }}Endpoint from '../components/endpoints/{{ endpoint.file_name }}';
    {% else if endpoint.mutability == "readonly" %}
      import {{ endpoint.import_export_name }} from '../hooks/{{ endpoint.file_name }}';
    {% endif %}
  {% endfor %}
{% endif %}

export default function {{ title }}() {
	useGetAccountInfo();

    {% if endpoints.len() > 0 %}
      {%- for endpoint in endpoints -%}
        {% if endpoint.mutability == "readonly" %}
          {% if endpoint.outputs.len() == 0 || endpoint.outputs.len() == 1 %}
            const {{ endpoint.name.to_string().snake_to_camel_case() }} = 
          {% else if endpoint.outputs.len() > 1 %}
            const {
              {%- for output in endpoint.outputs -%}
                {{ output.getter }},
              {% endfor %}
            } = 
          {% endif %}
            {{ endpoint.import_export_name }}(
              {% if endpoint.inputs.len() > 0 %}
                {%- for input in endpoint.inputs -%}
                  {{ input.initial_value }},
                {% endfor %}
              {% endif %}
              );
        {% endif %}
      {% endfor %}
    {% endif %}

	return (
		<Layout title="{{ title }}">
			<div className="container flex flex-col items-center justify-between rounded-sm border border-tertiary bg-secondary py-5">
				<div className="flex gap-x-5">
          {% if endpoints.len() > 0 %}
            {%- for endpoint in endpoints -%}
              {% if endpoint.mutability == "readonly" %}
                {% if endpoint.outputs.len() == 0 || endpoint.outputs.len() == 1 %}
                  <div className="flex flex-col items-center justify-center p-2">
                    <p>{{ endpoint.import_export_name }} response</p>
                    <span>{ {{ endpoint.name.to_string().snake_to_camel_case() }} }</span>
                  </div>
                {% else if endpoint.outputs.len() > 1 %}
                  {%- for output in endpoint.outputs -%}
                    <div className="flex flex-col items-center justify-center p-2">
                      <p>{{ endpoint.import_export_name }} response:</p>
                      <span>
                        { {{ output.getter }} }
                      </span>
                    </div>
                  {% endfor %}
                {% endif %}
              {% else if endpoint.mutability == "mutable" %}
                <{{endpoint.import_export_name}}Endpoint />
              {% endif %}
            {% endfor %}
          {% endif %}
        </div>
			</div>
		</Layout>
	);
}
