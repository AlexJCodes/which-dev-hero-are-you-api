import type {
	CreateSubmissionPayload,
	Submission,
} from "../types/submission.types"

const API_BASE_URL = "http://localhost:3000"

export async function createSubmission(
	payload: CreateSubmissionPayload,
): Promise<Submission> {
	const response = await fetch(`${API_BASE_URL}/submissions`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(payload),
	})

	if (!response.ok) {
		throw new Error("Failed to create submission.")
	}

	return response.json()
}

export async function getSubmissionById(id: string): Promise<Submission> {
	const response = await fetch(`${API_BASE_URL}/submissions/${id}`)

	if (!response.ok) {
		throw new Error("Failed to fetch submission.")
	}

	return response.json()
}
