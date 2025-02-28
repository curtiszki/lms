export enum GenerationTypes {
    FLASHCARD="Flashcards",
    MULTIPLE_CHOICE="Multiple Choice",
    EXAM="Exam"
}

export enum InformationTypes {
    SUBJECT="subject",
    RAW_TEXT="information"
}

// Registration object schema
export interface registerJSON {
    'username': string,
    'password': string,
};