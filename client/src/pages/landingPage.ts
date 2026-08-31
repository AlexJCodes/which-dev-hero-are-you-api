import { createBackgroundBlobs } from "../components/backgroundBlobs"
import { createFloatingCodeSymbol } from "../components/floatingCodeSymbol"
import { createHeroTeaserCard } from "../components/heroTeaserCard"
import {
	floatingCodeSymbols,
	landingTeaserHeroes,
} from "../data/landingContent"

type LandingPageOptions = {
	onStartQuiz: (username: string) => void
	onExploreHeroes: () => void
}

export function createLandingPage(options: LandingPageOptions): HTMLElement {
	const page = document.createElement("main")

	page.className = "landing-page"

	page.append(createBackgroundBlobs())

	const content = document.createElement("div")
	content.innerHTML = `
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

			<label class="landing-hero__name-label" for="username">
				What should we call you?
			</label>

			<input
				class="landing-hero__name-input"
				id="username"
				type="text"
				name="username"
				placeholder="Anonymous Dev"
				maxlength="30"
			/>

			<button class="landing-hero__button" type="button" data-action="start">
				Start Quiz
				<span aria-hidden="true">→</span>
			</button>

			<div class="landing-teasers" aria-label="Possible dev heroes"></div>
			<p class="landing-hero__hint">6 possible results</p>
		</section>
	`

	page.append(...Array.from(content.children))

	const startButton = page.querySelector<HTMLButtonElement>(
		'[data-action="start"]',
	)
	const exploreButton = page.querySelector<HTMLButtonElement>(
		'[data-action="explore"]',
	)
	const usernameInput = page.querySelector<HTMLInputElement>("#username")
	const teasers = page.querySelector<HTMLDivElement>(".landing-teasers")

	if (!startButton || !exploreButton || !usernameInput || !teasers) {
		throw new Error("Landing page elements were not found.")
	}

	for (const symbol of floatingCodeSymbols) {
		page.append(createFloatingCodeSymbol(symbol))
	}

	for (const hero of landingTeaserHeroes) {
		teasers.append(createHeroTeaserCard(hero))
	}

	startButton.addEventListener("click", () => {
		const username = usernameInput.value.trim() || "Anonymous Dev"

		options.onStartQuiz(username)
	})

	exploreButton.addEventListener("click", options.onExploreHeroes)

	return page
}
