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
		}

		if (currentScreen === "quiz") {
			app.innerHTML = `
				<main class="page">
					<h1>Quiz coming next</h1>
				</main>
			`
		}

		if (currentScreen === "explore") {
			app.innerHTML = `
				<main class="page">
					<h1>Explore heroes coming next</h1>
				</main>
			`
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