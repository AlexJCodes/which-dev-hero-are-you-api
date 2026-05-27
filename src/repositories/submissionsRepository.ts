import { submissions } from '../data/submissions'
import type { Submission } from '../types/quiz.types'

// ----------------------------------------------------------- //
// ---------------- SUBMISSIONS REPOSITORY ------------------- //
// ----------------------------------------------------------- //

// The repository is responsible for data access.

// For now, it uses an in-memory array.
// TODO: Connect MySQL database later

export async function getAllSubmissions(): Promise<Submission[]> {
	return submissions
}

export async function getSubmissionById(id: string): Promise<Submission | undefined> {
	return submissions.find((submission) => submission.id === id)
}

export async function createSubmission(submission: Submission): Promise<Submission> {
	submissions.push(submission)

	return submission
}

export async function updateSubmission(
	id: string,
	updatedSubmission: Submission,
): Promise<Submission | undefined> {
	const submissionIndex = submissions.findIndex((submission) => submission.id === id)

	if (submissionIndex === -1) {
		return undefined
	}

	submissions[submissionIndex] = updatedSubmission

	return updatedSubmission
}

export async function deleteSubmission(id: string): Promise<boolean> {
	const submissionIndex = submissions.findIndex((submission) => submission.id === id)

	if (submissionIndex === -1) {
		return false
	}

	submissions.splice(submissionIndex, 1)
	return true
}
