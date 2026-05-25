import express, { Request, Response } from 'express';

import { submissionsRouter } from './routes/submissions.routes';
import { questionsRouter } from './routes/questions.routes';
import { charactersRouter } from './routes/characters.routes';

const app = express();

const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json())

// Test route
app.get('/', (req: Request, res: Response) => {
    res.json({ message: 'Welcome to the Which Dev Hero Are You API!' })
});

// Route - questions
app.use("/questions", questionsRouter);

// Route - characters
app.use("/characters", charactersRouter);

// Route - submissions
app.use("/submissions", submissionsRouter);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
});