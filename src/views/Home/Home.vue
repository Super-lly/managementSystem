<template>
  <el-row :gutter="22" class="home_row">
    <el-col :span="6" style="margin-top: 20rpx">
      <el-card shadow="hover" style="height: 280px;min-width:290px">
        <div class="user">
          <img
            :src="userinfo.user_pic ? userinfo.user_pic : imgUrl"
            alt="userpic"
          />
          <div class="userInfo">
            <p class="name">{{ userinfo.username }}</p>
            <p class="access">{{ userinfo.root }}</p>
            <p class="nickname">昵称：{{ userinfo.nickname }}</p>
          </div>
        </div>
        <hr />
        <div class="login_info">
          <p>登录时间：<span>{{loginTime}}</span></p>
          <p>登陆地点：<span>成都</span></p>
        </div>
      </el-card>
      <el-card style="margin-top: 20px; height: 465px" shadow="hover">
        <el-table :data="tableData" height="465">
          <el-table-column
            show-overflow-tooltip
            v-for="(v, k) in tableLabel"
            :key="k"
            :prop="k"
            :label="v"
          ></el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-col :span="16" style="margin-top: 20rpx">
      <div class="num">
        <el-card
          shadow="hover"
          v-for="item in countData"
          :key="item.name"
          :body-style="{ padding: 0 }"
          style="width: 260px"
        >
          <div
            class="icon"
            :class="`el-icon-${item.icon}`"
            :style="{ background: item.color }"
          ></div>
          <div class="detail">
            <p class="price">{{ item.value }}</p>
            <p class="txt">{{ item.name }}</p>
          </div>
        </el-card>
      </div>
      <el-card shadow="hover" style="height: 380px;padding-top:0">
        <div ref="echart" style="height: 380px;width:100%"></div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import request from "../../network/request2";

import * as echarts from "echarts";

import imgUrl from "@/assets/images/defaultPic.png";

export default {
  name: "Home",
  data() {
    return {
      tableData: [],
      loginTime:'',
      imgUrl,
      token: sessionStorage.getItem("token"),
      id: sessionStorage.getItem("id"),
      userinfo: {},
      isAction: true,
      tableLabel: {
        time:'时间',
        Temp: "温度",
        Hum: "湿度"
      },
      countData: [
        {
          name: "温度",
          value: 'Temp',
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "湿度",
          value: 'Hum',
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "光照强度",
          value: 'lux',
          icon: "s-goods",
          color: "#5ab1ef",
        },
        {
          name: "空气质量",
          value: 'AQI',
          icon: "success",
          color: "#2ec7c9",
        },
      ],
      echartsData: {
        order: {
          legend: {
            // 图例文字颜色
            textStyle: {
              color: "#333",
            },
          },
          grid: {
            left: "20%",
          },
          // 提示框
          tooltip: {
            trigger: "axis",
          },
          xAxis: {
            type: "category",
            data: [],
            axisLine: {
              lineStyle: {
                color: "#17b3a3",
              },
            },
            axisLabel: {
              rotate:20,
              interval: 0,
              color: "#333",
              fontSize :'10'
            },
          },
          yAxis: [
            {
              type: "value",
              axisLine: {
                lineStyle: {
                  color: "#17b3a3",
                },
              },
            },
          ],
          color: [
            "#2ec7c9",
            "#b6a2de",
            "#5ab1ef",
            "#ffb980",
            "#d87a80",
            "#8d98b3",
          ],
          series: [],
        }
      },
    };
  },
  methods: {
    getTableData() {
      // getHome().then((res) => {
        let data = ''
        let token = sessionStorage.getItem('token')
        request.get('/environment/data/socketData',data,token)
        .then(res=>{
        this.tableData = res.data;
        // 折线图展示
        const order = res.data
        let orderArr = []
        orderArr=order.map(v=>{
          let obj = {
            Temp:v.Temp,
            Hum:v.Hum,
            lux:v.lux,
            AQI:v.AQI,
          }
          return obj
        })
        let orderTime = []
        order.forEach(v=>{
          orderTime.push(v.time)
        })
        this.echartsData.order.xAxis.data = orderTime;
        let keyArray = Object.keys(orderArr[0]);
        console.log(keyArray);
        keyArray.forEach((k) => {
          this.echartsData.order.series.push({
            type: "line",
            name: k,
            data: orderArr.map((item) => item[k]),
          });
        });
        const myEchartsData = echarts.init(this.$refs.echart);
        myEchartsData.setOption(this.echartsData.order);
      });
    },
    getInfo() {
      // this.$store.commit('changeInfo',this.userinfo)
      console.log(12345, this.userinfo);
      sessionStorage.setItem("userinfo", this.userinfo);
    },
    getUserInfo() {
      const params = {
        id: this.id,
      };
      request.get("/my/userinfo", params, this.token).then((res) => {
        // console.log(res);
        this.userinfo = res.data;
        // 用户身份判断
        if (this.userinfo.userroot === "a") {
          this.userinfo.root = "超级管理员";
        } else if (this.userinfo.userroot === "b") {
          this.userinfo.root = "普通用户";
        } else {
          this.userinfo.root = "其他用户";
        }
        // this.getInfo()
        sessionStorage.setItem("userinfo", JSON.stringify(this.userinfo));
        console.log(this.userinfo);
      });
    },
  },
  created() {
    this.loginTime = sessionStorage.getItem('loginTime')
  },
  mounted() {
    this.getUserInfo();
    this.getTableData();
  },
};
</script>

<style scoped>
.el-button {
  margin-bottom: 20px;
}
.user {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.user img {
  width: 120px;
  border-radius: 50%;
}
.name {
  font-size: 18px;
  padding: 0;
  margin: 0;
}
.access {
  padding: 0;
  margin: 0;
}
.nickname {
  padding: 0;
  margin: 0;
}
.login_info {
  font-size: 10px;
}
.login_info span {
  padding-left: 100px;
}
.num {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}
.el-card {
  margin-bottom: 20px;
}
.num /deep/ .el-card__body {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.el-card .icon {
  flex: 1;
  margin: 0;
  padding: 0;
  line-height: 70px;
  text-align: center;
  color: #fff;
  font-size: 25px;
}
.detail {
  flex: 2;
  text-align: center;
}
.detail p {
  padding: 0;
  margin: 0;
}
.price {
  font-size: 22px;
}
.txt {
  font-size: 20px;
}
.graph {
  display: flex;
  justify-content: space-between;
}
.graph .el-card {
  width: 48%;
}
</style>