<script>
	import '../app.css'
    import { logged } from '$lib/stores/session.svelte.js';
	
	let { children, data } = $props();
	
	logged.set(data.logged);

</script>

<h1> Online games (header) {$logged ? ` - ${data.user.username}` : ''}</h1>
<nav class=" bg-orange-300 bg-conic-120 border-4 border-amber-500 m-5 p-5 ">
    {#if $logged}
		<a href="/logout"> Log out</a>
		<a href="/dashboard"> Dashboard </a>
		<a href="/dashboard/chess"> Chess game </a>
		<a href="/dashboard/tarot"> French tarot </a>

    {:else}
        <a href="/"> Homepage </a>
        <a href="/signup"> Sign up </a>
        <a href="/login"> Log in </a>
    {/if}
</nav>

{@render children()}


<style>
	a {
		background-color :burlywood ;
		padding: 5px;
		margin-left: 2px;
		border-radius: 8px;
		border-color: wheat;
		border-width: 4px;
	
	}
	a:hover {
		 opacity: 80%;
	}

	
</style>