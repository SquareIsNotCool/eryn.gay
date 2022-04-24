<script>
	import Header from '$lib/components/Header.svelte';

	import '../app.css';
</script>

<div
	class="w-screen h-screen flex flex-col bg-primary-50 bg-opacity-50 dark:bg-dark-900 transition-colors"
>
	<Header />
	<main class="flex-grow" id="main-content">
		<slot />
	</main>
</div>
