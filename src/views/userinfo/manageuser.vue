<template>
  <div class="manageuser">
    <div class="usertools">
      <div class="addUser">
        <el-button style="margin-top: 15px" @click="addUsers"
          >增加用户</el-button
        >
        <!-- <p style="margin-top: 15px; color: rgb(180, 182, 182)" v-else>
          您没有操作权限
        </p> -->
      </div>
      <div class="serchuser">
        <el-input
          placeholder="请输入用户名"
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
      <el-card shadow="hover" style="height: 75vh">
        <el-table
          v-loading="loading"
          :data="tableData"
          style="width: 90%"
          max-height="450"
          :header-cell-style="{textAlign: 'center'}"
          :cell-style="{ textAlign: 'center' }"
        >
          <el-table-column fixed prop="username" label="用户名" width="200">
          </el-table-column>
          <el-table-column prop="nickname" label="昵称" width="200">
          </el-table-column>
          <el-table-column prop="email" label="邮箱" width="200">
          </el-table-column>
          <el-table-column prop="rootname" label="权限" width="200">
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
          <!-- 操作 -->
          <el-table-column fixed="right" label="操作" width="150">
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
              <span style="color: blue"> | </span>
              <el-button
                @click.native.prevent="
                  changeRoot(scope.row, scope.$index, tableData)
                "
                type="text"
                size="small"
              >
                修改
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          style="position: fixed; left:50%; bottom:8vh"
          layout="prev, pager, next"
          :page-size="10"
          @current-change="changePage"
          :total="count"
        >
        </el-pagination>
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
import request from "../../network/request2";

export default {
  data() {
    return {
      token: sessionStorage.getItem("token"),
      id: sessionStorage.getItem("id"),
      tableData: [], //表格渲染数据
      tabledata: [], //临时表格数据
      userinfo: {},
      // visiable: true,
      dialog: false,
      loading: false,
      form: {
        username: "",
        nickname: "",
        email: "",
        password: "",
      },
      input: "",
      count: 0,
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
    this.loading = true;
    let userinfo = JSON.parse(sessionStorage.getItem("userinfo"));
    this.userinfo = userinfo;
    this.getUserInfo();
  },
  methods: {
    // 获取用户信息
    getUserInfo() {
      const data = {};
      request.get("/my/getallinfo", data, this.token).then((res) => {
        console.log(res);
        if (res.status === 0) {
          this.tableData = res.data.slice(0, 10);
          this.tableData.map((v) => {
            if (v.userroot === "a") {
              v.rootname = "超级管理员";
            } else if (v.userroot === "b") {
              v.rootname = "普通用户";
            } else if (v.userroot === "c") {
              v.rootname = "其他用户";
            }
          });
          this.count = res.count;
          setTimeout(() => {
            this.loading = false;
          }, 1500);
        }
      });
    },
    // 删除用户
    deleteRow(val, index, rows) {
      console.log(val, index, rows);
      if (this.userinfo.userroot === "a") {
        const data = {
          id: val.id,
        };
        this.$confirm("是否确认移除该用户", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            request.post("/my/removeuser", data, this.token).then((res) => {
              console.log(res);
              if (res.status === 0) {
                if (this.tableData.length >= 1) {
                  this.$message.success('删除指定用户成功')
                  this.getUserInfo();
                } else {
                  this.$message.error("最少保留一条数据");
                }
              }
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消修改",
            });
          });
      } else {
        this.$message.error("您没有操作权限");
      }
    },
    // 修改权限
    changeRoot(val, index, rows) {
      console.log(val);
      const data = {
        id: val.id,
        userroot: val.userroot,
      };
      if (this.userinfo.userroot === "a") {
        this.$confirm("是否确认修改指定用户", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            request.post("/my/changeroot", data, this.token).then((res) => {
              console.log(res);
              if (res.status === 0) {
                this.$message.success(res.message);
                this.tableData.forEach((v) => {
                  if (v.id === val.id) {
                    v.userroot = val.userroot;
                  }
                });
                console.log(this.tableData);
              } else {
                this.$message.error(res.message);
              }
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消修改",
            });
          });
      } else {
        this.$message.error("您没有足够权限");
      }
    },
    // 添加用户
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
    // 提交新增表单
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
        request.post("/my/adduser", from, this.token).then((res) => {
          console.log(res);
          if (res.status === 0) {
            this.$message.success(res.message);
            this.dialog = false;
            this.clearForm();
            this.getUserInfo();
          } else if (res.status === 1) {
            this.$message.error(res.message);
            this.clearForm();
          }
        });
      }
    },
    // 查询用户
    searchuser() {
      console.log(this.input);
      this.loading = true;
      const data = {
        username : this.input
      }
      request.post('/my/searchuser',data,this.token)
      .then((res) => {
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
      // }
    },
    // 重置
    reset() {
      this.loading = true;
      this.input = ''
      setTimeout(() => {
        this.tableData = this.tabledata;
        this.loading = false;
      }, 1500);
    },
    // 翻页
    changePage(val) {
      console.log(1212312321, val);
      let data = {
        pageNum: val,
        pageSize: 10,
      };
      request.post('/my/getPageInfo',data,this.token)
      .then((res) => {
        console.log(res);
        if (res.status === 0) {
          this.loading = true;
          setTimeout(() => {
            this.tableData = res.data;
            this.loading = false;
          }, 1000);
        } else {
          this.$message.error(res.message);
        }
      });
    },
    // 清空表单
    clearForm() {
      this.loading = false;
      this.form = {
        username: "",
        nickname: "",
        email: "",
        password: "",
      };
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