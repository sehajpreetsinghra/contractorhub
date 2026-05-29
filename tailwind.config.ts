import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./lib/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: "#0f2742",
        "navy-dark": "#091827",
        gold: "#c9a227",
        "gray-bg": "#f4f6f8",
        border: "#d8dee6",
        "text-main": "#172033",
        "text-muted": "#64748b"
      },
      boxShadow: {
        card: "0 12px 30px rgba(15, 39, 66, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;
