//
// https://kit.svelte.dev/docs/hooks

import * as cookie from 'cookie';
import { Tedis } from 'tedis';

const db = new Tedis({
	host: '127.0.0.1',
	port: 6379
});

export async function handle({ event, resolve }) {
	// console.log(event.request);

	// if (event.request.url.startsWith('/custom')) {
	// 	return new Response('custom response');
	// }

	// https://discord.com/channels/457912077277855764/944535054401544222/944554601275883541
	// inspect the cookie from the request to check the session and compare it the session stored in the db
	const cookies = cookie.parse(event.request.headers.cookie || '');
	console.log(cookies);

	const response = await resolve(event);
	return response;
}
