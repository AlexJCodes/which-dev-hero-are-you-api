import type { RowDataPacket } from 'mysql2'

import { db } from '../config/database'
import type { Character } from '../types/quiz.types'
import type { CharacterComment } from './commentsRepository'

// ----------------------------------------------------------- //
// ------------------ DATABASE ROW TYPE ---------------------- //
// ----------------------------------------------------------- //

// MySQL uses snake_case column names, while our TypeScript app
// uses camelCase.

type CharacterRow = RowDataPacket & {
	id: string
	name: string
	developer_type: string
	description: string
	strengths: string[] | string
	weaknesses: string[] | string
	catchphrase: string
	image_url: string
}

// ----------------------------------------------------------- //
// ----------------- MAP DATABASE ROW ------------------------ //
// ----------------------------------------------------------- //

// This function converts a MySQL row into the Character type

function mapCharacterRowToCharacter(row: CharacterRow): Character {
	return {
		id: row.id,
		name: row.name,
		developerType: row.developer_type,
		description: row.description,
		strengths: typeof row.strengths === 'string' ? JSON.parse(row.strengths) : row.strengths,
		weaknesses: typeof row.weaknesses === 'string' ? JSON.parse(row.weaknesses) : row.weaknesses,
		catchphrase: row.catchphrase,
		imageUrl: row.image_url,
	}
}

// ----------------------------------------------------------- //
// -------------------- DATABASE ROW ID ---------------------- //
// ----------------------------------------------------------- //

type CharacterIdRow = RowDataPacket & {
	id: string
}

// ----------------------------------------------------------- //
// ------------------- GET ALL CHARACTERS -------------------- //
// ----------------------------------------------------------- //

export async function getAllCharacters(options: GetCharactersOptions = {}): Promise<Character[]> {
	const queryValues: string[] = []

	let sql = `
		SELECT
			id,
			name,
			developer_type,
			description,
			strengths,
			weaknesses,
			catchphrase,
			image_url
		FROM characters
	`

	if (options.search) {
		sql += `
			WHERE
				name LIKE ?
				OR developer_type LIKE ?
				OR description LIKE ?
		`

		const searchPattern = `%${options.search}%`

		queryValues.push(searchPattern, searchPattern, searchPattern)
	}

	const sortColumn = options.sort === 'name' ? 'name' : 'name'
	const sortOrder = options.order === 'desc' ? 'DESC' : 'ASC'

	sql += `
		ORDER BY ${sortColumn} ${sortOrder}
	`

	const [rows] = await db.query<CharacterRow[]>(sql, queryValues)

	return rows.map(mapCharacterRowToCharacter)
}

// Validation function to check if the provided character IDs are valid.

export async function getCharacterIds(): Promise<string[]> {
	const [rows] = await db.query<CharacterIdRow[]>(
		`
		SELECT id
		FROM characters
		`,
	)

	return rows.map((row) => row.id)
}

// ----------------------------------------------------------- //
// ------------------- GET CHARACTER BY ID ------------------- //
// ----------------------------------------------------------- //
// Fetches one character by id.

// The id comes from req.params, so we use a placeholder
// to protect against SQL injection.
export async function getCharacterById(id: string): Promise<Character | undefined> {
	const [rows] = await db.query<CharacterRow[]>(
		`
		SELECT
			id,
			name,
			developer_type,
			description,
			strengths,
			weaknesses,
			catchphrase,
			image_url
		FROM characters
		WHERE id = ?
		`,
		[id],
	)

	const characterRow = rows[0]

	if (!characterRow) {
		return undefined
	}

	return mapCharacterRowToCharacter(characterRow)
}

// ----------------------------------------------------------- //
// ------------------- SEARCH AND FILTER --------------------- //
// ----------------------------------------------------------- //

type GetCharactersOptions = {
	search?: string
	sort?: 'name'
	order?: 'asc' | 'desc'
}

// ----------------------------------------------------------- //
// ---------------- CHARACTER WITH COMMENTS ------------------ //
// ----------------------------------------------------------- //

export type CharacterWithComments = Character & {
	comments: CharacterComment[]
}

type CharacterWithCommentRow = RowDataPacket & {
	id: string
	name: string
	developer_type: string
	description: string
	strengths: string[] | string
	weaknesses: string[] | string
	catchphrase: string
	image_url: string
	comment_id: number | null
	comment_character_id: string | null
	comment_content: string | null
	comment_author: string | null
	comment_created_at: Date | null
}

// ----------------------------------------------------------- //
// ------------- GET CHARACTER WITH COMMENTS BY ID ----------- //
// ----------------------------------------------------------- //

// LEFT JOIN is used so the character is returned even if it
// has no comments.
export async function getCharacterWithCommentsById(
	id: string,
): Promise<CharacterWithComments | undefined> {
	const [rows] = await db.query<CharacterWithCommentRow[]>(
		`
		SELECT
			characters.id,
			characters.name,
			characters.developer_type,
			characters.description,
			characters.strengths,
			characters.weaknesses,
			characters.catchphrase,
			characters.image_url,

			character_comments.id AS comment_id,
			character_comments.character_id AS comment_character_id,
			character_comments.content AS comment_content,
			character_comments.author AS comment_author,
			character_comments.created_at AS comment_created_at
		FROM characters
		LEFT JOIN character_comments
			ON characters.id = character_comments.character_id
		WHERE characters.id = ?
		ORDER BY character_comments.created_at DESC
		`,
		[id],
	)

	const firstRow = rows[0]

	if (!firstRow) {
		return undefined
	}

	const character = mapCharacterRowToCharacter(firstRow)

	const comments: CharacterComment[] = rows.flatMap((row) => {
		if (
			row.comment_id === null ||
			row.comment_character_id === null ||
			row.comment_content === null ||
			row.comment_author === null ||
			row.comment_created_at === null
		) {
			return []
		}

		return [
			{
				id: row.comment_id,
				characterId: row.comment_character_id,
				content: row.comment_content,
				author: row.comment_author,
				createdAt: row.comment_created_at.toISOString(),
			},
		]
	})

	return {
		...character,
		comments,
	}
}
