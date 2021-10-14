import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "@/assets/css/common.less";
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import ScComponents from "../components";
// import ScComponents from "vue3-sinfcloud";
import '../components/IconFont/iconfont.css';
const app = createApp(App);

// app.use(ScComponents,"common")
app.use(ScComponents).use(Antd);
app.use(store).use(router).mount('#app')
