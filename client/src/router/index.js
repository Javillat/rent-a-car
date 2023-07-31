import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
// import RegisterComponent from '../components/RegisterComponent.vue';
import LoginComponent from '../components/LoginComponent.vue'
// import LogoutComponent from '../components/LogoutComponent.vue';
import HomeComponent from '../components/HomeComponent.vue'
import CarsComponent from '../components/CarsComponent.vue'
// import CarDetailsComponent from '../components/CarDetailsComponent.vue';
import RentalComponent from '../components/RentalComponent.vue'
import ReturnComponent from '../components/ReturnComponent.vue'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // }
    {
      path: '/login',
      name: 'login',
      component: LoginComponent
    },
    // {path: '/register', component: RegisterComponent},
    {
      path: '/car',
      name: 'Car',
      component: CarsComponent},
    // {path: '/car/detail', component: CarDetailsComponent},
    {path: '/rent/:carId', component: RentalComponent},
    {path: '/return/:rentalId', component: ReturnComponent},
    {path: '/', name: 'Home', component: HomeComponent}
  // {path: '/logout', component: LogoutComponent},
  ]
})
