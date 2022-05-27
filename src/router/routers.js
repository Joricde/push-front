import {createRouter, createWebHashHistory} from 'vue-router'

import loginView from "@/views/LoginView";
import RegisterView from "@/views/RegisterView";
import HomeView from "@/views/HomeView";
import IndexView from "@/views/IndexView";
import FindPasswordView from "@/views/FindPasswordView";
import InfoView from "@/views/InfoView";
const routes = [
    {path: '/', component: IndexView},
    {path: '/register', component: RegisterView},
    {path: '/login', component: loginView},
    {path: '/find/account', component: FindPasswordView},
    {path: '/info', component: InfoView},
    {path: '/home', component: HomeView, children:{
        path: '/home/:title'
        }},
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router