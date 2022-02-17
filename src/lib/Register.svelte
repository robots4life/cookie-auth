<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	let name;
	let email;
	let password;

	async function register() {}
</script>

<h1>Register</h1>
<input type="text" bind:value="{name}" placeholder="Enter your Name" />
<input type="email" bind:value="{email}" placeholder="Enter your Email" />
<input type="password" bind:value="{password}" placeholder="Enter your Password" />
<button on:click="{register}">Register</button>
