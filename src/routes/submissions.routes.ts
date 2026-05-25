import express, { Request, Response } from "express"

import { submissions } from "../data/submissions"
import { calculateResult } from "../utils/calculateResult"
import { validateAnswers } from "../utils/validateAnswers"

// Separate router for submissions
export const submissionsRouter = express.Router()

// ----------------------------------------------------------- //
// ------------------------ GET ------------------------------ //
// ----------------------------------------------------------- //
submissionsRouter.get('/', async (req: Request, res: Response) => {
    try {
        res.json(submissions)
    } catch (error) {
        console.error(error)

        res.status(500).json({ message: 'Error occurred while fetching submissions' })
    }
})

// ----------------------------------------------------------- //
// ---------------------- GET BY ID -------------------------- //
// ----------------------------------------------------------- //
submissionsRouter.get('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params

        const submission = submissions.find((submission) => submission.id === id)

        if (!submission) {
            return res.status(404).json({
                message: `Submission with id ${id} was not found`,
            })
        }

        res.json(submission)
    } catch (error) {
        console.error(error)

        res.status(500).json({ message: 'Error occurred while fetching submission' })
    }
})

// ----------------------------------------------------------- //
// ----------------------- POST ------------------------------ //
// ----------------------------------------------------------- //
submissionsRouter.post('/', async (req: Request, res: Response) => {
    try {
        const { username, answers } = req.body

        // Validate username
        if (!username || typeof username !== 'string') {
            return res.status(400).json({
                message: 'Username is required and must be a string',
            })
        }

        // Validate answers type
        if (!Array.isArray(answers)) {
            return res.status(400).json({
                message: 'Answers are required and must be an array',
            })
        }

        // Validate answers content
        if (answers.length === 0) {
            return res.status(400).json({
                message: 'Answers array cannot be empty',
            })
        }

        // Validate that all answers match existing character ids
        if (!validateAnswers(answers)) {
            return res.status(400).json({
                message: 'Answers contain invalid character ids',
            })
        }

        // Calculate quiz result:
        const resultId = calculateResult(answers)

        // Create new subbmission:
        const newSubmission = {
            id: crypto.randomUUID(),
            username,
            answers,
            resultId,
            createdAt: new Date().toISOString(),
        }

        // Save submission in memory-array
        submissions.push(newSubmission)

        // Return submission
        res.status(201).json(newSubmission)
    } catch (error) {
        console.error(error)

        res.status(500).json({ message: 'Error occurred while creating submission' })
    }
})

// ----------------------------------------------------------- //
// -------------------- PATCH BY ID -------------------------- //
// ----------------------------------------------------------- //
submissionsRouter.patch('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const { username, answers } = req.body

        // Find submission index:
        const submissionIndex = submissions.findIndex(
            (submission) => submission.id === id,
        )

        if (submissionIndex === -1) {
            return res.status(404).json({
                message: `Submission with id ${id} was not found`,
            })
        }

        // Get existing submission:
        const existingSubmission = submissions[submissionIndex]

        // Validate username only if username was provided
        if (username !== undefined && typeof username !== 'string') {
            return res.status(400).json({
                message: 'Username must be a string',
            })
        }

        // Validate answers only if answers was provided
        if (answers !== undefined && !Array.isArray(answers)) {
            return res.status(400).json({
                message: 'Answers must be an array',
            })
        }

        // Validate answers content only if answers was provided
        if (answers !== undefined && answers.length === 0) {
            return res.status(400).json({
                message: 'Answers array cannot be empty',
            })
        }

        // Validate that all provided answers match existing character ids
        if (answers !== undefined && !validateAnswers(answers)) {
            return res.status(400).json({
                message: 'Answers contain invalid character ids',
            })
        }

        // Updated submission
        // If answers and user are provided, recalculate the result:
        // If answers and user are not provided, keep the existing answers and result.
        const updatedAnswers = answers ?? existingSubmission.answers

        // If answers are updated, we need to recalculate the result. 
        const updatedSubmission = {
            // Copy existing submission.
            ...existingSubmission,
            // Update username and answers if provided, otherwise keep existing values.
            username: username ?? existingSubmission.username,
            answers: updatedAnswers,
            resultId: calculateResult(updatedAnswers),
        }

        submissions[submissionIndex] = updatedSubmission

        // return updated submission
        res.json(updatedSubmission)
    } catch (error) {
        console.error(error)

        res.status(500).json({ message: 'Error occurred while updating submission' })
    }
})

// ----------------------------------------------------------- //
// --------------------- DELETE BY ID ------------------------ //
// ----------------------------------------------------------- //

submissionsRouter.delete('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params

        const submissionIndex = submissions.findIndex(
            (submission) => submission.id === id,
        )

        if (submissionIndex === -1) {
            return res.status(404).json({
                message: `Submission with id ${id} was not found`,
            })
        }

        // Delete submission from array:
        submissions.splice(submissionIndex, 1)

        // Return (praxis with 204 = no content, since the submission is deleted and there is nothing to return):
        res.status(204).send()
    } catch (error) {
        console.error(error)

        res.status(500).json({ message: 'Error occurred while deleting submission' })
    }
})
