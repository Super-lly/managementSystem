<template>
  <div class="seeuserinfo">
    <el-card shadow="hover" style="height: 85vh">
      <div class="user">
        <img
          :src="userinfo.user_pic ? userinfo.user_pic : imgUrl"
          alt="userpic"
        />
        <div class="userInfo">
          <p class="name">用户名：{{ userinfo.username }}</p>
          <p class="access">权 限：{{ userinfo.root }}</p>
          <p class="nickname">昵 称：{{ userinfo.nickname }}</p>
          <p class="email">邮 箱：{{userinfo.email}}</p>
        </div>
      </div>
      <hr />
    </el-card>
  </div>
</template>

<script>
import imgUrl from "@/assets/images/defaultPic.png";
import request from '../../network/request2'

export default {
  data() {
    return {
      userinfo: {},
      imgUrl,
      token: sessionStorage.getItem("token"),
      id: sessionStorage.getItem("id"),
    };
  },
  created() {
    const params ={
      id: this.id
    }
    request.get('/my/userinfo',params, this.token)
    .then((res) => {
      if (res.status === 0) {
        this.userinfo = res.data;
        if (this.userinfo.userroot === "a") {
          this.userinfo.root = "超级管理员";
        } else if (this.userinfo.userroot === "b") {
          this.userinfo.root = "普通用户";
        } else {
          this.userinfo.root = "其他用户";
        }
      } else if (res.status === 1) {
        alert("获取用户信息失败!");
      }
    });
  },
};
</script>

<style scoped>
.user img {
  width: 120px;
  border-radius: 50%;
}
.el-card {
  background-color: rgb(243, 252, 252);
}
</style>