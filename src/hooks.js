//
// https://kit.svelte.dev/docs/hooks

import * as cookie from 'cookie';
import { Tedis } from 'tedis';

const db = new Tedis({
	host: '127.0.0.1',
	port: 6379
});

export async function handle({ event, resolve }) {
	//
	// get the cookies
	const cookies = event.request.headers.get('cookie');

	// A
	// parse the cookies into an object so that we can get the uuid
	const parsedCookies = cookie.parse(cookies || '');

	// B
	// if we have a session_id cookie
	if (parsedCookies.session_id) {
		//
		// assign the userSession the value we get from the database
		// by looking for a key in the database that is the session_id cookie value
		//
		// remember in login.js we set the cookieId to be an object with the user's email address
		// so the userSession will hold this info from the user if the data is in the database
		const userSession = JSON.parse(await db.get(parsedCookies.session_id));
		// console.log(userSession);

		if (userSession) {
			//
			// in the event locals object we set the user as an object with its email as key and email address as value
			event.locals.user = { email: userSession.email };
			//
			// in the event locals object we now have access to the current user's email address for example
			console.log(event.locals.user.email);
		}
	}

	//
	// return the possibly modified response
	const response = await resolve(event);
	return response;
}
