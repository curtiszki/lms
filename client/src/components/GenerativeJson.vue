<!-- Component that will accept JSON data, and then use that data to render corresponding html output -->
<script setup lang="ts">
import { useTemplateRef } from 'vue';
import { GenerationTypes, ProcedureType, ResponseTypes, type ResultsInformation } from './defines/types';
import {type multipleChoiceSchema, type flashcardSchema} from './defines/responseSchema';
const props = defineProps<{
    validatedObject: object,
    type: GenerationTypes
}>()

const questionEntries =  Object.entries(props.validatedObject);
const form = useTemplateRef("form");

import {type Ref, ref } from 'vue';
import FlashcardDisplay from './FlashcardDisplay.vue';
// Can't get it to work using objects... 2 separate
const responseMap : string[] = new Array<string>(questionEntries.length);
responseMap.fill('');

const errorMap : Ref<boolean, boolean>[]= [];
for (let i = 0; i < questionEntries.length; i+=1) {
    errorMap.push(ref(false));
}

//const errorMap : boolean[] = new Array<boolean>(questionEntries.length);
let results : ResultsInformation;
const displayResults = ref(false);
const processForm = () => {
    displayResults.value = false;

    let incorrect = 0, correct = 0;
    questionEntries.forEach((entry, idx) => {
        const answer : string = entry[1]['answer'];
        if(errorMap[idx].value = (answer == responseMap[idx])) { correct+=1; } else { incorrect+=1;} 
    });

    results = {
        type: ProcedureType.PRACTICE,
        includes: [ResponseTypes.MCQ],
        results: {
            correct: correct,
            incorrect: incorrect,
            total: questionEntries.length,
            percentage: (Math.floor(((correct / questionEntries.length)*10000))/100)
        },
    }
    displayResults.value = true;
}

</script>

<template>
    <form v-if="type === GenerationTypes.MULTIPLE_CHOICE && questionEntries" ref="form" v-on:submit.prevent="processForm">
        <div class="flex flex-col gap-x-0 gap-y-5" v-if="type === GenerationTypes.MULTIPLE_CHOICE">
            <div v-for="(item, index) in (questionEntries as [string, multipleChoiceSchema][])" v-bind:key=index>
                <div class="question-item">
                    <p class="question">{{ index+1 }}. {{item[1].question}}</p>
                    <ul class="flex flex-row gap-y-0 gap-x-8 options justify-evenly items-center my-6">
                        <li v-for="(option, optionIndex) in item[1].options" v-bind:key="optionIndex" class="flex items-center option">
                            <label class="option" :for="`question-${index}-${optionIndex}`">                                    
                                <input :id="`question-${index}-${optionIndex}`" type="radio" :value=String(option) :name="`question-mcq-${index}-option`" v-model="responseMap[index]" required>
                                {{ option }}
                            </label>
                        </li>
                    </ul>
                </div>
                <!-- Display if wrong -->
                 <div v-show="errorMap[index].value" :what="errorMap[index]" :this="errorMap[index].value">
                    WRONG
                 </div>
            </div>
        </div>
        
        <div v-else-if="type === GenerationTypes.EXAM">
    
        </div>
        <button class="btn" type="submit">Submit</button>

        <div class="results" v-show="displayResults">
            <h3>
                Results:
            </h3>
            <p>
                You got {{ results?.results.correct }} out of {{ results?.results.total }}. Giving a total score of {{ results?.results.percentage.toLocaleString()}}%.
            </p>
        </div>
    </form>
    <div v-else-if="type === GenerationTypes.FLASHCARD && questionEntries">
        <FlashcardDisplay :dataset="questionEntries"></FlashcardDisplay>
    </div>
    <!-- Implement long answer at some point 
    <div v-else-if="type === GenerationTypes.LONG && questionEntries">
        
    </div>
    -->
    <div v-else>
        <p>There was an issue rendering the information. The data type is unsupported.</p>
    </div>
</template>

<style lang="css" scoped>
    @reference "tailwindcss";

    .question-item {
    }

    .question {
        @apply font-bold
    }

    .options {
        @apply flex flex-row gap-y-0 gap-x-8
    }

    .option {
        @apply px-2.5 py-1 hover:cursor-pointer select-none text-center transition-colors hover:bg-slate-800
    }

    .option > * {
        @apply hover:cursor-pointer
    }

    .btn {
        border: 1px solid red;
        padding: 0.5em 1em;
    }

</style>