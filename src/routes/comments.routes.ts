import express, { type Request, type Response } from 'express'

import { getCharacterById } from '../repositories/charactersRepository'
import {
	createComment,
	deleteComment,
	getCommentsByCharacterId,
	updateComment,
} from '../repositories/commentsRepository'
import { createErrorResponse } from '../utils/apiResponse'
import { isValidCommentAuthor, isValidCommentContent } from '../utils/validateCommentInput'

export const commentsRouter = express.Router()

// ----------------------------------------------------------- //
// ---------------- GET COMMENTS BY CHARACTER ---------------- //
// ----------------------------------------------------------- //

commentsRouter.get(
	'/characters/:characterId/comments',
	async (req: Request<{ characterId: string }>, res: Response) => {
		try {
			const { characterId } = req.params

			const character = await getCharacterById(characterId)

			if (!character) {
				return res
					.status(404)
					.json(createErrorResponse(`Character with id ${characterId} was not found`))
			}

			const comments = await getCommentsByCharacterId(characterId)

			res.json(comments)
		} catch (error) {
			console.error(error)

			res.status(500).json(createErrorResponse('Error occurred while fetching comments'))
		}
	},
)

// ----------------------------------------------------------- //
// ---------------------- CREATE COMMENT --------------------- //
// ----------------------------------------------------------- //

commentsRouter.post(
	'/characters/:characterId/comments',
	async (req: Request<{ characterId: string }>, res: Response) => {
		try {
			const { characterId } = req.params
			const { author, content } = req.body

			const character = await getCharacterById(characterId)

			if (!character) {
				return res
					.status(404)
					.json(createErrorResponse(`Character with id ${characterId} was not found`))
			}

			if (!isValidCommentAuthor(author)) {
				return res
					.status(400)
					.json(
						createErrorResponse(
							'Author is required and must be a non-empty string with max 100 characters',
						),
					)
			}

			if (!isValidCommentContent(content)) {
				return res
					.status(400)
					.json(
						createErrorResponse(
							'Content is required and must be a non-empty string with max 500 characters',
						),
					)
			}

			const createdComment = await createComment({
				characterId,
				author: author.trim(),
				content: content.trim(),
			})

			res.status(201).json(createdComment)
		} catch (error) {
			console.error(error)

			res.status(500).json(createErrorResponse('Error occurred while creating comment'))
		}
	},
)

// ----------------------------------------------------------- //
// ---------------------- UPDATE COMMENT --------------------- //
// ----------------------------------------------------------- //

commentsRouter.patch('/comments/:id', async (req: Request<{ id: string }>, res: Response) => {
	try {
		const commentId = Number(req.params.id)
		const { author, content } = req.body

		if (!Number.isInteger(commentId) || commentId <= 0) {
			return res.status(400).json(createErrorResponse('Comment id must be a valid number'))
		}

		if (author === undefined && content === undefined) {
			return res
				.status(400)
				.json(createErrorResponse('At least author or content must be provided'))
		}

		const updateInput: {
			author?: string
			content?: string
		} = {}

		if (author !== undefined) {
			if (!isValidCommentAuthor(author)) {
				return res
					.status(400)
					.json(createErrorResponse('Author must be a non-empty string with max 100 characters'))
			}

			updateInput.author = author.trim()
		}

		if (content !== undefined) {
			if (!isValidCommentContent(content)) {
				return res
					.status(400)
					.json(createErrorResponse('Content must be a non-empty string with max 500 characters'))
			}

			updateInput.content = content.trim()
		}

		const updatedComment = await updateComment(commentId, updateInput)

		if (!updatedComment) {
			return res.status(404).json(createErrorResponse(`Comment with id ${commentId} was not found`))
		}

		res.json(updatedComment)
	} catch (error) {
		console.error(error)

		res.status(500).json(createErrorResponse('Error occurred while updating comment'))
	}
})

// ----------------------------------------------------------- //
// ---------------------- DELETE COMMENT --------------------- //
// ----------------------------------------------------------- //

commentsRouter.delete('/comments/:id', async (req: Request<{ id: string }>, res: Response) => {
	try {
		const commentId = Number(req.params.id)

		if (!Number.isInteger(commentId) || commentId <= 0) {
			return res.status(400).json(createErrorResponse('Comment id must be a valid number'))
		}

		const wasDeleted = await deleteComment(commentId)

		if (!wasDeleted) {
			return res.status(404).json(createErrorResponse(`Comment with id ${commentId} was not found`))
		}

		res.status(204).send()
	} catch (error) {
		console.error(error)

		res.status(500).json(createErrorResponse('Error occurred while deleting comment'))
	}
})
