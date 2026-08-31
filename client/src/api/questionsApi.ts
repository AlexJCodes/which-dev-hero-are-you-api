import type { Question } from "../types/question.types"

const API_BASE_URL = "http://localhost:3000"

export async function getQuestions(): Promise<Question[]> {
	const response = await fetch(`${API_BASE_URL}/questions`)

	if (!response.ok) {
		throw new Error("Failed to fetch questions.")
	}

	return response.json()
}
