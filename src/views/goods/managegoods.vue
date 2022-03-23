<template>
  <div class="managegoods">
    <!-- 头部操作 -->
    <div class="headtools">
      <div class="addUser">
        <el-button style="margin-top: 15px" @click="addGoods"
          >增加商品</el-button
        >
      </div>
      <div class="serchuser">
        <el-input
          placeholder="请输入商品名"
          v-model="input"
          style="max-width: 300px"
          clearable
        ></el-input>
        <el-button @click="searchgoods">查询</el-button>
        <el-button type="warning" @click="reset">重置</el-button>
      </div>
    </div>
    <!-- 商品信息表格 -->
    <div class="infotable">
      <el-card shadow="hover" style="height: 75vh">
        <!-- 表格 -->
        <el-table
          v-loading="loading"
          :data="tableData"
          style="width: 90%"
          max-height="400"
        >
          <el-table-column fixed prop="goods_name" label="商品名称" width="200">
          </el-table-column>
          <el-table-column prop="goods_type" label="商品类型" width="170">
          </el-table-column>
          <el-table-column prop="goods_code" label="商品编码" width="150">
          </el-table-column>
          <el-table-column prop="goods_price" label="原价格" width="150">
          </el-table-column>
          <el-table-column prop="discount_price" label="折扣价" width="150">
          </el-table-column>
          <el-table-column prop="discount" label="折扣" width="150">
          </el-table-column>
          <el-table-column prop="goods_describe" label="商品描述" width="200">
          </el-table-column>
          <!-- 操作 -->
          <el-table-column fixed="right" label="操作" width="120">
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
                  editInfo(scope.row, scope.$index, tableData)
                "
                type="text"
                size="small"
              >
                编辑
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 页码 -->
        <el-pagination
          style="margin-left: 43%; margin-top: 15px"
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
      title="新增商品"
      :before-close="handleClose"
      :visible.sync="dialog"
      direction="ltr"
      custom-class="demo-drawer"
      ref="drawer"
      size="40%"
    >
      <div class="demo-drawer__content">
        <el-form :model="form">
          <el-form-item label="商品名称" label-width="70px">
            <el-input
              v-model="form.goods_name"
              autocomplete="off"
              size="small"
              style="width: 320px"
            ></el-input>
          </el-form-item>
          <!-- 商品类型最好是选择框 -->
          <el-form-item label="商品类型" label-width="70px">
            <el-select v-model="value" clearable placeholder="请选择商品类型">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商品图片" label-width="70px">
            <el-upload
              ref="upload"
              action=""
              v-model="this.form.goods_pic"
              list-type="picture-card"
              :http-request="upLoadPic"
              :on-change="getUrl"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              :before-remove="beforeRemove"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="商品价格" label-width="70px">
            <el-input
              v-model="form.goods_price"
              autocomplete="off"
              size="small"
              style="width: 320px"
            ></el-input>
          </el-form-item>
          <el-form-item label="折扣价" label-width="70px">
            <el-input
              v-model="form.discount_price"
              autocomplete="off"
              size="small"
              style="width: 320px"
            ></el-input>
          </el-form-item>
          <el-form-item label="商品简介" label-width="70px">
            <el-input
              v-model="form.goods_describe"
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
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
  </div>
</template>

<script>
import { goodsInfo, goodsadd } from "../../network/goods";
import request from "../../network/request2";

