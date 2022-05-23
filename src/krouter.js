let Vue;
class VueRouter{
  constructor(options){
    this.$options=options
    // 创建一个路由的path和route映射
    this.routeMap={}

    // 将来当前的路径current需要响应式、
    // 利用vue的响应式原理可以做到这一点:创建vue的实例，保存起来，去管理这个current
    this.app=new Vue({
      data:{
        current:'/'
      }
    })
  }

  init(){
    // 绑定浏览器事件
    this.bindEvents();

    // 解析路由配置
    this.creatRouteMap(this.$options)

    // 创建router-link和router-view
    this.initComponent()
  }

  bindEvents(){
    window.addEventListener('hashchange',this.onHashChange.bind(this))
    window.addEventListener('load',this.onHashChange.bind(this))

  }
  onHashChange(){
    // localhost/#/home
    this.app.current=window.location.hash.slice(1)||'/'
  }

  creatRouteMap(options){
    options.routes.forEach(item=>{
      // 'home':{path:'/home',component:Home}
      this.routeMap[item.path]=item
    })
  }

  initComponent(){
    // 声明两个全局组件
    Vue.component('router-link',{
      props:{
        to:String  
      },
      render(h){
        // 目标是a标签  值是to
        return h('a',{attrs:{href:'#'+this.to}},this.$slots.default)
        // return <a href={this.to}>{this.$slots.default}</a>
      }
    })

    Vue.component('router-view',{
      // 箭头函数 能保留this的指向  这里指向VueRouter实例
      render:(h)=>{
        const comp=this.routeMap[this.app.current].component;
        return h(Comp)
      }
    })
  }
}

// 把VueRouter变为插件    一个插件只要实现一个install方法就行了
VueRouter.install=function(_Vue){
  Vue=_Vue//这里保存，上面就可以使用了
  // 混入任务
  Vue.mixin({//混入就是扩展Vue
    beforeCreate(){
      // 这里的代码将来会在外面初始化的时候操作
      // 这样我们就实现了Vue的拓展
      // this是谁?vue实例,因为在钩子函数里面执行的,拿到的就是vue实例
      // 但是这里只希望根组件执行一次
      if(this.$options.router){
      Vue.prototype.$router=this.$options.router
      this.$options.router.init()
      }

    }
  })

}