// Anticipated structure of generative AI responses
export interface flashcardSchema {
    question: string,
    answer: string
}

export interface multipleChoiceSchema {
    question: string,
    options: string[],
    answer: string
}