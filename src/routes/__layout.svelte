<script>
	import Header from '$lib/components/Header.svelte';

	import '../app.css';
</script>

<div class="w-screen h-screen flex flex-col">
	<!-- <Header /> -->
	<main class="flex-grow" id="main-content">
		<slot />
	</main>
</div>
