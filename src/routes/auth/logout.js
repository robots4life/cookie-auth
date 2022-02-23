import * as cookie from 'cookie';

export async function post() {
	// 2 cookies
	// const headers = {
	// 	'Set-Cookie': [
	// 		cookie.serialize('session_id', '', {
	// 			path: '/',
	// 			expires: new Date(0)
	// 		}),
	// 		cookie.serialize('another_cookie', '', {
	// 			path: '/',
	// 			expires: new Date(0)
	// 		})
	// 	]
	// };

	// 1 cookie
	const headers = {
		'Set-Cookie': cookie.serialize('session_id', '', {
			httpOnly: true,
			maxAge: new Date(0),
			sameSite: 'strict',
			path: '/'
		})
	};

	return {
		status: 200,
		headers,
		body: {
			message: 'Sever says : Logout was successful.'
		}
	};
}
