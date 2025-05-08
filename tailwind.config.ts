import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				// Custom colors
				dark: "#0F0F0F",
				light: "#FFFFFF",
				blue: {
					DEFAULT: "#3B82F6",
					light: "#60A5FA",
					dark: "#2563EB"
				}
			},
			fontFamily: {
				sans: ["Inter", "sans-serif"],
				mono: ["JetBrains Mono", "monospace"]
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" },
				},
				"fade-in": {
					"0%": { opacity: "0", transform: "translateY(30px)" },
					"100%": { opacity: "1", transform: "translateY(0)" }
				},
				"slide-in": {
					"0%": { transform: "translateX(-100%)" },
					"100%": { transform: "translateX(0)" }
				},
				"slide-up": {
					"0%": { transform: "translateY(100%)" },
					"100%": { transform: "translateY(0)" }
				},
				"scale-up": {
					"0%": { transform: "scale(0.8)", opacity: "0" },
					"100%": { transform: "scale(1)", opacity: "1" }
				},
				"menu-open": {
					"0%": { transform: "scaleY(0)", opacity: "0", transformOrigin: "top" },
					"100%": { transform: "scaleY(1)", opacity: "1", transformOrigin: "top" }
				},
				"menu-close": {
					"0%": { transform: "scaleY(1)", opacity: "1", transformOrigin: "top" },
					"100%": { transform: "scaleY(0)", opacity: "0", transformOrigin: "top" }
				},
				"rotate-icon": {
					"0%": { transform: "rotate(0deg)" },
					"100%": { transform: "rotate(90deg)" }
				},
				"soft-bounce": {
					"0%, 100%": { transform: "translateY(0)" },
					"50%": { transform: "translateY(-10px)" }
				},
				"dramatic-fade": {
					"0%": { opacity: "0", transform: "translateY(50px) scale(0.9)" },
					"100%": { opacity: "1", transform: "translateY(0) scale(1)" }
				}
			},
			animation: {
				"accordion-down": "accordion-down 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
				"accordion-up": "accordion-up 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
				"fade-in": "fade-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards",
				"slide-in": "slide-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards",
				"slide-up": "slide-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards",
				"scale-up": "scale-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards",
				"menu-open": "menu-open 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
				"menu-close": "menu-close 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
				"rotate-icon": "rotate-icon 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
				"soft-bounce": "soft-bounce 2s cubic-bezier(0.4, 0, 0.2, 1) infinite",
				"dramatic-fade": "dramatic-fade 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards"
			}
		}
	},
	plugins: [tailwindcssAnimate],
} satisfies Config;
