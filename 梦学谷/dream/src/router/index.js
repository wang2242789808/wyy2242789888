import Vue from 'vue'
import VueRouter from 'vue-router'
// import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    // component: HomeView,
    redirect: '/login'
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue'),
    redirect:'/homePage',
    children: [
      {
        path: '/homePage',
        name: 'homePage',
        component: () => import('../views/HomePageView.vue'),
        meta:{title:['首页']}
      },
      {
        path: '/member',
        name: 'member',
        component: () => import('../views/MemberView.vue'),
        meta:{title:['会员管理']}
      },
      {
        path: '/supplier',
        name: 'supplier',
        component: () => import('../views/SupplierView.vue'),
        meta:{title:['供应商管理']}
      },
      {
        path: '/goods',
        name: 'goods',
        component: () => import('../views/GoodsView.vue'),
        meta:{title:['商品管理']}
      },
      {
        path: '/staff',
        name: 'staff',
        component: () => import('../views/StaffView.vue'),
        meta:{title:['员工管理']}
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
