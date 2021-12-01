
// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import './styles/global.scss'
import './styles/article-detail.scss'
import store from './store/index.js'

import * as filters from './filters/index.js'

Object.keys(filters).forEach(key => {
	Vue.filter(key, filters[key]);
});

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App,
		store
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif