import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import {routes} from './router/index'
import {store} from './store/store'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(VueAxios, axios);

const router = new VueRouter({routes: routes, mode: 'history'});

new Vue({
  el: '#app',
  router, store,
  render: h => h(App)
});
