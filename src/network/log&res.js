import axios from "axios"
// 请求拦截
axios.interceptors.request.use(config => {
  return config
}, err => {
  // console.log(err);
})
// 响应拦截
axios.interceptors.response.use(res => {
  return res.data
}, err => {
  // console.log(err);
})
const baseURL = 'http://47.112.187.95:8080'
export default {
  get: (url, data) => new Promise((resolve, reject) => {
    axios(baseURL + url, {
      method: 'get',
      params: data || {},
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  }),
  post: (url, data) => new Promise((resolve, reject) => {
    axios(baseURL + url, {
      method: 'post',
      data: data || {},
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}