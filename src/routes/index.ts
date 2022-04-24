import discordUserId from '$lib/discordUserId';
import { fetchLanyardData } from '$lib/stores/lanyardStore';
import type { RequestHandler } from '@sveltejs/kit';

const greetings = ['Hi', 'Hello', 'Heya', 'Heyo'];
const statuses = [
	'Certified vibe curator',
	'Caretaker of Axolotls',
	'Fridge magnet collector',
	'In a Bubble in space'
];

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const get: RequestHandler = async () => {
	const lanyard = await fetchLanyardData(discordUserId);
	return {
		status: 200,
		body: {
			lanyardSsr: {
				[discordUserId]: lanyard
			},
			greeting: greetings[Math.floor(Math.random() * greetings.length)],
			status: statuses[Math.floor(Math.random() * statuses.length)]
		}
	};
};
