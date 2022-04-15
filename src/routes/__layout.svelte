<script>
	import Header from '$lib/components/Header.svelte';

	import '../app.css';
</script>

<div class="w-screen h-screen flex flex-col">
	<Header />
	<div class="flex-grow">
		<slot />
	</div>
</div>
