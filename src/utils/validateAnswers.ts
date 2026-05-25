import { characters } from "../data/characters";

// ----------------------------------------------------------- //
// -------------------- VALIDATE ANSWERS --------------------- //
// ----------------------------------------------------------- //

// Each answer must be a valid character name

export function validateAnswers(answers: string[]): boolean {
    const validCharacterIds = characters.map((character) => character.id)

    return answers.every((answer) => validCharacterIds.includes(answer))
}
