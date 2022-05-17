<template>
  <div class="goodsinfo">
    <div class="goods_cards">
      <el-card shadow="hover" 
      style="height: 15vh; width: 35vw; min-width: 530px; min-height: 200px;margin-bottom:15px;cursor:pointer;border-radius: 25px;"
       v-for="(item, index) in goodsinfo" :key="index">
        <div class="info" v-if="item.goods_type != 'c'">
          <div class="goods_img">
            <img :src="item.goods_pic ? item.goods_pic : imgUrl" alt="goods_pic">
          </div>
          <div class="goods_char">
            <p class="goods_name">{{item.goods_name}}</p>
            <p class="goods_describe">{{item.goods_describe}}</p>
            <div style="font-size:13px">
              <span class="goods_price" style="margin-left:10px">当前售价：<span style="color:red">￥{{item.goods_price}}</span></span>
              <span class="discount_price" style="margin-left:20px">折扣价：<span style="color:red">￥{{item.discount_price}}</span></span>
            </div>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>


<script>
import request from '../../network/request2'

import imgUrl from "@/assets/images/noimg.png";

export default {
  data() {
    return {
      imgUrl,
      goodsinfo:[],
      token: localStorage.getItem('token'),
    };
  },
  created() {
    const data = {}
    request.get('/goods/goodsinfo',data,this.token)
    .then((res) => {
      if(res.status === 0){
        this.goodsinfo = this.goodsinfo.concat(res.data)
        this.goodsinfo.forEach(v=>{
          if(v.goods_pic.length>1){
            v.goods_pic = v.goods_pic[0]
          }
        })
      } else {
        this.$message.error(res.message)
      }
    });
  },
};
</script>

<style scoped>
.goodsinfo{
  min-width: 1250px;
}
.el-card /deep/ .el-card__body{
  background-color: #fef7e8;
  padding: 0;
}
.goods_cards{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.info{
  display: flex;
  justify-content: space-between;
}
.goods_img{
  margin: 0;
  padding: 0;
}
.goods_img img{
  margin: 0;
  padding: 0;
  height: 200px;
  overflow: hidden;
}
.goods_char .goods_name{
  width: 22vw;
  min-width: 335px;
  text-align: center;
}
.goods_char .goods_describe{
  width: 22vw;
  height: 40%;
  min-width: 335px;
  padding: 0 0 15px 15px;
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}
.goods_char .goods_price,
.goods_char .discount_price{
  width: 20%;
  min-width: 335px;
  text-align: center;
}
</style>