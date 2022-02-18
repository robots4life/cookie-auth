<script>
	import { createEventDispatcher } from 'svelte';

	// https://svelte.dev/tutorial/component-events
	const dispatch = createEventDispatcher();

	let email = 'hello@world.com';
	let password = 12345678910;
	let error;

	async function login() {
		error = undefined;
		try {
			const response = await fetch('/auth/login', {
				method: 'POST',
				body: JSON.stringify({
					email,
					password
				}),
				headers: {
					'Content-Type': 'application/json'
				}
			});

			if (response.ok) {
				const responseDetails = await response.json();
				// console.log(responseDetails);
				// pass the message from the returned body from the server login.js along with the dispatch event
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

<h1>Login</h1>
<input type="email" bind:value="{email}" placeholder="Enter your Email" />
<input type="password" bind:value="{password}" placeholder="Enter your Password" />
{#if error}
	<p>{error}</p>
{/if}
<button on:click="{login}">Login</button>

<style>
	p {
		color: red;
	}
</style>
