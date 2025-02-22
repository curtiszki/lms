// Datasets for generative AI output

export const empty = {};

/* Datasets for multiple choice */
// {question: string, options: string[], answer: string}

export const mcq_single = [
    {
        "question": "What is the capital of Namibia?",
        "options": ["Paris", "Tokyo", "Windhoek", "Cartagena"],
        "answer": "Windhoek"  
    },
];

export const mcq_multiple = [
    {
        "question": "What is the capital of Namibia?",
        "options": ["Paris", "Tokyo", "Windhoek", "Cartagena"],
        "answer": "Windhoek"  
    },
    {
        "question": "What is the capital of Japan?",
        "options": ["Paris", "Tokyo", "Beijing", "Seoul"],
        "answer": "Tokyo"  
    },
];

// If the AI gives the wrong key values that don't match the schema
// Try to infer if possible, otherwise discard
export const mcq_incorrect_format = [
    {
        "question": "What is the capital of Pakistan",
        "options": ["Lahore", "Islamabad", "Karachi", "Moscow"],
        "sol": "Islamabad"
    }
];

// If the answer does not match an option, the data can not be used
export const mcq_no_match_single = [
    {
        "question": "What is the best?",
        "options": ["Frogs", "Cats", "Raccoons", "Cactus"],
        "answer": "Potatoes"  
    },
]

export const mcq_no_match_mult = [
    {
        "question": "What is the capital of Namibia?",
        "options": ["Paris", "Tokyo", "Windhoek", "Cartagena"],
        "answer": "Windhoek"  
    },
    {
        "question": "What is the best?",
        "options": ["Frogs", "Cats", "Raccoons", "Cactus"],
        "answer": "Apples"  
    },
]

export const flashcard_single = [
    {
        "question": "What is the capital of Turkey?",
        "answer": "Istanbul"
    }
]

export const flashcard_multiple = [
    {
        "question": "What is the capital of Indonesia?",
        "answer": "Jakarta"
    },
    {
        "question": "What is the capital of Turkey?",
        "answer": "Istanbul"
    }
]