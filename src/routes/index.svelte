<script lang="ts" context="module">
	let isKonami = false;
</script>

<script lang="ts">
	import socials from '$lib/socials';

	import CibKoFi from '~icons/cib/ko-fi';
	import CiTwitter from '~icons/ci/twitter';
	import CibTwitch from '~icons/cib/twitch';
	import FaBrandsDiscord from '~icons/fa-brands/discord';
	import CibTiktok from '~icons/cib/tiktok';
	import CibInstagram from '~icons/cib/instagram';
	import CibDeviantart from '~icons/cib/deviantart';
	import CibYoutube from '~icons/cib/youtube';

	import useLanyard, { userIcon, type LanyardPresence } from '$lib/stores/lanyardStore';
	import discordUserId from '$lib/discordUserId';

	export let lanyardSsr: Record<string, LanyardPresence>;
	export let greeting: string;
	export let status: string;

	const socialsToIcon: Record<keyof typeof socials, any> = {
		Discord: FaBrandsDiscord,
		Twitch: CibTwitch,
		Twitter: CiTwitter,
		'Ko-fi': CibKoFi,
		TikTok: CibTiktok,
		Instagram: CibInstagram,
		DeviantArt: CibDeviantart,
		YouTube: CibYoutube
	};

	const lanyardStore = useLanyard(discordUserId, lanyardSsr);
	$: lanyard = $lanyardStore[discordUserId];

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

<svelte:head>
	<title>Eryn | {status}</title>
</svelte:head>

<div
	class="grid place-content-center text-center w-full h-full text-light-900 dark:text-primary-300 transition-[color,transform] scale-[.35] sm:scale-50 md:scale-75 lg:scale-100"
>
	<!-- Card -->
	<div
		class="bg-white dark:bg-dark-800 transition-colors rounded-3xl shadow-xl flex flex-row w-[54em] pointer-events-auto"
	>
		<div class="flex flex-col gap-6 p-8 place-items-center">
			<img
				src={userIcon(lanyard, { animated: true, size: 256 })}
				alt="{lanyard.discord_user.username}' pfp"
				class="rounded-full w-56 h-56 shadow-lg shadow-primary-200 dark:shadow-primary-dark-200 transition-shadow"
			/>
			<div>
				<h1 class="text-2xl font-bold">{lanyard.discord_user.username}</h1>
				{#if isKonami}
					<p class="font-comic-sans text-blue-400 dark:text-blue-300 transition-colors">
						Monnie was here
					</p>
				{:else}
					<p
						class="text-light-400 dark:text-primary-300 dark:opacity-70 transition-[color,opacity] font-semibold"
					>
						{status}
					</p>
				{/if}
			</div>
			<div class="flex flex-row gap-2 flex-wrap justify-center">
				{#each Object.entries(socials) as [socialName, socialUrl]}
					<a
						class="p-3 bg-primary-50 hover:bg-primary-100 dark:bg-dark-700 dark:hover:bg-dark-600 rounded-2xl transition-colors"
						href={socialUrl}
						target="_blank"
					>
						<svelte:component
							this={socialsToIcon[socialName]}
							class="text-2xl text-primary-400 dark:text-primary-400 transition-colors"
						/>
					</a>
				{/each}
			</div>
		</div>
		<div class="w-1 h-full bg-primary-50 dark:bg-dark-900 transition-colors" />
		<div class="p-8 w-11/12 flex flex-col gap-2 text-light-900 dark:text-dark-50 transition-colors">
			<h1 class="text-2xl">
				{greeting}! I'm
				<span class="text-primary-400 dark:text-primary-300 transition-colors font-bold">Eryn</span
				>!<br />
			</h1>
			<hr class="border-primary-50" />
			<ul
				class="text-xl flex flex-col gap-8 text-left list-disc marker:text-secondary-500 dark:marker:text-secondary-400 marker:transition-colors"
			>
				<li>
					I go by <span
						class="text-primary-400 dark:text-primary-300 transition-colors font-semibold"
						>She/They</span
					>!
				</li>
				<li>My age is a number under 18, which is all I'll tell you :]</li>
				<li>
					I like to
					<a href={socials.DeviantArt} target="_blank" class="text-hyperlink underline"
						>draw things</a
					>
					and I also sometimes
					<a href={socials.Twitch} target="_blank" class="text-hyperlink underline"
						>stream on Twitch</a
					>!
					<span class="italic text-light-400 dark:text-dark-400 transition-colors"
						>You should stop by sometime!</span
					>
				</li>
				<li>I seriously have no clue what to write here</li>
				<li>The quick brown fox jumps over the lazy dog</li>
				<li>safdsadasdasd</li>
			</ul>
		</div>
	</div>
</div>
