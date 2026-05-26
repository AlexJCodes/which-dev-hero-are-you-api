import type { Submission, QuizStats } from '../types/quiz.types'

// ----------------------------------------------------------- //
// --------------------- CALCULATE STATS --------------------- //
// ----------------------------------------------------------- //

// STORES IN MEMEMORY FOR NOW
// TODO: REPLACE WITH SQL QUERY LATER

export function calculateStats(submissions: Submission[]): QuizStats {
    const resultCounts: Record<string, number> = {}

    for (const submission of submissions) {
        const resultId = submission.resultId

        if (!resultCounts[resultId]) {
            resultCounts[resultId] = 0
        }

        resultCounts[resultId]++
    }

    let mostCommonResult: string | null = null
    let highestResultCount = 0

    for (const resultId in resultCounts) {
        const currentResultCount = resultCounts[resultId]

        if (currentResultCount > highestResultCount) {
            highestResultCount = currentResultCount
            mostCommonResult = resultId
        }
    }

    return {
        totalSubmissions: submissions.length,
        resultCounts,
        mostCommonResult,
    }
}
