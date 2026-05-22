import express, { Request, Response } from "express"

import { submissions } from "../data/submissions"
import { calculateResult } from "../utils/calculateResult"

// Separate router for submissions
export const submissionsRouter = express.Router()

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
