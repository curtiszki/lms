import { createApp } from 'vue'
//import { createHead } from '@unhead/vue'

import App from '@/App.vue'
import router from '@/router/index'
import { createPinia } from 'pinia'

// pinia to save state
const pinia = createPinia();
const app = createApp(App);
app.use(router);
app.use(pinia);

app.mount('#app');