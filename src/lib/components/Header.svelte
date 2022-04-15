<script>
	import ThemeSwitcher from './ThemeSwitcher.svelte';
</script>

<div
	class="bg-white dark:bg-gray-800 p-6 rounded-b-lg shadow flex flex-row text-lg items-center transition-colors"
>
	<a
		href="/"
		class="text-primary-500 dark:text-primary-400 text-2xl font-semibold transition-colors"
		>Eryn.gay</a
	>
	<div class="ml-auto">
		<ThemeSwitcher />
	</div>
</div>
