import express, { type Request, type Response } from 'express'

import { getQuizStats } from '../repositories/statsRepository'
import { createErrorResponse } from '../utils/apiResponse'

export const statsRouter = express.Router()

statsRouter.get('/', async (_req: Request, res: Response) => {
	try {
		const quizStats = await getQuizStats()

		res.json(quizStats)
	} catch (error) {
		console.error(error)

		res.status(500).json(createErrorResponse('Error occurred while fetching quiz statistics'))
	}
})
