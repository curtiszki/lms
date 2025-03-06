import { createApp } from 'vue'
//import { createHead } from '@unhead/vue'

import App from '@/App.vue'
import router from '@/router/index'
import { PiniaInstance } from './stores/pinia';
import PrimeVue from 'primevue/config';

// pinia to save state
const app = createApp(App);
app.use(PrimeVue);
app.use(router);
app.use(PiniaInstance);
app.mount('#app');