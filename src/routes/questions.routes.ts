import express, { type Request, type Response } from 'express'
import { getAllQuestions, getQuestionById } from '../repositories/questionsRepository'
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

// ----------------------------------------------------------- //
// ---------------------- GET BY ID -------------------------- //
// ----------------------------------------------------------- //

questionsRouter.get('/:id', async (req: Request<{ id: string }>, res: Response) => {
	try {
		const { id } = req.params

		const question = await getQuestionById(id)

		if (!question) {
			return res.status(404).json(createErrorResponse(`Question with id ${id} was not found`))
		}

		res.json(question)
	} catch (error) {
		console.error(error)

		res.status(500).json(createErrorResponse('Error occurred while fetching question'))
	}
})
