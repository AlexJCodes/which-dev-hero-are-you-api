import express, { type Request, type Response } from 'express'
import { getAllCharacters, getCharacterById } from '../repositories/charactersRepository'
import { createErrorResponse } from '../utils/apiResponse'

export const charactersRouter = express.Router()

// ----------------------------------------------------------- //
// ------------------------ GET ------------------------------ //
// ----------------------------------------------------------- //

charactersRouter.get('/', async (_req: Request, res: Response) => {
	try {
		const characters = await getAllCharacters()

		res.json(characters)
	} catch (error) {
		console.error(error)

		res.status(500).json(createErrorResponse('Error occurred while fetching characters'))
	}
})

// ----------------------------------------------------------- //
// ---------------------- GET BY ID -------------------------- //
// ----------------------------------------------------------- //

charactersRouter.get('/:id', async (req: Request<{ id: string }>, res: Response) => {
	try {
		const { id } = req.params

		const character = await getCharacterById(id)

		if (!character) {
			return res.status(404).json(createErrorResponse(`Character with id ${id} was not found`))
		}

		res.json(character)
	} catch (error) {
		console.error(error)

		res.status(500).json(createErrorResponse('Error occurred while fetching character'))
	}
})
