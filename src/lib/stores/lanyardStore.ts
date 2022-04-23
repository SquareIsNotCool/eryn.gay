import { browser } from '$app/env';
import { get, readable } from 'svelte/store';
import type { Readable } from 'svelte/store';
import ReconnectingWebSocket from 'reconnecting-websocket';

export type Snowflake = `${bigint}`;

export type LanyardPresence = {
	active_on_discord_mobile: boolean;
	active_on_discord_desktop: boolean;
	active_on_discord_web: boolean;
	kv: Record<string, string>;
	discord_user: {
		username: string;
		public_flags: number;
		id: Snowflake;
		discriminator: string;
		avatar: string;
	};
	discord_status: 'online' | 'offline' | 'dnd' | 'idle';
	activities: {
		id: string;
		name: string;
		type: number;
		url?: string;
		created_at: number;
		timestamps?: {
			start: number;
			end?: number;
		};
		application_id?: Snowflake;
		details?: string;
		state?: string;
		emoji?: {
			name: string;
			id?: Snowflake;
			animated?: boolean;
		};
		party?: {
			id: string;
			size?: [number, number];
		};
		assets?: {
			large_image?: string;
			large_text?: string;
			small_image?: string;
			small_text: string;
		};
		secrets?: {
			join?: string;
			spectate?: string;
			match?: string;
		};
		instance?: boolean;
		flags?: number;
		buttons?: {
			label: string;
			url: string;
		}[];
	}[];
} & WithSpotify;

export interface LanyardSpotify {
	track_id: string;
	timestamps: {
		start: number;
		end: number;
	};
	song: string;
	artist: string;
	album_art_url: string;
	album: string;
}

type WithSpotify =
	| { listening_to_spotify: false; spotify: null }
	| { listening_to_spotify: true; spotify: LanyardSpotify };

enum LanyardOpCode {
	EVENT,
	HELLO,
	INITIALIZE,
	HEARTBEAT
}

const URLS = {
	ws: 'wss://lanyard.squareisnot.cool/socket',
	rest: (userId: Snowflake) => `https://lanyard.squareisnot.cool/v1/users/${userId}`
};

const useWebsockets = browser && 'WebSocket' in window && window.WebSocket.CLOSING === 2;

export async function fetchLanyardData(userId: Snowflake): Promise<LanyardPresence | null> {
	const res = await fetch(URLS.rest(userId));
	if (res.status !== 200) return null;
	const json = await res.json();
	if (!json.success) return null;
	return json.data;
}

function createWebsocket<T extends Snowflake>(
	userIds: T[],
	cb: (
		data:
			| { t: 'INIT_STATE'; d: Record<T, LanyardPresence | null> }
			| { t: 'PRESENCE_UPDATE'; d: LanyardPresence }
	) => void
): () => void {
	const ws = new ReconnectingWebSocket(URLS.ws);
	ws.onmessage = (event) => {
		const data = JSON.parse(event.data);
		switch (data.op as LanyardOpCode) {
			case LanyardOpCode.HELLO: {
				const interval = setInterval(() => {
					ws.send(JSON.stringify({ op: LanyardOpCode.HEARTBEAT }));
				}, data.d.heartbeat_interval);

				ws.onclose = () => clearInterval(interval);

				ws.send(JSON.stringify({ op: LanyardOpCode.INITIALIZE, d: { subscribe_to_ids: userIds } }));
				break;
			}
			case LanyardOpCode.EVENT: {
				cb({ t: data.t, d: data.d });
				break;
			}
		}
	};
	return () => ws.close();
}

export default function useLanyard<T extends Snowflake>(
	userId: T
): Readable<Record<T, LanyardPresence | null>>;
export default function useLanyard<T extends Snowflake>(
	userIds: T[]
): Readable<Record<T, LanyardPresence | null>>;
export default function useLanyard<T extends Snowflake>(
	userId: T,
	initialData?: Record<T, LanyardPresence | null>
): Readable<Record<T, LanyardPresence | null>>;
export default function useLanyard<T extends Snowflake>(
	userIds: T[],
	initialData?: Record<T, LanyardPresence | null>
): Readable<Record<T, LanyardPresence | null>>;
export default function useLanyard<T extends Snowflake>(
	userIds: T[],
	initialData?: Record<T, LanyardPresence | null>
): Readable<Record<T, LanyardPresence | null>> {
	if (typeof userIds === 'string') userIds = [userIds];
	const { subscribe } = readable<Record<T, LanyardPresence | null>>(initialData, (set) => {
		if (useWebsockets) {
			return createWebsocket(userIds, (data) => {
				if (data.t === 'INIT_STATE') set(data.d);
				else {
					const id = data.d.discord_user.id;
					// delete data.d.user_id
					set({ ...get({ subscribe }), [id]: data.d });
				}
			});
		} else {
			const interval = setInterval(async () => {
				const entries = await Promise.all(
					userIds.map(async (id) => {
						const data = await fetchLanyardData(id);
						return [id, data];
					})
				);
				set(Object.fromEntries(entries));
			}, 1000);
			return () => clearInterval(interval);
		}
	});

	return { subscribe };
}

export function userIcon(
	presence: LanyardPresence | null,
	options: {
		filetype?: 'png' | 'gif' | 'webp' | 'jpg' | 'jpeg';
		size?: number;
		animated?: boolean;
	} = {}
): string {
	if (presence === null) return;
	options = { filetype: 'webp', animated: false, size: 64, ...options };
	if (!presence.discord_user.avatar)
		return `https://cdn.discordapp.com/embed/avatars/${
			parseInt(presence.discord_user.discriminator) % 5
		}.png`;
	if (
		!options.animated &&
		options.filetype === 'gif' &&
		presence.discord_user.avatar.startsWith('a_')
	)
		options.filetype = 'webp';
	else if (options.animated && presence.discord_user.avatar.startsWith('a_'))
		options.filetype = 'gif';
	return `https://cdn.discordapp.com/avatars/${presence.discord_user.id}/${presence.discord_user.avatar}.${options.filetype}?size=${options.size}`;
}
