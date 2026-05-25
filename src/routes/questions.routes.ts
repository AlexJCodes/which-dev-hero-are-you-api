import express, { Request, Response } from "express"

import { questions } from "../data/questions"

export const questionsRouter = express.Router()

// ----------------------------------------------------------- //
// ------------------------ GET ------------------------------ //
// ----------------------------------------------------------- //
questionsRouter.get('/', async (req: Request, res: Response) => {
    try {
        res.json(questions)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Error occurred while fetching questions' })
    }
})