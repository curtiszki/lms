<!-- Component that will accept JSON data, and then use that data to render corresponding html output -->
<script setup lang="ts">
import { GenerationTypes } from './defines/types';

const props = defineProps<{
    validatedObject: JSON,
    type: GenerationTypes
}>()
</script>

<template>
    <div v-if="props.validatedObject">
        <div v-if="type === GenerationTypes.MULTIPLE_CHOICE">
            <div v-for="(item, index) in validatedObject" v-bind:key=index>
                <p>{{ index  }}</p>
            </div>
        </div>
        <div v-else-if="type === GenerationTypes.FLASHCARD">
    
        </div>
        <div v-else-if="type === GenerationTypes.EXAM">
    
        </div>
    </div>
    <div v-else>
        <p>There was an issue rendering the information. The data type is unsupported.</p>
    </div>
</template>