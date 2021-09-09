// 导入单个组件
import DragVerify from './DragVerify/DragVerify.vue';
// 以数组的结构保存组件，便于遍历
const components = [
  DragVerify,
]
// 定义 install 方法
const install = function (Vue) {
  // 遍历并注册全局组件
  components.map(component => {
    component.install = function (Vue) {
      Vue.component(component.name, component)
    }
    Vue.use(component)
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  // 导出的对象必须具备一个 install 方法
  install,
  ...components
  // 组件列表
}
