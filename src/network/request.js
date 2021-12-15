import axios from 'axios'

export function request(config) {
  const instance = axios.create({
    baseURL: '172.16.1.8:8080'
  })

  instance.interceptors.request.use(config => {
    return config
  }, err => {
    console.log(err);
  })

  instance.interceptors.response.use(res=>{
    return res.data
  },err=>{
    console.log(err);
  })

  return instance(config)
}