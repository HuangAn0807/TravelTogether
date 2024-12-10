import './assets/base.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persistedstate';
import { Lazyload } from 'vant';
const pinia = createPinia();
pinia.use(piniaPersist);
 
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(Lazyload, {
    lazyComponent: true,
  });

app.mount('#app')
