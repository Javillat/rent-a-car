/* eslint-disable semi */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import VueRouter from './router';
import axios from 'axios';
import Vuex from 'vuex';

Vue.config.productionTip = false

// Vue.use(VueRouter);
Vue.use(Vuex);

Vue.prototype.$http = axios.create({
  baseURL: 'http://localhost:5000'
});

const store = new Vuex.Store({
  state: {
    isLoggedIn: false,
    idToken: null
  },
  mutations: {
    SETH_AUTH (state, payload) {
      state.isLoggedIn = payload.isLoggedIn;
      state.idToken = payload.idToken;
    }
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: VueRouter,
  store,
  components: { App },
  template: '<App/>'
});
