import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import axios from 'axios'
import VueAxios from 'vue-axios'

createApp(App).use(router).use(VueAxios, axios).mount('#app')
