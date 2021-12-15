import { request } from './request'

export function getHome(){
  return request({
    url:'/my/api/home/getData',
    methods:'get'
  })
}