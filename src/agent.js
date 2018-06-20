import superagentPromise from 'superagent-promise'
import _superagent from 'superagent'

const superagent = superagentPromise(_superagent, global.Promise);

const API_ROOT = 'http://localhost:3000/api'

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
    requests.get('/users'),
  login: (email, password) =>
    requests.post('/users/login', { email, password }),
  signup: (name, email, password) =>
    requests.post('/users/register', { name, email, password }),
  addNgoDetails: (details) =>
    requests.put('/ngo/', details ),
  activate: (token) =>
    requests.get(`/users/activation/${token}`)
}

const Volunteer = {
  get: (id) =>
    requests.get(`/volunteer/${id}`),
  post: (body) =>
    requests.post('/volunteer', body),
  apply: (id) =>
    requests.post(`/volunteer/apply/${id}`),
  events: (id) =>
    requests.get('/volunteer/events')
}

const Ngo = {
  get: (id) =>
    requests.get(`/ngo/${id}`),
  post: (body) =>
    requests.post('/ngo', body),
  donation: (id, body) =>
    requests.post(`/ngo/donation/${id}`,body),
  events: (id) =>
    requests.get(`/ngo/events/${id}`),
  donations: () =>
    requests.get('/ngo/donation')
}

const Event = {
  post: (body) =>
    requests.post('/event', body)
}

const Search = {
  post: (data) =>
    requests.post('/search', data)
}

const User = {
  get: (id) =>
    requests.get(`/users/${id}`)
}

export default {
  Auth,
  Event,
  Ngo,
  Search,
  User,
  Volunteer,
  setToken: _token => { token = _token }
}
