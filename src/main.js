import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import { SET_ACCESS_TOKEN } from './store/user'

export const ACCESS_TOKEN_KEY = 'ACCESS_TOKEN_KEY'

Vue.config.productionTip = false

axios.defaults.baseURL = 'http://localhost:8000'

const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY)
if (accessToken) {
  store.commit(SET_ACCESS_TOKEN, accessToken)
  store.dispatch('getUser')
}

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'Chat demo'
  if (to.name !== 'login' && !store.state.user.accessToken) {
    next('login')
  } else if (to.name === 'login' && store.state.user.accessToken) {
    next('chat')
  } else {
    next()
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
