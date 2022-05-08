import { createRouter, createWebHashHistory } from 'vue-router'
import HelloWorld from '../components/HelloWorld.vue'
import LoginPage from '../components/Login.vue'
const router = createRouter({
  routes: [
    {
      path: '/home',
      name: 'HelloWorld',
      component: <div>home</div>
    },
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage
    }
  ],
  history: createWebHashHistory()
})

export default router
