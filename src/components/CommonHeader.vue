<template>
  <header>
    <div class="l_content">
      <el-button plain size="mini" icon="el-icon-menu" @click="changeMenu()"></el-button>
      <h3 style="color: #fff">首页</h3>
    </div>
    <div class="r_content">
      <el-dropdown trigger="click">
        <img src="../assets/images/user.png" alt="user" />
        <el-dropdown-menu>
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item>退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>

<script>
export default {
  name:'CommonHeader',
  methods:{
    changeMenu(){
      this.$store.commit('collapseMenu')
    }
  }
}
</script>

<style scoped>
header {
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.l_content{
  padding-left:20px;
  display: flex;
  align-items: center;
}
.l_content h3 {
  margin: 0;
  padding-left: 10px;
}
.r_content{
  padding-right: 20px;
  padding-top: 6px;
}
.el-dropdown img{
  width: 50px;
  border-radius: 50%;
}
</style>