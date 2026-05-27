import cors from 'cors'
import express, { type Request, type Response } from 'express'
import { charactersRouter } from './routes/characters.routes'
import { questionsRouter } from './routes/questions.routes'
import { statsRouter } from './routes/stats.routes'
import { submissionsRouter } from './routes/submissions.routes'
import 'dotenv/config'
import helmet from 'helmet'

const app = express()

const PORT = Number(process.env.PORT) || 3000

// Middleware to set security-related HTTP headers
app.use(helmet())

// Middleware to parse JSON bodies
app.use(express.json())

// Middleware to enable CORS
const allowedOrigin = process.env.CLIENT_ORIGIN || 'http://localhost:5173'

app.use(
	cors({
		origin: allowedOrigin,
	}),
)

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
