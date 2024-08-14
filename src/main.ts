import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { piniaInstance } from './global'

const app = createApp(App)

app.use(router).use(piniaInstance)
app.mount('#app')
