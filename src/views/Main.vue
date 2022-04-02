<template>
  <el-container>
    <el-aside width="auto">
      <common-aside></common-aside>
    </el-aside>
    <el-container>
      <el-header>
        <common-header :userinfo='userinfo'></common-header>
      </el-header>
      <el-main><router-view /></el-main>
    </el-container>
  </el-container>
</template>

<script>
import CommonAside from "../components/CommonAside.vue";
import CommonHeader from "../components/CommonHeader.vue";

import imgUrl from '@/assets/images/defaultPic.png'

// import { infoRequest } from '../network/userInfo'
import request from '../network/request2'

export default {
  name: "Home",
  data() {
    return {
      token: sessionStorage.getItem("token"),
      id: sessionStorage.getItem("id"),
      userinfo: {},
      imgUrl,
      nickname: "",
      email: "",
      nickname_c: "",
      email_c: "",
      oldpwd:'',
      newpwd:'',
      isAction: true,
    };
  },
  components: {
    CommonAside,
    CommonHeader,
  },
  created() {
    const params = {
      id: this.id,
    }
    request.get('/my/userinfo',params,this.token)
    .then((res) => {
      this.userinfo = res.data
      this.nickname = res.data.nickname ? res.data.nickname : "null";
      this.email = res.data.email ? res.data.email : "null";
      this.nickname_c = this.nickname;
      this.email_c = this.email;
      // 用户身份判断
      if(this.userinfo.userroot === 'a'){
        this.userinfo.root = '超级管理员'
      } else if(this.userinfo.userroot === 'b'){
        this.userinfo.root = '普通用户'
      } else{
        this.userinfo.root = '其他用户'
      }
      console.log(this.userinfo);
    });
  },
};
</script>

<style scoped>
.el-container {
  height: 100%;
}
.el-header {
  background-color: #000;
  padding: 0;
}
</style>