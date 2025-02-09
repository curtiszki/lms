<script lang="ts" setup>
    import StickyNav from '@/components/StickyNav.vue'
</script>

<template>
    <div class="flex flex-row">
        <StickyNav class="sticky top-0"></StickyNav>
        <div class="w-full box-content mx-2 ml-4 my-5">
            <slot></slot>
        </div>
    </div>
</template>