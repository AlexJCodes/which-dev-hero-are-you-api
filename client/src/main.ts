import { renderApp } from "./app"
import "./styles/main.scss"

const app = document.querySelector<HTMLDivElement>("#app")

if (!app) {
	throw new Error("App element was not found.")
}

renderApp(app)