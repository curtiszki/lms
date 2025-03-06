import { defineStore } from 'pinia'
import { GenerationTypes} from '@/components/defines/types';
import { PiniaInstance } from './pinia';

interface State {
    information: null | object[] | object,
    generationType: null | GenerationTypes
}

// Store for testing information
export const InformationStore = defineStore('information', {
    state: (): State => {
        return {
            information: null,
            generationType: null
        }
    },
    actions: {
        setInformation(information : null | object[] | object, generationType : null | GenerationTypes) {
            this.information = information;
            this.generationType = generationType;
        }
    }
})(PiniaInstance);