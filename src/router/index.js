import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/login.vue'
import Home from '@/components/pages/home.vue'
import Goods from '@/components/pages/goods/goods.vue'
import GoodsAdd from '@/components/pages/goods/add.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect:'/login'
    },
    {
      name: 'login',
      path: '/login',
      component:Login
    },
    {
      name: 'home',
      path: '/home',
      component:Home
    },
    {
      path: '/goods',
      component: Goods
    },
    {
      path: '/goods/add',
      component: GoodsAdd
    }
  ]
})
