<script>
	import Header from '$lib/components/Header.svelte';
	import ThemeSwitcher from '$lib/components/ThemeSwitcher.svelte';

	import '../app.css';
</script>

<div
	class="w-screen h-screen flex flex-col bg-primary-50 bg-opacity-50 dark:bg-dark-900 transition-colors"
>
	<!-- <Header /> -->
	<div class="absolute top-8 right-8">
		<ThemeSwitcher />
	</div>
	<main class="flex-grow pointer-events-none" id="main-content">
		<slot />
	</main>
</div>
