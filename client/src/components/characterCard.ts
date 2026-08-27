import { heroPresentation } from "../data/heroPresentation"
import type { Character } from "../types/character.types"

export function createCharacterCard(character: Character): HTMLElement {
	const presentation = heroPresentation[character.id]

	const article = document.createElement("article")
	article.className = `character-card character-card--${
		presentation?.variant ?? "cyan"
	}`

	const visual = document.createElement("div")
	visual.className = "character-card__visual"

	const label = document.createElement("span")
	label.className = "character-card__label"
	label.textContent = presentation?.shortLabel ?? "DEV"

	const visualText = document.createElement("p")
	visualText.className = "character-card__visual-text"
	visualText.textContent = presentation?.visualLabel ?? "Developer mode"

	visual.append(label, visualText)

	const content = document.createElement("div")
	content.className = "character-card__content"

	const type = document.createElement("p")
	type.className = "character-card__type"
	type.textContent = character.developerType

	const title = document.createElement("h2")
	title.className = "character-card__title"
	title.textContent = character.name

	const description = document.createElement("p")
	description.className = "character-card__description"
	description.textContent = character.description

	const catchphrase = document.createElement("p")
	catchphrase.className = "character-card__catchphrase"
	catchphrase.textContent = `"${character.catchphrase}"`

	content.append(type, title, description, catchphrase)
	article.append(visual, content)

	return article
}
