import { getCharacters } from "../api/charactersApi"
import { heroPresentation } from "../data/heroPresentation"
import type { Character } from "../types/character.types"
import type { Submission } from "../types/submission.types"

type ResultPageOptions = {
	submission: Submission
	onRetakeQuiz: () => void
	onExploreHeroes: () => void
}

export function createResultPage(options: ResultPageOptions): HTMLElement {
	const page = document.createElement("main")
	page.className = "result-page"

	page.innerHTML = `
		<section class="result-card">
			<div class="result-card__content" data-result-content>
				<p class="result-card__eyebrow">Calculating developer chaos...</p>
			</div>

			<div class="result-card__actions">
				<button class="result-card__button result-card__button--secondary" type="button" data-action="retake">
					Retake Quiz
				</button>

				<button class="result-card__button" type="button" data-action="explore">
					Explore Heroes
				</button>
			</div>
		</section>
	`

	const resultContent = page.querySelector<HTMLElement>("[data-result-content]")
	const retakeButton = page.querySelector<HTMLButtonElement>(
		'[data-action="retake"]',
	)
	const exploreButton = page.querySelector<HTMLButtonElement>(
		'[data-action="explore"]',
	)

	if (!resultContent || !retakeButton || !exploreButton) {
		throw new Error("Result page elements were not found.")
	}

	retakeButton.addEventListener("click", options.onRetakeQuiz)
	exploreButton.addEventListener("click", options.onExploreHeroes)

	renderResult(page, resultContent, options.submission)

	return page
}

async function renderResult(
	page: HTMLElement,
	resultContent: HTMLElement,
	submission: Submission,
) {
	try {
		const characters = await getCharacters()
		const resultCharacter = characters.find(
			(character) => character.id === submission.resultId,
		)

		if (!resultCharacter) {
			throw new Error("Result character was not found.")
		}

		const presentation = heroPresentation[resultCharacter.id]

		page.classList.add(`result-page--${presentation?.variant ?? "cyan"}`)
		resultContent.replaceChildren(createResultContent(resultCharacter))
	} catch (error) {
		console.error(error)

		resultContent.innerHTML = `
			<p class="result-card__eyebrow">Your result is in</p>
			<h1 class="result-card__title">You are...</h1>
			<p class="result-card__fallback"></p>
		`

		const fallback = resultContent.querySelector<HTMLParagraphElement>(
			".result-card__fallback",
		)

		if (!fallback) {
			throw new Error("Fallback result element was not found.")
		}

		fallback.textContent = submission.resultId
	}
}

function createResultContent(character: Character): HTMLElement {
	const presentation = heroPresentation[character.id]

	const wrapper = document.createElement("div")
	wrapper.className = "result-card__result-layout"

	const visual = document.createElement("div")
	visual.className = "result-card__visual"

	const label = document.createElement("span")
	label.className = "result-card__label"
	label.textContent = presentation?.shortLabel ?? "DEV"

	const visualText = document.createElement("p")
	visualText.className = "result-card__visual-text"
	visualText.textContent = presentation?.visualLabel ?? "Developer mode"

	visual.append(label, visualText)

	const content = document.createElement("div")
	content.className = "result-card__main"

	const eyebrow = document.createElement("p")
	eyebrow.className = "result-card__eyebrow"
	eyebrow.textContent = "Your dev hero is"

	const title = document.createElement("h1")
	title.className = "result-card__title"
	title.textContent = character.name

	const developerType = document.createElement("p")
	developerType.className = "result-card__type"
	developerType.textContent = character.developerType

	const description = document.createElement("p")
	description.className = "result-card__description"
	description.textContent = character.description

	const catchphrase = document.createElement("p")
	catchphrase.className = "result-card__catchphrase"
	catchphrase.textContent = `"${character.catchphrase}"`

	const traits = document.createElement("div")
	traits.className = "result-card__traits"

	traits.append(
		createTraitList("Strengths", character.strengths),
		createTraitList("Watch out for", character.weaknesses),
	)

	content.append(eyebrow, title, developerType, description, catchphrase, traits)
	wrapper.append(visual, content)

	return wrapper
}

function createTraitList(title: string, traits: string[]): HTMLElement {
	const section = document.createElement("section")
	section.className = "result-traits"

	const heading = document.createElement("h2")
	heading.className = "result-traits__title"
	heading.textContent = title

	const list = document.createElement("ul")
	list.className = "result-traits__list"

	for (const trait of traits) {
		const item = document.createElement("li")
		item.textContent = trait
		list.append(item)
	}

	section.append(heading, list)

	return section
}