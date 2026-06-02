import { db } from './database'

export async function testDatabaseConnection() {
	try {
		const connection = await db.getConnection()

		console.log('Database connection established.')

		const [rows] = await connection.query('SELECT 1 AS test')

		console.log('Database test query successful.')
		console.log(rows)

		connection.release()
	} catch (error) {
		console.error('Database connection failed.')
		console.error(error)
	}
}
