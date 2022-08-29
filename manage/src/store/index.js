import Vue from 'vue'
import Vuex from 'vuex'
import tabList from './modules/tabList'
import pers from 'vuex-persistedstate'
Vue.use(Vuex)

export default new Vuex.Store({
  // plugins: [pers()],
  state: {

  },
  getters: {
  },
  mutations: {

  },
  actions: {
  },
  modules: {
    tabList
  }
})
