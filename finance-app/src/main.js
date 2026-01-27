import { createApp } from 'vue'
import { Analytics } from '@vercel/analytics/vue'
import App from './App.vue'
import router from './router'
import './style.css'

const app = createApp(App)
app.use(router)
app.mount('#app')


