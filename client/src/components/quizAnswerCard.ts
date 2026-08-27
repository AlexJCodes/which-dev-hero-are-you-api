import type { AnswerOption } from "../types/question.types"

type QuizAnswerCardOptions = {
	answer: AnswerOption
	letter: string
	isSelected: boolean
	onSelect: () => void
}

export function createQuizAnswerCard(
	options: QuizAnswerCardOptions,
): HTMLButtonElement {
	const button = document.createElement("button")

	button.className = options.isSelected
		? "quiz-answer-card quiz-answer-card--selected"
		: "quiz-answer-card"

	button.type = "button"

	const letter = document.createElement("span")
	letter.className = "quiz-answer-card__letter"
	letter.textContent = options.letter

	const text = document.createElement("span")
	text.className = "quiz-answer-card__text"
	text.textContent = options.answer.text

	const indicator = document.createElement("span")
	indicator.className = "quiz-answer-card__indicator"
	indicator.setAttribute("aria-hidden", "true")

	button.append(letter, text, indicator)
	button.addEventListener("click", options.onSelect)

	return button
}