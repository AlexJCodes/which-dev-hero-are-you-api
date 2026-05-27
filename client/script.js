// ----------------------------------------------------------- //
// --------------------- API SETTINGS ------------------------ //
// ----------------------------------------------------------- //

// This is the base URL for our Express API.
// Backend runs on port 3000.
const API_BASE_URL = 'http://localhost:3000'

// ----------------------------------------------------------- //
// -------------------- DOM REFERENCES ----------------------- //
// ----------------------------------------------------------- //

const loadQuestionsButton = document.querySelector('#load-questions-button')
const statusMessage = document.querySelector('#status-message')
const questionsList = document.querySelector('#questions-list')

// ----------------------------------------------------------- //
// -------------------- FETCH QUESTIONS ---------------------- //
// ----------------------------------------------------------- //

async function fetchQuestions() {
	try {
		statusMessage.textContent = 'Loading questions...'
		questionsList.innerHTML = ''

		// fetch() sends a GET request to our API.
		// await means: wait until the response comes back.
		const response = await fetch(`${API_BASE_URL}/questions`)

		// If response is not OK, something went wrong.
		if (!response.ok) {
			throw new Error('Could not fetch questions')
		}

		// response.json() converts the JSON response into JavaScript data.
		const questions = await response.json()

		renderQuestions(questions)

		statusMessage.textContent = 'Questions loaded successfully.'
	} catch (error) {
		console.error(error)

		statusMessage.textContent = 'Something went wrong while loading questions.'
	}
}

// ----------------------------------------------------------- //
// -------------------- RENDER QUESTIONS --------------------- //
// ----------------------------------------------------------- //

function renderQuestions(questions) {
	for (const question of questions) {
		const article = document.createElement('article')
		article.classList.add('question-card')

		const title = document.createElement('h3')
		title.textContent = question.text

		const optionsList = document.createElement('ul')

		for (const option of question.options) {
			const optionItem = document.createElement('li')
			optionItem.textContent = option.text
			optionsList.append(optionItem)
		}

		article.append(title, optionsList)
		questionsList.append(article)
	}
}

// ----------------------------------------------------------- //
// -------------------- EVENT LISTENERS ---------------------- //
// ----------------------------------------------------------- //

loadQuestionsButton.addEventListener('click', fetchQuestions)
