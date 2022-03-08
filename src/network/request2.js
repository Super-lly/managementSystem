import axios from "axios"
// 1.创建axios的实例
 const request2 = axios.create({
  baseURL: 'http://127.0.0.1:8080/my'
})

// // 2.axios的拦截器
// // 2.1.请求拦截的作用
// request2.interceptors.request.use(config => {
//   return config
// }, err => {
//   // console.log(err);
// })

// // 2.2.响应拦截
// request2.interceptors.response.use(res => {
//   return res.data
// }, err => {
//   // console.log(err);
// })
// 3.发送真正的网络请求
export default request2