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
// ------------------- GET ALL CHARACTERS -------------------- //
// ----------------------------------------------------------- //

// This function fetches all characters from the MySQL database.

export async function getAllCharacters(): Promise<Character[]> {
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
		ORDER BY name ASC
		`,
	)

	return rows.map(mapCharacterRowToCharacter)
}
