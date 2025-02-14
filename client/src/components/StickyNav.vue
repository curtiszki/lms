<script lang="ts" setup>
import { RouterLink } from 'vue-router';

import HomeIcon from '@/components/svg/house-solid.vue'
import DataIcon from '@/components/svg/database-solid.vue'
import StatsIcon from '@/components/svg/chart-simple-solid.vue'
import PracticeIcon from '@/components/svg/pencil-solid.vue'
import TestIcon from '@/components/svg/user-graduate-solid.vue'

const NavItems = [
        {
            title: 'Home',
            icon: HomeIcon,
            link: '/home'
        },
        {
            title: 'Data',
            icon: DataIcon,
            link: '/data'
        },
        {
            title: 'Stats',
            icon: StatsIcon,
            link: '/statistics'
        },
        {
            title: 'Practice',
            icon: PracticeIcon,
            link: '/practice'
        },
        {
            title: 'Test',
            icon: TestIcon,
            link: '/test'
        }
    ]


</script>

<template>
    <section id="sticky-nav" class="w-full h-fit box-border px-6">
        <nav class="flex flex-row align-center justify-center gap-y-0 items-center align-middle">
            <RouterLink v-for="item in NavItems" :key="item.link" :to="item.link" class="relative inline-block px-5 text-center py-[4px] hover:bg-slate-900/95">
                <component :is="item.icon" class="fill-slate-700 w-8 mx-auto my-[4px]"></component>
                <p class="text-sm"> {{ item.title }}</p>
            </RouterLink>
        </nav>
    </section>
</template>

<style lang="css" scoped>
@reference "tailwindcss";
.router-link-active {
    @apply bg-slate-700/55
}
</style>