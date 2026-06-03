import type { RowDataPacket } from 'mysql2'

import { db } from '../config/database'
import type { AnswerOption, Question } from '../types/quiz.types'

// ----------------------------------------------------------- //
// ------------------ DATABASE ROW TYPES --------------------- //
// ----------------------------------------------------------- //

type QuestionRow = RowDataPacket & {
	id: string
	text: string
	sort_order: number
}

type AnswerOptionRow = RowDataPacket & {
	id: string
	question_id: string
	text: string
	character_id: string
}

// ----------------------------------------------------------- //
// ------------------- GET ALL QUESTIONS --------------------- //
// ----------------------------------------------------------- //

export async function getAllQuestions(): Promise<Question[]> {
	const [questionRows] = await db.query<QuestionRow[]>(
		`
		SELECT
			id,
			text,
			sort_order
		FROM questions
		ORDER BY sort_order ASC
		`,
	)

	const [answerOptionRows] = await db.query<AnswerOptionRow[]>(
		`
		SELECT
			id,
			question_id,
			text,
			character_id
		FROM answer_options
		ORDER BY id ASC
		`,
	)

	const questions = questionRows.map((questionRow) => {
		const options = getOptionsForQuestion(questionRow.id, answerOptionRows)

		return {
			id: questionRow.id,
			text: questionRow.text,
			options,
		}
	})

	return questions
}

// ----------------------------------------------------------- //
// ---------------- GET OPTIONS FOR QUESTION ----------------- //
// ----------------------------------------------------------- //

function getOptionsForQuestion(
	questionId: string,
	answerOptionRows: AnswerOptionRow[],
): AnswerOption[] {
	return answerOptionRows
		.filter((answerOptionRow) => answerOptionRow.question_id === questionId)
		.map((answerOptionRow) => {
			return {
				id: answerOptionRow.id,
				text: answerOptionRow.text,
				characterId: answerOptionRow.character_id,
			}
		})
}

// ----------------------------------------------------------- //
// -------------------- GET QUESTION BY ID ------------------- //
// ----------------------------------------------------------- //

export async function getQuestionById(id: string): Promise<Question | undefined> {
	const [questionRows] = await db.query<QuestionRow[]>(
		`
		SELECT
			id,
			text,
			sort_order
		FROM questions
		WHERE id = ?
		`,
		[id],
	)

	const questionRow = questionRows[0]

	if (!questionRow) {
		return undefined
	}

	const [answerOptionRows] = await db.query<AnswerOptionRow[]>(
		`
		SELECT
			id,
			question_id,
			text,
			character_id
		FROM answer_options
		WHERE question_id = ?
		ORDER BY id ASC
		`,
		[id],
	)

	return {
		id: questionRow.id,
		text: questionRow.text,
		options: answerOptionRows.map((answerOptionRow) => {
			return {
				id: answerOptionRow.id,
				text: answerOptionRow.text,
				characterId: answerOptionRow.character_id,
			}
		}),
	}
}
