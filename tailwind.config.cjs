const colors = require('tailwindcss/colors')

const config = {
    darkMode: 'class',
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
            colors: {
                primary: colors.pink,
                secondary: colors.blue,
                gray: colors.zinc,
                hyperlink: colors.pink[500]
            }
        }
	},

	plugins: []
};

module.exports = config;
