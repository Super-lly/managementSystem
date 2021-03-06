import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('../views/log_res/login.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/log_res/login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/log_res/register.vue')
  }, 
  {
    path: '/main',
    name: 'Main',
    component: ()=>import('../views/Main.vue'),
    children:[{
      path:'/',
      name:'Home',
      component:()=>import('../views/Home/Home.vue')
    },
    {
      path: '/goodsinfo',
      name: 'goodsinfo',
      component: () => import('../views/goods/goodsinfo.vue')
    }, 
    {
      path: '/managegoods',
      name: 'managegoods',
      component: () => import('../views/goods/managegoods.vue')
    },
    {
      path: '/seeuserinfo',
      name: 'seeuserinfo',
      component: () => import('../views/userinfo/seeuserinfo.vue')
    }, 
    {
      path: '/updateinfo',
      name: 'updateinfo',
      component: () => import('../views/userinfo/updateinfo.vue')
    },
    {
      path: '/manageuser',
      name: 'manageuser',
      component: () => import('../views/userinfo/manageuser.vue')
    },
    {
      path: '/changeuserroot',
      name: 'changeuserroot',
      component: () => import('../views/userinfo/changeUserRoot.vue')
    },
    {
      path: '/manageMsg',
      name: 'manageMsg',
      component: () => import('../views/message/manageMsg')
    },
  ]
  }, 
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

const originalPush = VueRouter.prototype.push
   VueRouter.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}

export default router
