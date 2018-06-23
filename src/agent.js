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

const Event = {
  apply: (id) =>
    requests.post(`/event/apply/${id}`),
  search: (data) =>
    requests.post('/event/search', data),
  post: (details) =>
    requests.post('/event', details)
}

const Player = {
  get: () =>
    requests.get('/users'),
  search: (data) =>
    requests.post('/users/search', data)
}

const User = {
  get: (username) =>
    requests.get(`/users/${username}`),
  put: (username, body) =>
    requests.put(`/users/${username}`, body)
}

const Venue = {
  get: () =>
    requests.get('/venue'),
  search: (data) =>
    requests.post('/venue/search', data)
}

export default {
  Auth,
  Event,
  Player,
  User,
  Venue,
  setToken: _token => { token = _token }
}
