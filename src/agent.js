import superagentPromise from 'superagent-promise'
import _superagent from 'superagent'

import { backendAPI } from './.env.js'

const superagent = superagentPromise(_superagent, global.Promise);

const API_ROOT = backendAPI

const responseBody = res => res.body

let token = null
const tokenPlugin = req => {
  if (token) {
    req.set('x-access-token', token)
  }
}

const requests = {
  del: url =>
    superagent.del(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  get: url =>
    superagent.get(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  put: (url, body) =>
    superagent.put(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody),
  post: (url, body) =>
    superagent.post(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody)
}

const Auth = {
  current: () =>
    requests.get('/users/current'),
  login: (email, password) =>
    requests.post('/users/login', { email, password }),
  signup: (name, email, password) =>
    requests.post('/users/register', { name, email, password })
}

const Match = {
  get: () =>
    requests.get('/match'),
  post: (details) =>
    requests.post('/match', details)
}

const Player = {
  get: () =>
    requests.get('/users')
}

const User = {
  get: (username) =>
    requests.get(`/users/${username}`),
  put: (username, body) =>
    requests.put(`/users/${username}`, body)
}

const Venue = {
  get: () =>
    requests.get('/venue')
}

export default {
  Auth,
  Match,
  Player,
  User,
  Venue,
  setToken: _token => { token = _token }
}
