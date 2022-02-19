import stringHash from 'string-hash';
import * as cookie from 'cookie';
import { v4 as uuidv4 } from 'uuid';
import { Tedis } from 'tedis';

const db = new Tedis({
	host: '127.0.0.1',
	port: 6379
});

export async function post({ request }) {
	//
	// https://github.com/sveltejs/kit/pull/3384

	// https://developer.mozilla.org/en-US/docs/Web/API/Response/json
	// Note that despite the method being named json(),
	// the result is not JSON but is instead the result of taking JSON as input
	// and parsing it to produce a JavaScript object.
	const body = await request.json();

	// Note: all this assumes form field values are given and validated
	// for production there are a lot more cases and checking necessary

	console.log('================================================================================');
	console.log('login.js');
	console.log(Date.now());
	console.log(body);
	console.log(body.email);
	console.log(body.password);
	console.log(stringHash(body.password));
	console.log('================================================================================');

	// Redis stores values as strings, so we parse the string to obtain a javascript object
	const user = JSON.parse(await db.get(body.email));
	console.log(user); // should log the user given by the provided email address to the terminal

	// if there is no user with the email address provided already present
	if (user === null) {
		return {
			status: 401,
			body: {
				// in production you should never give the client too specific info
				message: 'User with this email address does not exist.'
			}
		};
	}

	// if there is a user with the email address provided check their sent password
	// if the passwords do not match
	if (user.password !== stringHash(body.password)) {
		return {
			status: 401,
			body: {
				message: 'Wrong password. You are not authorized.'
			}
		};
	}

	// if the user.password from the Redis DB is the same as the string hashed password
	// passed with the body payload then authenticate the user
	if (user.password === stringHash(body.password)) {
		//
		// create a cookie for the user
		const cookieId = uuidv4();
		const cookieForUser = await db.set(
			cookieId,
			JSON.stringify({
				email: body.email
			})
		);
		console.log(cookieForUser); // should log Ok to the terminal

		// now we send back the cookie to the client
		// we can send 2 or more cookies back if we like
		// https://kit.svelte.dev/docs/routing#endpoints-setting-cookies
		const headers = {
			'Set-Cookie': [
				cookie.serialize('session_id', cookieId, {
					httpOnly: true,
					maxAge: 60 * 60, // 60 minutes valid
					sameSite: 'strict',
					path: '/profile'
				}),
				cookie.serialize('another_cookie', cookieId, {
					httpOnly: true,
					maxAge: 60 * 60, // 60 minutes valid
					sameSite: 'strict',
					path: '/profile'
				})
			]
		};

		return {
			status: 200,
			headers,
			body: {
				message: 'Sever says : Login was successful.'
			}
		};
		//
		// catch any other errors that might come up, this should never be the case
	} else {
		return {
			status: 500,
			body: {
				message: 'There was an error on the server. ' + Date.now()
			}
		};
	}
}
