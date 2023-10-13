import { sendTransactions } from '@multiversx/sdk-dapp/services';
import { refreshAccount } from '@multiversx/sdk-dapp/utils';
import { contractAddress } from '../../config/devnet';
import Button from '../button';
import Container from '../container';

import 
	React 
	{% if inputs.len() > 0 %}
		,{ useState } 
	{% endif %}
from 'react';

{% if does_inputs_include_string %}
	import TextInput from '../inputs/text-input';
{% endif %}

{% if does_inputs_include_number %}
	import NumericInput from '../inputs/numeric-input';
{% endif %}


export default function {{ component_name }}Endpoint() {
	{% if inputs.len() > 0 %}
		{% for input in inputs %}
			const [
				{{ input.getter }}, {{ input.setter }}
			] = useState<{{input.type_}}>({{ input.initial_value }});
		{% endfor %}
	{% endif %}

	return (
		<Container id="{{ endpoint_name }}-endpoint" title="{{ endpoint_name.snake_to_camel_case() }} endpoint">
			{% if inputs.len() > 0 %}
				{% for input in inputs %}
					{% if input.type_.contains("number") %}
						<NumericInput
							id="{{ input.getter }}"
							label="{{ input.getter.snake_to_camel_case().capitalize_first_letter() }} value"
							placeholder="Insert {{ input.getter }} value"
							value={ {{ input.getter }} }
							setValue={ {{ input.setter }} }
						/>
					{% else if input.type_.contains("string") %}
						<TextInput
							id="{{ input.getter }}"
							label="{{ input.getter.snake_to_camel_case().capitalize_first_letter() }} value"
							placeholder="Insert {{ input.getter }} value"
							value={ {{ input.getter }} }
							setValue={ {{ input.setter }} }
						/>
					{% endif %}
				{% endfor %}
			{% endif %}

			<Button
				title="Send transaction"
				onClick={() => sendTransaction(
					{% if inputs.len() > 0 %}
						{% for input in inputs %}
							{{ input.getter }}, 
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
			{{ input.getter }}: {{ input.type_ }}, 
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

