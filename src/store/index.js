import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isCollapse:false,
    token:''
    // userinfo:{}
  },
  mutations: {
    collapseMenu(state){
      state.isCollapse = !state.isCollapse
    },
    // changeInfo(state,info){
    //   state.userinfo = info
    // }
    setToken(state,token){
      state.token = token
    }
  },
  actions: {
  },
  modules: {
  }
})
