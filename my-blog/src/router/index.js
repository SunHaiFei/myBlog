import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    // 配置页头页尾的显示和隐藏
    meta: {
      isShow: false
    }
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {
      isShow: true
    }
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    meta: {
      isShow: true
    }
  },
  {
    path: '/blog/:id',
    component: () => import(/* webpackChunkName: "singleBlog" */ '../components/singleBlog.vue'),
    meta: {
      isShow: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

const whiteList = ['/'];//不需要登录能访问的path
router.beforeEach((to, from, next) => {
  let isLogin = localStorage.getItem("isLogin")
  if (whiteList.indexOf(to.path) < 0) {//访问了需要登录才能访问的页面
    if (isLogin) {//登录过来直接进去
      next();
    } else {
      if (to.path == '/') {
        next();
      } else {
        next('/');
      }
    }
  }
  else {
    next();
  }
});



export default router
