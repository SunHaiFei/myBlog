import Vue from 'vue'
import App from './App.vue'
import router from './router'
//引入axios
import axios from 'axios'
//挂载axios
Vue.prototype.axios = axios;
//基础地址
axios.defaults.baseURL = 'http://localhost:3000';

//自定义指令
Vue.directive('rainbow',{
  bind(el,binding,vnode){
    el.style.color = '#' + Math.random().toString(16).slice(2,8);
  }
})

Vue.directive('theme',{
  bind(el,binding,vnode){
    if(binding.value == 'width'){
      el.style.maxWidth = '1260px'
    }else if(binding.value == 'narrow'){
      el.style.maxWidth = '560px'
    }

    if(binding.arg == 'column'){
      el.style.background = '#6677cc';
      el.style.padding = '20px';
    }
  }
})


//自定义过滤器
Vue.filter('to-uppercase',value=>value.toUpperCase())
Vue.filter('snippet',value=>{
  if(value.length < 100){
    return value
  }else{
    return value.slice(0,100) + '...'
  }
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
