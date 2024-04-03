import { createRouter, createWebHistory } from 'vue-router';
import { createStore } from 'vuex';
import MainPage from '../components/MainPage.vue';
import ProductPage from '../components/ProductPage.vue';
import SwaggerUI from "../../SwaggerUI.vue";
import AccountPage from "@/components/AccountPage.vue";

const routes = [
    {
        path: '/',
        name: 'MainPage',
        component: MainPage
    },
    {
        path: '/account',
        name: 'Account',
        component: AccountPage
    },
    {
        path: '/product/:id', // пример динамического маршрута с параметром id
        name: 'ProductPage',
        component: ProductPage
    },
    {
        path: '/api', // добавляем новый маршрут для Swagger UI
        name: 'SwaggerUI',
        component: SwaggerUI
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});
export default router;

// export const store = createStore({
//     state: {
//         loggedIn: false
//     },
//     mutations: {
//         login(state) {
//             state.loggedIn = true;
//         },
//         logout(state) {
//             state.loggedIn = false;
//         }
//     },
//     getters: {
//         isLoggedIn: state => state.loggedIn
//     }
// });


