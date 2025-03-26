import Vue from 'vue'
import router from '~/router'
import App from '~/components/App'
import VueLocalStorage from 'vue-localstorage'
import vueDebounce from 'vue-debounce'
import store from '~/store'

import '~/components'

Vue.config.productionTip = false

Vue.use(VueLocalStorage)
Vue.use(vueDebounce)

new Vue({
  store,
  router,
  ...App
})
