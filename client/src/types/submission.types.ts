export type Submission = {
	id: string
	username: string
	answers: string[]
	resultId: string
	createdAt: string
}

export type CreateSubmissionPayload = {
	username: string
	answers: string[]
}