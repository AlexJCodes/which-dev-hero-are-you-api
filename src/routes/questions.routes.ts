import express, { type Request, type Response } from 'express'
import { getAllQuestions } from '../repositories/questionsRepository'
import { createErrorResponse } from '../utils/apiResponse'

export const questionsRouter = express.Router()

// ----------------------------------------------------------- //
// ------------------------ GET ------------------------------ //
// ----------------------------------------------------------- //
questionsRouter.get('/', async (_req: Request, res: Response) => {
	try {
		const questions = await getAllQuestions()

		res.json(questions)
	} catch (error) {
		console.error(error)

		res.status(500).json(createErrorResponse('Error occured while fetching questions'))
	}
})
