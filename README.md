# Which Dev Hero Are You? API

A TypeScript and Express REST API for a personality-style quiz where users discover which fictional "dev hero" matches their coding style.

The project started as a school API exercise, but has been developed further into a more complete backend project with MySQL, validation, error handling, security middleware, database relations and SQL joins.

## Features

- REST API built with Express and TypeScript
- MySQL database hosted on Aiven
- MySQL connection pool using `mysql2`
- SSL database connection using Aiven CA certificate
- Environment-based configuration with `.env`
- Repository layer for database access
- CRUD operations for quiz submissions
- Character and question data fetched from MySQL
- Character comments with foreign key relation
- SQL joins for fetching characters with related comments
- Search and sort support for characters
- Standardized API error responses
- Global error handler
- Not found handler
- Basic security headers with Helmet
- CORS configuration via environment variables
- Request validation for submissions and comments

## Tech Stack

### Backend

![Node.js](https://img.shields.io/badge/Node.js-Backend-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-API-000000?logo=express&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-Language-3178C6?logo=typescript&logoColor=white)

### Database

![MySQL](https://img.shields.io/badge/MySQL-Database-4479A1?logo=mysql&logoColor=white)
![Aiven](https://img.shields.io/badge/Aiven-Cloud%20Database-FF5722)
![mysql2](https://img.shields.io/badge/mysql2-Driver-4479A1)

### Security & Config

![Helmet](https://img.shields.io/badge/Helmet-Security-111827)
![CORS](https://img.shields.io/badge/CORS-Configured-2563EB)
![dotenv](https://img.shields.io/badge/dotenv-Environment-8DD6F9)
![SSL](https://img.shields.io/badge/SSL-Aiven%20CA%20Certificate-16A34A)

### Development Tools

![Biome](https://img.shields.io/badge/Biome-Lint%20%26%20Format-60A5FA)
![Nodemon](https://img.shields.io/badge/Nodemon-Dev%20Server-76D04B)
![ts-node](https://img.shields.io/badge/ts--node-TypeScript%20Runtime-3178C6)

## Project Structure

```txt
src/
├── config/
│   ├── database.ts
│   ├── env.ts
├── middleware/
│   ├── errorHandler.ts
│   └── notFoundHandler.ts
├── repositories/
│   ├── charactersRepository.ts
│   ├── commentsRepository.ts
│   ├── questionsRepository.ts
│   ├── statsRepository.ts
│   └── submissionsRepository.ts
├── routes/
│   ├── characters.routes.ts
│   ├── comments.routes.ts
│   ├── questions.routes.ts
│   ├── stats.routes.ts
│   └── submissions.routes.ts
├── types/
│   └── quiz.types.ts
├── utils/
│   ├── apiResponse.ts
│   ├── calculateResult.ts
│   ├── validateAnswers.ts
│   └── validateCommentInput.ts
└── server.ts
```

---

## Database

The API uses a MySQL database with the following main tables:

```txt
characters
questions
answer_options
submissions
character_comments
```

### Relations

```txt
questions.id
↓
answer_options.question_id
```

```txt
characters.id
↓
answer_options.character_id
```

```txt
characters.id
↓
submissions.result_id
```

```txt
characters.id
↓
character_comments.character_id
```

The `character_comments` table is connected to characters with a foreign key. This makes it possible to fetch a `character` together with its comments using SQL joins.

## Environment Variables

Create a .env file based on .env.example.

```env
PORT=3000
CLIENT_ORIGIN=http://localhost:5173

DB_HOST=your-aiven-host
DB_PORT=12345
DB_USER=your-db-user
DB_PASSWORD=your-db-password
DB_NAME=dev_hero_db
DB_SSL_CA_PATH=certs/ca.pem
```

**Important**: The real .env file should never be committed.

## SSL Certificate

Aiven requires SSL for MySQL connections.

Download the Aiven CA certificate and save it locally as:

```txt
certs/ca.pem
```

**Important**: The certs/ folder is ignored by Git and should not be committed.

## Getting Started

Install dependencies:

**1.**
```bash
npm install
```

**2.**
Create your .env file:

```bash
cp .env.example .env
```

**3.**
Add your Aiven MySQL credentials to .env.

**4.**
Run the database schema and seed files in your MySQL database:

```txt
database/schema.sql
database/seed.sql
```

**5.** 

Start the development server:

```bash
npm run dev
```

---

The API will run on:

```txt
http://localhost:3000
```

## Scripts

```bash
npm run dev
```

Starts the development server with Nodemon.

```bash
npm run check
```

Run Biome checks.

```bash
npm run check:fix
```

Run biome checks and applies safe fixes.

```bash
npm run build
```

Compiles TypeScript.

## API Endpoints

### Root

```http
GET /
```

---

Returns a welcome message.

### Characters

```http
GET /characters
```

Returns all characters.

**Supports search and sorting:**
```http
GET /characters?search=dark&sort=name&order=asc
```

```http
GET /characters/:id
```

Returns one character with related comments.

```http
GET /characters/:characterId/comments
```

Returns all comments for a character.

```http
POST /characters/:characterId/comments
```

Creates a comment for a character.

**Example body:**
```json
{
	"author": "Alex",
	"content": "This is painfully accurate. Dark mode architect energy."
}
```

---

### Questions

```http
GET /questions
```

Returns all quiz questions with answer options.

```http
GET /questions/:id
```

Returns one quiz question with answer options.

### Submissions

```http
GET /submissions
```

Returns all quiz submissions.

```http
GET /submissions/:id
```

Returns one quiz submission.

```http
POST /submissions
```

Creates a new quiz submission.

**Example body:**
```json
{
	"username": "Alex",
	"answers": ["tony-stark", "deadpool", "tony-stark"]
}
```

### Patch & Delete

```http
PATCH /submissions/:id
```

Updates a quiz submission.

```http
DELETE /submissions/:id
```

Deletes a quiz submission.

### Comments

```http
PATCH /comments/:id
```

Updates a comment.

```http
DELETE /comments/:id
```

Deletes a comment.

### Stats

```http
GET /stats
```

Returns quiz statistics from MySQL.

**Example response:**
```json
{
	"totalSubmissions": 3,
	"resultCounts": {
		"tony-stark": 2,
		"batman": 1
	},
	"mostCommonResult": "tony-stark"
}
```

## Security Notes

This project includes several backend security practices:

- Environment variables for sensitive configuration
- .env ignored by Git
- Aiven MySQL SSL connection with CA certificate
- Helmet for security-related HTTP headers
- CORS configured through environment variables
- SQL placeholders for user input
- Backend validation for request bodies
- Standardized error responses
- Global error handling
- Not found handling

**User input is never inserted directly into SQL strings. Dynamic values are passed through placeholders.**

**Example**:

```ts
WHERE id = ?
```

**Instead of:**

```ts
`WHERE id = '${id}'`
```

Which would be in a risk of SQL injections.

## Current Status

**The API currently supports:**

- Database-backed characters
- Database-backed questions
- Database-backed submissions
- Database-backed stats
- Character comments
- SQL joins for related data
- Search and sort for characters

**Next Steps**:

- Build a Vite frontend client
- Add quiz UI with radio buttons
- Display character result cards
- Render character comments in the frontend
- Add a complete health check
- Add README screenshots
- Add deployment instructions
- Add automated tests
- Add rate limiting




