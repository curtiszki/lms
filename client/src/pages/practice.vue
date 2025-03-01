<script setup lang="ts">
import GridLayout from '@/layouts/GridLayout.vue';
import GenerativeJson from '@/components/GenerativeJson.vue';

// Just for testing purposes!
import { GenerationTypes } from '@/components/defines/types';

import { informationStore } from '@/stores/state';
const store = informationStore();
</script>

<template>
    <GridLayout>
        <div v-if="store.generationType === GenerationTypes.NONE || !store.information">
            <p>No input data.</p>
        </div>
        <GenerativeJson v-else :type="store.generationType"  :validated-object="store.information">
        </GenerativeJson>
    </GridLayout>
</template>