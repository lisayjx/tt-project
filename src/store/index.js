import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import { getItem, removeItem, setItem } from '@/utils/storage'

const TOKEN_KEY = 'TT_USER'
export default new Vuex.Store({
  state: {
    // user初始化时，从本地里取出来的2个token存入state
    // user: JSON.parse(window.localStorage.getItem(TOKEN_KEY))
    user: getItem(TOKEN_KEY)
  },
  //永远通过mutations来修改state里的数据
  mutations: {
    // 修改用户里的值
    setUser(state, data) {
      // 把2个token放入state仓库
      state.user = data
      // 为了防止刷新丢失数据，要把2个token存入本地
      // window.localStorage.setItem(TOKEN_KEY, JSON.stringify(state.user))
      setItem(TOKEN_KEY, state.user)
    },

  },
  actions: {
  },
  modules: {
  }
})
