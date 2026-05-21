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
