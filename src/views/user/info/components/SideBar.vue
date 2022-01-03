<template>
  <div class="slidebar">
    <div class="sidebar-wrap">
      <div class="title">账号中心</div>
      <div class="main">
        <el-menu
          :default-active="activeMenu"
          class="el-menu-vertical-demo"
          router
        >
          <el-menu-item index="/user/info/baseinfo">账号信息</el-menu-item>
          <el-menu-item index="/user/info/organ">我的机构</el-menu-item>
          <el-menu-item index="/user/info/secret">秘钥管理</el-menu-item>
        </el-menu>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      if (meta.apiActiveMenu) {
        return meta.apiActiveMenu;
      }
      return path;
    },
  },
  methods: {},
};
</script>

<style scoped lang="scss">
.slidebar {
  position: fixed;
  z-index: 2;
  left: 0;
  top: 0;
  width: 160px;
  height: 100%;
  overflow: hidden;
  background-color: #fff;
  transition: width 0.4s;
  .sidebar-wrap {
    position: absolute;
    top: 50px;
    left: 0;
    width: 100%;
    .title {
      font-size: 14px;
      color: #666;
      padding-left: 20px;
      line-height: 50px;
      border-bottom: 1px solid #e8ecf0;
    }
    .main {
      .el-menu {
        border: none;
        .el-menu-item.is-active {
          border-left: 3px solid #108cee;
        }
        .el-menu-item {
          font-size: 12px;
          border-left: 3px solid #fff;
        }
        ::v-deep .el-submenu__title {
          font-size: 12px;
        }
      }
    }
  }
}
</style>
