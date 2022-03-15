<template>
  <el-menu
    class="el-menu-vertical-demo"
    :collapse="isCollapse"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd0b4"
  >
    <h3>智能家居后台管理系统</h3>
    <el-menu-item
      :index="item.path"
      v-for="item in noChildren"
      :key="item.path"
      @click="clickMenu(item)"
    >
      <i :class="'el-icon-' + item.icon"></i>
      <span slot="title">{{ item.label }}</span>
    </el-menu-item>
    <!-- 其他 -->
    <el-submenu
      :index="item.label"
      v-for="item in hasChildren"
      :key="item.label"
    >
      <template slot="title">
        <i :class="'el-icon-' + item.icon"></i>
        <span slot="title">{{ item.label }}</span>
      </template>
      <el-menu-item-group>
        <el-menu-item
          :index="v.path"
          v-for="v in item.children"
          :key="v.path"
          @click="clickMenu(item,v.name)"
        >
          <i :class="'iconfont icon-' + v.icon" class="item-font"></i>
          <span slot="title">{{ v.label }}</span>
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  data() {
    return {
      menu: [
        {
          path: "/main",
          name: "home",
          label: "首页",
          icon: "s-home",
          url: "/home",
        },
        {
          name: "user",
          label: "用户管理",
          icon: "user",
          url: "UserManage/UserManage",
          children: [
            {
              path: "/seeuserinfo",
              name: "seeuserinfo",
              icon: "yonghuxinxi-",
              label: "用户信息",
              url: "/seeuserinfo",
            },
            {
              path: "/updateinfo",
              name: "updateinfo",
              icon: "chilun",
              label: "修改信息",
              url: "/updateinfo",
            },
            {
              path: "/manageuser",
              name: "manageuser",
              icon: "jiedianguanli",
              label: "管理用户",
              url: "/manageuser",
            },
            // {
            //   path: "/changeuserroot",
            //   name: "changeuserroot",
            //   icon: "roots",
            //   label: "更改权限",
            //   url: "/changeuserroot",
            // },
          ],
        },
        {
          name: "mall",
          label: "商品管理",
          icon: "video-play",
          url: "MallManage/MallManage",
          children:[
            {
              path: "/goodsinfo",
              name: "goodsinfo",
              icon: "3dtouchshangpinliebiaotuijian",
              label: "商品列表",
              url: "/goodsinfo",
            },
          ]
        },
      ],
    };
  },
  methods: {
    clickMenu(item,index) {
      console.log(item,index);
      let path = ""
      if (!item.path && item.children.length != 0) {
        path = '/'+index
        console.log(1);
        this.$router.push(`${path}`)
      } else if (item.path && !item.children) {
        path = item.path;
        console.log(2);
        this.$router.push(`${path}`)
      }
    },
  },
  computed: {
    noChildren() {
      return this.menu.filter((item) => !item.children);
    },
    hasChildren() {
      return this.menu.filter((item) => item.children);
    },
    isCollapse() {
      return this.$store.state.isCollapse;
    },
  },
};
</script>

<style>
.el-menu {
  height: 100%;
}
.el-menu h3 {
  color: #fff;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.item-font {
  padding-right: 10px;
}
h3 {
  text-align: center;
}
</style>