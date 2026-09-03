import { getCharacters } from "../api/charactersApi"
import { heroPresentation } from "../data/heroPresentation"
import type { Character } from "../types/character.types"
import type { Submission } from "../types/submission.types"
import { createStatusMessage } from "../components/statusMessage"

type ResultPageOptions = {
	submission: Submission
	resultUrl: string
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

	renderResult(page, resultContent, options.submission, options.resultUrl)

	return page
}

async function renderResult(
	page: HTMLElement,
	resultContent: HTMLElement,
	submission: Submission,
	resultUrl: string,
) {
	resultContent.replaceChildren(
		createStatusMessage({
			variant: "loading",
			title: "Loading hero...",
			message: "Matching your saved result with the right developer hero.",
		}),
	)

	try {
		const characters = await getCharacters()
		const resultCharacter = characters.find(
			(character) => character.id === submission.resultId,
		)

		if (!resultCharacter) {
			resultContent.replaceChildren(
				createStatusMessage({
					variant: "error",
					title: "Hero not found",
					message:
						"The result was loaded, but the matching developer hero could not be found.",
				}),
			)

			return
		}

		const presentation = heroPresentation[resultCharacter.id]

		page.classList.add(`result-page--${presentation?.variant ?? "cyan"}`)

		resultContent.replaceChildren(
			createResultContent(resultCharacter, submission, resultUrl),
		)
	} catch (error) {
		console.error(error)

		resultContent.replaceChildren(
			createStatusMessage({
				variant: "error",
				title: "Could not load hero",
				message: "The result page could not load the developer hero data.",
			}),
		)
	}
}

function createResultContent(
	character: Character,
	submission: Submission,
	resultUrl: string,
): HTMLElement {
	const wrapper = document.createElement("div")
	wrapper.className = "result-card__result-layout"

	const visual = document.createElement("div")
	visual.className = "result-card__visual"

	const image = document.createElement("img")
	image.className = "result-card__image"
	image.src = character.imageUrl
	image.alt = character.name

	const copyButton = document.createElement("button")
	copyButton.className = "result-card__copy-button"
	copyButton.type = "button"
	copyButton.textContent = "Copy result link"

	copyButton.addEventListener("click", async () => {
		try {
			await navigator.clipboard.writeText(resultUrl)

			copyButton.textContent = "Link copied"

			setTimeout(() => {
				copyButton.textContent = "Copy result link"
			}, 2000)
		} catch (error) {
			console.error(error)

			copyButton.textContent = "Could not copy link"
		}
	})

	visual.append(image, copyButton)

	const content = document.createElement("div")
	content.className = "result-card__main"

	const eyebrow = document.createElement("p")
	eyebrow.className = "result-card__eyebrow"
	eyebrow.textContent = `${submission.username}, your dev hero is`

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

	content.append(
		eyebrow,
		title,
		developerType,
		description,
		catchphrase,
		traits,
	)

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
