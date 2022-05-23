import Vue from "vue";

// 创建指定的文件实例，并挂载在body上
export default function create(Component,props){
  // 0.先创建vue实例
  const vm=new Vue({
    render(h){
      // render方法提供给我们一个h函数，它可以渲染VNode
      return h(Component,{props})
    }
  }).$mount();
  // 1.上面vm帮我们创建组件实例
  // 2.通过$children获得该组件实例
  const comp=vm.$children[0]
  // 3.追加到body
  document.body.appendChild(vm.$el)
  // 4.清理函数
  comp.remove=()=>{
    document.removeChild(vm.$el)
    vm.$destroy();
  }
  // 5.返回组件实例
  return comp;
}