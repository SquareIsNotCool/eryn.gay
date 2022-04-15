<script lang="ts" context="module">
	let isKonami = false;
</script>

<script lang="ts">
	import { fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';

	const pattern = [
		'ArrowUp',
		'ArrowUp',
		'ArrowDown',
		'ArrowDown',
		'ArrowLeft',
		'ArrowRight',
		'ArrowLeft',
		'ArrowRight',
		'b',
		'a'
	] as const;

	let konami = 0;
	$: {
		isKonami = konami >= pattern.length;
	}

	function onKeyDown(
		e: KeyboardEvent & {
			currentTarget: EventTarget & Window;
		}
	) {
		if (isKonami) return;
		else if (e.key !== pattern[konami]) return (konami = 0);
		else {
			konami++;
		}
	}
</script>

<svelte:window on:keydown={onKeyDown} />

<div class="grid place-content-center text-center w-full h-full">
	<h1 class="text-primary-500 text-6xl font-semibold">Placeholder Page</h1>
	{#if isKonami}
		<p
			in:fly={{ duration: 1000, opacity: 0, y: 25, easing: cubicOut }}
			class="text-blue-500 dark:text-blue-400 font-comic-sans transition-colors text-4xl"
		>
			Monnie was here
		</p>
	{/if}
</div>
