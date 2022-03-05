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
	console.log(cookies);
	// ==
	// A
	// parse the cookies into an object so that we can get the uuid
	const parsedCookies = cookie.parse(cookies || '');

	// if we have a session_id cookie
	if (parsedCookies.session_id) {
		// ==
		// B
		// assign the userSession the value we get from the database
		// by looking for a key in the database that is the session_id cookie value
		//
		// remember in login.js we set the cookieId to be an object with the user's email address
		// so the userSession will hold this info from the user if the data is in the database
		const userSession = JSON.parse(await db.get(parsedCookies.session_id));
		// console.log(userSession);

		if (userSession) {
			// ==
			// C
			// in the event locals object we set the user as an object with email as key and email address as value
			event.locals.user = { email: userSession.email };
			//
			// in the event locals object we now have access to the current user's email address for example
			console.log(event.locals.user.email);

			//
			// D
			// we now return the modified response by resolving the request
			const response = await resolve(event);
			return response;
		}
	} else {
		//
		// there is no session_id cookie so we return the untouched response
		const response = await resolve(event);
		return response;
	}
}

// https://kit.svelte.dev/docs/hooks#getsession
// This function takes the event object and returns a session object that is accessible on the client
export async function getSession(event) {
	// ==
	// E
	// make the event.locals.user data available on the session
	//
	// here a ternary operator check if event.locals.user is populated
	// and returns it if so
	// otherwise an empty event object is returned on the session
	return event.locals.user
		? {
				user: {
					// only include properties needed client-side —
					// exclude anything else attached to the user
					// like access tokens etc
					// name: event.locals.user.name,
					email: event.locals.user.email
					// avatar: event.locals.user.avatar
				}
		  }
		: {};
}
