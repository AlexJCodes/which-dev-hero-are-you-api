import express, { type Request, type Response } from 'express'
import { characters } from '../data/characters'
import { createErrorResponse } from '../utils/apiResponse'

export const charactersRouter = express.Router()

// ----------------------------------------------------------- //
// ------------------------ GET ------------------------------ //
// ----------------------------------------------------------- //

charactersRouter.get('/', async (_req: Request, res: Response) => {
	try {
		res.json(characters)
	} catch (error) {
		console.error(error)

		res.status(500).json(createErrorResponse('Error occurred while fetching characters'))
	}
})
