<template>
  <div class="home">
    <el-button size="mini"></el-button>
    <el-row :gutter="20" class="home_row">
      <el-col :span="6" style="margin-top: 20rpx">
        <el-card shadow="hover">
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
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
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
</style>