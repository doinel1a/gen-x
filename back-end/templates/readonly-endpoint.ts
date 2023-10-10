import { useGetNetworkConfig } from '@multiversx/sdk-dapp/hooks';
import { ProxyNetworkProvider } from '@multiversx/sdk-network-providers/out';
import { useEffect, useState } from 'react';
import counterContract from '../contracts/counter-contract';

import { 
  ContractFunction, 
  ResultsParser
  {% if does_outputs_includes_address %}
    , Address
  {% endif %}
} from '@multiversx/sdk-core/out';

{% if inputs.len() > 0 %}
  import {
    {% for input in inputs %}
      {% if input.args_serializer != "" %}
        {{ input.args_serializer }},
      {% endif %}
    {% endfor %}
  } from '@multiversx/sdk-core';
{% endif %}

const resultsParser = new ResultsParser();

{% let capitalied_hook_name  = hook_name.capitalize_first_letter() %}
{% let lowerized_hook_name  = hook_name.lowerize_first_letter() %}

export default function use{{ capitalied_hook_name }}(
  {% if inputs.len() > 0 %}
    {% for input in inputs %}
      {{ input.name}}: {{ input.type_}},
    {% endfor %}
  {% endif %}
) {
	const { network } = useGetNetworkConfig();
	const proxy = new ProxyNetworkProvider(network.apiAddress);

  {% if outputs.len() > 0 %}
    {% for output in outputs %}
      const [
        {{ output.getter }}{{ loop.index }}, 
        {{ output.setter }}{{ loop.index }}
      ] = useState<{{output.type_}}>({{ output.initial_value }});
    {% endfor %}
  {% endif %}

	async function {{ lowerized_hook_name }}() {
		try {
			const query = counterContract.createQuery({
				func: new ContractFunction('{{ endpoint_name }}'),
        {% if inputs.len() > 0 %}
          args: [
            {% for input in inputs %}
                {% if input.args_serializer != "" %}
                  new {{ input.args_serializer }}({{ input.name }}),
                {% endif %}
            {% endfor %}
          ]
        {% endif %}
			});

			const queryResponse = await proxy.queryContract(query);
			const endpointDefinition = counterContract.getEndpoint('{{ endpoint_name }}');

			const { firstValue, returnCode, returnMessage } =
				resultsParser.parseQueryResponse(queryResponse, endpointDefinition);

			if (!firstValue || !returnCode.isSuccess()) {
				console.error(returnMessage);

				return;
			}

      const responseValue = firstValue.valueOf();

      {% if outputs.len() > 0 %}
        {% for output in outputs %}
          {% if output.type_.contains("[]") %}
            {% if output.getter.contains("Address") %}
              const decodedArray = responseValue.map((value: any) => Address.fromHex(value.valueHex).bech32());
              {{ output.setter }}{{ loop.index }}(decodedArray);
            {% else if output.type_ == "number[]" %}
              const decodedArray = responseValue.map((value: any) => value.toString(10));
              {{ output.setter }}{{ loop.index }}(decodedArray);
            {% else if output.type_ == "string[]" %}
              const decodedArray = responseValue.map((value: any) => value.toString());
              {{ output.setter }}{{ loop.index }}(decodedArray);
            {% else if output.type_ == "boolean[]" %}
              const decodedArray = responseValue.map((value: any) => value.toString());
              {{ output.setter }}{{ loop.index }}(decodedArray);
            {% endif %}
          {% else %}
            {% if output.getter.contains("Address") %}
              const decoded = Address.fromHex(responseValue.valueHex).bech32();
              {{ output.setter }}{{ loop.index }}(decoded);
            {% else if output.type_ == "number" %}
              {{ output.setter }}{{ loop.index }}(responseValue.toString(10));
            {% else if output.type_ == "string" %}
              {{ output.setter }}{{ loop.index }}(responseValue.toString());
            {% else if output.type_ == "boolean" %}
              {{ output.setter }}{{ loop.index }}(responseValue.toString());
            {% endif %}
          {% endif %}
        {% endfor %}
      {% endif %}

		} catch (error) {
			console.error('Unable to call getCounter endpoint', error);
		}
	}

	useEffect(() => {
		{{ lowerized_hook_name }}();
	}, []);

  {% if outputs.len() > 0 %}
    {% if outputs.len() == 1 %}
      {% for output in outputs %}
        return {{ output.getter }}{{ loop.index }};
      {% endfor %}
    {% else %}
      return {
        {% for output in outputs %}
          {{ output.getter }}{{ loop.index }},
        {% endfor %}
      };
    {% endif %}
  {% endif %}
}
