import { createSubmission, getSubmissionById } from "./api/submissionsApi"
import { createExplorePage } from "./pages/explorePage"
import { createLandingPage } from "./pages/landingPage"
import { createQuizPage } from "./pages/quizPage"
import { createResultPage } from "./pages/resultPage"
import type { Submission } from "./types/submission.types"

type Screen = "landing" | "quiz" | "result" | "explore"

const SUBMISSION_SEARCH_PARAM = "submission"

let currentScreen: Screen = "landing"
let latestSubmission: Submission | null = null
let playerName = "Anonymous Dev"

function getSubmissionIdFromUrl(): string | null {
	const searchParams = new URLSearchParams(window.location.search)

	return searchParams.get(SUBMISSION_SEARCH_PARAM)
}

function setSubmissionUrl(submissionId: string) {
	const url = new URL(window.location.href)

	url.searchParams.set(SUBMISSION_SEARCH_PARAM, submissionId)
	window.history.replaceState(null, "", url)
}

function clearSubmissionUrl() {
	const url = new URL(window.location.href)

	url.searchParams.delete(SUBMISSION_SEARCH_PARAM)
	window.history.replaceState(null, "", url)
}

function renderLoadingState(app: HTMLDivElement) {
	app.innerHTML = `
		<main class="page">
			<h1>Loading result...</h1>
			<p>Please wait while we load your dev hero.</p>
		</main>
	`
}

function renderResultErrorState(app: HTMLDivElement) {
	app.innerHTML = `
		<main class="page">
			<h1>Could not load result</h1>
			<p>The shared result link could not be found. Please try taking the quiz again.</p>
		</main>
	`
}

export function renderApp(app: HTMLDivElement) {
	function renderCurrentScreen() {
		app.replaceChildren()

		if (currentScreen === "landing") {
			const landingPage = createLandingPage({
				onStartQuiz: (username) => {
					clearSubmissionUrl()
					playerName = username
					currentScreen = "quiz"
					renderCurrentScreen()
				},
				onExploreHeroes: () => {
					currentScreen = "explore"
					renderCurrentScreen()
				},
			})

			app.append(landingPage)

			return
		}

		if (currentScreen === "explore") {
			const explorePage = createExplorePage({
				onBack: () => {
					currentScreen = "landing"
					renderCurrentScreen()
				},
				onStartQuiz: () => {
					clearSubmissionUrl()
					currentScreen = "quiz"
					renderCurrentScreen()
				},
			})

			app.append(explorePage)

			return
		}

		if (currentScreen === "quiz") {
			const quizPage = createQuizPage({
				onQuizComplete: async (answers) => {
					try {
						const submission = await createSubmission({
							username: playerName,
							answers,
						})

						latestSubmission = submission
						setSubmissionUrl(submission.id)
						currentScreen = "result"
						renderCurrentScreen()
					} catch (error) {
						console.error(error)

						app.innerHTML = `
							<main class="page">
								<h1>Could not submit quiz</h1>
								<p>Please make sure the API is running.</p>
							</main>
						`
					}
				},

				onExitQuiz: () => {
					clearSubmissionUrl()
					latestSubmission = null
					playerName = "Anonymous Dev"
					currentScreen = "landing"
					renderCurrentScreen()
				},
			})

			app.append(quizPage)

			return
		}

		if (currentScreen === "result") {
			if (!latestSubmission) {
				currentScreen = "landing"
				renderCurrentScreen()

				return
			}

			const resultPage = createResultPage({
				submission: latestSubmission,
				resultUrl: window.location.href,
				onRetakeQuiz: () => {
					clearSubmissionUrl()
					latestSubmission = null
					currentScreen = "quiz"
					renderCurrentScreen()
				},
				onExploreHeroes: () => {
					clearSubmissionUrl()
					currentScreen = "explore"
					renderCurrentScreen()
				},
			})

			app.append(resultPage)

			return
		}
	}

	async function loadSubmissionFromUrl(submissionId: string) {
		try {
			renderLoadingState(app)

			const submission = await getSubmissionById(submissionId)

			latestSubmission = submission
			playerName = submission.username
			currentScreen = "result"
			renderCurrentScreen()
		} catch (error) {
			console.error(error)

			clearSubmissionUrl()
			renderResultErrorState(app)
		}
	}

	const submissionId = getSubmissionIdFromUrl()

	if (submissionId) {
		loadSubmissionFromUrl(submissionId)

		return
	}

	renderCurrentScreen()
}
