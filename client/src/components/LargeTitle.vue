<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<template>
    <h1 class="text-3xl font-bold relative w-fit">{{ title }}
        <span class="absolute inline-block bg-slate-400/30 bottom-[-5px] left-0 w-full h-[2px] rounded-full"></span>
    </h1>
</template>