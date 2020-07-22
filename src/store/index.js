import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    // token: cookies.getItem('token') || ''
    token:'this.$cookies.get("token")'
    // username:'',
  },
  actions: {},
  mutations: {
    increment (state,msg) {
      
    },
    unIncrement () {}
  },
  getters: {},
  modules: {}
});
export default store;
