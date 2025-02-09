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
    <section id="sticky-nav" class="inset inset border-r-[3px] w-fit h-[100vh]">
        <nav class="flex flex-col align-center gap-4 py-6 items-center align-middle">
            <RouterLink v-for="item in NavItems" :to="item.link" class="relative inline-block w-14 text-center py-[4px] hover:bg-slate-900/95">
                <component :is="item.icon" class="fill-slate-700 w-[40%] mx-auto my-[4px]"></component>
                <p class="text-xs"> {{ item.title }}</p>
                <span class="bg-teal-300 absolute w-[3px] h-full top-0 right-[-3px]"></span>
            </RouterLink>
        </nav>
    </section>
</template>