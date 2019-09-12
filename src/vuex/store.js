import Vue from 'vue'
import Vuex from 'vuex'
import user from './module/user'

Vue.use(Vuex) // 使用 vuex

export default new Vuex.Store({
  modules: {
    user
  }
})
