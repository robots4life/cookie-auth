<script>
	import { createEventDispatcher } from 'svelte';

	// https://svelte.dev/tutorial/component-events
	const dispatch = createEventDispatcher();

	let error;

	async function logout() {
		error = undefined;
		try {
			const response = await fetch('/auth/logout', {
				method: 'POST'
				//
				// not sure if this is the correct way to just send a POST request without body ?
				// body: JSON.stringify('logout'),
				// headers: {
				// 	'Content-Type': 'application/json'
				// }
			});

			if (response.ok) {
				const responseDetails = await response.json();
				// console.log(responseDetails);
				// pass the message from the returned body from the server logout.js along with the dispatch event
				dispatch('success', {
					message: responseDetails.message
				});
			} else {
				const errorDetails = await response.json();
				error = errorDetails.message;
			}
		} catch (err) {
			console.log('An error occured');
			console.log(err);
		}
	}
</script>

<button on:click="{logout}">Logout</button>
