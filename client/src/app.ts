import { createSubmission } from "./api/submissionsApi"
import { createExplorePage } from "./pages/explorePage"
import { createLandingPage } from "./pages/landingPage"
import { createQuizPage } from "./pages/quizPage"
import { createResultPage } from "./pages/resultPage"
import type { Submission } from "./types/submission.types"

type Screen = "landing" | "quiz" | "result" | "explore"

let currentScreen: Screen = "landing"
let latestSubmission: Submission | null = null
let playerName = "Anonymous Dev"

export function renderApp(app: HTMLDivElement) {
	function renderCurrentScreen() {
		app.replaceChildren()

		if (currentScreen === "landing") {
			const landingPage = createLandingPage({
				onStartQuiz: (username) => {
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
				onRetakeQuiz: () => {
					latestSubmission = null
					currentScreen = "quiz"
					renderCurrentScreen()
				},
				onExploreHeroes: () => {
					currentScreen = "explore"
					renderCurrentScreen()
				},
			})

			app.append(resultPage)

			return
		}
	}

	renderCurrentScreen()
}