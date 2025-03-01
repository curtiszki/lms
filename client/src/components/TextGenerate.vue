<script setup lang="ts">
    import ParseData from "@/components/ParseData.vue";
    import { InformationTypes, inputTypes } from "./defines/types";
    import { sizeLimits } from "./defines/constants";
    import Tile from "./Tile.vue";
    import ParseSubmission from "./ParseSubmission.vue";

    import { ref } from "vue";
    const textRes = ref('');
    const subjectRes= ref('');

</script>

<template>
    <p>Import data or add information and generate some corresponding content from the selected category.</p>
    <ParseData :verify-type="inputTypes.TEXT" accepts=".txt" 
    description="If you have some textual information, you can use it below as data to generate question content. Text files (.txt) only."
    v-on:load="(msg) => {
        textRes = msg
    }"></ParseData>
    <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your message</label>
    <textarea id="message" rows="4" v-model="textRes" ref="textArea" :maxlength=sizeLimits.text class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here...">
    </textarea>
    <ParseSubmission v-bind:res="textRes" :subject="InformationTypes.RAW_TEXT"></ParseSubmission>


    <Tile title="Subjects" class="bg-transparent">
        <p>Alternatively, generate data by using subjects, topics, or ideas.</p>
        <form>
            <label for="subject-input">Input:</label>
            <input name="subject-input" v-model="subjectRes">
        </form>
        <ParseSubmission v-bind:res="subjectRes" :subject="InformationTypes.SUBJECT"></ParseSubmission>
    </Tile>
</template>

<style lang="css">
    @reference 'tailwindcss';
    
    .submittable {
        @apply bg-teal-600 max-h-full hover:cursor-pointer
    }
    
    .success {
        @apply text-green-500
    }
    
    .failure {
        @apply text-red-500
    }
</style>