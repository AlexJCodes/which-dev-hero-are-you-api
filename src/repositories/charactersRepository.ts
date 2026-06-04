import type { RowDataPacket } from 'mysql2'

import { db } from '../config/database'
import type { Character } from '../types/quiz.types'

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
