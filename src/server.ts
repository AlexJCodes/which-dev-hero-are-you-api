import express, { Request, Response } from 'express';

import { characters } from './data/characters';
import { questions } from './data/questions';
import { submissionsRouter } from './routes/submissions.routes';

const app = express();

const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json())

// Test route
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Welcome to the Which Dev Hero Are You API!' })
});

// Route - questions
app.get('/questions', (req: Request, res: Response) => {
    res.json(questions)
})

// Route - characters
app.get('/characters', (req: Request, res: Response) => {
    res.json(characters)
})

// Route - submissions
app.use("/submissions", submissionsRouter);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
});