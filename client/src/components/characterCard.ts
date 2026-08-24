import type { Character } from "../types/character.types"

export function createCharacterCard(character: Character): HTMLElement {
	const article = document.createElement("article")
	article.className = "character-card"

	const title = document.createElement("h2")
	title.className = "character-card__title"
	title.textContent = character.name

	const developerType = document.createElement("p")
	developerType.className = "character-card__type"
	developerType.textContent = character.developerType

	const description = document.createElement("p")
	description.className = "character-card__description"
	description.textContent = character.description

	article.append(title, developerType, description)

	return article
}