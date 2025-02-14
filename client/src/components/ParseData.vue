<script setup lang="ts">
import { notificationTypes, inputTypes } from './types/types';

const {} = defineProps<{
  accepts: string,
  description: string,
  verifyType: inputTypes
}>()

import { ref } from 'vue';

const notificationMsg = ref("");
const notificationType = ref(notificationTypes.NONE);

import {csvParseRows, tsvParseRows} from 'd3';

const verifyFileType = async function (e:Event, type : inputTypes) : Promise<void> {
    const target = e?.target as HTMLInputElement    
    notificationType.value = notificationTypes.WAITING;
    
    if (target && target.files?.length) {
        const file = target.files[0];
        const filename = file.name;
        const extension = filename.substring(filename.lastIndexOf('.')+1, filename.length) || filename
        
        if (type === inputTypes.DSV) {
            verifyDsv(file, extension);
        }
        else if (type === inputTypes.TEXT) {
            verifyText(file, extension);
        }
        else {
            notificationMsg.value = 'Unable to process selected input type. No supporting function.'
            notificationType.value = notificationTypes.FAILURE;
            return;
        }
    }
}

const verifyText = async function(file: File, extension: string) : Promise<void> {
    if (extension != 'txt') {
        notificationMsg.value = 'Unsupported datatype';
        notificationType.value = notificationTypes.FAILURE;
        return;
    }
    
    const reader = new FileReader();
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

    const res = reader.result ? reader.result.toString() : '';

    notificationType.value = notificationTypes.SUCCESS;
    notificationMsg.value = res;
}

const verifyDsv = async function(file : File, extension : string) : Promise<void> {
    if (['tsv', 'csv'].indexOf(extension) == -1) {
        notificationMsg.value = 'Unsupported datatype';
        notificationType.value = notificationTypes.FAILURE;
        return;
    }

    const reader = new FileReader();
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
            notificationMsg.value ='Unable to parse datatype';
            notificationType.value = notificationTypes.FAILURE;
            return;
    }

    if (!res) {
        notificationMsg.value ="Something went wrong parsing the file";
        notificationType.value = notificationTypes.FAILURE;
        return;
    }

    notificationMsg.value = "Generated dataset of " + res.length + " items";
    notificationType.value = notificationTypes.SUCCESS;
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
            v-on:change="verifyFileType($event, verifyType)"
            >
        <div :class="notificationType" class="text-sm italic" :data-notification="notificationType">{{notificationMsg}}</div>
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
        @apply text-green-500
    }

    .failure {
        @apply text-red-500
    }
</style>