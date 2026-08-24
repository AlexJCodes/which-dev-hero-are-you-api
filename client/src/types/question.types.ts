export type AnswerOption = {
	id: string
	text: string
	characterId: string
}

export type Question = {
	id: string
	text: string
	options: AnswerOption[]
}