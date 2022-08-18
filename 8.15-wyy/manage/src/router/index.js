import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    redirect:'/student',
    children: [
      {
        path: '/student',
        name: 'student',
        component: () => import('../views/StudentView.vue'),
        meta:{title:['学员管理']}
      },
      {
        path: '/teacther',
        name: 'teacther',
        component: () => import('../views/TeactherView.vue'),
        meta:{title:['讲师管理']}
      },
      {
        path: '/assistant',
        name: 'assistant',
        component: () => import('../views/AssistantView.vue'),
        meta:{title:['助教管理']}
      }
    ]
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
