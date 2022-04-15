import { browser } from '$app/env';
import { noop } from 'svelte/internal';
import { readable } from 'svelte/store';
import type { Readable } from 'svelte/store';

export default function useMediaQuery(query: string, ssr = false): Readable<boolean> {
	if (!browser) return readable(ssr);

	const mq = window.matchMedia(query);
	const { subscribe } = readable<boolean>(mq.matches, (set) => {
		mq.onchange = (e) => set(e.matches);
		return () => (mq.onchange = noop);
	});

	return { subscribe };
}
