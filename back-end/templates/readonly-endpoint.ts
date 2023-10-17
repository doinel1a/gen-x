import { useGetNetworkConfig } from '@multiversx/sdk-dapp/hooks';
import { ProxyNetworkProvider } from '@multiversx/sdk-network-providers/out';
import contract from '../contracts/contract';

import {
    useEffect
    {% if outputs.len() > 0 %}
      , useState
	  {% endif %}
} from 'react';

import { 
  ContractFunction, 
  ResultsParser
  {% if does_outputs_include_address %}
    , Address
  {% endif %}
  {% if does_inputs_include_list %}
    , List
  {% endif %}
} from '@multiversx/sdk-core/out';

{% if inputs.len() > 0 %}
  import {
    {% for input in inputs %}
      {% if input.args_serializer != "" %}
        {% if input.args_serializer == "AddressValue" %}
          AddressValue, Address,
        {% else %}
          {{ input.args_serializer }},
        {% endif %}
      {% endif %}
    {% endfor %}
  } from '@multiversx/sdk-core';
{% endif %}

const resultsParser = new ResultsParser();

export default function {{ hook_name }}(
  {% if inputs.len() > 0 %}
    {% for input in inputs %}
      {{ input.getter}}: {{ input.type_}},
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

	async function {{ function_name }}() {
		try {
			const query = contract.createQuery({
				func: new ContractFunction('{{ endpoint_name }}'),
        {% if inputs.len() > 0 %}
          args: [
            {% for input in inputs %}
              {% if input.type_.contains("[]") %}
                {% if input.args_serializer != "" %}
                  List.fromItems({{ input.getter}}.map((value) => {
                    {% if input.args_serializer == "AddressValue" %}
                      return new AddressValue(new Address(value))
                    {% else if input.args_serializer == "BytesValue" %}
                      return BytesValue.fromUTF8(value)
                    {% else %}
                      return new {{ input.args_serializer }}(value)
                    {% endif %}
                  })),
                {% endif %}
              {% else %}
                {% if input.args_serializer != "" %}
                  {% if input.args_serializer == "AddressValue" %}
                    new AddressValue(new Address({{ input.getter }})),
                  {% else if input.args_serializer == "BytesValue" %}
                    BytesValue.fromUTF8({{ input.getter }}),
                  {% else %}
                    new {{ input.args_serializer }}({{ input.getter }}),
                  {% endif %}
                {% endif %}
              {% endif %}
            {% endfor %}
          ]
        {% endif %}
			});

			const queryResponse = await proxy.queryContract(query);
			const endpointDefinition = contract.getEndpoint('{{ endpoint_name }}');

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
			console.error('Unable to call "{{ endpoint_name }}" endpoint', error);
		}
	}

	useEffect(() => {
		{{ function_name }}();
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
