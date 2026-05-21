import express, { Request, Response } from 'express';

const app = express();

const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Test route
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Welcome to the Which Dev Hero Are You API!' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});