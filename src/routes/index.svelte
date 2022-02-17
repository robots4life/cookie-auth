<script>
	import Login from '$lib/Login.svelte';
	import Register from '$lib/Register.svelte';
	import { goto } from '$app/navigation';

	function redirectToProfile() {
		// goto('/profile');
		console.log('Registration success');
	}
</script>

<main>
	<h1>Authentication with Cookies in SvelteKit</h1>
	<!--
        https://svelte.dev/tutorial/component-events

        Notice that the Index page/component ist listening to the messages dispatched by 
        the Login and Register components thanks to the on:success directive.
        
        This directive is an attribute prefixed with on: followed by the event name that
        we are dispatching (in this case, success).
    -->
	<Register on:success="{redirectToProfile}" />
	<Login on:success="{redirectToProfile}" />
</main>

<style>
	:global(html) {
		background-color: #1d2d50;
		color: slategrey;
	}
</style>
