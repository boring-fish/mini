import axios from 'axios';
import Vue from 'vue';

let loadingCount= 0;
let that=this;
// TODO Loading...
axios.interceptors.request.use(
  // function (config) {
  //   Vue.prototype.$loading({
  //     text: 'Loading',
  //     background: 'rgba(0, 0, 0, 0.7)'
  //   });
  //   loadingCount++;
  //   if (!config.params.rfsCodes) {
  //     delete config.params.rfsCodes;
  //   }
  //   if (!config.params.seriesIds) {
  //     delete config.params.seriesIds;
  //   }
  //   return config;
  // },
  // function (error) {
  //   loadingCount--;
  //   if ( loadingCount === 0 ) {
  //     Vue.prototype.$loading().close();
  //   }
  //   return Promise.reject(error);
  // }
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
    console.log(error);
    return Promise.reject(error)
  }
);

axios.interceptors.response.use(
  function (resp) {
    // loadingCount--;
    // if ( loadingCount === 0 ) {
    //   Vue.prototype.$loading().close();
    // }

    return resp;
  },
  function (error) {
    // loadingCount--;
    // if ( loadingCount === 0 ) {
    //   Vue.prototype.$loading().close();
    // }
    return Promise.reject(error.response);
  }
);

export default axios;
