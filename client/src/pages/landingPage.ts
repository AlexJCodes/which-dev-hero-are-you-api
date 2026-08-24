type LandingPageOptions = {
	onStartQuiz: () => void
	onExploreHeroes: () => void
}

const floatingSymbols = [
	{ text: "{...}", className: "landing-symbol landing-symbol--one" },
	{ text: "</>", className: "landing-symbol landing-symbol--two" },
	{ text: "// fix later", className: "landing-symbol landing-symbol--three" },
	{ text: "git push -f", className: "landing-symbol landing-symbol--four" },
	{ text: "O(n²)", className: "landing-symbol landing-symbol--five" },
	{ text: "npm i", className: "landing-symbol landing-symbol--six" },
	{ text: "async/await", className: "landing-symbol landing-symbol--seven" },
]

const teaserCards = [
	{
		title: "Tony Stark",
		label: "AI",
		text: "The AI-Augmented Engineer",
		className: "landing-teaser-card landing-teaser-card--cyan",
	},
	{
		title: "Yoda",
		label: "REF",
		text: "The Wise Refactor Master",
		className: "landing-teaser-card landing-teaser-card--lime",
	},
	{
		title: "Batman",
		label: "ARCH",
		text: "The Night Shift Architect",
		className: "landing-teaser-card landing-teaser-card--purple",
	},
]

export function createLandingPage(options: LandingPageOptions): HTMLElement {
	const page = document.createElement("main")
	page.className = "landing-page"

	page.innerHTML = `
		<div class="landing-bg" aria-hidden="true">
			<div class="landing-bg__blob landing-bg__blob--cyan"></div>
			<div class="landing-bg__blob landing-bg__blob--purple"></div>
			<div class="landing-bg__blob landing-bg__blob--pink"></div>
			<div class="landing-bg__grid"></div>
		</div>

		<nav class="landing-nav" aria-label="Main navigation">
			<a class="landing-nav__brand" href="#">
				<span class="landing-nav__mark">dev</span>
				<span class="landing-nav__text">quiz</span>
			</a>

			<button class="landing-nav__link" type="button" data-action="explore">
				Explore heroes
				<span aria-hidden="true">→</span>
			</button>
		</nav>

		<section class="landing-hero">
			<p class="landing-hero__eyebrow">Developer Personality Quiz</p>

			<h1 class="landing-hero__title">
				Which Dev Hero
				<span>Are You?</span>
			</h1>

			<p class="landing-hero__text">
				Find out what kind of developer chaos you bring to the team.
			</p>

			<button class="landing-hero__button" type="button" data-action="start">
				Start Quiz
				<span aria-hidden="true">→</span>
			</button>

			<div class="landing-teasers" aria-label="Possible dev heroes"></div>
			<p class="landing-hero__hint">6 possible results</p>
		</section>
	`

	const startButton = page.querySelector<HTMLButtonElement>('[data-action="start"]')
	const exploreButton = page.querySelector<HTMLButtonElement>(
		'[data-action="explore"]',
	)
	const teasers = page.querySelector<HTMLDivElement>(".landing-teasers")

	if (!startButton || !exploreButton || !teasers) {
		throw new Error("Landing page elements were not found.")
	}

	for (const symbol of floatingSymbols) {
		const element = document.createElement("span")
		element.className = symbol.className
		element.textContent = symbol.text

		page.append(element)
	}

	for (const card of teaserCards) {
		const article = document.createElement("article")
		article.className = card.className

		const label = document.createElement("p")
		label.className = "landing-teaser-card__label"
		label.textContent = card.label

		const title = document.createElement("h2")
		title.className = "landing-teaser-card__title"
		title.textContent = card.title

		const text = document.createElement("p")
		text.className = "landing-teaser-card__text"
		text.textContent = card.text

		article.append(label, title, text)
		teasers.append(article)
	}

	startButton.addEventListener("click", options.onStartQuiz)
	exploreButton.addEventListener("click", options.onExploreHeroes)

	return page
}