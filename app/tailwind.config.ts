import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        "fade-in": { from: { opacity: "0", transform: "rotateY(-100deg)" }, to: { opacity: '1', transform: "rotateY(0deg)" } },
        "zoom-in": { from: { transform: "scale(0.8)" }, to: { transform: "scale(1)" } },
        "slide-up": { from: { transform: "translateY(20px)" }, to: { transform: "translateY(0)" } },
        "down-Leter": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(5deg)" },
        },
        "up-Leter": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(-5deg)" },
        },
        "transition": {
          from: {
            transform: "translateX(0)"
          },
          to: {
            transform: "translateX(-100%)"
          }
        },
        "cards": {
          from: {
            transform: "scale(.8)"
          }, to: {
            transform: "scale(1)"
          }
        }
      },

      animation: {
        "fade-in": "fade-in 1s ease-out",
        "zoom-in": "zoom-in 0.8s ease-out",
        "slide-up": "slide-up 0.8s ease-out",
        "downLeter": "down-Leter 1s ease-out forwards",
        "upLater": "up-Leter 1s ease-out forwards",
        "transition1": "transition .5s ease-out forwards",
        "transition2": "transition .5s ease-out forwards 0.2s",
        "card":"cards .4s ease-out forwards"
      },

      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },

    },
  },
  plugins: [],
} satisfies Config;
