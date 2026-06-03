import type { RowDataPacket } from 'mysql2'

import { db } from '../config/database'
import type { QuizStats } from '../types/quiz.types'

// ----------------------------------------------------------- //
// ------------------ DATABASE ROW TYPES --------------------- //
// ----------------------------------------------------------- //

type TotalSubmissionsRow = RowDataPacket & {
	total_submissions: number
}

type ResultCountRow = RowDataPacket & {
	result_id: string
	result_count: number
}

// ----------------------------------------------------------- //
// ---------------------- GET QUIZ STATS --------------------- //
// ----------------------------------------------------------- //
// This function calculates quiz statistics from MySQL.

// It returns:
// - total number of submissions
// - count per result character
// - most common result

export async function getQuizStats(): Promise<QuizStats> {
	const [totalRows] = await db.query<TotalSubmissionsRow[]>(
		`
		SELECT
			COUNT(*) AS total_submissions
		FROM submissions
		`,
	)

	const [resultCountRows] = await db.query<ResultCountRow[]>(
		`
		SELECT
			result_id,
			COUNT(*) AS result_count
		FROM submissions
		GROUP BY result_id
		ORDER BY result_count DESC
		`,
	)

	const totalSubmissions = totalRows[0]?.total_submissions ?? 0
	const resultCounts: Record<string, number> = {}

	for (const row of resultCountRows) {
		resultCounts[row.result_id] = row.result_count
	}

	const mostCommonResult = resultCountRows[0]?.result_id ?? null

	return {
		totalSubmissions,
		resultCounts,
		mostCommonResult,
	}
}
