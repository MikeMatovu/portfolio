import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        incognito: ["var(--incognito)"],
        inter: ["var(--inter)"],
        heading: ["var(--font-heading)", ...fontFamily.sans],
        body: ["var(--font-body)", ...fontFamily.mono],
      },
      colors: {
        "primary-color": "#33E092",
        "secondary-color": "#0CCE6B",
        "tertiary-color": "#16a34a",
        "primary-bg": "rgba(39, 39, 43, 0.4)",
        "secondary-bg": "rgba(250, 250, 250, 0.4)",
      },
      boxShadow: {
        "line-light": "rgba(17, 17, 26, 0.1) 0px 1px 0px",
        "line-dark": "rgb(29, 29, 32) 0px 1px 0px",
      },
      gridTemplateColumns: {
        custom: "1.2fr 1fr",
      },
      backgroundImage: {
        noise:
          "url('https://res.cloudinary.com/victoreke/image/upload/v1691779257/victoreke/noise.png')",
      },
      backgroundPosition: {
        zero: "0 0",
      },
    },
    // colors: {
    //       "border": "hsl(var(--border))",
    //       "input": "hsl(var(--input))",
    //       "ring": "hsl(var(--ring))",
    //       "background": "hsl(var(--background))",
    //       "foreground": "hsl(var(--foreground))",
    //       "primary": {
    //         "DEFAULT": "hsl(var(--primary))",
    //         "foreground": "hsl(var(--primary-foreground))"
    //       },
    //       "secondary": {
    //         "DEFAULT": "hsl(var(--secondary))",
    //         "foreground": "hsl(var(--secondary-foreground))"
    //       },
    //       "destructive": {
    //         "DEFAULT": "hsl(var(--destructive))",
    //         "foreground": "hsl(var(--destructive-foreground))"
    //       },
    //       "muted": {
    //         "DEFAULT": "hsl(var(--muted))",
    //         "foreground": "hsl(var(--muted-foreground))"
    //       },
    //       "accent": {
    //         "DEFAULT": "hsl(var(--accent))",
    //         "foreground": "hsl(var(--accent-foreground))"
    //       },
    //       "popover": {
    //         "DEFAULT": "hsl(var(--popover))",
    //         "foreground": "hsl(var(--popover-foreground))"
    //       },
    //       "card": {
    //         "DEFAULT": "hsl(var(--card))",
    //         "foreground": "hsl(var(--card-foreground))"
    //       }
    //     },
    // borderRadius: {
    //       "lg": "var(--radius)",
    //       "md": "calc(var(--radius) - 2px)",
    //       "sm": "calc(var(--radius) - 4px)"
    //     },
    keyframes: {
      "accordion-down": {
        from: {
          height: "0",
        },
        to: {
          height: "var(--radix-accordion-content-height)",
        },
      },
      "accordion-up": {
        from: {
          height: "var(--radix-accordion-content-height)",
        },
        to: {
          height: "0",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
