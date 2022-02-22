import * as cookie from 'cookie';

export async function get() {
	const headers = {
		'Set-Cookie': [
			cookie.serialize('session_id', '', {
				path: '/profile',
				expires: new Date(0)
			}),
			cookie.serialize('another_cookie', '', {
				path: '/profile',
				expires: new Date(0)
			})
		]
	};

	return {
		status: 200,
		headers
	};
}
