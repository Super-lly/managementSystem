<template>
  <el-row :gutter="22" class="home_row">
    <el-col :span="6" style="margin-top: 20rpx">
      <el-card shadow="hover" style="height: 280px">
        <div class="user">
          <img :src="userinfo.user_pic ? userinfo.user_pic: imgUrl" alt="userpic" />
          <div class="userInfo">
            <p class="name">{{userinfo.username}}</p>
            <p class="access">{{userinfo.root}}</p>
            <p class="nickname">昵称：{{userinfo.nickname}}</p>
          </div>
        </div>
        <hr />
        <div class="login_info">
          <p>上次登录时间：<span>2021-12-14</span></p>
          <p>上次登陆地点：<span>成都</span></p>
        </div>
      </el-card>
      <el-card style="margin-top: 20px; height: 465px" shadow="hover">
        <el-table :data="tableData">
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
            <p class="price">￥{{ item.value }}</p>
            <p class="txt">￥{{ item.name }}</p>
          </div>
        </el-card>
      </div>
      <el-card shadow="hover" style="height: 280px">
        <div ref="echart" style="height: 280px"></div>
      </el-card>
      <div class="graph">
        <el-card shadow="hover" style="height: 280px">
          <div ref="barChart" style="height: 280px"></div>
        </el-card>
        <el-card shadow="hover" style="height: 280px">
          <div ref="videoChart" style="height: 280px"></div>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { getHome } from "../../network/data";
import { infoRequest } from '../../network/userInfo'

import * as echarts from "echarts";

import imgUrl from '@/assets/images/defaultPic.png'

export default {
  name: "Home",
  data() {
    return {
      tableData: [],
      imgUrl,
      tarr1: "",
      tarr2: "",
      tokenStr: sessionStorage.getItem("token"),
      id: sessionStorage.getItem("id"),
      userinfo: {},
      isAction: true,
      tableLabel: {
        name: "数字",
        todayBuy: "今日购买",
        mouthBuy: "本月购买",
        totalBuy: "总购买",
      },
      countData: [
        {
          name: "今日支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今日收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "今日未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
        {
          name: "本月支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "本月收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "本月未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
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
              interval: 0,
              color: "#333",
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
        },
        user: {
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
              interval: 0,
              color: "#333",
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
          color: ["#2ec7c9", "#b6a2de"],
          series: [],
        },
        video: {
          series: [],
          color: [
            "#0f78f4",
            "#dd536b",
            "#9462e5",
            "#a6a6a6",
            "#e1bb22",
            "#39c362",
            "#3ed1cf",
          ],
          tooltip: {
            trigger: "item",
          },
        },
      },
    };
  },
  methods: {
    getTableData() {
      getHome().then((res) => {
        console.log(res);
        this.tableData = res.data.tableData;
        // 折线图展示
        const order = res.data.orderData;
        this.echartsData.order.xAxis.data = order.date;
        let keyArray = Object.keys(order.data[0]);
        keyArray.forEach((k) => {
          this.echartsData.order.series.push({
            type: "line",
            name: k,
            data: order.data.map((item) => item[k]),
          });
        });
        const myEchartsData = echarts.init(this.$refs.echart);
        myEchartsData.setOption(this.echartsData.order);

        // 柱状图展示
        const user = res.data.userData;
        console.log(user);
        this.echartsData.user.xAxis.data = user.map((item) => item.data);
        this.echartsData.user.series.push({
          name: "新增用户",
          type: "bar",
          data: user.map((item) => item.new),
        });
        this.echartsData.user.series.push({
          name: "活跃用户",
          type: "bar",
          data: user.map((item) => item.active),
        });
        const barEchartsData = echarts.init(this.$refs.barChart);
        barEchartsData.setOption(this.echartsData.user);

        // 饼图展示
        const video = res.data.videoData;
        this.echartsData.video.series.push({
          // name:video.map(item=>item.name),
          type:'pie',
          data:video.map(item=>item.value)
        })
        const videoEchartsData = echarts.init(this.$refs.videoChart)
        videoEchartsData.setOption(this.echartsData.video)
      });
    },
    getInfo(){
      // this.$store.commit('changeInfo',this.userinfo)
      console.log(12345,this.userinfo);
      sessionStorage.setItem('userinfo',this.userinfo)
    }
  },
  created() {
    this.tarr1 = this.tokenStr.split("").slice(0, 6).join("");
    this.tarr2 = this.tokenStr.split("").slice(6, this.tokenStr.length).join("");
    infoRequest({
      url: "/userinfo",
      method: "get",
      params: {
        id: this.id,
      },
      headers: {
        Authorization: this.tarr1 + " " + this.tarr2,
      },
    }).then((res) => {
      this.userinfo = res.data;
      // 用户身份判断
      if(this.userinfo.userroot === 'a'){
        this.userinfo.root = '超级管理员'
      } else if(this.userinfo.userroot === 'b'){
        this.userinfo.root = '普通用户'
      } else{
        this.userinfo.root = '其他用户'
      }
      // this.getInfo()
      sessionStorage.setItem('userinfo',JSON.stringify(this.userinfo))
      console.log(this.userinfo);
    });
  },
  mounted() {
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
.nickname{
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
  font-size: 30px;
}
.txt {
  font-size: 12px;
}
.graph {
  display: flex;
  justify-content: space-between;
}
.graph .el-card {
  width: 48%;
}
</style>