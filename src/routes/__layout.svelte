<script>
	import Header from '$lib/components/Header.svelte';
	import ThemeSwitcher from '$lib/components/ThemeSwitcher.svelte';

	import '../app.css';
</script>

<div class="w-screen h-screen flex flex-col">
	<!-- <Header /> -->
	<div class="absolute top-8 right-8">
		<ThemeSwitcher />
	</div>
	<main class="flex-grow" id="main-content">
		<slot />
	</main>
</div>
