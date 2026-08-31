import { getCharacters } from "../api/charactersApi"
import { createCharacterCard } from "../components/characterCard"

type ExplorePageOptions = {
	onBack: () => void
	onStartQuiz: () => void
}

export function createExplorePage(options: ExplorePageOptions): HTMLElement {
	const page = document.createElement("main")
	page.className = "explore-page"

	page.innerHTML = `
		<section class="explore-page__inner">
			<header class="explore-header">
				<button class="explore-header__back" type="button" data-action="back">
					← Back
				</button>

				<button class="explore-header__cta" type="button" data-action="start">
					Start Quiz →
				</button>
			</header>

			<section class="explore-hero">
				<p class="explore-hero__eyebrow">// character.select</p>
				<h1 class="explore-hero__title">The Dev Hero Roster</h1>
				<p class="explore-hero__text">
					Six developer personalities. Some inspiring. Some concerning.
				</p>
			</section>

			<section class="characters" aria-label="Dev heroes">
				<p class="explore-page__status">Loading heroes...</p>
			</section>
		</section>
	`

	const backButton = page.querySelector<HTMLButtonElement>(
		'[data-action="back"]',
	)
	const startButton = page.querySelector<HTMLButtonElement>(
		'[data-action="start"]',
	)
	const charactersSection = page.querySelector<HTMLElement>(".characters")

	if (!backButton || !startButton || !charactersSection) {
		throw new Error("Explore page elements were not found.")
	}

	backButton.addEventListener("click", options.onBack)
	startButton.addEventListener("click", options.onStartQuiz)

	renderCharacters(charactersSection)

	return page
}

async function renderCharacters(charactersSection: HTMLElement) {
	try {
		const characters = await getCharacters()

		charactersSection.replaceChildren(
			...characters.map((character) => createCharacterCard(character)),
		)
	} catch (error) {
		console.error(error)

		charactersSection.textContent =
			"Could not load heroes. Make sure the API is running."
	}
}
