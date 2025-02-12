<script lang="ts" setup>
    import StickyNav from '@/components/StickyNav.vue'
</script>

<template>
    <div class="flex flex-col w-full items-center text-center justify-center gap-8">
        <StickyNav class="sticky top-0"></StickyNav>
        <slot></slot>
    </div>
</template>