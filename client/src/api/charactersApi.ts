import type { Character } from "../types/character.types"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export async function getCharacters(): Promise<Character[]> {
	const response = await fetch(`${API_BASE_URL}/characters`)

	if (!response.ok) {
		throw new Error("Failed to fetch characters.")
	}

	return response.json()
}
