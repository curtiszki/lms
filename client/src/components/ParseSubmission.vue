<script setup lang="ts">
    const {} = defineProps<{
    subject: InformationTypes,
    res: string,
    }>()
    const error = ref({
        active: false,
        errorMsg: ''
    });
    let generateType;
    import { validateJsonObject } from "@/services/parseGenerativeJson";
    import { GenerationTypes, InformationTypes, notificationTypes, type DataGenerationInformation } from "./defines/types";
    import { ref } from "vue";
    import { config } from "./defines/config";

    import { informationStore } from "@/stores/state";
import type { examSchema } from "./defines/responseSchema";
    const store = informationStore();

    const notificationMsg = ref("");
    const notificationType = ref(notificationTypes.NONE);
    const generateContent = async function(res : string, subject: InformationTypes) : Promise<void> {
        // Validate first
        if (!generateType) {
            error.value.active = true;
            error.value.errorMsg = 'Select an output type.';
            return;
        }
        
        if (!res.length) {
            error.value.active = true;
            error.value.errorMsg = 'Empty input.';
            return;
        }

        error.value.active = false;
        error.value.errorMsg = '';
        
        notificationMsg.value = 'Waiting...';
        notificationType.value = notificationTypes.WAITING;

        const data : DataGenerationInformation = {
            information: res,
            informationType : subject, 
            generationType : generateType,
        }
        
        // Post data and wait for response
        const postRequest = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        };

        let json;
        try {
            const target = [config.SITE_BASE_URL, 'generate', 'dataset'].join('/');
            const response = await fetch(target, postRequest);
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            json = await response.json();
        } catch(e) {
            notificationMsg.value = 'Error generating data...';
            notificationType.value = notificationTypes.FAILURE;
            console.error(e);
            return;
        }

        const jsonObj = JSON.parse(json);

        
        let entries = validateJsonObject(generateType,jsonObj);
        if (!entries) {
            notificationMsg.value = 'An error occurred while generating data.';
            notificationType.value = notificationTypes.FAILURE;
            return;
        }
        entries = entries as [string, object][];
        let msg;
        switch (generateType) {
            case GenerationTypes.EXAM:
                // multiple types
                const obj = jsonObj as examSchema;
                msg = `Generated exam containing ${obj.multiple.length} multiple choice questions and ${obj.long.questions.length} long question responses.`
                break;
            case GenerationTypes.FLASHCARD:
                msg = `Generated ${entries.length} flashcards.`
                break;
            case GenerationTypes.MULTIPLE_CHOICE:
                msg = `Generated ${entries.length} multiple choice questions.`
                break;
            default:
                msg = 'Unsupported generation type. No action for data.'
                break;
        }
        notificationMsg.value = msg;
        notificationType.value = notificationTypes.SUCCESS;
        store.setInformation(jsonObj, generateType);
    }

</script>

<template>
    <div class="self-center">
        <p class="text-red-500 text-sm italic" :v-show="error.active">{{ error.errorMsg }}</p>
        <div class="flex flex-row gap-20 align-middle items-end">
            <!-- Dropdown -->
            <form class="max-w-sm mx-0" ref="dropdown">
                <label for="generate-type" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an option</label>
                <select id="generate-type" name="generate-type" v-model="generateType" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option v-bind:value=null selected>Select Output</option>
                    <option :key="generation" v-for="generation in GenerationTypes" v-bind:value="generation">
                        {{ generation.valueOf()  }}
                    </option>
                </select>
            </form>
            <button class="relative inline-flex justify-center overflow-hidden p-[2px] text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 w-fit h-fit"
            v-on:click="generateContent(res, subject)"
            >
                <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                    Generate content
                </span>
            </button>
        </div>
        <div :class="notificationType" class="text-sm italic justify-center my-5" :data-notification="notificationType">
            <p>{{notificationMsg}}</p>
            <div class="flex flex-row gap-y-0 gap-x-3 justify-evenly" v-show="notificationType===notificationTypes.SUCCESS">
                <RouterLink to="practice" class="link" >Try it out?</RouterLink>
                <RouterLink to="data" class="link">See Data.</RouterLink>
            </div>
        </div>
    </div>
</template>
  
<style lang="css" scoped>
    @reference "tailwindcss";

    .success {
        @apply block border-teal-300 border-2;
    }

    .link {
        @apply inline-flex my-1;     
    }
</style>