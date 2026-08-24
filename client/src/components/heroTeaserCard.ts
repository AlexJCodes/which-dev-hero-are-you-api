import { heroPresentation } from "../data/heroPresentation"

export type HeroTeaser = {
	id: string
	name: string
	developerType: string
}

export function createHeroTeaserCard(hero: HeroTeaser): HTMLElement {
	const presentation = heroPresentation[hero.id]

	const article = document.createElement("article")
	article.className = `landing-teaser-card landing-teaser-card--${
		presentation?.variant ?? "cyan"
	}`

	const label = document.createElement("p")
	label.className = "landing-teaser-card__label"
	label.textContent = presentation?.shortLabel ?? "DEV"

	const title = document.createElement("h2")
	title.className = "landing-teaser-card__title"
	title.textContent = hero.name

	const text = document.createElement("p")
	text.className = "landing-teaser-card__text"
	text.textContent = hero.developerType

	article.append(label, title, text)

	return article
}