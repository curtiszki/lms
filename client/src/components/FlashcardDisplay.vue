<script setup lang="ts">
    import { ref } from 'vue';
import {type flashcardSchema} from './defines/responseSchema';
    const props = defineProps<{
        dataset: [string, flashcardSchema][]
    }>()

    const prompt = ref('');
    const answer = ref('');
    const inProgress = ref(true);

    const iterator = props.dataset[Symbol.iterator]();
    const getNextFlashcard = () => {
        const value = iterator.next().value?.[1];
        if (value) {
            prompt.value = value.question;
            answer.value = value.answer;
        }
        else {
            inProgress.value = false;
        }
    }
    // Run the set
    getNextFlashcard();
</script>

<template>
    <div id="flashcard-container">
        <div v-if="inProgress" class="flashcard">
            <div class="flashcard-prompt">
                {{ prompt }}
            </div>
            <div class="flashcard-answer">
                {{ answer }}
            </div>
            <button v-on:click="getNextFlashcard">Next</button>
        </div>
        <div v-else>
            Flashcard deck completed.
        </div>
    </div>
</template>