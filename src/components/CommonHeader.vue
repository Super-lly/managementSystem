<template>
  <header>
    <div class="l_content">
      <el-button plain size="mini" icon="el-icon-menu" @click="changeMenu"></el-button>
      <h3 style="color: #fff;cursor:pointer" @click="toHome">首页</h3>
    </div>
    <div class="r_content">
      <el-dropdown trigger="click">
        <img style="cursor:pointer" :src="userinfo.user_pic ? userinfo.user_pic: imgUrl" alt="userpic" />
        <el-dropdown-menu>
          <el-dropdown-item @click.native="mySpace">个人中心</el-dropdown-item>
          <el-dropdown-item @click.native="logOut">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>

<script>
import imgUrl from '@/assets/images/defaultPic.png'

export default {
  name:'CommonHeader',
  data(){
    return {
      imgUrl
    }
  },
  props:{
    userinfo:{
      type:Object,
    }
  },
  methods:{
    changeMenu(){
      this.$store.commit('collapseMenu')
    },
    toHome(){
      this.$router.push('/main')
    },
    logOut(){
      this.$router.replace('/')
    },
    mySpace(){
      this.$router.push('/seeuserinfo')
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