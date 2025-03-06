<!-- Component will display stored data types IFF user is logged in -->
<script setup lang="ts">
import { InformationStore } from '@/stores/state';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { GenerationTypes } from './defines/types';
import { ref } from 'vue';
import type { examSchema } from './defines/responseSchema';
    const store = InformationStore;

    const display = {
        [GenerationTypes.FLASHCARD] : {
            columns : ['question', 'answer'],
            titles : ['Question', 'Answer'],
            sizes: ['50%', '50%'],
        },
        [GenerationTypes.MULTIPLE_CHOICE] : {
            columns: ['question', 'answer', 'options'],
            titles: ['Question', 'Answer', 'Options'],
            sizes: ['30%', '30%', '40%']
        },
        [GenerationTypes.EXAM]: {
            columns: ["question"],
            titles: ['Question'],
            sizes: ['100%']
        },
    }

    console.log(store.information);

    // to stop typescript from complaining
    const data = store.generationType ? display[store.generationType] : {columns: [], titles: [], sizes: []};
</script>

<template>
    <div class="w-full h-fit">
        <div v-if="!store.information">
            <p>Error: There is no data item to display. 
                <RouterLink to="/home" class="link">Return</RouterLink>
            </p>
        </div>
        <div v-else>
            <DataTable :value="(store.information as object[])" v-if="store.generationType != GenerationTypes.EXAM">
                <Column v-for="(field, idx) of data.columns" :key="field" :field="field" :header="data.titles[idx]" :style="`width: ${data.sizes[idx]}`"></Column>
            </DataTable>
            <div v-else>
                <!-- MCQ -->
                <DataTable :value="(store.information as examSchema).multiple">
                    <Column v-for="(field, idx) of display[GenerationTypes.MULTIPLE_CHOICE].columns" :key="field" :field="field" :header="data.titles[idx]" :style="`width: ${data.sizes[idx]}`"></Column>
                </DataTable>
                <!-- Long answer-->
                <DataTable :value="(store.information as examSchema).long">
                    <Column v-for="(field, idx) of display[GenerationTypes.EXAM].columns" :key="field" :field="field" :header="data.titles[idx]" :style="`width: ${data.sizes[idx]}`"></Column>
                </DataTable>
            </div>
        </div>
    </div>
</template>