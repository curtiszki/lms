import { createApp } from 'vue'
//import { createHead } from '@unhead/vue'

import App from '@/App.vue'
import router from '@/router/index'
import { createPinia } from 'pinia'
import { UserInformationStore } from './stores/user';

// pinia to save state
const pinia = createPinia();
const app = createApp(App);

app.use(router);
app.use(pinia);
// initialize userdata store
UserInformationStore();

app.mount('#app');