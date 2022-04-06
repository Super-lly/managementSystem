<template>
  <div class="goodsinfo">
    <div class="goods_cards">
      <el-card
        shadow="hover"
        style="
          height: 15vh;
          width: 35vw;
          min-width: 530px;
          min-height: 200px;
          margin-bottom: 15px;
          cursor: pointer;
        "
        v-for="(item, index) in goodsinfo"
        :key="index"
      >
        <div class="info">
          <div class="goods_img">
            <img
              :src="item.goods_pic ? item.goods_pic : imgUrl"
              alt="goods_pic"
            />
          </div>
          <div class="goods_char">
            <p class="goods_name">{{ item.goods_name }}</p>
            <p class="goods_price">
              当前售价：<span style="color: red">￥{{ item.goods_price }}</span>
            </p>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>


<script>
import imgUrl from "@/assets/images/noimg.png";

import request from "../../network/request2";
export default {
  data() {
    return {
      imgUrl,
      goodsinfo: [],
      token: sessionStorage.getItem("token"),
      id: sessionStorage.getItem("id"),
    };
  },
  created() {
    this.getGoodsInfo();
  },
  methods: {
    getGoodsInfo() {
      const params = {
        id: this.id,
      };
      const token = this.$store.state.token
      request.get("/goods/goodsinfo", params).then((res) => {
        if (res.status === 0) {
          this.goodsinfo = this.goodsinfo.concat(res.data);
          this.goodsinfo.forEach((v) => {
            if (v.goods_pic.length >= 1) {
              v.goods_pic = v.goods_pic[0];
            }
          });
        } else {
          this.$message.error(res.message);
        }
      });
    },
  },
};
</script>

<style scoped>
.goodsinfo {
  min-width: 1250px;
}
.el-card /deep/ .el-card__body {
  background-color: #fef7e8;
  padding: 0;
}
.goods_cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.info {
  display: flex;
  justify-content: space-between;
}
.goods_img {
  margin: 0;
  padding: 0;
}
.goods_img img {
  margin: 0;
  padding: 0;
  height: 200px;
  overflow: hidden;
}
.goods_char .goods_name {
  width: 22vw;
  min-width: 335px;
  text-align: center;
}
.goods_char .goods_price {
  width: 22vw;
  min-width: 335px;
  text-align: center;
  margin-top: 15vh;
}
</style>