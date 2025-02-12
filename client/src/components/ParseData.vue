<script setup lang="ts">
const { parseData = false } = defineProps<{
  accepts: string,
  description: string,
  parseData?: boolean
}>()

import { ref } from 'vue';
const error = ref(false);

const verifyFileType = function (e: Event) : void {
    const target = e?.target as HTMLInputElement
    
    error.value = false;
    if (target && target.files?.length) {
        const filename = target.files[0].name;
        const extension = filename.substring(filename.lastIndexOf('.')+1, filename.length) || filename
        console.log(extension);
        error.value = ['csv', 'tsv'].indexOf(extension) == -1;
    }
}

import {csv, tsv} from 'd3'
const parseUploadedFile = function() : boolean {
    return true;
}
</script>

<template>
    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Upload file</label>
    <p class="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">{{ description }}</p>
    <input
        :accept="accepts"
        class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" 
        aria-describedby="file_input_help" id="file_input" type="file"
        v-on:change="verifyFileType"
        >
    <p class="text-red-500 text-sm italic" v-show="error.valueOf()">File type not accepted.</p>
    <button v-if="parseData" v-on:click="parseUploadedFile">Parse Content</button>
</template>