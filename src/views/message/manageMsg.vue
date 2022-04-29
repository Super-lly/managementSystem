<template>
  <div class="managemsg">
    <div class="search">
      <el-input
        v-model="input"
        placeholder="请输入昵称"
        size="medium"
        class="search-input"
      ></el-input>
      <div class="search-btn">
        <el-button @click="reset">重置</el-button>
        <el-button type="success" @click="getSearch">查询</el-button>
      </div>
    </div>
    <div style="margin-top: 10px">
      <span style="font-size:12px;color:gray">当前{{ turn ? "旧" : "新" }}消息在上</span>
      <span style="margin-left: 10px; cursor: pointer;color:gray" @click="listReverse">↑↓</span>
    </div>
    <el-row :gutter="22" style="margin-top: 20rpx" v-loading="loading">
      <el-card
        shadow="hover"
        v-for="(item, index) in messageArr"
        :key="index"
        style="
          min-width: 1282px;
          margin-top: 10px;
          background-color: rgb(243, 252, 252);
        ">
        <div class="msg-row">
          <div class="msg-userinfo">
            <img
              :src="item.user_pic ? item.user_pic : imgUrl"
              style="width: 70px;height:70px;border-radius: 50%;"
            />
            <p>昵称:{{ item.nickname }}</p>
          </div>
          <div class="msg-detail">
            <div class="detail-content">
              <span style="margin-bottom: 10px;text-indent:2em">{{ item.userMsg }}</span>
            </div>
            <div class="detail-imgs">
              <div
                class="detail-img"
                style="text-align: center"
                v-for="(v, k) in item.msgpic"
                :key="k">
                <img :src="v" style="width: 70px" />
              </div>
            </div>
          </div>
        </div>
        <div
          class="msg-position"
          style="border-top: 1px solid #ccc; font-size: 12px"
        >
          <p>发布时间：{{ item.time }}</p>
          <div style="display:flex;justify-content: space-around">
            <p>位置：{{ item.positioncity }},{{ item.positionarea }}</p>
            <p @click="remove(item)" style="margin-left:20px;margin-right:10px;color: rgb(76, 127, 228);cursor:pointer">删除</p>
          </div>
        </div>
      </el-card>
    </el-row>
    <div class="page-change" style="z-index:999">
      <div class="block">
        <el-pagination style="position: fixed; left:50%; bottom:5vh"
          layout="prev, pager, next"
          :page-size="10"
          @current-change="changePage"
          :total="total"> </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import imgUrl from "@/assets/images/defaultPic.png";
import request from "../../network/request2";
export default {
  data() {
    return {
      input: "",
      imgUrl,
      token: sessionStorage.getItem("token"),
      messageArr: [],
      turn: false,
      total:0,
      loading: false,
    };
  },
  created() {
    this.getMessageList();
  },
  methods: {
    // 格式化时间
    getDate(now) {
      var year = now.getFullYear(); //取得4位数的年份
      var month = now.getMonth() + 1; //取得日期中的月份，其中0表示1月，11表示12月
      var date = now.getDate(); //返回日期月份中的天数（1到31）
      var hour = now.getHours(); //返回日期中的小时数（0到23）
      var minute = now.getMinutes(); //返回日期中的分钟数（0到59）
      var second = now.getSeconds(); //返回日期中的秒数（0到59）
      return (year +"-" +month +"-" +date +" " +hour +":" +minute +":" +second);
    },
    // 获取留言列表
    getMessageList(pageNum) {
      this.loading = true
      let parmas = {
        pageNum
      };
      request.post("/my/user/message/list", parmas, this.token).then((res) => {
        this.loading = false
        if (res.status === 0) {
          this.messageArr = res.data;
          this.messageArr.forEach((v) => {
            let timeNum = new Date(Number(v.time));
            let time = this.getDate(timeNum);
            v.time = time;
          });
          this.turn = false;
          this.total = res.count
        }
      });
    },
    // 当前页按时间排序
    listReverse() {
      this.loading = true
      this.messageArr.reverse();
      this.turn = !this.turn;
      this.loading = false
    },
    // 根据搜索内容进行查询
    getSearch(pageNum) {
      if (this.input != "") {
        this.loading = true
        let parmas = {
          nickname: this.input,
          pageNum
        };
        request.post("/my/user/search/message", parmas, this.token).then((res) => {
          this.loading = false
            if (res.status === 0) {
              this.messageArr = res.data;
              this.messageArr.forEach((v) => {
                let timeNum = new Date(Number(v.time));
                let time = this.getDate(timeNum);
                v.time = time;
              });
              this.turn = false;
            }
          });
      } else {
        this.$message.error("请输入内容");
      }
    },
    // 重置按钮
    reset() {
      this.input = "";
      this.getMessageList();
    },
    // 翻页
    changePage(val){
      this.getMessageList(val)
    },
    // 移除商品
    remove(item){
      let parmas = {
          standnum:item.standnum
        }
      this.$confirm('此操作将永久删除该条留言, 是否继续?', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          request.post('/my/user/remove/message',parmas,this.token)
          .then(res=>{
            if(res.status === 0){
              this.$message.success(res.message)
              this.getMessageList()
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    }
  },
};
</script>

<style scoped>
.search {
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.search .search-input {
  width: 60%;
  text-align: center;
}
.search .search-btn {
  width: 40%;
  text-align: left;
  margin-left: 20px;
}
.msg-row {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.msg-row .msg-userinfo {
  width: 15%;
  text-align: center; 
}
.msg-row .msg-detail {
  width: 85%;
  text-align: left;
  padding-left: 20px;
}
.msg-detail .detail-imgs {
  display: flex;
  align-items: center;
}
.msg-position {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.el-card /deep/.el-card__body {
  padding-bottom: 0;
}
</style>