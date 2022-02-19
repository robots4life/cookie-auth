<script>
	// https://kit.svelte.dev/docs/modules#$app-stores
	// Stores are contextual — they are added to the context of your root component.
	// This means that session and page are unique to each request on the server,
	// rather than shared between multiple requests handled by the same server simultaneously,
	// which is what makes it safe to include user-specific data in session.
	//
	// session from hooks.js is stored in $app/stores and available on every endpoint
	import { session } from '$app/stores';
</script>

{$session.user}

<h1>Profile</h1>

<style>
	:global(html) {
		background-color: #3258ac;
		color: rgb(17, 45, 73);
	}
</style>
