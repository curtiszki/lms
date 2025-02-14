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
            <p>You currently have 321 decks blah blah blah</p>
            <p>You wanna do something??</p>
            <p>Conditionally display the number of remaining things to study.</p>
            <br>
            <ParseData :verifyType="inputTypes.DSV" accepts=".tsv,.csv" description="If you have an appropriately formatted file (comma-separated file or tab-separated file),
                you can import them to generate new flashcard datasets. (TSV or CSV. Tab-separated values or comma-separated value files only.)"
                :parseData=true></ParseData>
        </Tile>
        <Tile title="Subjects">
            <p>Would you like to add </p>
        </Tile>
        <Tile title="Import Data">
            <TextGenerate></TextGenerate>
        </Tile>
    </GridLayout>
</template>

<style lang="css">
    @reference "tailwindcss";    
</style>