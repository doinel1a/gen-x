import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks';
import React from 'react';
import Layout from '../components/layout';

{% if endpoints.len() > 0 %}
  {% for endpoint in endpoints %}
    import {{ endpoint.hook_name }} from '../endpoints/{{ endpoint.file_name }}';
  {% endfor %}
{% endif %}

export default function {{ title }}() {
	useGetAccountInfo();

    {% if endpoints.len() > 0 %}
      {%- for endpoint in endpoints -%}
        {% if endpoint.outputs.len() == 0 %}
          const response = 
        {% else if endpoint.outputs.len() > 0 %}
          const {
            {% if endpoint.outputs.len() == 1 %}
              {%- for output in endpoint.outputs -%}
                {{ endpoint.hook_name }}{{ output.getter }}{{ loop.index }},
              {% endfor %}
            {% else %}
                {%- for output in endpoint.outputs -%}
                  {{ endpoint.hook_name }}{{ output.getter }}{{ loop.index }},
                {% endfor %}
            {% endif %}
          } = 
        {% endif %}
        {{ endpoint.hook_name }}(
          {% if endpoint.inputs.len() > 0 %}
            {%- for input in endpoint.inputs -%}
              {{ endpoint.hook_name }}{{ input.name}},
            {% endfor %}
          {% endif %}
        );
      {% endfor %}
    {% endif %}

	return (
		<Layout title="{{ title }}">
			<div className="container flex flex-col items-center justify-between rounded-sm border border-tertiary bg-secondary py-5">
				<div className="flex gap-x-5">
          {% if endpoints.len() > 0 %}
            {%- for endpoint in endpoints -%}
                {% if endpoint.outputs.len() == 0 %}
                  <div className="flex flex-col items-center justify-center p-2">
                    <p>{{ endpoint.hook_name }}Response:</p>
                    <span>{ response }</span>
                  </div>
                {% else if endpoint.outputs.len() > 0 %}
                  {%- for output in endpoint.outputs -%}
                    <div className="flex flex-col items-center justify-center p-2">
                      <p>{{ endpoint.hook_name }}Response:</p>
                      <span>
                        { {{ endpoint.hook_name }}{{ output.getter }}{{ loop.index }} }
                      </span>
                    </div>
                  {% endfor %}
                {% endif %}
            {% endfor %}
          {% endif %}
        </div>
			</div>
		</Layout>
	);
}
