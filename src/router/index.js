import Vue from 'vue'
import VueRouter from 'vue-router'



Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    redirect:'/home'
  },
  {
    path:'/home',
    component:()=>import('../views/Home.vue'),
    // beforeEnter(){}路由级钩子
    children:[
      {
        path:'list',
        component:()=>import('../views/List.vue')
      }
    ]
  },
  {
    path:'/about',
    name:'about',
    meta:{auth:true},//需要认证
    component:()=>import('../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 全局守卫
router.beforeEach((to,from,next)=>{
  // 大家平时是怎么判断用户的登录状态的？令牌
  if(to.meta.auth&&!window.isLogin){
    if(window.confirm('请登录')){
      window.isLogin=true
      next()//用户登录成功
    }else{
      next('/')//用户放弃回首页
    }
  }else{
    next()//不需登录，继续
  }
})

export default router
