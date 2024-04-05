import { createRouter, createWebHistory } from 'vue-router';
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
        component: AccountPage,
        meta: {
            breadcrumbName: 'Личный кабинет' // Наименование хлебных крошек для страницы круизов
        }
    },
    {
        path: '/product/:id', // пример динамического маршрута с параметром id
        name: 'ProductPage',
        component: ProductPage,
        meta: {
            breadcrumbName: 'Круизы' // Наименование хлебных крошек для страницы круизов
        }
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



