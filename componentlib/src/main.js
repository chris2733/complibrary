import { createApp } from 'vue'
import './scss/main.scss'
import App from './App.vue'
import ButtonsPage from './components/ButtonsPage.vue'

const app = createApp(App);

app.component('buttons-page', ButtonsPage);

app.mount('#app')
