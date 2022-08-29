import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import vuex_index from '../store/index'
Vue.use(VueRouter)
// 解决：Uncaught (in promise) NavigationDuplicated; 
let originalPush = VueRouter.prototype.push; // 先保存一份 VueRouter.prototype.push方法
let originalRepace = VueRouter.prototype.replace;

VueRouter.prototype.push = function push(location) {
  // call(); 篡改上下文    catch(); 捕获异常 **** 
  return originalPush.call(this, location).catch(e => e);
}
VueRouter.prototype.replace = function replace(location) {
  return originalRepace.call(this, location).catch(e => e);
}

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    redirect: '/hom',
    children: [
      {
        path: '/hom',
        name: 'hom',
        component: () => import('../views/Home.vue')
      },
      {
        path: '/goods',
        name: 'goods',
        component: () => import('../views/GoodsView.vue')
      },
      {
        path: '/us',
        name: 'us',
        component: () => import('../views/About.vue')
      },
      {
        path: '/detail/:id',
        name: 'detail',
        component: () => import('../views/GoodsDetail.vue')
      },
      {
        path: '/car',
        name: 'car',
        component: () => import('../views/CarView.vue')
      },
      {
        path: '/order',
        name: 'order',
        component: () => import('../views/Order.vue')
      },
      {
        path: '/collect',
        name: 'collect',
        component: () => import('../views/CollectView.vue')
      },
      {
        path: '/confirm',
        name: 'confirm',
        component: () => import('../views/ConfirmOrder.vue')
      },

    ]
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue')
  }
]

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  // console.log(vuex_index);
  const user = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')) : { userName: "" }
  // console.log(user);
  if (to.path == '/order' && !user.userName
    || to.path == '/car' && !user.userName
    || to.path == '/cellect' && !user.userName) {
    vuex_index.commit('changeRouter')
    next('/hom')
  } else {
    next()
  }
  next()
})
export default router
