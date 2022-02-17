<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	let email;
	let password;

	async function login() {}
</script>

<h1>Login</h1>
<input type="email" bind:value="{email}" placeholder="Enter your Email" />
<input type="password" bind:value="{password}" placeholder="Enter your Password" />
<button on:click="{login}">Login</button>
