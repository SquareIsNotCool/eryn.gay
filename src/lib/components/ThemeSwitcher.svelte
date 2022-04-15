<script lang="ts">
	import { fly } from 'svelte/transition';
	import { backOut, bounceOut, cubicIn, cubicOut } from 'svelte/easing';
	import { tweened } from 'svelte/motion';

	import BiSun from '~icons/bi/sun';
	import BiSunFill from '~icons/bi/sun-fill';
	import BiMoon from '~icons/bi/moon';
	import BiMoonFill from '~icons/bi/moon-fill';
	import BiGear from '~icons/bi/gear';
	import BiGearFill from '~icons/bi/gear-fill';

	import { browser } from '$app/env';
	import useMediaQuery from '$lib/stores/mediaQuery';
	import { onMount } from 'svelte';

	type Theme = typeof themes[number];

	const themes = ['light', 'dark', 'system'] as const;
	const icons: Record<Theme, (fill: boolean) => any> = {
		light: (fill) => (fill ? BiSunFill : BiSun),
		dark: (fill) => (fill ? BiMoonFill : BiMoon),
		system: (fill) => (fill ? BiGearFill : BiGear)
	};
	const themeStrings: Record<Theme, string> = {
		light: 'Light Mode',
		dark: 'Dark Mode',
		system: 'System Theme'
	};

	function getLocalTheme(): Theme {
		if (!browser) return null;
		const theme = localStorage.getItem('theme');
		if (!theme || !['system', 'light', 'dark'].includes(theme)) return 'system';
		return theme as Theme;
	}

	let open = true;

	let themeButton: HTMLElement;
	let themePicker: HTMLElement;

	let currentTheme: Theme = getLocalTheme();
	$: if (browser && currentTheme !== null) localStorage.setItem('theme', currentTheme);
	$: parsedTheme = (
		currentTheme === 'light'
			? 'light'
			: currentTheme === 'dark'
			? 'dark'
			: $queryDark
			? 'dark'
			: 'light'
	) as Theme;

	const iconTween = tweened(0, { duration: 500, easing: backOut });
	$: $iconTween = parsedTheme === 'light' ? 0 : 1;

	const queryDark = useMediaQuery('(prefers-color-scheme: dark)');

	function handleOpen(e: MouseEvent) {
		if (!themePicker || !themePicker.contains(e.target as Node)) open = !open;
	}
	function outclick(e: MouseEvent) {
		if (!themeButton.contains(e.target as Node)) open = false;
	}

	$: if (browser)
		switch (parsedTheme) {
			case 'light':
				document.documentElement.classList.remove('dark');
				break;
			case 'dark':
				document.documentElement.classList.add('dark');
				break;
		}

	let mounted = false;
	onMount(() => {
		iconTween.set(parsedTheme === 'light' ? 0 : 1, { duration: 0 });
		mounted = true;
	});
</script>

<svelte:window on:click={outclick} />

<div
	class="bg-gray-100 dark:bg-gray-900 rounded shadow-inner h-full relative cursor-pointer transition-[opacity,background-color]"
	bind:this={themeButton}
	on:click={handleOpen}
	style:opacity="{mounted ? 100 : 0}%"
>
	<div class="overflow-hidden w-12 h-12">
		<div
			style:transform="translateX({$iconTween * -100}%)"
			class="grid grid-flow-col w-full h-full"
		>
			<BiSun class="w-12 p-3 h-auto text-black" />
			<BiMoonFill class="w-12 p-3 h-auto text-white" />
		</div>
	</div>
	{#if open}
		<div
			in:fly={{ y: -5, opacity: 0, duration: 500, easing: backOut }}
			out:fly={{ y: -5, opacity: 0, duration: 250, easing: cubicOut }}
			class="absolute grid grid-flow-row bg-white dark:bg-gray-700 transition-[background-color,box-shadow] shadow-lg ring-1 ring-gray-200 dark:ring-transparent rounded-md top-14 right-0 w-max p-2 gap-2 cursor-auto"
			bind:this={themePicker}
		>
			{#each themes as theme}
				<div
					class="p-1 rounded flex flex-row cursor-pointer items-center gap-1 text-black dark:text-gray-100 transition-colors {currentTheme ===
					theme
						? 'bg-gray-200 dark:bg-gray-500'
						: 'hover:bg-gray-100 dark:hover:bg-gray-600'}"
					on:click={() => (currentTheme = open ? theme : currentTheme)}
				>
					<svelte:component
						this={icons[theme](currentTheme === theme)}
						class="p-[1px] text-black dark:text-white transition-colors"
					/>
					{themeStrings[theme]}
				</div>
			{/each}
		</div>
	{/if}
</div>
