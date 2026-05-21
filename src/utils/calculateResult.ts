// Count how many times characterId appears in the answers array,
// and return the character with the highest count

export function calculateResult(answers: string[]): string {
    // counting: <characterId, count>
    const scores: Record<string, number> = {}

    for (const characterId of answers) {

        // if characterId does not exist in the count,
        // start at 0.
        if (!scores[characterId]) {
            scores[characterId] = 0
        }

        // 1 point to the selected character answer.
        scores[characterId]++
    }

    //Find the characterId with the highest score:
    let winningCharacterId = ""
    let highestScore = 0

    for (const characterId in scores) {
        if (scores[characterId] > highestScore) {
            highestScore = scores[characterId]
            winningCharacterId = characterId
        }
    }

    // Return the winner:
    return winningCharacterId
}
