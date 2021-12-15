<template>
  <el-row :gutter="22" class="home_row">
    <el-col :span="6" style="margin-top: 20rpx">
      <el-card shadow="hover" style="height:280px">
        <div class="user">
          <img src="../../assets/images/user.png" alt="" />
          <div class="userInfo">
            <p class="name">Admin</p>
            <p class="access">超级管理员</p>
          </div>
        </div>
        <hr />
        <div class="login_info">
          <p>上次登录时间：<span>2021-12-14</span></p>
          <p>上次登陆地点：<span>成都</span></p>
        </div>
      </el-card>
      <el-card style="margin-top: 20px; height:465px" shadow="hover">
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
      <el-card shadow="hover" style="height:280px"></el-card>
      <div class="graph">
        <el-card shadow="hover" style="height:280px"></el-card>
        <el-card shadow="hover" style="height:280px"></el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      tableData: [
        {
          name: 1,
          todayBuy: 100,
          mouthBuy: 300,
          totalBuy: 800,
        },
        {
          name: 2,
          todayBuy: 100,
          mouthBuy: 300,
          totalBuy: 800,
        },
        {
          name: 3,
          todayBuy: 100,
          mouthBuy: 300,
          totalBuy: 800,
        },
        {
          name: 4,
          todayBuy: 100,
          mouthBuy: 300,
          totalBuy: 800,
        },
        {
          name: 5,
          todayBuy: 100,
          mouthBuy: 300,
          totalBuy: 800,
        },
      ],
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
    };
  },
  mounted(){
    
  }
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
  font-size: 32px;
  padding: 0;
  margin: 0;
}
.access {
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
/deep/.num .el-card__body {
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
.graph{
  display: flex;
  justify-content: space-between;
}
.graph .el-card{
  width: 48%;
}
</style>