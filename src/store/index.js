import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isCollapse:false,
    // userinfo:{}
  },
  mutations: {
    collapseMenu(state){
      state.isCollapse = !state.isCollapse
    },
    // changeInfo(state,info){
    //   state.userinfo = info
    // }
  },
  actions: {
  },
  modules: {
  }
})
