import { getCharacterIds } from '../repositories/charactersRepository'

// ----------------------------------------------------------- //
// -------------------- VALIDATE ANSWERS --------------------- //
// ----------------------------------------------------------- //
// This function checks if the answers array contains valid data.
//
// Each answer must match an existing character id from MySQL.
export async function validateAnswers(answers: string[]): Promise<boolean> {
	const validCharacterIds = await getCharacterIds()

	return answers.every((answer) => validCharacterIds.includes(answer))
}
