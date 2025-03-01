import { defineStore } from 'pinia'
import { GenerationTypes} from '@/components/defines/types';

interface State {
    information: null | [string, object][],
    generationType: null | GenerationTypes
}

// Store for testing information
export const informationStore = defineStore('information', {
    state: (): State => {
        return {
            information: null,
            generationType: null
        }
    },
    actions: {
        setInformation(information : null | [string, object][], generationType : null | GenerationTypes) {
            this.information = information;
            this.generationType = generationType;
        }
    }
});