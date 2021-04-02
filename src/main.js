import { createApp } from 'vue'

// css
import './scss/main.scss'

// app files
import App from './App.vue'
import ButtonsPage from './components/ButtonsPage.vue'

// create app
const app = createApp(App);

// components
app.component('buttons-page', ButtonsPage);

app.mount('#app')
