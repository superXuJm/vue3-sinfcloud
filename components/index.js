// 导入单个组件
import DragVerify from './DragVerify/DragVerify.vue';

// 导入第三方组件
import 'viewerjs/dist/viewer.css';
import VueViewer from 'v-viewer';

// 以数组的结构保存组件，便于遍历
const components = [
  DragVerify
]
const otherComponents=[
  VueViewer,
]
// 定义 install 方法
const install = function (Vue,type) {
  // 遍历并注册全局组件
  components.map(component => {
    component.install = function (Vue) {
      Vue.component(component.name, component)
    }
    Vue.use(component);
  })
  // 是否加载第三方库
  if(type && type === "common"){
    return;
  }
  otherComponents.map(component=>{
    Vue.use(component);
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
