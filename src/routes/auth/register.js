import stringHash from 'string-hash';
import * as cookie from 'cookie';
import { v4 as uuidv4 } from 'uuid';
import { Tedis } from 'tedis';

export async function post({ request }) {
	//
	// https://github.com/sveltejs/kit/pull/3384

	// https://developer.mozilla.org/en-US/docs/Web/API/Response/json
	// Note that despite the method being named json(),
	// the result is not JSON but is instead the result of taking JSON as input
	// and parsing it to produce a JavaScript object.
	const body = await request.json();

	console.log('================================================================================');
	console.log(Date.now());
	console.log(body);
	console.log(body.name);
	console.log(body.email);
	console.log(body.password);
	console.log('================================================================================');

	return {
		status: 200,
		body: {
			message: 'ok'
		}
	};
}
