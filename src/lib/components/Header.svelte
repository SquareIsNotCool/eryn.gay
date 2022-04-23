<script>
	import ThemeSwitcher from './ThemeSwitcher.svelte';
</script>

<header
	class="bg-white dark:bg-gray-800 p-6 rounded-b-lg shadow flex flex-row text-lg items-center transition-colors"
>
	<div class="h-full flex items-center">
		<a
			href="#main-content"
			class="bg-gray-100 rounded-full py-1 px-5 peer -translate-x-[115%] focus:translate-x-0 opacity-0 focus:opacity-100 transition-[transform,opacity] shadow"
			>Skip navigation</a
		>
		<a
			href="/"
			class="text-primary-500 dark:text-primary-400 text-2xl font-semibold transition-[color,transform] -translate-x-[175%] peer-focus:translate-x-5"
			>Eryn.gay</a
		>
	</div>
	<div class="ml-auto">
		<ThemeSwitcher />
	</div>
</header>
