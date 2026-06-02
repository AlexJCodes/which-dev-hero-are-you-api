// ----------------------------------------------------------- //
// -------------------- ENV CONFIG --------------------------- //
// ----------------------------------------------------------- //

export const env = {
	port: Number(process.env.PORT) || 3000,
	clientOrigin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',

	dbHost: process.env.DB_HOST,
	dbPort: Number(process.env.DB_PORT),
	dbUser: process.env.DB_USER,
	dbPassword: process.env.DB_PASSWORD,
	dbName: process.env.DB_NAME,
	dbSslCaPath: process.env.DB_SSL_CA_PATH || 'certs/ca.pem',
}
