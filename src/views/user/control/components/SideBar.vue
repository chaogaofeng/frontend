<template>
  <div class="slidebar">
    <div class="sidebar-wrap">
      <div class="title">多用户访问控制</div>
      <div class="main">
        <el-menu
          :default-active="activeMenu"
          class="el-menu-vertical-demo"
          router
        >
          <el-menu-item index="/user/control/overview">概览</el-menu-item>
          <el-submenu index="/user/control/agementlist">
            <template slot="title">
              <span>用户管理</span>
            </template>
            <el-menu-item index="/user/control/agementlist"
              >子用户</el-menu-item
            >
            <!-- <el-menu-item
              index="/user/control/agementmsg"
              >消息接收人</el-menu-item
            > -->
          </el-submenu>
          <el-menu-item index="/user/control/policy">策略管理</el-menu-item>
          <el-menu-item index="/user/control/role">角色管理</el-menu-item>
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
        }
        ::v-deep .el-submenu__title {
          font-size: 12px;
        }
      }
    }
  }
}
</style>
