<!-- Component that will accept JSON data, and then use that data to render corresponding html output -->
<script setup lang="ts">
import { useTemplateRef } from 'vue';
import { GenerationTypes, IncludedResponses, ProcedureType, ResponseTypes, type LongAnswerResponse, type ResultsInformation } from './defines/types';
import {type examSchema, type LongAnswerJSONResponse, type multipleChoiceSchema} from './defines/responseSchema';
const props = defineProps<{
    validatedObject: object,
    type: GenerationTypes
}>()

const questionEntries =  (props.type === GenerationTypes.EXAM) ? Object.entries((props.validatedObject as examSchema).multiple) : Object.entries(props.validatedObject);

import {type Ref, ref } from 'vue';
import FlashcardDisplay from './FlashcardDisplay.vue';
import { config } from './defines/config';
// Can't get it to work using objects... 2 separate
const responseMap : number[] = new Array<number>(questionEntries.length);
responseMap.fill(0);

let longAnswer : string[];
let longAnswerRes : [feedback: string, score: number][];

if (props.type === GenerationTypes.EXAM) {
    const n = (props.validatedObject as examSchema).long.questions.length;
    longAnswer = new Array<string>(n);
    longAnswer.fill('');
    // long Answer Res should have feedback + answer
    longAnswerRes = new Array<[string, number]>(n)
    longAnswerRes.fill(['', 0]);
}

const errorMap : Ref<boolean, boolean>[]= [];
for (let i = 0; i < questionEntries.length; i+=1) {
    errorMap.push(ref(false));
}

//const errorMap : boolean[] = new Array<boolean>(questionEntries.length);
const errorResponse = ref(false);

let results : ResultsInformation;
const displayResults = ref(false);

const resultsMsg = ref('');

const generateResultsMessage = (results: ResultsInformation) : string => {
    const res : string[] = [];

    results.includes.forEach((type) => {
        res.push(
            "You got "+ results.results.correct.get(type) + " out of "+ results.results.total.get(type) + " points on " + type + " questions."
        );
    });

    res.push(
        "The total score is: "+results.results.summary[0] + " out of "+ results.results.summary[1]   + " You scored: " + results.results.percentage.toString() +"%"
    );

    return res.join(" ");
}

const processForm = async () => {
    displayResults.value = false;

    // For multiple choice
    const correct : Map<string, number> = new Map<string, number>();
    const total : Map<string, number> = new Map<string, number>();

    let total_correct = 0;
    let grand_total = 0;
    let correct_mcq = 0
    questionEntries.forEach((entry, idx) => {
        const info = entry[1];
        const answer : string = info['answer'];
        const response : string = info['options'][responseMap[idx]];
        if(answer === response) 
            { 
                errorMap[idx].value = false;
                correct_mcq+=1; 
            } 
        else 
            { 
                errorMap[idx].value = true;
            } 
    });
    correct.set(ResponseTypes.MCQ, correct_mcq);
    total.set(ResponseTypes.MCQ, questionEntries.length);
    grand_total += questionEntries.length;
    total_correct += correct_mcq;
    /*
        If using long answer probe the AI
    */

    if (props.type === GenerationTypes.EXAM) {
        const longAnswers = (props.validatedObject as examSchema).long;

        const responses : LongAnswerResponse[] = [];
        longAnswers.questions.forEach((question, idx) => {
            const response : LongAnswerResponse = {
                question: question,
                answer: longAnswer[idx]
            }
            responses.push(response);
        });

        // Send prompt and wait for response.

        const postRequest = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(responses),
        }

        let json;
        try {
            const target = [config.SITE_BASE_URL, 'generate', 'long_answer'].join('/');
            const response = await fetch(target, postRequest);
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            json = await response.json();
            const responseData = JSON.parse(json) as LongAnswerJSONResponse[];
            let correct_long = 0;
            responseData.forEach((res, idx) => {
                longAnswerRes[idx] = [res.feedback, res.score];
                correct_long += res.score;
            });
            total_correct += correct_long;
            grand_total += responseData.length*10;
            correct.set(ResponseTypes.LONG, correct_long);
            total.set(ResponseTypes.LONG, responseData.length*10);

        }
        catch (e) {
            errorResponse.value = true;
            console.error(e);
            return;
        }

        errorResponse.value = false;



    }

    results = {
        type: (props.type === GenerationTypes.EXAM) ? ProcedureType.EXAM : ProcedureType.PRACTICE,
        includes: IncludedResponses[props.type],
        results: {
            correct: correct,
            total: total,
            percentage: (Math.floor(((total_correct / grand_total)*10000))/100),
            summary: [total_correct, grand_total]
        }
    }

    resultsMsg.value = generateResultsMessage(results);
    displayResults.value = true;

}
</script>

<template>
    <form v-if="questionEntries && (type === GenerationTypes.MULTIPLE_CHOICE || type === GenerationTypes.EXAM)" ref="form" v-on:submit.prevent="processForm">
        <div class="flex flex-col gap-x-0 gap-y-5">
            <div v-for="(item, index) in (questionEntries as [string, multipleChoiceSchema][])" v-bind:key=index>
                <div class="question-item">
                    <p class="question">{{ index+1 }}. {{item[1].question}}</p>
                    <ul class="flex flex-row gap-y-0 gap-x-8 options justify-evenly items-center my-6">
                        <li v-for="(option, optionIndex) in item[1].options" v-bind:key="optionIndex" class="flex items-center option">
                            <label class="option" :for="`question-${index}-${optionIndex}`">                                    
                                <input :id="`question-${index}-${optionIndex}`" type="radio" :value="optionIndex" :name="`question-mcq-${index}-option`" v-model="responseMap[index]" required>
                                {{ option }}
                            </label>
                        </li>
                    </ul>
                </div>
                <!-- Display if wrong -->
                 <div v-show="errorMap[index].value">
                    WRONG
                 </div>
            </div>
        </div>
        
        <div v-if="type === GenerationTypes.EXAM">
            <!-- Display long answer -->
             <div class="flex flex-col gap-x-0 gap-y-8">
                <div v-for="(item, index) in (props.validatedObject as examSchema).long.questions" v-bind:key="index">
                    <p>{{item}}</p>
                    <textarea cols="25" class="w-full bg-amber-500/20" maxlength="2000" v-model="longAnswer[index]" required></textarea>

                    <div v-if="displayResults.valueOf()">
                        <p>Feedback: {{ longAnswerRes[index][0] }}</p>
                        <span>Score: {{ longAnswerRes[index][1] }}</span>
                    </div>
                </div>
             </div>
        </div>
        <button class="btn" type="submit">Submit</button>

        <div class="results" v-show="displayResults">
            <h3>
                Results:
            </h3>
            <p>
                {{ resultsMsg }}
            </p>
        </div>
        <div v-if="errorResponse">
            <p class="error">
                There was an error processing the submission.
            </p>
        </div>
    </form>
    <div v-else-if="type === GenerationTypes.FLASHCARD && questionEntries">
        <FlashcardDisplay :dataset="questionEntries"></FlashcardDisplay>
    </div>
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