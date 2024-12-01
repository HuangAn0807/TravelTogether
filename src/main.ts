import './assets/base.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persistedstate';
 
const pinia = createPinia();
pinia.use(piniaPersist);
 
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(pinia)
app.use(router)

app.mount('#app')
