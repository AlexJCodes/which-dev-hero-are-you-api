import fs from 'node:fs'
import mysql from 'mysql2/promise'
import { env } from './env'

function getSslCaCertificate(): string {
	if (env.dbSslCa) {
		return env.dbSslCa.replace(/\\n/g, '\n')
	}

	if (env.dbSslCaPath) {
		return fs.readFileSync(env.dbSslCaPath, 'utf8')
	}

	throw new Error('Missing DB_SSL_CA or DB_SSL_CA_PATH environment variable.')
}

const sslCaCertificate = getSslCaCertificate()

export const db = mysql.createPool({
	host: env.dbHost,
	port: env.dbPort,
	user: env.dbUser,
	password: env.dbPassword,
	database: env.dbName,

	ssl: {
		ca: sslCaCertificate,
		rejectUnauthorized: true,
	},

	connectionLimit: 10,
})
