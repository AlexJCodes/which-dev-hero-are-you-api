import express, { type Request, type Response } from 'express'
import {
	getAllCharacters,
	getCharacterWithCommentsById,
} from '../repositories/charactersRepository'
import { createErrorResponse } from '../utils/apiResponse'

export const charactersRouter = express.Router()

// ----------------------------------------------------------- //
// ------------------------ GET ------------------------------ //
// ----------------------------------------------------------- //

charactersRouter.get('/', async (req: Request, res: Response) => {
	try {
		const search = typeof req.query.search === 'string' ? req.query.search : undefined

		const sort = req.query.sort === 'name' ? 'name' : undefined

		const order = req.query.order === 'desc' ? 'desc' : 'asc'

		const characters = await getAllCharacters({
			search,
			sort,
			order,
		})

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

		const character = await getCharacterWithCommentsById(id)

		if (!character) {
			return res.status(404).json(createErrorResponse(`Character with id ${id} was not found`))
		}

		res.json(character)
	} catch (error) {
		console.error(error)

		res.status(500).json(createErrorResponse('Error occurred while fetching character'))
	}
})
