import { sendTransactions } from '@multiversx/sdk-dapp/services';
import { refreshAccount } from '@multiversx/sdk-dapp/utils';
import { contractAddress } from '../../config/devnet';
import Button from '../button';
import Container from '../container';

import 
	React 
	{% if inputs.len() > 0 %}
		, { useState } 
	{% endif %}
from 'react';

{% if does_inputs_include_string %}
	import TextInput from '../inputs/text-input';
{% endif %}

{% if does_inputs_include_number %}
	import NumericInput from '../inputs/numeric-input';
{% endif %}


export default function {{component_name}}Endpoint() {
	{% if inputs.len() > 0 %}
		{% for input in inputs %}
			const [
				{{ input.getter }}{{ loop.index }}, 
				{{ input.setter }}{{ loop.index }}
			] = useState<{{input.type_}}>({{ input.initial_value }});
		{% endfor %}
	{% endif %}

	return (
		<Container id="{{ endpoint_name }}-endpoint" title="{{ endpoint_name }} endpoint">
			{% if inputs.len() > 0 %}
				{% for input in inputs %}
					{% if input.type_.contains("number") %}
						<NumericInput
							id="increment"
							label="Increment value"
							placeholder="Insert increment value"
							value={ {{ input.getter }}{{ loop.index }} }
							setValue={ {{ input.setter }}{{ loop.index }} }
						/>
					{% else if input.type_.contains("string") %}
						<TextInput
							id="increment"
							label="Increment value"
							placeholder="Insert increment value"
							value={ {{ input.getter }}{{ loop.index }} }
							setValue={ {{ input.setter }}{{ loop.index }} }
						/>
					{% endif %}
				{% endfor %}
			{% endif %}

			<Button
				title="Send transaction"
				onClick={() => sendTransaction(
					{% if inputs.len() > 0 %}
						{% for input in inputs %}
							{{ input.getter }}{{ loop.index }}, 
						{% endfor %}
					{% endif %}
				)}
			>
				Send transaction
			</Button>
		</Container>
	);
}

async function sendTransaction(
	{% if inputs.len() > 0 %}
		{% for input in inputs %}
			{{ input.getter }}{{ loop.index }}: {{ input.type_ }}, 
		{% endfor %}
	{% endif %}
) {
	const parsedNumber = Number.parseInt(value as unknown as string);
	const hexNumber = parsedNumber.toString(16);

	const data = hexNumber.length % 2 === 0 ? hexNumber : `0${hexNumber}`;

	const transaction = {
		value: 0,
		data: `{{ endpoint_name }}@${data}`,
		receiver: contractAddress,
		gasLimit: '2000000',
	};

	await refreshAccount();

	await sendTransactions({
		transactions: transaction,
		transactionsDisplayInfo: {
			processingMessage: 'Processing {{ endpoint_name }} transaction',
			errorMessage:
				'An error has occured during {{ endpoint_name }} transaction',
			successMessage: '{{ endpoint_name }} transaction successful',
		},
	});
}

