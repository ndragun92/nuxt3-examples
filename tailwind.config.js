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
        tertiary: {
          DEFAULT: "#6B7280",
          50: "#DADCE0",
          100: "#CDD0D5",
          200: "#B4B8C0",
          300: "#9BA1AC",
          400: "#828997",
          500: "#6B7280",
          600: "#545964",
          700: "#3D4148",
          800: "#25282D",
          900: "#0E0F11",
        },
        cinder: {
          50: "#f4f5f9",
          100: "#dcdeeb",
          200: "#b8bcd7",
          300: "#8d91bb",
          400: "#65689c",
          500: "#4b4d81",
          600: "#3a3b67",
          700: "#323253",
          800: "#2c2b44",
          900: "#020203",
        },
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
