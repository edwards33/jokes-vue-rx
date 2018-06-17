import Vue from 'vue'
import App from './App.vue'
import Rx from 'rxjs'
import VueRx from 'vue-rx'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Buefy from 'buefy'
import 'buefy/lib/buefy.css'

Vue.use(Buefy)
Vue.use(VueRx, Rx)
Vue.use(VueAxios, axios)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
