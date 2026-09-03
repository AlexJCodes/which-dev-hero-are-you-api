import { getQuestions } from "../api/questionsApi"
import { createProgressBar } from "../components/progressBar"
import { createQuizAnswerCard } from "../components/quizAnswerCard"
import type { AnswerOption, Question } from "../types/question.types"
import { createStatusMessage } from "../components/statusMessage"

type QuizPageOptions = {
	onQuizComplete: (answers: string[]) => void
	onExitQuiz: () => void
}

const answerLetters = ["A", "B", "C", "D", "E", "F"]

export function createQuizPage(options: QuizPageOptions): HTMLElement {
	const page = document.createElement("main")
	page.className = "quiz-page"

	page.innerHTML = `
		<button
			class="quiz-page__exit"
			type="button"
			data-action="exit-quiz"
			aria-label="Exit quiz"
		>
			×
		</button>

		<section class="quiz-shell">
			<p class="quiz-page__status">Loading questions...</p>
		</section>
	`

	const exitButton = page.querySelector<HTMLButtonElement>(
		'[data-action="exit-quiz"]',
	)
	const quizShell = page.querySelector<HTMLElement>(".quiz-shell")

	if (!exitButton || !quizShell) {
		throw new Error("Quiz page elements were not found.")
	}

	exitButton.addEventListener("click", options.onExitQuiz)

	renderQuiz(quizShell, options)

	return page
}

async function renderQuiz(quizShell: HTMLElement, options: QuizPageOptions) {
	quizShell.replaceChildren(
		createStatusMessage({
			variant: "loading",
			title: "Loading quiz...",
			message: "Preparing your developer personality test.",
		}),
	)

	try {
		const questions = await getQuestions()

		if (questions.length === 0) {
			quizShell.replaceChildren(
				createStatusMessage({
					variant: "empty",
					title: "No questions found",
					message: "The API responded, but there are no quiz questions yet.",
					actionLabel: "Back to start",
					onAction: options.onExitQuiz,
				}),
			)

			return
		}

		let currentQuestionIndex = 0
		const selectedAnswers: string[] = []

		function renderCurrentQuestion() {
			const currentQuestion = questions[currentQuestionIndex]
			let selectedAnswer: AnswerOption | null = null

			if (!currentQuestion) {
				throw new Error("Current question was not found.")
			}

			quizShell.replaceChildren(
				createQuestionView({
					question: currentQuestion,
					currentQuestionIndex,
					totalQuestions: questions.length,
					selectedAnswer,
					onSelectAnswer: (answer) => {
						selectedAnswer = answer
						renderSelectedState()
					},
					onContinue: () => {
						if (!selectedAnswer) {
							return
						}

						selectedAnswers[currentQuestionIndex] = selectedAnswer.characterId

						if (currentQuestionIndex < questions.length - 1) {
							currentQuestionIndex++
							renderCurrentQuestion()
							return
						}

						options.onQuizComplete(selectedAnswers)
					},
				}),
			)

			function renderSelectedState() {
				quizShell.replaceChildren(
					createQuestionView({
						question: currentQuestion,
						currentQuestionIndex,
						totalQuestions: questions.length,
						selectedAnswer,
						onSelectAnswer: (answer) => {
							selectedAnswer = answer
							renderSelectedState()
						},
						onContinue: () => {
							if (!selectedAnswer) {
								return
							}

							selectedAnswers[currentQuestionIndex] = selectedAnswer.characterId

							if (currentQuestionIndex < questions.length - 1) {
								currentQuestionIndex++
								renderCurrentQuestion()
								return
							}

							options.onQuizComplete(selectedAnswers)
						},
					}),
				)
			}
		}

		renderCurrentQuestion()
	} catch (error) {
		console.error(error)

		quizShell.replaceChildren(
			createStatusMessage({
				variant: "error",
				title: "Quiz is offline",
				message: "The questions could not be loaded right now.",
				actionLabel: "Try again",
				onAction: () => renderQuiz(quizShell, options),
			}),
		)
	}
}

type QuestionViewOptions = {
	question: Question
	currentQuestionIndex: number
	totalQuestions: number
	selectedAnswer: AnswerOption | null
	onSelectAnswer: (answer: AnswerOption) => void
	onContinue: () => void
}

function createQuestionView(options: QuestionViewOptions): HTMLElement {
	const section = document.createElement("section")
	section.className = "quiz-shell"

	const progressBar = createProgressBar({
		currentIndex: options.currentQuestionIndex,
		total: options.totalQuestions,
	})

	const questionHeader = document.createElement("header")
	questionHeader.className = "quiz-question"

	const eyebrow = document.createElement("p")
	eyebrow.className = "quiz-question__eyebrow"
	eyebrow.textContent = "Choose your coding instinct"

	const title = document.createElement("h1")
	title.className = "quiz-question__title"
	title.textContent = options.question.text

	questionHeader.append(eyebrow, title)

	const answers = document.createElement("div")
	answers.className = "quiz-answers"

	options.question.options.forEach((answer, index) => {
		const card = createQuizAnswerCard({
			answer,
			letter: answerLetters[index] ?? "?",
			isSelected: options.selectedAnswer?.id === answer.id,
			onSelect: () => options.onSelectAnswer(answer),
		})

		answers.append(card)
	})

	const footer = document.createElement("footer")
	footer.className = "quiz-footer"

	const continueButton = document.createElement("button")
	continueButton.className = "quiz-footer__button"
	continueButton.type = "button"
	continueButton.disabled = !options.selectedAnswer
	continueButton.textContent =
		options.currentQuestionIndex === options.totalQuestions - 1
			? "Reveal my hero"
			: "Next question"

	continueButton.addEventListener("click", options.onContinue)

	const remainingQuestions =
		options.totalQuestions - options.currentQuestionIndex - 1

	const helperText = document.createElement("p")
	helperText.className = "quiz-footer__helper"
	helperText.textContent =
		remainingQuestions === 0
			? "Last one."
			: `${remainingQuestions} question${
					remainingQuestions === 1 ? "" : "s"
				} remaining`

	footer.append(continueButton, helperText)

	section.append(progressBar, questionHeader, answers, footer)

	return section
}
