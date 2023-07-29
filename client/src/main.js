// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
import Vuex from 'vuex';


Vue.config.productionTip = false

Vue.use(router);
Vue.use(Vuex);

Vue.prototype.$http = axios.create({
  baseURL: 'http://localhost:5000'
});

import RegisterComponent from './components/RegisterComponent.vue';
import LoginComponent from './components/LoginComponent.vue';
import LogoutComponent from './components/LogoutComponent.vue';
import HomeComponent from './components/HomeComponent.vue';
import CarsComponent from './components/CarsComponent.vue';
import CarDetailsComponent from './components/CarDetailsComponent.vue';
import RentalComponent from './components/RentalComponent.vue';
import ReturnComponent from './components/ReturnComponent.vue';

const routes = [
  {path: '/', component: HomeComponent},
  {path: '/login', component: LoginComponent},
  {path: '/register', component: RegisterComponent},
  {path: '/logout', component: LogoutComponent},
  {path: '/car', component: CarsComponent},
  {path: '/car/detail', component: CarDetailsComponent},
  {path: '/rent/:carId', component: RentalComponent},
  {path: '/return/:rentalId', component: ReturnComponent},
];

const router = new router({
  routes
});

const store = new Vuex.Store({
  state: {
    isLoggedIn: false,
    iDToken: null,
  },
  mutations: {
    SETH_AUTH(state, payload){
      state.isLoggedIn =payload.isLoggedIn;
      state.iDToken = payload.iDToken;
    },
  },
});



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
