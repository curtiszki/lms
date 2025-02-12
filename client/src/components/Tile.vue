<script setup lang="ts">
defineProps<{
  title?: string
}>()
</script>

<template>
    <div class="bg-gray-600/35 rounded-sm px-4 py-3 w-full max-w-[1080px]">
        <h4 v-if="title"
            class="font-bold text-lg relative"
        >{{ title }}
            <span class="absolute w-[90%] left-0 bottom-0 h-[1px] rounded-full bg-black/30"></span>
        </h4>
        <div class="my-3">
            <slot></slot>
        </div>
    </div>
</template>