export default {
  data() {
    return {
      input: "",
      value: "",
      goods_pic: [],
      count: 0,
      loading: false,
      dialog: false,
      dialogVisible: false,
      dialogImageUrl: "",
      tableData: [],
      // 新增表单数据
      form: {
        goods_name: "",
        goods_type: "",
        goods_price: "",
        discount_price: "",
        goods_describe: "",
        goods_pic: "",
      },
      options: [
        {
          value: "a",
          label: "A类商品",
        },
        {
          value: "b",
          label: "B类商品",
        },
        {
          value: "c",
          label: "C类商品",
        },
      ],
      userinfo: JSON.parse(sessionStorage.getItem("userinfo")),
      token: sessionStorage.getItem("token"),
    };
  },
  created() {
    // console.log(this.userinfo);
    this.goodsInfo();
  },
  methods: {
    // 获取商品信息
    goodsInfo() {
      const data = {};
      request.get("/goods/goodsinfo", data, this.token).then((res) => {
        // console.log(res);
        if (res.status === 0) {
          this.tableData = res.data.slice(0, 10);
          this.count = res.count;
        } else {
          this.$message.error(res.message);
        }
      });
    },
    // 添加商品
    addGoods() {
      // console.log(this.userinfo);
      if (this.userinfo.userroot !== "a") {
        this.$message.error("您没有操作权限");
      } else {
        this.dialog = true;
      }
    },
    // 关闭弹窗
    handleClose() {
      this.form = {
        goods_name: "",
        goods_type: "",
        goods_price: "",
        discount_price: "",
        goods_describe: "",
      };
      this.$refs.upload.clearFiles();
      this.dialog = false;
    },
    // 取消
    cancelForm() {
      this.handleClose();
    },
    // 提交新增信息
    closeDrawer() {
      // console.log(this.form);
      if (this.userinfo.userroot !== "a") {
        this.$message.error("您没有操作权限");
      } else {
        this.form.goods_type = this.value;
        this.loading = true;
        let form = {
          ...this.form,
          goods_pic: this.goods_pic,
        };
        request.post("/goods/goodsadd", form, this.token).then((res) => {
          console.log(res);
          if (res.status === 0) {
            setTimeout(() => {
              this.value = "";
              this.handleClose();
              this.loading = false;
              this.$message.success(res.message);
              this.goodsInfo();
            }, 1000);
          } else {
            this.$message.error(res.message);
          }
        });
      }
    },
    // 搜索商品
    searchgoods() {
      const data = {
        goods_name: this.input,
      };
      this.loading =true
      request.post("/goods/goodssearch", data, this.token).then((res) => {
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
    },
    // 重置
    reset() {
      this.loading = true;
      setTimeout(() => {
        this.tableData = this.tabledata;
        this.loading = false;
      }, 1500);
    },
    // 删除商品
    deleteRow(val) {
      console.log(val);
      const data = {
        goods_id: val.goods_id,
      };
      this.$confirm("是否确认移除该商品", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          request.post("/goods/goodsdelete", data, this.token).then((res) => {
            // console.log(res);
            if (res.status === 0) {
              this.$message.success(res.message);
              this.goodsInfo();
            } else {
              this.$message.error(res.message);
            }
          });
        })
        .catch(() => {
          this.$message.info("操作已取消");
        });
    },
    // 编辑商品
    editInfo(val) {
      if (this.userinfo.userroot !== "a") {
        this.$message.error("您没有操作权限");
      } else {
      }
    },
    // 翻页
    changePage(val) {},
    // 图片删除前操作
    beforeRemove(file, fileList) {
      let index = "";
      fileList.forEach((v) => {
        if (file.uid === v.uid) {
          index = fileList.indexOf(v);
        }
      });
      this.goods_pic.splice(index, 1);
    },
    // 图片删除
    handleRemove(file, fileList) {
      // console.log(file, fileList);
      fileList.forEach((v) => {
        console.log(v);
      });
      file = "";
      fileList = [];
    },
    // 图片查看
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    upLoadPic(file) {},
    // 获取图片数据
    getUrl(file, fileList) {
      // console.log(fileList);
      let maxSize = 300 * 1024;
      let render = new FileReader();
      render.readAsDataURL(file.raw);
      render.onload = () => {
        if (file.size >= maxSize) {
          this.$message.error("上传图片不能超过300kb");
        } else {
          this.goods_pic.push(render.result);
        }
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
.headtools {
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
.el-form-item {
  margin-left: 20px;
}
.el-form-item /deep/.el-upload-list--picture-card .el-upload-list__item {
  width: 60px;
  height: 60px;
}
</style>