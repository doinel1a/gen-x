import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks';
import React from 'react';
import Layout from '../components/layout';
import {{ hook_name }} from '../endpoints/{{ file_name }}';

export default function {{ title }}() {
	useGetAccountInfo();

  const {
    {% if outputs.len() > 0 %}
      {% if outputs.len() == 1 %}
        {% for output in outputs %}
          {{ output.getter }}{{ loop.index }}
        {% endfor %}
      {% else %}
          {% for output in outputs %}
            {{ output.getter }}{{ loop.index }},
          {% endfor %}
      {% endif %}
    {% endif %}
  } = {{ hook_name }}(
    {% if inputs.len() > 0 %}
      {% for input in inputs %}
        {{ input.name}},
      {% endfor %}
    {% endif %}
  );

	return (
		<Layout title="{{ title }}">
			<div className="container flex flex-col items-center justify-between rounded-sm border border-tertiary bg-secondary py-5">
				<div className="flex gap-x-5">

        </div>
			</div>
		</Layout>
	);
}
