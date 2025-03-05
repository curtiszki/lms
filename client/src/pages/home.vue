<script setup lang="ts">
    import GridLayout from '@/layouts/GridLayout.vue';
    import Tile from '@/components/Tile.vue';
    import LargeTitle from '@/components/LargeTitle.vue';
    import ParseData from '@/components/ParseData.vue';
    import TextGenerate from '@/components/TextGenerate.vue';
    import { inputTypes } from '@/components/defines/types';
    import { UserInformationStore } from '@/stores/user';

    const userInfo = UserInformationStore();
    
    const greetingInformation : { title: string, message: string } = (userInfo.guestStatus) ? {
        title: "Welcome, guest",
        message: "As a guest you are not able to access or save storage data. Please sign up if you wish to do so."
    } : {
        title: `Welcome, ${userInfo.username}`,
        message: "Practice using already generated content or upload some new information below to generate new study content."
    };


</script>

<template>
    <GridLayout>
        <LargeTitle :title=greetingInformation.title></LargeTitle>
        <p>{{ greetingInformation.message }}</p>
        <Tile title="Datasets" v-if="!userInfo.guestStatus">
            TODO
        </Tile>
        <Tile title="Flashcards">
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