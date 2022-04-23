import discordUserId from '$lib/discordUserId';
import { fetchLanyardData } from '$lib/stores/lanyardStore';
import type { RequestHandler } from '@sveltejs/kit';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const get: RequestHandler = async () => {
	const lanyard = await fetchLanyardData(discordUserId);
	return {
		status: 200,
		body: {
			lanyardSsr: {
				[discordUserId]: lanyard
			}
		}
	};
};
