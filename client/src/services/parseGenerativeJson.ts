import { GenerationTypes } from "@/components/defines/types"

const keyMap = {
    [GenerationTypes.EXAM] : [],
    [GenerationTypes.FLASHCARD] : ["question", "answer"],
    [GenerationTypes.MULTIPLE_CHOICE] : ["question", "options", "answer"]        
}

export const validateJsonObject = (type: GenerationTypes, json: object) : [string, object][] | null => {
    if (!Object.keys(json).length) {
        //console.log('Unable to parse empty dataset');
        return null;
    }

    const entries = Object.entries(json);
    // Get the keys from the first entry in the set
    const keys = new Set(Object.keys(entries[0][1]));

    const map = keyMap[type];
    if (keyMap[type].length != keys.size) {
        //console.log("Length mismatch; unable to parse.")
        return null;
    }

    map.forEach((anticipatedKey) => {
        if (!keys.has(anticipatedKey)) {
            return null;
        }
    });
    return entries;
};