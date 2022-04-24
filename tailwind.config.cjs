const colors = require('tailwindcss/colors')
const colorGradient = require("javascript-color-gradient")

const palette = {
    primary: colors.pink,
    secondary: colors.fuchsia,
    light: colors.slate,
    dark: colors.zinc,
}

function getColor(c1, c2) {
    const gradient = colorGradient
        .setGradient(c1, c2)
        .setMidpoint(100)

    return {
        50: gradient.getColor(5),
        100: gradient.getColor(10),
        200: gradient.getColor(20),
        300: gradient.getColor(30),
        400: gradient.getColor(40),
        500: gradient.getColor(50),
        600: gradient.getColor(60),
        700: gradient.getColor(70),
        800: gradient.getColor(80),
        900: gradient.getColor(90)
    }
}

const config = {
    darkMode: 'class',
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
            colors: {
                ...palette,
                hyperlink: palette.primary[500],
                "primary-dark": getColor(palette.dark[900], palette.primary[500]),
                "secondary-dark": getColor(palette.dark[900], palette.secondary[500])
            },
            fontFamily: {
                "comic-sans": ["Comic Sans MS", "Comic Sans", "cursive"]
            }
        }
	},

	plugins: []
};

module.exports = config;
