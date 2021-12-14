<template>
  <el-container>
    <el-aside width="auto">
      <common-aside></common-aside>
    </el-aside>
    <el-container>
      <el-header>
        <common-header></common-header>
      </el-header>
      <el-main><router-view/></el-main>
    </el-container>
  </el-container>
</template>

<script>
import CommonAside from "../components/CommonAside.vue"
import CommonHeader from "../components/CommonHeader.vue"

export default {
  name:'Home',
  data(){
    return{

    }
  },
  components:{
    CommonAside,
    CommonHeader
  }
}
</script>

<style scoped>
  .el-container{
    height: 100%;
  }
  .el-header{
    background-color: #000;
    padding: 0;
  }
</style>