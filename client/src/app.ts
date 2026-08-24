import { createExplorePage } from "./pages/explorePage"
import { createLandingPage } from "./pages/landingPage"

type Screen = "landing" | "quiz" | "result" | "explore"

let currentScreen: Screen = "landing"

export function renderApp(app: HTMLDivElement) {
	function renderCurrentScreen() {
		app.replaceChildren()

		if (currentScreen === "landing") {
			const landingPage = createLandingPage({
				onStartQuiz: () => {
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
			app.innerHTML = `
				<main class="page">
					<h1>Quiz coming next</h1>
				</main>
			`

			return
		}

		if (currentScreen === "result") {
			app.innerHTML = `
				<main class="page">
					<h1>Result coming next</h1>
				</main>
			`
		}
	}

	renderCurrentScreen()
}