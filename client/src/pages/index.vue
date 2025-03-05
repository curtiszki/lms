<script setup lang='ts'>
//import {useHead} from '@unhead/vue'
import AppLayout from '@/layouts/AppLayout.vue'
import HeroWelcome from '@/components/HeroWelcome.vue';

const darkHeroBg = {
    sm: 'images/dark-hero/small.jpg',
    md: 'images/dark-hero/medium.jpg',
    lg: 'images/dark-hero/large.jpg',
    xl: 'images/dark-hero/xl.jpg'
}
</script>

<template>
    <AppLayout>
        <div class="relative min-w-screen min-h-screen grid items-center align-middle justify-center">
            <div class="w-full h-full absolute left-0 top-0 bg-[#030f0f]">
                <img :srcset="`${darkHeroBg.sm} 640w, ${darkHeroBg.md} 1920w, ${darkHeroBg.lg} 2400w, ${darkHeroBg.xl} 6000w`"
                    sizes="(max-width: 640px) 640px, (max-width: 1920px) 1920px, (max-width: 2400px) 2400px, (min-width:2401px) 6000px" 
                    alt="" 
                    class="w-full h-full object-fill object-center aspect-auto">
            </div>
            <HeroWelcome
            ></HeroWelcome>
        </div>
    </AppLayout>
</template>