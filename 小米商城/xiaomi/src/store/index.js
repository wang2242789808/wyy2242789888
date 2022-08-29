import Vue from 'vue'
import Vuex from 'vuex'
import carList from '../store/modules/carList'
import pers from 'vuex-persistedstate'
Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [pers()],
  state: {
    isRegister: false,
    LoginDialog: false, // 登录弹窗,
    goodsList: [],
    user: JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')) : { userName: '', user_id: '' }
  },
  getters: {
    // 总数总价计算
    totalNum(state) {
      return state.goodsList.reduce((total, cur) => {
        total.number += cur.num
        if (cur.check) {
          total.price += cur.price * cur.num
        }
        return total
      }, { number: 0, price: 0 })
    },
    // 已选择数量
    selNum(state) {
      let num = 0
      state.goodsList.forEach(item => {
        if (item.check) {
          num += item.num
        }
      })
      return num
    }
  },
  mutations: {
    // 登录弹出框状态
    changeRouter(state) {
      state.LoginDialog = true
    },
    // 获取购物车数据
    getGoods(state, val) {
      console.log(val);
      state.goodsList = val
    }
  },
  modules: {
    carList
  }
})
