export enum notificationTypes {
    NONE="none",
    SUCCESS="success",
    WAITING="waiting",
    FAILURE="failure"
}

export enum GenerationTypes {
    FLASHCARD="Flashcards",
    MULTIPLE_CHOICE="Multiple Choice",
    EXAM="Exam",
    //NONE=""
}

export enum ResponseTypes {
    MCQ="multiple choice",
    LONG="long answer"
}

export enum ProcedureType {
    PRACTICE="Practice",
    EXAM="Exam"
}

export enum InformationTypes {
    SUBJECT="subject",
    RAW_TEXT="information"
}

export enum inputTypes {
    DSV,
    TEXT
}

export interface DataGenerationInformation {
    generationType: GenerationTypes,
    information: string,
    informationType: InformationTypes,
}

export interface LongAnswerResponse {
    question: string,
    answer: string
}



export const IncludedResponses = {
    [GenerationTypes.EXAM] : [ResponseTypes.MCQ, ResponseTypes.LONG],
    [GenerationTypes.MULTIPLE_CHOICE] : [ResponseTypes.MCQ],
    [GenerationTypes.FLASHCARD] : []
}

export interface ResultsInformation {
    type: ProcedureType,
    includes: ResponseTypes[],
    results: {correct : Map<string, number>, total: Map<string, number>, percentage: number, summary: [correct: number, total: number]},
}