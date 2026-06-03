import type { RowDataPacket } from 'mysql2'

import { db } from '../config/database'
import type { Submission } from '../types/quiz.types'

// ----------------------------------------------------------- //
// ------------------ DATABASE ROW TYPE ---------------------- //
// ----------------------------------------------------------- //
// This type describes how a submission row looks when it comes
// back from MySQL.
//
// MySQL uses snake_case column names.
// Our TypeScript app uses camelCase.
type SubmissionRow = RowDataPacket & {
	id: string
	username: string
	answers: string[] | string
	result_id: string
	created_at: Date
}

// ----------------------------------------------------------- //
// ------------------ MAP DATABASE ROW ----------------------- //
// ----------------------------------------------------------- //

function mapSubmissionRowToSubmission(row: SubmissionRow): Submission {
	return {
		id: row.id,
		username: row.username,
		answers: typeof row.answers === 'string' ? JSON.parse(row.answers) : row.answers,
		resultId: row.result_id,
		createdAt: row.created_at.toISOString(),
	}
}

// ----------------------------------------------------------- //
// ------------------ GET ALL SUBMISSIONS -------------------- //
// ----------------------------------------------------------- //

export async function getAllSubmissions(): Promise<Submission[]> {
	const [rows] = await db.query<SubmissionRow[]>(
		`
		SELECT
			id,
			username,
			answers,
			result_id,
			created_at
		FROM submissions
		ORDER BY created_at DESC
		`,
	)

	return rows.map(mapSubmissionRowToSubmission)
}

// ----------------------------------------------------------- //
// ------------------ GET SUBMISSION BY ID ------------------- //
// ----------------------------------------------------------- //

export async function getSubmissionById(id: string): Promise<Submission | undefined> {
	const [rows] = await db.query<SubmissionRow[]>(
		`
		SELECT
			id,
			username,
			answers,
			result_id,
			created_at
		FROM submissions
		WHERE id = ?
		`,
		[id],
	)

	const submissionRow = rows[0]

	if (!submissionRow) {
		return undefined
	}

	return mapSubmissionRowToSubmission(submissionRow)
}

// ----------------------------------------------------------- //
// -------------------- CREATE SUBMISSION -------------------- //
// ----------------------------------------------------------- //

export async function createSubmission(submission: Submission): Promise<Submission> {
	await db.query(
		`
		INSERT INTO submissions (
			id,
			username,
			answers,
			result_id
		) VALUES (?, ?, ?, ?)
		`,
		[submission.id, submission.username, JSON.stringify(submission.answers), submission.resultId],
	)

	return submission
}

// ----------------------------------------------------------- //
// -------------------- UPDATE SUBMISSION -------------------- //
// ----------------------------------------------------------- //

export async function updateSubmission(
	id: string,
	updatedSubmission: Submission,
): Promise<Submission | undefined> {
	const [result] = await db.query(
		`
		UPDATE submissions
		SET
			username = ?,
			answers = ?,
			result_id = ?
		WHERE id = ?
		`,
		[
			updatedSubmission.username,
			JSON.stringify(updatedSubmission.answers),
			updatedSubmission.resultId,
			id,
		],
	)

	const updateResult = result as { affectedRows: number }

	if (updateResult.affectedRows === 0) {
		return undefined
	}

	return getSubmissionById(id)
}

// ----------------------------------------------------------- //
// -------------------- DELETE SUBMISSION -------------------- //
// ----------------------------------------------------------- //

export async function deleteSubmission(id: string): Promise<boolean> {
	const [result] = await db.query(
		`
		DELETE FROM submissions
		WHERE id = ?
		`,
		[id],
	)

	const deleteResult = result as { affectedRows: number }

	return deleteResult.affectedRows > 0
}
