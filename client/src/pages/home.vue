<script setup lang="ts">
    import GridLayout from '@/layouts/GridLayout.vue';
    import Tile from '@/components/Tile.vue';
    import LargeTitle from '@/components/LargeTitle.vue';
</script>

<template>
    <GridLayout>
        <LargeTitle title="Welcome, user_name"></LargeTitle>
        <Tile title="Flashcards">
            <p>You currently have 321 decks blah blah blah</p>
            <p>You wanna do something??</p>
            <p>Conditionally display the number of remaining things to study.</p>
            <br>
            <p>If you have an appropriately formatted file (comma separated file, tab separated file, or space separated file),
                you can import them to generate new flashcard datasets.
            </p>
            <button>Import Data</button>
        </Tile>
        <Tile title="Subjects">
            <p>Would you like to add </p>
        </Tile>
        <Tile title="Import Data">
            

        </Tile>
    </GridLayout>
</template>

<style lang="css">
    @reference "tailwindcss";    
</style>