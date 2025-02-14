<script setup lang="ts">
const {} = defineProps<{
  accepts: string,
  description: string,
}>()

import { ref } from 'vue';
const error = ref(true);
const errorMsg = ref('');


const notificationMsg = ref("");

enum notificationTypes {
    NONE="none",
    SUCCESS="success",
    WAITING="waiting"
}

const notificationType = ref(notificationTypes.NONE);

const reader = new FileReader();

import {csvParseRows, tsvParseRows} from 'd3';

const verifyFileType = async function (e: Event) : Promise<void> {
    const target = e?.target as HTMLInputElement    
    error.value = false;
    errorMsg.value = '';
    if (target && target.files?.length) {
        const file = target.files[0];
        const filename = file.name;
        const extension = filename.substring(filename.lastIndexOf('.')+1, filename.length) || filename
        
        if (['tsv', 'csv'].indexOf(extension) == -1) {
            errorMsg.value = 'Unsupported datatype';
            return;
        }

        reader.readAsText(new Blob(
            [file],
            {"type": file.type}
        ))

        await new Promise(resolve => {
            reader.onloadend = (event: ProgressEvent<FileReader>) => {
                if (event.target) {
                    resolve(event.target.result)
                }
            }
        })
        
        const fileString = (reader.result ? reader.result.toString() : '');
        let res = null;

        switch(extension) {
            case 'csv': 
                res = csvParseRows(fileString);
                break;
            case 'tsv':
                res = tsvParseRows(fileString);
                break;
            default:
                errorMsg.value ='Unable to parse datatype';
                return;
        }

        if (!res) {
            errorMsg.value ="Something went wrong parsing the file";
            return;
        }

        notificationMsg.value = "Generated dataset of " + res.length + " items";
        notificationType.value = notificationTypes.SUCCESS;

    }
    }
</script>

<template>
    <div class="flex flex-col gap-2">
        <label class="block text-sm font-medium text-gray-900 dark:text-white" for="file_input">Upload file</label>
        <p class="text-sm text-gray-500 dark:text-gray-300" id="file_input_help">{{ description }}</p>
        <input
            :accept="accepts"
            class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" 
            aria-describedby="file_input_help" type="file"
            v-on:change="verifyFileType"
            >
        <div :class="notificationType">{{notificationMsg}}</div>
        <p class="text-red-500 text-sm italic" v-show="error.valueOf()">{{ errorMsg }}</p>
        <!--
        <button v-if="parseData" v-on:click="parseUploadedFile" 
        class="bg-orange-700 p-2 rounded-lg hover:cursor-not-allowed w-fit transition-colors"
        :class="{'submittable': (!error.valueOf()) }">
        Parse Content</button>
        -->
    </div>
</template>

<style lang="css">
    @reference "tailwindcss";

    .submittable {
        @apply bg-teal-600 max-h-full hover:cursor-pointer
    }

    .success {
        @apply bg-green-400 border-2 border-green-800 text-black
    }
</style>