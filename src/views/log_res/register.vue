<template>
  <div class="register">
    <div class="user_card">
      <h2 class="title">智能家居后台管理系统</h2>
      <!-- <form action="http:127.0.0.1/api/register" method="post"> -->
        <input type="text" name="username" placeholder="请输入用户名" v-model="username" />
        <input type="text" name="nickname" placeholder="请输入昵称" v-model="nickname" />
        <input type="text" name="email" placeholder="请输入邮箱" v-model="email" />
        <input type="password" name="password" placeholder="请输入密码" v-model="password" />
        <input type="password" name="secpassword" placeholder="请确认密码" v-model="secpassword" />
        <button @click="register" class="register_btn" style="width:170px;height:30px">确认注册</button>
      <!-- </form> -->
      <p class="text">
        已有账号？<span class="tologin" @click="login" style="cursor: pointer;">去登录</span>
      </p>
    </div>
  </div>
</template>

<script>
// import { userRequest } from "../../network/user";
import request from '../../network/request2'
// import register from '../../network/log&res'

export default {
  name: "Register",
  data(){
    return{
      username:'',
      nickname:'',
      email:'',
      password:'',
      secpassword:'',
      userdata:{}
    }
  },
  methods: {
    // 执行注册
    register() {
      // this.$router.push("/home");
      if(this.username == '' || this.nickname == '' || this.email == '' || this.password == '' || this.secpassword == ''){
        this.$message.error('请补全信息')
      } else if(this.password != this.secpassword){
        this.$message.error('请确保输入的密码一致')
      } else{
        this.userdata.username = this.username
        this.userdata.nickname = this.nickname
        this.userdata.email = this.email
        this.userdata.password = this.password
        let userdata = this.userdata
        // console.log(userdata);
        request.post('/api/register',userdata)
        .then(res=>{
          console.log(res);
          if(res.status === 0){
            this.$message.success(res.message)
            this.username = ''
            this.nickname = ''
            this.email = ''
            this.password = ''
            this.secpassword = ''
            this.$router.replace('/')
          } else{
            this.$message.error(res.message)
          }
        })
      }
    },
    login() {
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
.title{
  font-family: '楷体';
}
.register{
  height: 100%;
  background: url('../../assets/images/log&res.png') no-repeat center center fixed;
  background-size: cover;
}
.user_card {
  padding-top: 20px;
  width: 40vw;
  height: 45vh;
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
  height: 30px;
  outline: none;
  border: none;
  border-bottom: 1px solid #ccc;
  border-radius: 15px;
}
.register_btn {
  border-radius: 15px;
  border: 1px solid #ccc;
  color: #fff;
  background-color: orange;
  cursor: pointer;
}
.text {
  font-size: 12px;
}
.tologin {
  color: rgba(11, 92, 95, 0.945);
  text-decoration: underline;
}
</style>