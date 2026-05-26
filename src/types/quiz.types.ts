// Character data

export type Character = {
    id: string
    name: string
    developerType: string
    description: string
    strengths: string[]
    weaknesses: string[]
    catchphrase: string
    imageUrl: string
}

// Answer options

export type AnswerOption = {
    id: string
    text: string
    characterId: string
}

// Question

export type Question = {
    id: string
    text: string
    options: AnswerOption[]
}

export type Submission = {
    id: string
    username: string
    answers: string[]
    resultId: string
    createdAt: string
}

// Stats

export type QuizStats = {
    totalSubmissions: number
    resultCounts: Record<string, number>
    mostCommonResult: string | null
}