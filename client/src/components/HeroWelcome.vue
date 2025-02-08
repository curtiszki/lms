<script setup lang="ts">
import Login from './Login.vue';
defineProps<{
  heading: string,
  description?: string
}>()
</script>

<template>
  <div class="hero-container ring-2 ring-indigo-300 box-content p-4 rounded-lg 
  bg-black/95 z-10 max-w-120 min-h-80 text-center 
  leading-snug relative top-[-5%]">
    <div class="text-3xl mb-2 font-bold green">
      <h3>{{ heading }}</h3>
    </div>
    <p>
      {{ description }}
    </p>
    <Login></Login>
  </div>
</template>

<style>
  @reference "tailwindcss";
  .hero-container {
    @apply flex flex-col justify-center items-center gap-2 sm:min-w-sm lg:min-w-lg sm:max-w-md md:max-w-lg lg:max-w-xl
  }
  .btn {
    @apply rounded-md bg-slate-700 px-2 py-1;
  }

  .btn:hover {
    @apply bg-slate-800/75
  }
</style>