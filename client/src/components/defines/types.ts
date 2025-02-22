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
    MCQ,
    LONG
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