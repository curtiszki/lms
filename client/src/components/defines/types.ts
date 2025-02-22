export enum notificationTypes {
    NONE="none",
    SUCCESS="success",
    WAITING="waiting",
    FAILURE="failure"
}

export enum GenerationTypes {
    FLASHCARD="Flashcards",
    MULTIPLE_CHOICE="Multiple Choice",
    EXAM="Exam"
}

export enum ResponseTypes {
    MCQ="Multiple Choice",
    LONG="Long Answer"
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

export interface ResultsInformation {
    type: ProcedureType,
    includes: ResponseTypes[],
    results: {correct : number, incorrect : number, total: number, percentage: number}
}