<script setup lang="ts">
    import GridLayout from '@/layouts/GridLayout.vue';
    import Tile from '@/components/Tile.vue';
    import LargeTitle from '@/components/LargeTitle.vue';
    import ParseData from '@/components/ParseData.vue';
    import TextGenerate from '@/components/TextGenerate.vue';
    import { inputTypes } from '@/components/defines/types';
</script>

<template>
    <GridLayout>
        <LargeTitle title="Welcome, user_name"></LargeTitle>
        <Tile title="Flashcards">
            <p>As a guest, you are not able to to access stored data, please sign up if you wish to do so.</p>
            <ParseData :verifyType="inputTypes.DSV" accepts=".tsv,.csv" description="If you have an appropriately formatted file (comma-separated file or tab-separated file),
                you can import them to generate new flashcard datasets. (TSV or CSV. Tab-separated values or comma-separated value files only.)"
                :parseData=true></ParseData>
        </Tile>
        <Tile title="Import Data">
            <TextGenerate></TextGenerate>
        </Tile>
    </GridLayout>
</template>

<style lang="css">
    @reference "tailwindcss";    
</style>