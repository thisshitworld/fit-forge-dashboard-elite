
import type { Config } from "tailwindcss";

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
			fontFamily: {
				playfair: ["Playfair Display", "serif"],
				sans: ["Inter", "sans-serif"],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: '#3B82F6', // Blue
					foreground: '#fff'
				},
				secondary: {
					DEFAULT: '#f1f5fb',
					foreground: '#222'
				},
				card: {
					DEFAULT: '#ffffffcc',
					foreground: '#222',
				},
				highlight: "#2563EB",
				accent: {
					DEFAULT: "#e5e7fa",
					foreground: "#4B5563"
				}
			},
			backgroundImage: {
				'dashboard': 'linear-gradient(102.3deg, #000000 5.9%, #1E293B 64%, #1E40AF 89%)',
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'bounce-up': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-8px)' },
				}
			},
			animation: {
				'bounce-up': 'bounce-up 0.8s ease infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
