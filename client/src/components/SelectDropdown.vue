<script setup lang="ts">
defineProps<{
  initialPrompt: string,
  options: string[]
}>()
</script>

<template>
    <form class="max-w-sm mx-0">
        <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an option</label>
        <select id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        <option selected>{{ initialPrompt }}</option>
        <option :key="option" v-for="option in options" :val="option">
            {{ option  }}
        </option>
        </select>
    </form>
</template>
  