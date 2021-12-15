import Mock from 'mockjs'
import homeApi from './mockServerData/home'

Mock.mock('172.16.1.8:8080/my/api/home/getData', homeApi.getStatisticalData)