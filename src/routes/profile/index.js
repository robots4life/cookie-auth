// https://kit.svelte.dev/docs/typescript#app-locals

// The interface that defines event.locals,
// which can be accessed in hooks (handle, handleError and getSession) and endpoints.

// ==
// F
// make locals available in the get function to have access to what getSession stored in locals
export async function get({ locals }) {
	// ==
	// G
	// do your checks here on condition of availability of locals.user
	console.log(locals);
	return {
		status: 200,
		body: {
			locals
		}
	};
}
