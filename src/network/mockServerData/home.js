import Mock, { mock } from 'mockjs'

let list=[]

export default{
  getStatisticalData:()=>{
    for(let i = 0; i < 7; i++){
      list.push(
        Mock.mock({
          苹果:Mock.Random.float(100, 8000, 0, 0),
          vivo:Mock.Random.float(100, 8000, 0, 0),
          oppo:Mock.Random.float(100, 8000, 0, 0),
          魅族:Mock.Random.float(100, 8000, 0, 0),
          小米:Mock.Random.float(100, 8000, 0, 0),
          三星:Mock.Random.float(100, 8000, 0, 0)
        })
      )
    }
    return{
      code:20000,
      data:{
        // 饼图
        videoData:[
          {
            name:'小米',
            value:2999
          },
          {
            name:'苹果',
            value:5999
          },
          {
            name:'vivo',
            value:1500
          },
          {
            name:'oppo',
            value:1999
          },
          {
            name:'魅族',
            value:2200
          },
          {
            name:'三星',
            value:4500
          },
        ],
        // 柱状图
        userData:[
          {
            data:'周一',
            new:5,
            active:200
          },
          {
            data:'周二',
            new:10,
            active:500
          },
          {
            data:'周三',
            new:12,
            active:550
          },
          {
            data:'周四',
            new:60,
            active:800
          },
          {
            data:'周五',
            new:65,
            active:550
          },
          {
            data:'周六',
            new:53,
            active:770
          },
          {
            data:'周日',
            new:33,
            active:170
          },
        ],
        // 折线图
        orderData:{
          date:['20211001','20211002','20211003','20211004','20211005','20211006','20211007'],
          data:list
        },
        tableData: [
          {
            name: 'oppo',
            todayBuy: 500,
            mouthBuy: 3500,
            totalBuy: 22000,
          },
          {
            name: 'vivo',
            todayBuy: 300,
            mouthBuy: 2000,
            totalBuy: 24000,
          },
          {
            name: '苹果',
            todayBuy: 800,
            mouthBuy: 4500,
            totalBuy: 65000,
          },
          {
            name: '小米',
            todayBuy: 1200,
            mouthBuy: 6500,
            totalBuy: 45000,
          },
          {
            name: '三星',
            todayBuy: 300,
            mouthBuy: 2000,
            totalBuy: 34000,
          },
          {
            name: '魅族',
            todayBuy: 350,
            mouthBuy: 3000,
            totalBuy: 22000,
          }
        ]
      }
    }
  }
}