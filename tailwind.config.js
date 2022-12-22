/*
 ** TailwindCSS Configuration File
 **
 ** Docs: https://tailwindcss.com/docs/configuration
 */
module.exports = {
  content: [],
  theme: {
    screens: {
      touch: { raw: "hover: none" },
      "can-hover": { raw: "hover: hover" },
      xxs: "380px",
      xs: "480px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
      "3xl": "1920px",
      "4xl": "2560px",
      "5xl": "3840px",
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: "#4D5666",
          50: "#D2D6DD",
          100: "#C5CAD3",
          200: "#ABB2BF",
          300: "#919AAC",
          400: "#768398",
          500: "#606C80",
          600: "#4D5666",
          700: "#3B424E",
          800: "#2A2F37",
          900: "#181B20",
        },
      },
      flex: {
        2: "2 2 0%",
        3: "3 3 0%",
      },
    },
  },
};
