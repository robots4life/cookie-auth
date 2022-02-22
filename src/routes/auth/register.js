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
	console.log('register.js');
	console.log(Date.now());
	console.log(body);
	console.log(body.name);
	console.log(body.email);
	console.log(body.password);
	console.log('================================================================================');

	// Redis stores values as strings, so we parse the string to obtain a javascript object
	const user = JSON.parse(await db.get(body.email));
	console.log(user); // should log null to the terminal if there no user with the provided email address

	// if there is a user with the email address provided already present
	if (user) {
		return {
			status: 409,
			body: {
				// in production you should never give the client too specific info
				message: 'User with this email address already exists.'
			}
		};
	}

	// if there is no user with the email address provided create a new user
	if (user === null) {
		//
		// https://tedis.silkjs.org/guide/#example
		// register the user
		const newUser = await db.set(
			body.email,
			JSON.stringify({
				name: body.name,
				email: body.email,
				password: stringHash(body.password)
			})
		);
		console.log(newUser); // should log Ok to the terminal

		// create a cookie for the newly registered user
		const cookieId = uuidv4();
		const cookieForNewUser = await db.set(
			cookieId,
			JSON.stringify({
				email: body.email
			})
		);
		console.log(cookieForNewUser); // should log Ok to the terminal

		// the result in the Redis DB should look like the image here
		// /cookie-auth/images/20220217_191901 - new user registered - cookie created for email of new user.png

		// now we send back the cookie to the client
		const headers = {
			'Set-Cookie': cookie.serialize('session_id', cookieId, {
				httpOnly: true,
				// maxAge: 60 * 60, // 60 minutes valid
				maxAge: 60 * 5, // 5 minutes valid
				sameSite: 'strict',
				path: '/profile'
			})
		};

		return {
			status: 200,
			headers,
			body: {
				message: 'Sever says : Registration was successful.'
			}
		};

		// the result of the cookie being stored for the /profile page should look like the image here
		// /cookie-auth/images/20220217_193231 - cookie for profile page set.png

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
