import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import user from './modules/user'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user
  },
  state:{
    search:'',
  },
  mutations:{
    setSearch(state,search){
      state.search=search
    },
    setLoad(state,a){
      state.load=a
    }
  },
  getters
})

export default store