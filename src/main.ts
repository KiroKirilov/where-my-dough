import { createApp } from 'vue'
import App from './App.vue'
import { clickOutsideDirective } from './directives/clickOutsite'
import { formatNumberFilter } from './filters/numberFilters'
import { dateFormatFilter } from './filters/dateFilters'
import './registerServiceWorker'
import router from './router'

const app = createApp(App)

app.directive('click-outside', clickOutsideDirective);

app
  .use(router)
  .mount('#app');

app.config.globalProperties.$filters = {
  formatDate: dateFormatFilter,
  formatNumber: formatNumberFilter
}
