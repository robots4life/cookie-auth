<script>
	export let locals;
</script>

<h1>Profile</h1>

{#if locals.user}
	<p>
		If exported property locals contains the user object then the current user is newly
		registered or logged in.
	</p>
	{JSON.stringify(locals)}
	<p>Your email address is : {locals.user.email}</p>
{/if}

<style>
	:global(html) {
		background-color: #3258ac;
		color: white;
	}
</style>
