import express, { Request, Response } from "express"

import { submissions } from "../data/submissions"
import { calculateResult } from "../utils/calculateResult"

// Separate router for submissions
export const submissionsRouter = express.Router()

// ----------------------------------------------------------- //
// ------------------------ GET ------------------------------ //
// ----------------------------------------------------------- //
submissionsRouter.get('/', (req: Request, res: Response) => {
    res.json(submissions)
})

// ----------------------------------------------------------- //
// ---------------------- GET BY ID -------------------------- //
// ----------------------------------------------------------- //
submissionsRouter.get('/:id', (req: Request, res: Response) => {
    const { id } = req.params

    const submission = submissions.find((submission) => submission.id === id)

    if (!submission) {
        return res.status(404).json({
            message: `Submission with id ${id} was not found`,
        })
    }

    res.json(submission)
})

// ----------------------------------------------------------- //
// ----------------------- POST ------------------------------ //
// ----------------------------------------------------------- //
submissionsRouter.post('/', (req: Request, res: Response) => {
    const { username, answers } = req.body

    if (!username || !Array.isArray(answers)) {
        return res.status(400).json({
            message: 'Username and answers array are required',
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
})

// ----------------------------------------------------------- //
// -------------------- PATCH BY ID -------------------------- //
// ----------------------------------------------------------- //
submissionsRouter.patch('/:id', (req: Request, res: Response) => {
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

    // Validate
    if (answers !== undefined && !Array.isArray(answers)) {
        return res.status(400).json({
            message: 'Answers must be an array.',
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
})

// ----------------------------------------------------------- //
// --------------------- DELETE BY ID ------------------------ //
// ----------------------------------------------------------- //

submissionsRouter.delete('/:id', (req:Request, res: Response) => {
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

    // Return (praxis with 204):
    res.status(204).send()
})
