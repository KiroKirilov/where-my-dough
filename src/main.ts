import { createApp } from 'vue'
import App from './App.vue'
import formatDateFilter from './filters/formatDateFilter'
import './registerServiceWorker'
import router from './router'

const app = createApp(App)

app
  .use(router)
  .mount('#app');

app.config.globalProperties.$filters = {
  formatDate: formatDateFilter
}
