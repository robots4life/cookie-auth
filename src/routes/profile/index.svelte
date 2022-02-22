<script>
	export let locals;

	import Logout from '$lib/Logout.svelte';

	import { goto } from '$app/navigation';

	function redirectToIndex(event) {
		// console.log(event);
		// pass the message from the returned body from the server register.js along with the dispatch event
		console.log(event.detail.message);
		// goto('/');
	}
</script>

<main>
	<h1>Profile</h1>
	{#if locals.user}
		<p>
			If exported property locals contains the user object then the current user is newly
			registered or logged in.
		</p>
		{JSON.stringify(locals)}
		<p>Your email address is : {locals.user.email}</p>
	{/if}

	<Logout on:success="{redirectToIndex}" />
</main>

<style>
	:global(html) {
		background-color: antiquewhite;
		font-family: sans-serif;
	}
	main {
		background-color: aquamarine;
	}
</style>
