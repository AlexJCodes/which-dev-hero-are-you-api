// ----------------------------------------------------------- //
// -------------------- ENV CONFIG --------------------------- //
// ----------------------------------------------------------- //

function getRequiredEnvValue(key: string): string {
	const value = process.env[key]

	if (!value) {
		throw new Error(`Missing required environment variable: ${key}`)
	}

	return value
}

export const env = {
	port: Number(process.env.PORT) || 3000,
	clientOrigin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',

	dbHost: getRequiredEnvValue('DB_HOST'),
	dbPort: Number(getRequiredEnvValue('DB_PORT')),
	dbUser: getRequiredEnvValue('DB_USER'),
	dbPassword: getRequiredEnvValue('DB_PASSWORD'),
	dbName: getRequiredEnvValue('DB_NAME'),
	dbSslCaPath: getRequiredEnvValue('DB_SSL_CA_PATH'),
}
