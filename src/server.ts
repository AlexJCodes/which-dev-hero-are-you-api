import 'dotenv/config'
import cors from 'cors'
import express, { type Request, type Response } from 'express'
import helmet from 'helmet'
import { env } from './config/env'
import { errorHandler } from './middleware/errorHandler'
import { notFoundHandler } from './middleware/notFoundHandler'
import { charactersRouter } from './routes/characters.routes'
import { commentsRouter } from './routes/comments.routes'
import { healthRouter } from './routes/health.routes'
import { questionsRouter } from './routes/questions.routes'
import { statsRouter } from './routes/stats.routes'

import { submissionsRouter } from './routes/submissions.routes'

const app = express()

const PORT = env.port

// Middleware to set security-related HTTP headers
app.use(helmet())

// Middleware to parse JSON bodies
app.use(express.json())

// Middleware to enable CORS
const allowedOrigins = env.clientOrigins

app.use(
	cors({
		origin: allowedOrigins,
	}),
)

// Test route
app.get('/', (_req: Request, res: Response) => {
	res.json({ message: 'Welcome to the Which Dev Hero Are You API!' })
})

// Route - health
app.use('/health', healthRouter)

// Route - questions
app.use('/questions', questionsRouter)

// Route - questions
app.use('/questions', questionsRouter)

// Route - characters
app.use('/characters', charactersRouter)

// Route - submissions
app.use('/submissions', submissionsRouter)

// Route - stats
app.use('/stats', statsRouter)

// Route - comments
app.use(commentsRouter)

// Middleware to handle 404 Not Found
app.use(notFoundHandler)

// Error handling middleware
app.use(errorHandler)

// Start the server
app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`)
})
