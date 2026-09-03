# Which Dev Hero Are You?

A fullstack developer personality quiz where users answer coding-related questions and get matched with an original developer hero archetype.

The project started as an API and database assignment, but has been expanded with a custom frontend, shareable quiz results, original hero characters, and a more polished portfolio-style user experience.

## Overview

Users can:

- enter a name before starting the quiz
- answer multiple quiz questions
- get matched with a developer hero
- explore all available heroes
- copy a shareable result link
- reload a shared result URL and fetch the result from the API

The frontend consumes data from the Express API, while the backend handles quiz questions, characters, submissions, and result calculation.

## Tech Stack

### Backend

- Node.js
- Express
- TypeScript
- MySQL
- Aiven MySQL
- mysql2
- dotenv
- CORS
- Helmet

### Frontend

- Vite
- TypeScript
- SCSS
- Vanilla DOM manipulation
- Fetch API
- Biome

## Features

### Quiz Flow

The quiz questions are fetched from the API. Each answer is connected to a character, and once the quiz is completed, the backend calculates the final result.

### Original Developer Heroes

The app uses original developer hero archetypes instead of existing pop culture characters.

Examples:

- The Promptsmith
- Glitch Riot
- Elder Byte
- The Night Architect
- Orbit Junior
- The Code Empress

### Shareable Results

When a quiz is completed, the frontend updates the URL with the created submission ID.

Example:

```txt
?submission=<submission-id>
```

This allows the result page to be reloaded or shared. When the URL contains a submission ID, the frontend fetches the saved submission from the API and renders the correct result.

### Explore Heroes

Users can view all possible developer heroes on a dedicated explore page.

### Deployment Preparation

The frontend uses an environment variable for the API base URL:

```env
VITE_API_BASE_URL=http://localhost:3000
```

The backend supports configurable client origins for local development and future deployment.

## Project Structure

```txt
which-dev-hero-are-you-api/
├── client/
│   ├── public/
│   │   └── images/
│   └── src/
│       ├── api/
│       ├── components/
│       ├── data/
│       ├── pages/
│       ├── styles/
│       └── types/
├── database/
├── src/
│   ├── config/
│   ├── controllers/
│   ├── routes/
│   └── utils/
└── README.md
```

## API Endpoints

### Health

```http
GET /health
```

### Characters

```http
GET /characters
GET /characters/:id
```

### Questions

```http
GET /questions
```

### Submissions

```http
GET /submissions
GET /submissions/:id
POST /submissions
DELETE /submissions/:id
```

Example request:

```json
{
	"username": "Alex",
	"answers": ["tony-stark", "deadpool", "yoda"]
}
```

Example response:

```json
{
	"id": "submission-id",
	"username": "Alex",
	"answers": ["tony-stark", "deadpool", "yoda"],
	"resultId": "tony-stark",
	"createdAt": "2026-08-31T10:00:00.000Z"
}
```

## Environment Variables

### Backend

Create a `.env` file in the project root.

```env
PORT=3000
CLIENT_ORIGIN=http://localhost:5173

DB_HOST=
DB_PORT=
DB_USER=
DB_PASSWORD=
DB_NAME=
DB_SSL_CA_PATH=
```

### Frontend

Create a `.env` file inside the `client` folder.

```env
VITE_API_BASE_URL=http://localhost:3000
```

A frontend example file is included:

```txt
client/.env.example
```

## Getting Started

### 1. Install backend dependencies

```bash
npm install
```

### 2. Install frontend dependencies

```bash
cd client
npm install
```

### 3. Start the backend

From the project root:

```bash
npm run dev
```

The API runs on:

```txt
http://localhost:3000
```

### 4. Start the frontend

From the `client` folder:

```bash
npm run dev
```

The frontend usually runs on:

```txt
http://localhost:5173
```

If port `5173` is already in use, Vite may start on `5174`.

## Development Checks

### Frontend

From the `client` folder:

```bash
npm run format
npm run verify
```

### Backend

From the project root:

```bash
npm run build
```

## Screenshots

Screenshots will be added after final UI polish and deployment.

## Future Improvements

Planned improvements:

- deploy frontend with Vercel
- deploy backend with a Node-compatible hosting provider
- add Open Graph metadata for social sharing
- create visual result share cards
- test responsive layout on real mobile devices
- add final error/loading state polish

## Author

Created by Alexander Johansson as part of a frontend/API development portfolio project.