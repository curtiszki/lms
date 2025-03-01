import { defineStore } from 'pinia'
import { GenerationTypes} from '@/components/defines/types';

interface State {
    information: null | [string, object][],
    generationType: GenerationTypes
}

// Store for testing information
export const informationStore = defineStore('information', {
    state: (): State => {
        return {
            information: null,
            generationType: GenerationTypes.NONE
        }
    },
    actions: {
        setInformation(information : null | [string, object][], generationType : GenerationTypes) {
            this.information = information;
            this.generationType = generationType;
        }
    }
});