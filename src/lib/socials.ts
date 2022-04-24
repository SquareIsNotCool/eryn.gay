const socials = {
	Discord: 'https://discord.gg/Qn9EgDDwHw',
	Twitch: 'https://www.twitch.tv/eryn_4',
	Twitter: 'https://twitter.com/_Eryyn_',
	'Ko-fi': 'https://ko-fi.com/erynnn/commissions',
	TikTok: 'https://www.tiktok.com/@eryns_art',
	Instagram: 'https://www.instagram.com/er.yn4920/',
	DeviantArt: 'https://www.deviantart.com/perditricks',
	YouTube: 'https://www.youtube.com/channel/UC3XCE2kPWHAYY-7wRI0-oRw'
} as const;
export default Object.fromEntries(Object.entries(socials).sort((a, b) => a[0].localeCompare(b[0])));
