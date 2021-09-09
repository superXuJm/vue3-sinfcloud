import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "@/assets/css/common.less";
import ScComponents from "../components";
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
const app = createApp(App);

app.use(ScComponents).use(Antd);
app.use(store).use(router).mount('#app')
