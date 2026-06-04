import { getCharacterIds } from '../repositories/charactersRepository'

// ----------------------------------------------------------- //
// -------------------- VALIDATE ANSWERS --------------------- //
// ----------------------------------------------------------- //

export async function validateAnswers(answers: string[]): Promise<boolean> {
	const validCharacterIds = await getCharacterIds()

	return answers.every((answer) => validCharacterIds.includes(answer))
}
