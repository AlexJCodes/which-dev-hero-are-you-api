import type { ResultSetHeader, RowDataPacket } from 'mysql2'

import { db } from '../config/database'

// ----------------------------------------------------------- //
// --------------------- COMMENT TYPES ----------------------- //
// ----------------------------------------------------------- //

export type CharacterComment = {
	id: number
	characterId: string
	content: string
	author: string
	createdAt: string
}

export type CreateCharacterCommentInput = {
	characterId: string
	content: string
	author: string
}

export type UpdateCharacterCommentInput = {
	content?: string
	author?: string
}

// ----------------------------------------------------------- //
// ------------------ DATABASE ROW TYPE ---------------------- //
// ----------------------------------------------------------- //

type CharacterCommentRow = RowDataPacket & {
	id: number
	character_id: string
	content: string
	author: string
	created_at: Date
}

// ----------------------------------------------------------- //
// ------------------ MAP DATABASE ROW ----------------------- //
// ----------------------------------------------------------- //

function mapCommentRowToComment(row: CharacterCommentRow): CharacterComment {
	return {
		id: row.id,
		characterId: row.character_id,
		content: row.content,
		author: row.author,
		createdAt: row.created_at.toISOString(),
	}
}

// ----------------------------------------------------------- //
// --------------- GET COMMENTS BY CHARACTER ID -------------- //
// ----------------------------------------------------------- //

export async function getCommentsByCharacterId(characterId: string): Promise<CharacterComment[]> {
	const [rows] = await db.query<CharacterCommentRow[]>(
		`
		SELECT
			id,
			character_id,
			content,
			author,
			created_at
		FROM character_comments
		WHERE character_id = ?
		ORDER BY created_at DESC
		`,
		[characterId],
	)

	return rows.map(mapCommentRowToComment)
}

// ----------------------------------------------------------- //
// -------------------- GET COMMENT BY ID -------------------- //
// ----------------------------------------------------------- //

export async function getCommentById(id: number): Promise<CharacterComment | undefined> {
	const [rows] = await db.query<CharacterCommentRow[]>(
		`
		SELECT
			id,
			character_id,
			content,
			author,
			created_at
		FROM character_comments
		WHERE id = ?
		`,
		[id],
	)

	const commentRow = rows[0]

	if (!commentRow) {
		return undefined
	}

	return mapCommentRowToComment(commentRow)
}

// ----------------------------------------------------------- //
// ---------------------- CREATE COMMENT --------------------- //
// ----------------------------------------------------------- //

export async function createComment(
	commentInput: CreateCharacterCommentInput,
): Promise<CharacterComment> {
	const [result] = await db.query<ResultSetHeader>(
		`
		INSERT INTO character_comments (
			character_id,
			content,
			author
		) VALUES (?, ?, ?)
		`,
		[commentInput.characterId, commentInput.content, commentInput.author],
	)

	const createdComment = await getCommentById(result.insertId)

	if (!createdComment) {
		throw new Error(`Created comment with id ${result.insertId} could not be found`)
	}

	return createdComment
}

// ----------------------------------------------------------- //
// ---------------------- UPDATE COMMENT --------------------- //
// ----------------------------------------------------------- //

export async function updateComment(
	id: number,
	commentInput: UpdateCharacterCommentInput,
): Promise<CharacterComment | undefined> {
	const existingComment = await getCommentById(id)

	if (!existingComment) {
		return undefined
	}

	const updatedContent = commentInput.content ?? existingComment.content
	const updatedAuthor = commentInput.author ?? existingComment.author

	const [result] = await db.query<ResultSetHeader>(
		`
		UPDATE character_comments
		SET
			content = ?,
			author = ?
		WHERE id = ?
		`,
		[updatedContent, updatedAuthor, id],
	)

	if (result.affectedRows === 0) {
		return undefined
	}

	return getCommentById(id)
}

// ----------------------------------------------------------- //
// ---------------------- DELETE COMMENT --------------------- //
// ----------------------------------------------------------- //

export async function deleteComment(id: number): Promise<boolean> {
	const [result] = await db.query<ResultSetHeader>(
		`
		DELETE FROM character_comments
		WHERE id = ?
		`,
		[id],
	)

	return result.affectedRows > 0
}
