import {createRouter, createWebHistory} from "vue-router";
import {useUserStore} from "./stores/user.js";

import Home from "./views/HomeView.vue";
import Editar from "./views/EditarView.vue";
import Login from "./views/LoginView.vue";
import Register from "./views/RegisterView.vue";

const requiereAuth = async(to, from, next) => {
    const useUser = useUserStore();
    useUser.loadingSession = true;
    const user = await useUser.currentUser();
    if (user) {
        next();
    } else {
        next("/login");
    }
    useUser.loadingSession = false;
}

const routes = [
    {path: "/", component: Home, beforeEnter: requiereAuth},
    {path: "/editar/:id", component: Editar, beforeEnter: requiereAuth},
    {path: "/login", component: Login},
    {path: "/register", component: Register},
]

const router = createRouter({routes, history: createWebHistory()})

export default router;