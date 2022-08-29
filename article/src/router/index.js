import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    redirect: '/login'
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue'),
    redirect:'/per',
    
    children: [
      {
        path: '/per',
        name: 'per',
        component: () => import('../views/PersonalView.vue'),
      },
      {
        path: '/number',
        name: 'number',
        component: () => import('../views/NumberView.vue'),
      },
      {
        path: '/user',
        name: 'user',
        component: () => import('../views/UserView.vue'),
      },
      {
        path: '/roles',
        name: 'roles',
        component: () => import('../views/RolesView.vue'),
      },
      {
        path: '/right',
        name: 'right',
        component: () => import('../views/RightView.vue'),
      },
      {
        path: '/article',
        name: 'article',
        component: () => import('../views/ArticleView.vue'),
      },
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue')
  },
]

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  const token = sessionStorage.getItem('token')
  if (token && to.path == '/login') {
    next('/about')
  }
  if (!token && to.path == '/about') {
    next('/login')
  }
  next()
})
export default router
