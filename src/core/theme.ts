import { extendTheme } from "@mui/joy/styles"
import { experimental_extendTheme as materialExtendTheme } from "@mui/material/styles"

export const themeJoy = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        background: {
          backdrop: "#2c0405",
          body: "#2c0405",
          surface: "#2c0405",
        },
        text: {
          icon: "#FFE98F",
        },
        primary: {
          solidColor: "#FFAC21",
          solidBg: "#A34700",
          softColor: "#FFE98F",
          softBg: "#FFAC21",
          solidHoverBg: "#C55516",
          solidActiveBg: "#C55516",
          plainActiveBg: "#C55516",
          plainHoverBg: "#C55516",
          plainColor: "#FFAC21",
          50: "#FFAC21",
          100: "#FFAC21",
          200: "#FFAC21",
          300: "#FFAC21",
          400: "#FFAC21",
          500: "#FFAC21",
          600: "#FFAC21",
          700: "#FFAC21",
          800: "#FFAC21",
          900: "#FFAC21",
        },
        secondary: {
          solidColor: "#FFAC21",
          solidBg: "#A34700",
          softColor: "#FFE98F",
          softBg: "#FFAC21",
          solidHoverBg: "#C55516",
          solidActiveBg: "#C55516",
          plainActiveBg: "#C55516",
          plainHoverBg: "#C55516",
          plainColor: "#FFAC21",
          50: "#FFAC21",
          100: "#FFAC21",
          200: "#FFAC21",
          300: "#FFAC21",
          400: "#FFAC21",
          500: "#FFAC21",
          600: "#FFAC21",
          700: "#FFAC21",
          800: "#FFAC21",
          900: "#FFAC21",
        },
        neutral: {
          solidColor: "#FFAC21",
          solidBg: "#A34700",
          softColor: "#FFE98F",
          softBg: "#FFAC21",
          solidHoverBg: "#C55516",
          solidActiveBg: "#C55516",
          plainActiveBg: "#C55516",
          plainHoverBg: "#C55516",
          plainColor: "#FFAC21",
          50: "#FFAC21",
          100: "#FFAC21",
          200: "#FFAC21",
          300: "#FFAC21",
          400: "#FFAC21",
          500: "#FFAC21",
          600: "#FFAC21",
          700: "#FFAC21",
          800: "#FFAC21",
          900: "#FFAC21",
        },
      },
    },
  },
})

export const themeMui = materialExtendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: "#ffe473",
        },
        secondary: {
          main: "#f50057",
        },
        background: {
          default: "#2c0405",
          paper: "#2c0405",
        },
        text: {
          primary: "#FFAC21",
          secondary: "#A34700",
        },
        action: {
          active: "#FFAC21",
        },
      },
    },
    dark: {
      palette: {
        primary: {
          main: "#ffe473",
        },
        secondary: {
          main: "#f50057",
        },
        background: {
          default: "#2c0405",
          paper: "#2c0405",
        },
        text: {
          primary: "#FFAC21",
          secondary: "#A34700",
        },
      },
    },
  },
})
