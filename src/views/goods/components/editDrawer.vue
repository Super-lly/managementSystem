<template>
  <div class="editDrawer">
    <el-drawer
      title="编辑商品"
      :before-close="closeEdit"
      :visible.sync="isdialog"
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
          <el-form-item label="商品编码" label-width="70px">
            <el-input
              :disabled="true"
              v-model="form.goods_code"
              autocomplete="off"
              size="small"
              style="width: 320px"
            ></el-input>
          </el-form-item>
          <!-- 商品类型最好是选择框 -->
          <el-form-item label="商品类型" label-width="70px">
            <el-select
              v-model="form.goods_type"
              clearable
              placeholder="请选择商品类型"
              @change="changeType"
            >
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
              v-model="this.editForm.goods_pic"
              list-type="picture-card"
              :http-request="editUpLoadPic"
              :on-change="editGetUrl"
              :on-preview="editHandlePictureCardPreview"
              :on-remove="editHandleRemove"
              :before-remove="editBeforeRemove"
              :file-list="this.fileList"
              :limit="3"
              :on-exceed="editLimit"
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
          <el-button @click="editCancelForm">取 消</el-button>
          <el-button
            type="primary"
            @click="editCloseDrawer"
            :loading="loading"
            >{{ loading ? "提交中 ..." : "确 定" }}</el-button
          >
        </div>
      </div>
    </el-drawer>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
  </div>
</template>

<script>
import request from '../../../network/request2';
export default {
  // 页面立即刷新
  inject:['reload'],
  name: "editDrawer",
  props: {
    form: {
      type: Object,
    },
    options: {
      type: Array,
    },
    userinfo: {
      type: Object,
    },
    isdialog: {
      type: Boolean,
    },
    goods_pic: {
      type: Array,
    },
    value: {
      type: String,
    },
  },
  data() {
    return {
      fileList: [],
      loading: false,
      dialogVisible: false,
      dialogImageUrl: "",
      editForm: {},
      token: sessionStorage.getItem("token"),
    };
  },
  created() {},
  methods: {
    // 关闭弹窗
    closeEdit() {
      this.editForm = {
        goods_name: "",
        goods_type: "",
        goods_price: "",
        discount_price: "",
        goods_describe: "",
      };
      this.$refs.upload.clearFiles();
      this.$emit("changeVisiable", this.isdialog);
      this.$emit("changePic", this.goods_pic);
      this.fileList = [];
    },
    // 取消操作
    editCancelForm() {
      this.closeEdit();
    },
    // 图片格式转换
    baseToUrl(arr, index) {
      let arrStr = arr.split(",");
      let bCode = atob(arrStr[1]);
      let len = bCode.length;
      let mime = arrStr[0].match(/:(.*?);/)[1];
      let code = new Uint8Array(len);
      while (len--) {
        code[len] = bCode.charCodeAt(len);
      }
      let blob = new Blob([code], { type: mime });
      let url = URL.createObjectURL(blob);
      // this.form.goods_pic = url;
      let str = blob.type.split("/")[1];
      this.fileList.push({
        name: index + "." + str,
        url: url,
      });
    },
    // 自定义上传事件
    editUpLoadPic(file) {},
    // 获取图片信息
    editGetUrl(file, fileList) {
      let maxSize = 300 * 1024;
      let render = new FileReader();
      render.readAsDataURL(file.raw);
      render.onload = () => {
        if (file.size >= maxSize) {
          this.$message.error("上传图片不能超过300kb");
        } else {
          this.form.goods_pic = this.form.goods_pic || [];
          this.form.goods_pic.push(render.result);
        }
      };
    },
    // 图片查看
    editHandlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 图片删除
    editHandleRemove(file, fileList) {
      fileList.forEach((v) => {
        console.log(v);
      });
      file = "";
      fileList = [];
    },
    // 图片删除前操作
    editBeforeRemove(file, fileList) {
      let index = "";
      fileList.forEach((v) => {
        if (file.uid === v.uid) {
          index = fileList.indexOf(v);
        }
      });
      this.form.goods_pic.splice(index, 1);
    },
    // 提交编辑数据
    editCloseDrawer() {
      // console.log(this.form);
      let form = {
        discount_price: this.form.discount_price,
        goods_code: this.form.goods_code,
        goods_describe: this.form.goods_describe,
        goods_id: this.form.goods_id,
        goods_name: this.form.goods_name,
        goods_pic: this.goods_pic,
        goods_price: this.form.goods_price,
        goods_type: this.form.goods_type,
      }
      request.post('/goods/changeGoodsInfo',form,this.token)
      .then(res=>{
        if(res.status === 0){
          console.log(res);
          this.$message.success(res.message)
          this.$emit("changeVisiable", this.isdialog);
          this.reload()
        } else{
          this.$message.error(res.message)
        }   
      })
    },
    // 图片超过限制
    editLimit() {
      this.$message.warning("当前允许上传最大数量为 3 张!");
    },
    // 改变类型选择
    changeType(value) {
      this.form.goods_type = value;
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