<template>
  <div class="updateinfo">
    <el-card shadow="hover" style="height: 85vh">
      <div class="user">
        <img
          :src="userinfo.user_pic ? userinfo.user_pic : imgUrl"
          alt="userpic"
        />
        <input type="file" ref="file" />
        <el-button @click="changePic" type="text">修改头像</el-button>
        <!-- 基础信息修改 -->
        <div class="changeinfo">
          <p>信息修改</p>
          <span>昵 称：</span>
          <el-input
            type="text"
            v-model="nickname"
            maxlength="10"
            minlength="1"
            show-word-limit
            :value="this.nickname"
            @change="changeName(nickname)"
          >
          </el-input>
          <el-button type="text" @click="updatename" style="margin-left: 10px"
            >点击修改</el-button
          >
          <br />
          <span>邮 箱：</span>
          <el-input
            type="text"
            v-model="email"
            maxlength="32"
            minlength="4"
            show-word-limit
            :value="this.email"
            @change="changeEmail(email)"
          >
          </el-input>
          <el-button type="text" @click="updateemail" style="margin-left: 10px"
            >点击修改</el-button
          >
        </div>
        <hr style="margin: 15px 0" />
        <!-- 密码修改 -->
        <div class="changepwd">
          <p>密码修改</p>
          <span>请输入原密码：</span>
          <el-input
            :type="`${icon ? 'password' : 'text'}`"
            size="small"
            v-model="password"
            :value="password"
          ></el-input>
          <span
            :class="`iconfont icon-${
              icon ? 'icon-eye-open' : 'icon-eye-close'
            }`"
            @click="changePwd"
          ></span>
          <br />
          <span>请输入新密码：</span>
          <el-input
            :type="`${newIcon ? 'password' : 'text'}`"
            size="small"
            v-model="newpassword"
            :value="newpassword"
          ></el-input>
          <span
            :class="`iconfont icon-${
              newIcon ? 'icon-eye-open' : 'icon-eye-close'
            }`"
            @click="changeNpwd"
          ></span>
          <br />
          <span>请确认新密码：</span>
          <el-input
            :type="`${secIcon ? 'password' : 'text'}`"
            size="small"
            v-model="secpassword"
            :value="secpassword"
          ></el-input>
          <span
            :class="`iconfont icon-${
              secIcon ? 'icon-eye-open' : 'icon-eye-close'
            }`"
            @click="changeSpwd"
          ></span>
          <br />
          <el-button
            style="margin-left: 40%; margin-top: 10px"
            @click="updatePwd"
            type="text"
            >确认修改</el-button
          >
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import request from "../../network/request2";

import imgUrl from "@/assets/images/defaultPic.png";

export default {
  inject:['reload'],
  data() {
    return {
      userinfo: {},
      imgUrl,
      nickname: "",
      email: "",
      password: "",
      newpassword: "",
      secpassword: "",
      icon: true,
      newIcon: true,
      secIcon: true,
      token: sessionStorage.getItem("token"),
      id: sessionStorage.getItem("id"),
    };
  },
  created() {
    this.userinfo = JSON.parse(sessionStorage.getItem("userinfo"));
    this.nickname = this.userinfo.nickname;
    this.email = this.userinfo.email;
  },
  methods: {
    changeName(nickname) {
      console.log(nickname);
    },
    changeEmail(email) {
      console.log(email);
    },
    // 更改昵称
    updatename() {
      this.$confirm("即将修改昵称, 是否修改?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          const data = {
            nickname: this.nickname,
            id: this.id,
          };
          request.post("/my/userinfo", data, this.token).then((res) => {
            console.log(res);
            if (res.status === 0) {
              this.$message({
                type: "success",
                message: "修改成功!",
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消修改",
          });
        });
    },
    // 更改邮箱
    updateemail() {
      this.$confirm("即将修改邮箱, 是否修改?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          const data = {
            email: this.email,
            id: this.id,
          };
          request.post("/my/userinfo", data, this.token).then((res) => {
            console.log(res);
            if (res.status === 0) {
              this.$message({
                type: "success",
                message: "修改成功!",
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消修改",
          });
        });
    },
    // 修改密码
    updatePwd() {
      if (
        this.password === "" ||
        this.newpassword === "" ||
        this.secpassword === ""
      ) {
        this.$message({
          type: "error",
          message: "请输入密码或新密码",
        });
      } else if (
        this.password === this.newpassword &&
        this.password === this.secpassword
      ) {
        this.$message({
          type: "error",
          message: "新密码不能和原密码相同",
        });
      } else if (this.newpassword != this.secpassword) {
        this.$message({
          type: "error",
          message: "两次输入密码不一致",
        });
      } else {
        this.$confirm("是否修改密码?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            const data = {
              newpwd: this.secpassword,
              oldpwd: this.password,
              id: this.id,
            };
            // 发送修改请求
            request.post("/my/updatepwd", data, this.token).then((res) => {
              if (res.status === 0) {
                this.$message({
                  type: "success",
                  message: "修改成功!",
                });
                this.password = "";
                this.newpassword = "";
                this.secpassword = "";
              } else {
                this.$message({
                  type: "error",
                  message: res.message,
                });
              }
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消修改",
            });
          });
      }
    },
    // 查看输入的密码
    changePwd() {
      this.icon = !this.icon;
    },
    changeNpwd() {
      this.newIcon = !this.newIcon;
    },
    changeSpwd() {
      this.secIcon = !this.secIcon;
    },
    // 头像修改
    changePic() {
      // 二次确认
      this.$confirm("确认修改?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          const id = this.id;
          // console.log(this.$refs.file.files[0]);
          let file = this.$refs.file.files[0];
          // console.log(file);
          let maxSize = 300 * 1024;
          // 将图片转为base64格式
          const render = new FileReader();
          render.readAsDataURL(file);
          render.onload = () => {
            if (file.size >= maxSize) {
              this.$message.error("上传图片不能超过300kb");
            } else {
              let user_pic = render.result;
              const data = {
                id,
                user_pic,
              };
              // 提交图片
              request.post("/my/updatepic", data, this.token).then((res) => {
                if (res.status === 0) {
                  this.userinfo.user_pic = user_pic;
                  sessionStorage.setItem("userinfo",JSON.stringify(this.userinfo)
                  );
                  this.reload()
                  this.$message.success(
                    res.message + "，若发现修改没变化请尝试刷新或稍后再试"
                  );
                } else {
                  this.$message.error(res.message);
                }
              });
            }
          };
        })
        .catch(() => {});
    },
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
.changeinfo {
  padding-top: 10px;
}
.changepwd span,
.changeinfo span {
  margin-left: 2vw;
}
.el-input {
  width: 50vw;
  margin-top: 10px;
  margin-left: 3vw;
  min-width: 643px;
  max-width: 768px;
}
.changepwd .el-input {
  width: 50vw;
  margin-top: 10px;
  margin-left: 0.45vw;
}
</style>