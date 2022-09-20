import Vue from 'vue'
import App from './App.vue'
import store from '@/vuexStore/vuexStore.js';

import {BootstrapVue, BootstrapVueIcons} from 'bootstrap-vue';

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import i18n from '@/plugins/i18n.js'

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store,
  i18n
}).$mount('#app') 
