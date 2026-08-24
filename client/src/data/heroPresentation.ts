export type HeroPresentation = {
	accentColor: string
	gradientFrom: string
	shortLabel: string
	visualLabel: string
}

export const heroPresentation: Record<string, HeroPresentation> = {
	"tony-stark": {
		accentColor: "#06b6d4",
		gradientFrom: "rgba(6, 182, 212, 0.18)",
		shortLabel: "AI",
		visualLabel: "Prototype mode",
	},

	deadpool: {
		accentColor: "#f43f5e",
		gradientFrom: "rgba(244, 63, 94, 0.18)",
		shortLabel: "BUG",
		visualLabel: "Chaos debug",
	},

	yoda: {
		accentColor: "#a3e635",
		gradientFrom: "rgba(163, 230, 53, 0.18)",
		shortLabel: "REF",
		visualLabel: "Clean logic",
	},

	batman: {
		accentColor: "#a855f7",
		gradientFrom: "rgba(168, 85, 247, 0.18)",
		shortLabel: "ARCH",
		visualLabel: "Night build",
	},

	"buzz-lightyear": {
		accentColor: "#f97316",
		gradientFrom: "rgba(249, 115, 22, 0.18)",
		shortLabel: "MVP",
		visualLabel: "Ship first",
	},

	"darth-vader": {
		accentColor: "#ef4444",
		gradientFrom: "rgba(239, 68, 68, 0.18)",
		shortLabel: "CR",
		visualLabel: "Code review",
	},
}