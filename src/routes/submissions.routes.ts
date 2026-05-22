import express, { Request, Response } from "express"

import { submissions } from "../data/submissions"
import { calculateResult } from "../utils/calculateResult"

// Separate router for submissions
export const submissionsRouter = express.Router()

// GET

submissionsRouter.get('/', (req: Request, res: Response) => {
    res.json(submissions)
})

// GET by id
submissionsRouter.get('/:id', (req: Request, res: Response) => {
    const { id } = req.params

    const submission = submissions.find((submission) => submission.id === id)

    if (!submission) {
        return res.status(404).json({
            message: 'Submission with id ${id} was not found',
        })
    }

    res.json(submission)
})

// POST
submissionsRouter.post('/', (req: Request, res: Response) => {
    const { username, answers } = req.body

    if (!username || !Array.isArray(answers)) {
        return res.status(400).json({
            message: "Username and answers array are required",
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
