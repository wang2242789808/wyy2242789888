import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    redirect:'/book',
    children:[
      {
        path: '/book',
        name: 'book',
        component: () => import('../views/BookView.vue')
      },
      {
        path: '/back',
        name: 'back',
        component: () => import('../views/BackView.vue')
      },
      {
        path: '/inta',
        name: 'inta',
        component: () => import('../views/IntanationView.vue')
      },
      {
        path: '/table',
        name: 'table',
        component: () => import('../views/TableView.vue')
      },
      {
        path: '/tab',
        name: 'tab',
        component: () => import('../views/TabView.vue')
      }
    ]
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue')
  },
  
]

const router = new VueRouter({
  routes
})

export default router
