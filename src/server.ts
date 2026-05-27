import cors from 'cors'
import express, { type Request, type Response } from 'express'
import { charactersRouter } from './routes/characters.routes'
import { questionsRouter } from './routes/questions.routes'
import { statsRouter } from './routes/stats.routes'
import { submissionsRouter } from './routes/submissions.routes'
import 'dotenv/config'

const app = express()

const PORT = Number(process.env.PORT) || 3000

// Middleware to parse JSON bodies
app.use(express.json())
app.use(cors())

// Test route
app.get('/', (_req: Request, res: Response) => {
	res.json({ message: 'Welcome to the Which Dev Hero Are You API!' })
})

// Route - questions
app.use('/questions', questionsRouter)

// Route - characters
app.use('/characters', charactersRouter)

// Route - submissions
app.use('/submissions', submissionsRouter)

// Route - stats
app.use('/stats', statsRouter)

// Start the server
app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`)
})
