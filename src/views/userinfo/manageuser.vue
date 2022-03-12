<template>
  <div class="manageuser">
    <div class="usertools">
      <div class="addUser">
        <el-button style="margin-top: 15px" @click="addUsers" v-if="visiable"
          >增加用户</el-button
        >
        <p style="margin-top: 15px; color: rgb(180, 182, 182)" v-else>
          您没有操作权限
        </p>
      </div>
      <div class="serchuser">
        <el-input
          placeholder="请输入内容"
          v-model="input"
          style="max-width: 300px"
          clearable
        ></el-input>
        <el-button @click="searchuser">查询</el-button>
        <el-button type="warning" @click="reset">重置</el-button>
      </div>
    </div>
    <!-- 表格 -->
    <div class="tableCard">
      <el-card shadow="hover" style="height: 65vh">
        <el-table
          v-loading="loading"
          :data="tableData"
          :style="`${visiable ? 'width:70%;' : 'width:59%;'}`"
          max-height="400"
        >
          <el-table-column fixed prop="username" label="用户名" width="200">
          </el-table-column>
          <el-table-column prop="nickname" label="昵称" width="170">
          </el-table-column>
          <el-table-column prop="email" label="邮箱" width="200">
          </el-table-column>
          <el-table-column prop="userroot" label="权限" width="150">
          </el-table-column>
          <!-- 操作 -->
          <el-table-column
            fixed="right"
            label="操作"
            width="120"
            v-if="visiable"
          >
            <template slot-scope="scope">
              <el-button
                @click.native.prevent="
                  deleteRow(scope.row, scope.$index, tableData)
                "
                type="text"
                size="small"
              >
                移除
              </el-button>
            </template>
            -->
          </el-table-column>
        </el-table>
      </el-card>
    </div>
    <!-- 新增弹窗 -->
    <el-drawer
      title="新增用户"
      :before-close="handleClose"
      :visible.sync="dialog"
      direction="ltr"
      custom-class="demo-drawer"
      ref="drawer"
      size="40%"
    >
      <div class="demo-drawer__content">
        <el-form :model="form">
          <el-form-item label="用户名" label-width="70px">
            <el-input
              v-model="form.username"
              autocomplete="off"
              size="small"
              style="width: 320px"
            ></el-input>
          </el-form-item>
          <el-form-item label="昵 称" label-width="70px">
            <el-input
              v-model="form.nickname"
              autocomplete="off"
              size="small"
              style="width: 320px"
            ></el-input>
          </el-form-item>
          <el-form-item label="邮 箱" label-width="70px">
            <el-input
              v-model="form.email"
              autocomplete="off"
              size="small"
              style="width: 320px"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" label-width="70px">
            <el-input
              type="password"
              v-model="form.password"
              autocomplete="off"
              size="small"
              style="width: 320px"
            ></el-input>
          </el-form-item>
        </el-form>
        <div class="demo-drawer__footer" style="margin-left: 30%">
          <el-button @click="cancelForm">取 消</el-button>
          <el-button type="primary" @click="closeDrawer" :loading="loading">{{
            loading ? "提交中 ..." : "确 定"
          }}</el-button>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import { getAllInfo, removeuser, adduser, searchuser } from "../../network/userInfo";

export default {
  data() {
    return {
      tarr1: "",
      tarr2: "",
      tokenStr: sessionStorage.getItem("token"),
      id: sessionStorage.getItem("id"),
      tableData: [],
      tabledata: [],
      visiable: true,
      dialog: false,
      loading: false,
      form: {
        username: "",
        nickname: "",
        email: "",
        password: "",
      },
      input: "",
    };
  },
  created() {
    this.tarr1 = this.tokenStr.split("").slice(0, 6).join("");
    this.tarr2 = this.tokenStr.split("").slice(6, this.tokenStr.length).join("");
    this.loading = true;
    let userinfo = JSON.parse(sessionStorage.getItem("userinfo"));
    // 判断显隐
    if (userinfo.userroot === "a") {
      this.visiable = true;
    } else {
      this.visiable = false;
    }
    // 获取全部用户信息
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
            v.userroot = "超级管理员";
          } else if (v.userroot === "b") {
            v.userroot = "普通用户";
          } else if (v.userroot === "c") {
            v.userroot = "其他用户";
          }
        });
        setTimeout(() => {
          this.loading = false;
        }, 1500);
      }
    });
  },
  methods: {
    // 删除用户
    deleteRow(val, index, rows) {
      console.log(val, index, rows);
      const url = "/removeuser";
      removeuser({
        url,
        method: "post",
        data: {
          id: val.id,
        },
        headers: {
          Authorization: this.tarr1 + " " + this.tarr2,
        },
      }).then((res) => {
        console.log(res);
        if (res.status === 0) {
          if (this.tableData.length >= 1) {
            this.tableData.splice(index, 1);
          } else {
            this.$message.error("最少保留一条数据");
          }
        }
      });
    },
    addUsers() {
      this.dialog = true;
    },
    // 弹窗右上角
    handleClose() {
      this.dialog = false;
    },
    // 取消
    cancelForm() {
      this.loading = false;
      this.dialog = false;
    },
    // 提交表单
    closeDrawer() {
      console.log(this.form);
      this.loading = true;
      let from = {
        ...this.form,
      };
      console.log(from);
      if (
        from.username == "" ||
        from.nickname == "" ||
        from.email == "" ||
        from.password == ""
      ) {
        this.$message.error("用户信息不能为空");
        this.loading = false;
      } else {
        // 增加用户
        adduser({
          url: "/adduser",
          method: "post",
          data: from,
          headers: {
            Authorization: this.tarr1 + " " + this.tarr2,
          },
        }).then((res) => {
          console.log(res);
          if (res.status === 0) {
            this.$message.success(res.message);
            this.loading = false;
            this.dialog = false;
            this.form = {
              username: "",
              nickname: "",
              email: "",
              password: "",
            };
          } else if (res.status === 1) {
            this.$message.error(res.message);
            this.loading = false;
            this.form = {
              username: "",
              nickname: "",
              email: "",
              password: "",
            };
          }
        });
      }

      // this.form={
      //   username:'',
      //   nickname:'',
      //   email:'',
      //   password:''
      // }
    },
    // 查询用户
    searchuser() {
      console.log(this.input);
      this.loading = true;
      let id = "";
      this.tableData.map((v) => {
        if (this.input === v.username) {
          return (id = v.id);
        }
      });
      if (id === "") {
        this.$message.error("该用户不存在");
      } else {
        searchuser({
          url: "/searchuser",
          method: "post",
          data: { id },
          headers: {
            Authorization: this.tarr1 + " " + this.tarr2,
          },
        }).then((res) => {
          console.log(res);
          if (res.status === 0) {
            this.tabledata = this.tableData;
            setTimeout(() => {
              this.tableData = res.data;
              this.loading = false;
            }, 1000);
          } else {
            this.$message.error(res.message);
            setTimeout(() => {
              this.loading = false;
            }, 1000);
          }
        });
      }
    },
    reset() {
      this.loading = true;
      setTimeout(() => {
        this.tableData = this.tabledata;
        this.loading = false;
      }, 1500);
    },
  },
};
</script>

<style scoped>
.el-card {
  margin-top: 15px;
  background-color: rgb(243, 252, 252);
}
.el-table {
  margin: 0 auto;
  margin-top: 15px;
}
.usertools {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.serchuser {
  display: flex;
  width: 40%;
  justify-content: space-around;
  align-items: center;
}
</style>