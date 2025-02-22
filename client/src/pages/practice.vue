<script setup lang="ts">
import GridLayout from '@/layouts/GridLayout.vue';
import GenerativeJson from '@/components/GenerativeJson.vue';

// Just for testing purposes!
import { GenerationTypes } from '@/components/defines/types';

import * as dataJson from "@/services/datasets/sampleJson";
const data = dataJson.mcq_multiple;
</script>

<template>
    <GridLayout>
        <GenerativeJson :type="GenerationTypes.MULTIPLE_CHOICE"  :validated-object="data">
        </GenerativeJson>
    </GridLayout>
</template>