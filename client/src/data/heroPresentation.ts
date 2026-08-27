export type HeroPresentation = {
	shortLabel: string
	visualLabel: string
	variant: "cyan" | "rose" | "lime" | "purple" | "orange" | "red"
}

export const heroPresentation: Record<string, HeroPresentation> = {
	"tony-stark": {
		shortLabel: "AI",
		visualLabel: "Prototype mode",
		variant: "cyan",
	},

	deadpool: {
		shortLabel: "BUG",
		visualLabel: "Chaos debug",
		variant: "rose",
	},

	yoda: {
		shortLabel: "REF",
		visualLabel: "Clean logic",
		variant: "lime",
	},

	batman: {
		shortLabel: "ARCH",
		visualLabel: "Night build",
		variant: "purple",
	},

	"buzz-lightyear": {
		shortLabel: "MVP",
		visualLabel: "Ship first",
		variant: "orange",
	},

	"darth-vader": {
		shortLabel: "CR",
		visualLabel: "Code review",
		variant: "red",
	},
}
