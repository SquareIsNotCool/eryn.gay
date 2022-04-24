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

	const pages = ['About Me', 'Portfolio', 'Some 3rd site', 'Some 4th site'];

	const status = 'Certified vibe curator';

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
		class="bg-white dark:bg-dark-800 transition-colors rounded-3xl shadow-xl flex flex-row w-[54em]"
	>
		<div class="flex flex-col gap-6 p-8 place-items-center">
			<img
				src={userIcon(lanyard, { animated: true, size: 256 })}
				alt="{lanyard.discord_user.username}' pfp"
				class="rounded-full w-56 h-56 shadow-lg shadow-primary-200 dark:shadow-dark-900 transition-shadow"
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
							class="text-2xl text-primary-400 dark:text-primary-300 transition-colors"
						/>
					</a>
				{/each}
			</div>
		</div>
		<div class="w-1 h-full bg-primary-50 dark:bg-dark-900 transition-colors" />
		<div class="grid grid-cols-2 p-8 gap-8 w-full">
			<p />
		</div>
	</div>
</div>
