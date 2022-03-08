<template>
  <div class="changeuserroot">
    <!-- 用户信息 -->
    <div class="usercard" style="margin-top:0">
      <el-card
        shadow="hover"
        style="height: 30vh; width: 15vw; min-width: 230px; min-height: 230px"
      >
        <div class="user">
          <img
            :src="userinfo.user_pic ? userinfo.user_pic : imgUrl"
            alt="userpic"
          />
          <div class="userInfo">
            <p class="name">用户名：{{ userinfo.username }}</p>
            <p class="access">权 限：{{ userinfo.root }}</p>
          </div>
        </div>
      </el-card>
    </div>
    <div class="usertable" style="margin-top:10px">
      <el-card>
        <el-table :data="tableData" style="width: 70%;margin-left:17%" max-height="380">
          <el-table-column fixed prop="username" label="用户名" width="200">
          </el-table-column>
          <el-table-column prop="nickname" label="昵称" width="170">
          </el-table-column>
          <el-table-column label="权限" prop="rootname" width="150">
            <template slot-scope="scope">
              <el-select v-model="scope.row.userroot" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="email" label="邮箱" width="200">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="120">
            <template slot-scope="scope">
              <el-button
                @click.native.prevent="deleteRow(scope.row)"
                type="text"
                size="small"
              >
                修改
              </el-button>
            </template>
            -->
          </el-table-column>
        </el-table>
      </el-card>
    </div>
  </div>
</template>

<script>
import imgUrl from "@/assets/images/defaultPic.png";
import { getAllInfo, changeRoot } from "../../network/userInfo";

export default {
  data() {
    return {
      imgUrl,
      userinfo: {},
      tableData: [],
      tarr1: "",
      tarr2: "",
      tokenStr: sessionStorage.getItem("token"),
      options: [
        {
          value: "a",
          label: "超级管理员",
        },
        {
          value: "b",
          label: "普通用户",
        },
        {
          value: "c",
          label: "其他用户",
        },
      ],
    };
  },
  created() {
    this.tarr1 = this.tokenStr.split("").slice(0, 6).join("");
    this.tarr2 = this.tokenStr.split("").slice(6, this.tokenStr.length).join("");
    this.userinfo = JSON.parse(sessionStorage.getItem("userinfo"));
    console.log(this.userinfo);
    // 获取用户信息
    getAllInfo({
      url: "/getallinfo",
      method: "get",
      headers: {
        Authorization: this.tarr1 + " " + this.tarr2,
      },
    }).then((res) => {
      console.log(res);
      if (res.status === 0) {
        this.tableData = res.data;
        this.tableData.map((v) => {
          if (v.userroot === "a") {
            v.rootname = "超级管理员";
          } else if (v.userroot === "b") {
            v.rootname = "普通用户";
          } else if (v.userroot === "c") {
            v.rootname = "其他用户";
          }
        });
      }
    });
  },
  methods:{
    deleteRow(row){
      console.log(row);
      const data = {
        id:row.id,
        userroot:row.userroot
      }
      if(this.userinfo.userroot === 'a'){
        this.$confirm('是否确认修改指定用户','提示',{
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(()=>{
          changeRoot({
            url:'/changeroot',
            method:'post',
            data:data,
            headers: {
              Authorization: this.tarr1 + " " + this.tarr2,
            },
          }).then(res=>{
            console.log(res);
            if(res.status === 0){
              this.$message.success(res.message)
            } else{
              this.$message.error(res.message)
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消修改'
          });          
        });
      } else{
        this.$message.error('您没有足够权限')
      }
    }
  }
};
</script>

<style scoped>
.user img {
  width: 100px;
  border-radius: 50%;
}
.el-card {
  background-color: rgb(243, 252, 252);
}
</style>