<script setup lang='ts'>
import {useHead} from '@unhead/vue'
import AppLayout from '@/layouts/AppLayout.vue'

const darkHeroBg = {
    sm: 'images/dark-hero/small.jpg',
    md: 'images/dark-hero/medium.jpg',
    lg: 'images/dark-hero/large.jpg',
    xl: 'images/dark-hero/xl.jpg'
}

    useHead({
        title: 'IPJ',
        meta: [
           {
            name: 'name',
            content: 'content'
           } 
        ],
        link: [
            {
                rel: 'stylesheet',
                href: '/src/assets/main.css',
            }
        ]
    })
</script>

<template>
    <AppLayout>
        <div class="relative min-w-screen min-h-screen">
            <div id="home-container"  class="block text-3xl font-bold opacity-0">
                <h1>
                    Welcome! SUNNY
                </h1>
                <p>
                    Please sign in below, continue as a guest or
                    <a href="#">create an account.</a>
                </p>
                <div>
                </div>
                <form action="post">
    
                </form>
                <a href="#">Login</a>
                <a href="/home">Continue as Guest</a>
            </div>
            <div class="w-full h-full absolute left-0 top-0 bg-[#030f0f]">
                <img :srcset="`${darkHeroBg.sm} 640w, ${darkHeroBg.md} 1920w, ${darkHeroBg.lg} 2400w, ${darkHeroBg.xl} 6000w`"
                    sizes="(max-width: 640px) 640px, (max-width: 1920px) 1920px, (max-width: 2400px) 2400px, (min-width:2401px) 6000px" 
                    alt="" 
                    class="w-full h-full object-fill object-center aspect-auto">
            </div>
        </div>
    </AppLayout>
</template>

<style scoped>
</style>