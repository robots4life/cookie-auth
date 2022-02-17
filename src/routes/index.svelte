<script>
	import Login from '$lib/Login.svelte';
	import Register from '$lib/Register.svelte';
	import { goto } from '$app/navigation';

	function redirectToProfile() {
		goto('/profile');
	}
</script>

<main>
	<h1>Authentication with Cookies in SvelteKit</h1>
	<Login on:success="{redirectToProfile}" />
	<Register on:success="{redirectToProfile}" />
</main>
