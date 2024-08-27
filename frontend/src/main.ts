import { createApp } from 'vue'
import App from '@/app/App.vue'
import router from '@/app/router'
import { createPinia } from 'pinia'

import '@/app/styles/main.scss'

const app = createApp(App)
const pinia = createPinia()

app.use(router)
app.use(pinia)

app.mount('#app')
