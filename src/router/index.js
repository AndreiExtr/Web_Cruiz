import { createRouter, createWebHistory } from 'vue-router';
import MainPage from '../components/MainPage.vue';
import ProductPage from '../components/ProductPage.vue';
import SwaggerUI from "../../SwaggerUI.vue";

const routes = [
    {
        path: '/',
        name: 'MainPage',
        component: MainPage
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
