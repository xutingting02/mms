import http from './http'

const LOGIN_URL = '/auth/login'
const REGISTER_URL = '/auth/register'

export const login = (params) => {
  return http.fetchPost(LOGIN_URL, params)
}

export const register = (params) => {
  return http.fetchPost(REGISTER_URL, params)
}
