import express, { type Request, type Response } from 'express'
import { questions } from '../data/questions'
import { createErrorResponse } from '../utils/apiResponse'

export const questionsRouter = express.Router()

// ----------------------------------------------------------- //
// ------------------------ GET ------------------------------ //
// ----------------------------------------------------------- //
questionsRouter.get('/', async (_req: Request, res: Response) => {
	try {
		res.json(questions)
	} catch (error) {
		console.error(error)
		res.status(500).json(createErrorResponse('Error occurred while fetching questions'))
	}
})
