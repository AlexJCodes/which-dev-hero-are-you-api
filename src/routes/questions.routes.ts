import express, { type Request, type Response } from 'express'

import { questions } from '../data/questions'

export const questionsRouter = express.Router()

// ----------------------------------------------------------- //
// ------------------------ GET ------------------------------ //
// ----------------------------------------------------------- //
questionsRouter.get('/', async (_req: Request, res: Response) => {
	try {
		res.json(questions)
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: 'Error occurred while fetching questions' })
	}
})
