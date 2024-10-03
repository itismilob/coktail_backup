import axios, { HttpStatusCode, isAxiosError } from 'axios'

axios.defaults.baseURL = `/api/v1`
axios.defaults.headers.common['Content-Type'] = 'application/json'
axios.defaults.timeout = 3000 //

export const api = axios.create()

// [Client] ----- [ Interceptor ] -----> [Server]
// multiform
api.interceptors.request.use(
  (req) => {
    if (req.data && req.data instanceof FormData) {
      req.headers['Content-Type'] = 'multipart/form-data'
    }
    return req
  },
  (err) => err,
)

// [Client] <----- [Interceptor] ----- [Server]
api.interceptors.response.use(
  (res) => res,
  (err) => {
    // if (isAxiosError(err)) {
    //   if (err.status === HttpStatusCode.NotFound) {
    //     console.log('404 NotFound')
    //   }
    // }
    return Promise.reject(err)
  },
)
