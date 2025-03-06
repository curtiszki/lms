<!-- Component will display stored data types IFF user is logged in -->
<script setup lang="ts">
    import { UserInformationStore} from '@/stores/user';
</script>

<template>
    <!-- Display if a guest -->
    <div v-if="UserInformationStore.guestStatus">
        <h3>Unable to access database</h3>
        <p>Users are required to be logged into an account if they wish to store and access data.</p>
    </div>
    <!-- Display if signed in -->
    <div v-else>
        
    </div>
</template>