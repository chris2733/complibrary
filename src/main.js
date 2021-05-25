import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router';

// css
import './scss/main.scss'
import "bootstrap/dist/css/bootstrap.min.css";

// app files
import App from './App.vue'
import ButtonsPage from './buttonpage/ButtonsPage.vue';
import ComponentLibrary from './componentlibrary/ComponentLibrary';

// routing
const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/buttons', component: ButtonsPage },
        { path: '/components', component: ComponentLibrary },
    ],
    linkActiveClass: 'active'
});


// create app
const app = createApp(App);

app.use(router);

app.mount('#app')
