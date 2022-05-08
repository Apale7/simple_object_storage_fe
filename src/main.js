import { createApp } from 'vue'
import Antd from 'ant-design-vue/es';
import App from './App.vue'
import router from './router/index';
const app = createApp(App);

app.use(Antd).use(router).mount('#app');
