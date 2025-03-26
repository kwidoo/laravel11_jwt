import axios from 'axios'
import Cookies from 'js-cookie'
import * as types from '../mutation-types'

// state
export const state = {
  user: null,
  token: Cookies.get('token'),
  originalToken: Cookies.get('original_token')
}

// getters
export const getters = {
  user: state => state.user,
  token: state => state.token,
  originalToken: state => state.originalToken,
  check: state => state.user !== null
}

// mutations
export const mutations = {
  [types.SAVE_TOKEN] (state, { token, remember }) {
    state.token = token
    Cookies.set('token', token, { expires: remember ? 365 : null })
  },

  [types.SAVE_ORIGINAL_TOKEN] (state, { originalToken, remember }) {
    state.originalToken = originalToken
    Cookies.set('original_token', originalToken, { expires: remember ? 365 : null })
  },

  [types.REVERT_ORIGINAL_TOKEN] (state) {
    state.token = state.originalToken
    Cookies.set('token', state.originalToken, { expires: false ? 365 : null })
    Cookies.remove('original_token')
  },

  [types.FETCH_USER_SUCCESS] (state, { user }) {
    state.user = user
  },

  [types.FETCH_USER_FAILURE] (state) {
    state.token = null
    state.originalToken = null

    Cookies.remove('token')
    Cookies.remove('original_token')
  },

  [types.LOGOUT] (state) {
    state.user = null
    state.token = null
    state.originalToken = null

    Cookies.remove('token')
    Cookies.remove('original_token')
  },

  [types.UPDATE_USER] (state, { user }) {
    state.user = user
  }
}

// actions
export const actions = {
  saveToken ({ commit, dispatch }, payload) {
    commit(types.SAVE_TOKEN, payload)
  },

  saveOriginalToken ({ commit, dispatch }, payload) {
    commit(types.SAVE_ORIGINAL_TOKEN, payload)
  },
  
  revertOriginalToken ({ commit, dispatch }) {
    commit(types.REVERT_ORIGINAL_TOKEN)
  },

  async fetchUser ({ commit }) {
    try {
      const { data } = await axios.get('/api/user')

      commit(types.FETCH_USER_SUCCESS, { user: data })
    } catch (e) {
      commit(types.FETCH_USER_FAILURE)
    }
  },

  updateUser ({ commit }, payload) {
    commit(types.UPDATE_USER, payload)
  },

  async logout ({ commit }) {
    try {
      await axios.post('/api/logout')
    } catch (e) { }

    commit(types.LOGOUT)
  }
}
