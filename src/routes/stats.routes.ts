import express, { type Request, type Response } from 'express'
import { submissions } from '../data/submissions'
import { createErrorResponse } from '../utils/apiResponse'
import { calculateStats } from '../utils/calculateStats'

// Stat-related routes
export const statsRouter = express.Router()

// GET /stats
statsRouter.get('/', async (_req: Request, res: Response) => {
	try {
		const quizStats = calculateStats(submissions)

		res.json(quizStats)
	} catch (error) {
		console.error(error)

		res.status(500).json(createErrorResponse('Error occurred while fetching quiz statistics'))
	}
})
