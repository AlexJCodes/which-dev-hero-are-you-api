import type { Question } from "../types/question.types"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export async function getQuestions(): Promise<Question[]> {
	const response = await fetch(`${API_BASE_URL}/questions`)

	if (!response.ok) {
		throw new Error("Failed to fetch questions.")
	}

	return response.json()
}
