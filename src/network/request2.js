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
const baseURL = 'http://120.25.224.155:8080'
export default {
  get:(url,data,token)=> new Promise((resolve, reject)=>{
    axios(baseURL+url,{
      method:'get',
      params:data || {},
      headers:{
        Authorization: token
      }
    }).then(res=>{
      resolve(res)
    }).catch(err=>{
      reject(err)
    })
  }),
  post:(url,data,token) => new Promise((resolve,reject)=>{
    axios(baseURL+url,{
      method:'post',
      data:data || {},
      headers:{
        Authorization: token
      }
    }).then(res=>{
      resolve(res)
    }).catch(err=>{
      reject(err)
    })
  })
}