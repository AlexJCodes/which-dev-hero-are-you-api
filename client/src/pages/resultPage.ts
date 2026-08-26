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
			<p class="result-card__eyebrow">Your result is in</p>
			<h1 class="result-card__title">You are...</h1>
			<p class="result-card__result"></p>

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

	const resultText = page.querySelector<HTMLParagraphElement>(
		".result-card__result",
	)
	const retakeButton = page.querySelector<HTMLButtonElement>(
		'[data-action="retake"]',
	)
	const exploreButton = page.querySelector<HTMLButtonElement>(
		'[data-action="explore"]',
	)

	if (!resultText || !retakeButton || !exploreButton) {
		throw new Error("Result page elements were not found.")
	}

	resultText.textContent = options.submission.resultId

	retakeButton.addEventListener("click", options.onRetakeQuiz)
	exploreButton.addEventListener("click", options.onExploreHeroes)

	return page
}