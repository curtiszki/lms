import type { examSchema } from "@/components/defines/responseSchema";
import { GenerationTypes } from "@/components/defines/types"

const keyMap = {
    [GenerationTypes.EXAM] : ["long", "multiple"],
    [GenerationTypes.FLASHCARD] : ["question", "answer"],
    [GenerationTypes.MULTIPLE_CHOICE] : ["question", "options", "answer"]        
}

const validateKeys = (type: GenerationTypes, keys: Set<string>) : boolean => {
    const map = keyMap[type];
    if (keyMap[type].length != keys.size) {
        console.log("Length mismatch; unable to parse.")
        return false;
    }

    map.forEach((anticipatedKey) => {
        if (!keys.has(anticipatedKey)) {
            return false;
        }
    });

    return true;
}

export const validateJsonObject = (type: GenerationTypes, json: object) : [string, object][] | null => {
    if (!Object.keys(json).length) {
        //console.log('Unable to parse empty dataset');
        return null;
    }
    const keys : [type: GenerationTypes, keys: Set<string>][] = new Array<[GenerationTypes, Set<string>]>;

    const entries = Object.entries(json);
    if (type === GenerationTypes.EXAM) {
        // should have json of long, and multiple
        keys.push([GenerationTypes.EXAM, new Set(Object.keys(json))]);
        // Add the remaining keys
        const examJSON = json as examSchema;
        const multipleKeys = Object.keys(examJSON.multiple[0]);
        keys.push([GenerationTypes.MULTIPLE_CHOICE, new Set(Object.keys(multipleKeys))]);

    }
    else {
        // Get the keys from the first entry in the set
        keys.push([type,new Set(Object.keys(entries[0][1]))]);
    }
    for (const key of keys) {
        if (!validateKeys(key[0], key[1])) {
            return null;
        }
    }
    return entries;
};