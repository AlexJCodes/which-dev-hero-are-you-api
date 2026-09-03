import { getCharacters } from "../api/charactersApi"
import { createCharacterCard } from "../components/characterCard"
import { createStatusMessage } from "../components/statusMessage"

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
	charactersSection.replaceChildren(
		createStatusMessage({
			variant: "loading",
			title: "Loading heroes...",
			message: "Waking up the developer multiverse.",
		}),
	)

	try {
		const characters = await getCharacters()

		if (characters.length === 0) {
			charactersSection.replaceChildren(
				createStatusMessage({
					variant: "empty",
					title: "No heroes found",
					message: "The API responded, but there are no heroes to show yet.",
				}),
			)

			return
		}

		charactersSection.replaceChildren(
			...characters.map((character) => createCharacterCard(character)),
		)
	} catch (error) {
		console.error(error)

		charactersSection.replaceChildren(
			createStatusMessage({
				variant: "error",
				title: "Could not load heroes",
				message: "Make sure the API is running and try again.",
				actionLabel: "Try again",
				onAction: () => renderCharacters(charactersSection),
			}),
		)
	}
}
