<template>
  <div class="login">
    <div class="user_card">
      <input type="text" name="username" placeholder="请输入用户名" v-model="username" />
      <input type="password" name="password" placeholder="请输入密码" v-model="password" />
      <button @click="login" class="login_btn" style="width:170px;height:30px">登录</button>
      <p class="text">
        没有账号？<span class="toregister" @click="register" style="cursor: pointer;">去注册</span>
      </p>
    </div>
  </div>
</template>

<script>
// import { userRequest } from "../../network/user";
// import log from '../../network/log&res'
import request from '../../network/request2'

export default {
  name: "Login",
  data() {
    return {
      userdata: {},
      username: "",
      password: "",
    };
  },
  methods: {
    // 登录
    login() {
      var timeNum = new Date(Date.now())
      var time = this.getDate(timeNum)
      if(this.username == '' || this.password == ''){
        this.$message.error('请输入完整信息')
      } else{
        this.userdata.username = this.username;
        this.userdata.password = this.password;
        let userdata = this.userdata;
        console.log(userdata);
        request.post('/api/login',userdata)
        .then((res) => {
          console.log(res);
          if (res.status === 0) {
            let token = res.token.split("").slice(0, 6).join("") + " " + res.token.split("").slice(6, res.token.length).join("");
            // console.log(token);
            localStorage.setItem('token',token)
            this.$store.commit('setToken',token)
            sessionStorage.setItem('token',token)
            sessionStorage.setItem('id',res.id)
            sessionStorage.setItem('loginTime',time)
            this.$message.success(res.message)
            this.$router.push("/main");
          } else {
            this.$message.error(res.message)
          }
        });
      }
    },
    register() {
      this.$router.push("/register");
    },
    getDate(now){
      var year = now.getFullYear();  //取得4位数的年份
      var month = now.getMonth() + 1;  //取得日期中的月份，其中0表示1月，11表示12月
      var date = now.getDate();      //返回日期月份中的天数（1到31）
      // var hour = now.getHours();     //返回日期中的小时数（0到23）
      // var minute = now.getMinutes(); //返回日期中的分钟数（0到59）
      // var second = now.getSeconds(); //返回日期中的秒数（0到59）
      return year + "-" + month + "-" + date;
    }
  },
};
</script>

<style scoped>
.login{
  height: 100%;
  background: url('../../assets/images/log&res.png') no-repeat center center fixed;
  background-size: cover;
}
.user_card {
  padding-top: 20px;
  width: 40vw;
  height: 40vh;
  background-color: rgb(231, 240, 238);
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -20vw;
  margin-top: -20vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  border-radius: 15px;
}
.user_card input {
  width: 70%;
  height: 40px;
  outline: none;
  border: none;
  border-bottom: 1px solid #ccc;
  border-radius: 15px;
}
.login_btn {
  border-radius: 15px;
  border: 1px solid #ccc;
  color: #fff;
  background-color: orange;
  cursor: pointer;
}
.text {
  font-size: 12px;
}
.toregister {
  color: rgba(11, 92, 95, 0.945);
  text-decoration: underline;
}
</style>