<script setup lang="ts">
import { notificationTypes, inputTypes, FlashcardType, GenerationTypes } from './defines/types';
import { sizeLimits } from './defines/constants';
const {} = defineProps<{
  accepts: string,
  description: string,
  verifyType: inputTypes,
}>()

import { ref } from 'vue';

const notificationMsg = ref("");
const notificationType = ref(notificationTypes.NONE);
const emit = defineEmits(['load']);

import { InformationStore } from '@/stores/state';
const store = InformationStore();

import Papa from "papaparse"

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

    if (file.size > sizeLimits.text) {
        notificationMsg.value = `Input file is too long. (Max ${sizeLimits.text} characters).`
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
    notificationMsg.value = '';
    emit('load', res);
}

const verifyDsv = async function(file : File, extension : string) : Promise<void> {
    if (['tsv', 'csv'].indexOf(extension) == -1) {
        notificationMsg.value = 'Unsupported datatype';
        notificationType.value = notificationTypes.FAILURE;
        return;
    }

    if (file.size > sizeLimits.dsv) {
        notificationMsg.value = `Input file is too long. (Max ${sizeLimits.dsv} characters).`
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
    
    
    let delimiter;
    switch(extension) {
        case 'csv':
            delimiter = ','; 
            break;
            case 'tsv':
                delimiter = '\t';
                break;
                default:
                    notificationMsg.value ='Unable to parse datatype';
            notificationType.value = notificationTypes.FAILURE;
            return;
        }
        
    const headerRow = [FlashcardType.question, FlashcardType.answer];
    const fileString = headerRow.join(delimiter) +'\r\n' + (reader.result ? reader.result.toString() : '');
    const res = Papa.parse(fileString, {
        delimiter: delimiter,
        header: true,
        skipEmptyLines: true,
        delimitersToGuess: [delimiter]
    });
    if (!res) {
        notificationMsg.value ="Something went wrong parsing the file";
        notificationType.value = notificationTypes.FAILURE;
        return;
    }

    // Ignore the column property
    store.setInformation(res.data, GenerationTypes.FLASHCARD);
    notificationMsg.value = "Generated dataset of " + res.data.length + " items";
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
        <div :class="notificationType" class="text-sm italic justify-center my-5" :data-notification="notificationType" v-if="notificationType === notificationTypes.SUCCESS">
            <p>
                {{notificationMsg}}
            </p>
            <div class="flex flex-row gap-y-0 gap-x-3 justify-evenly" v-show="notificationType===notificationTypes.SUCCESS">
                <RouterLink to="practice" class="link" >Try it out?</RouterLink>
                <RouterLink to="data" class="link">See Data.</RouterLink>
            </div>
        </div>
    </div>
</template>