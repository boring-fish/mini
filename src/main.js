// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'
import VueCookies from 'vue-cookies'
import layer from 'vue-layer'
import base from './base'
Vue.use(base)
Vue.use(VueCookies)

require('layui-src/dist/css/layui.css')
require('jquery/dist/jquery.min.js')
require('layui-src/dist/layui.js')

// require('layui-src/dist/layui.js')
// require('layui-src/dist/layui.all.js')
// require('layui-src/dist/layui.js')
// require('../static/layui.js')
// require('../static/layui/layui.js')
// require('../static/layui/css/layui.css')

require('../static/main.css')
// 引入vuex插件
Vue.config.productionTip = false
Vue.prototype.axios = axios
Vue.prototype.$layer = layer(Vue)
axios.defaults.baseURL = process.env.VUE_APP_BASE_URL
axios.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    if (config.method !== 'post') {
      if (window.$cookies.get('token')) {
        config.headers.Authorization = window.$cookies.get('token')
      }
    }
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store: store,
  template: '<App/>',
  components: {
    App
  }
})
