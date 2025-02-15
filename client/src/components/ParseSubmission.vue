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
    import { GenerationTypes, InformationTypes } from "./defines/types";
    import { ref } from "vue";
    // Temporary until serverside is established, don't want to expose API
    //import { DataGenerator, type DataGenerationInformation } from "@/api/generateData";

    const generateContent = function(res : string, subject: InformationTypes) : void {
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
        
        /*
        const data : DataGenerationInformation = {
            information: res,
            informationType : subject, 
            generationType : generateType,
        }

        const generator = DataGenerator.getInstance;
        generator.generateInformation(data);
        */
    }

</script>

<template>
    <div>
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
    </div>
</template>
  