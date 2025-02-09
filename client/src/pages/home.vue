<script setup lang="ts">
    import GridLayout from '@/layouts/GridLayout.vue';
    import Tile from '@/components/Tile.vue';
</script>

<template>
    <GridLayout>
        <Tile class="bg-teal-200">
            <h3>Welcome, user_name.</h3>
            <p>Some details to go here.</p>
        </Tile>
        <Tile>
            <p>You currently have 321 decks blah blah blah</p>
            <p>You wanna do something??</p>
            <button></button>
        </Tile>
        <Tile>
            <p>Would you like to add </p>
        </Tile>
    </GridLayout>
</template>

<style lang="css">
    @reference "tailwindcss";
    
    .tile {
        @apply bg-white border-gray-300;
    }
</style>