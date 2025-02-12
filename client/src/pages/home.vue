<script setup lang="ts">
    import GridLayout from '@/layouts/GridLayout.vue';
    import Tile from '@/components/Tile.vue';
    import LargeTitle from '@/components/LargeTitle.vue';
    import ParseData from '@/components/ParseData.vue';
</script>

<template>
    <GridLayout>
        <LargeTitle title="Welcome, user_name"></LargeTitle>
        <Tile title="Flashcards">
            <p>You currently have 321 decks blah blah blah</p>
            <p>You wanna do something??</p>
            <p>Conditionally display the number of remaining things to study.</p>
            <br>
            <ParseData accepts=".tsv,.csv" description="If you have an appropriately formatted file (comma-separated file or tab-separated file),
                you can import them to generate new flashcard datasets. (TSV or CSV. Tab-separated values or comma-separated value files only.)"
                :parseData=true></ParseData>
        </Tile>
        <Tile title="Subjects">
            <p>Would you like to add </p>
        </Tile>
        <Tile title="Import Data">
            <ParseData accepts=".txt" description="If you have some textual information, you can use it below as data to generate question content. Text files (.txt) only."></ParseData>
            <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your message</label>
            <textarea id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
            <button>Submit</button>
        </Tile>
    </GridLayout>
</template>

<style lang="css">
    @reference "tailwindcss";    
</style>