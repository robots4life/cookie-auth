<script>
	import { createEventDispatcher } from 'svelte';

	// https://svelte.dev/tutorial/component-events
	const dispatch = createEventDispatcher();

	let email;
	let password;
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
				dispatch('success');
			} else {
				error = 'An error occured';
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
