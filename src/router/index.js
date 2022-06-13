import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Dashboard from '../views/Dashboard.vue'
import EditView from '../views/EditView.vue'
import AddView from '../views/AddView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path:'/dashboard',
    name:'DashboardView',
    component: Dashboard
  },
  {
    path:'/edit/:id',
    name:'EditView',
    component: EditView
  },
  {
    path:'/add',
    name:'AddView',
    component: AddView
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
