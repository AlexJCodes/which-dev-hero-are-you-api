import express, { type Request, type Response } from 'express'

import { checkDatabaseConnection } from '../repositories/healthRepository'

// Health-related routes
export const healthRouter = express.Router()

// ----------------------------------------------------------- //
// ------------------------ GET ------------------------------ //
// ----------------------------------------------------------- //
// GET /health
// Returns API and database health status.
healthRouter.get('/', async (_req: Request, res: Response) => {
	const isDatabaseConnected = await checkDatabaseConnection()

	if (!isDatabaseConnected) {
		return res.status(503).json({
			status: 'degraded',
			database: 'disconnected',
		})
	}

	res.json({
		status: 'ok',
		database: 'connected',
	})
})
