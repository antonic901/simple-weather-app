import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { createPinia, PiniaVuePlugin } from 'pinia'
import VueCompositionAPI from '@vue/composition-api'
// import socketio from 'socket.io'
// import  VueSocketIO from 'vue-socket.io'

// export const socket = socketio('http://192.168.0.13:9007');
// Vue.use(VueSocketIO, socket)

Vue.use(PiniaVuePlugin)
const pinia = createPinia()
Vue.use(VueCompositionAPI)

Vue.config.productionTip = false;

Vue.use(VueAxios, axios);

axios.defaults.baseURL = process.env.VUE_APP_BACKEND_ENDPOINT;

new Vue({
  vuetify,
  router,
  pinia,
  render: h => h(App)
}).$mount('#app')
