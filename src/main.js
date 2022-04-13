import { createApp } from 'vue'
import App from './App.vue'
import router from "@/router/routers";
import store from "@/store";
import axios from 'axios';
import ArcoVue from '@arco-design/web-vue';
import ArcoVueIcon from '@arco-design/web-vue/es/icon';
import '@arco-design/web-vue/dist/arco.css';
import { Message } from '@arco-design/web-vue';

const config = {
    baseURL: '/api',
    timeout: 3000,
    headers: {
        'Content-Type': 'application/json',
    },
    changeOrigin: true
};

const instance = axios.create(config);
instance.defaults.headers.common["Authorization"] = store.state.token
const app = createApp(App)
app.config.globalProperties.$axios = instance;
app.config.globalProperties.$message = Message;
app.config.globalProperties.$store = store;
app.use(ArcoVue).use(router).use(store).use(ArcoVueIcon)
app.mount("#app")

