import axios from 'axios'
import router from '../router'
import { ACCESS_TOKEN_KEY } from '../main'

export const SET_USER_DETAILS = 'SET_USER_DETAILS'
export const SET_ACCESS_TOKEN = 'SET_ACCESS_TOKEN'
export default {
  state: {
    accessToken: '',
    username: '',
    firstName: '',
    lastName: ''
  },
  mutations: {
    [SET_USER_DETAILS] (state, user) {
      state.firstName = user.firstName
      state.lastName = user.lastName
      state.username = user.username
    },
    [SET_ACCESS_TOKEN] (state, accessToken) {
      state.accessToken = accessToken
    }
  },
  actions: {
    register ({ dispatch }, user) {
      axios
        .post('user/register', user)
        .then(() => {
          setTimeout(dispatch('login', user), 1000)
        })
    },
    login ({ commit, dispatch }, user) {
      axios
        .post('/login', user)
        .then(res => {
          commit('SET_ACCESS_TOKEN', res.headers.authorization)
          localStorage.setItem(ACCESS_TOKEN_KEY, res.headers.authorization)
          router.push('chat')
          dispatch('getUser')
        })
    },
    getUser ({ state, commit }) {
      axios
        .get('/user', {
          headers: { Authorization: state.accessToken }
        })
        .then(res => {
          commit('SET_USER_DETAILS', res.data)
        })
    }
  }
}
