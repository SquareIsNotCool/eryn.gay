const colors = require('tailwindcss/colors')

const config = {
    darkMode: 'class',
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
            colors: {
                primary: colors.pink,
                secondary: colors.blue,
                light: colors.slate,
                dark: colors.zinc,
                hyperlink: colors.pink[500]
            },
            fontFamily: {
                "comic-sans": ["Comic Sans MS", "Comic Sans", "cursive"]
            }
        }
	},

	plugins: []
};

module.exports = config;
