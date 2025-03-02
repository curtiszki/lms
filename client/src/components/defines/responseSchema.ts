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

export interface LongAnswerSchema {
    questions: string[],
}

export interface LongAnswerJSONResponse {
    feedback: string,
    score: number
}

export interface examSchema {
    long: LongAnswerSchema,
    multiple: multipleChoiceSchema[]
}