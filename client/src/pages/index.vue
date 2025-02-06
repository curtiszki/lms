<script setup lang='ts'>
import {useHead} from '@unhead/vue'
import AppLayout from '@/layouts/AppLayout.vue'
import heroImg from '@/assets/images/c.jpg'

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
            <div id="home-container"  class="block text-3xl font-bold">
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
                <img :src="heroImg" alt="" class="w-full h-full object-contain">
            </div>
        </div>
    </AppLayout>
</template>

<style scoped>
</style>