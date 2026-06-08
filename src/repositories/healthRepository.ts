import { db } from '../config/database'

// ----------------------------------------------------------- //
// --------------------- CHECK DATABASE ---------------------- //
// ----------------------------------------------------------- //
// Runs a small test query against the database.
//
// SELECT 1 is a lightweight query that checks if the database connection is working.
export async function checkDatabaseConnection(): Promise<boolean> {
	try {
		await db.query('SELECT 1 AS test')

		return true
	} catch (error) {
		console.error('Health check database error:', error)

		return false
	}
}
