<template>
  <div class="slidebar">
    <div class="sidebar-wrap">
      <div class="main">
        <el-menu
          :default-active="activeMenu"
          class="el-menu-vertical-demo"
          router
        >
          <el-menu-item index="/baas/quorum/consortium"><联盟列表</el-menu-item>
          <el-menu-item
            :route="{ path: '/quorum/consortium/detaile', query: { id: id } }"
            index="/quorum/consortium/detaile"
            >联盟信息</el-menu-item
          >
          <el-menu-item
            :route="{ path: '/quorum/consortium/node', query: { id: id } }"
            index="/quorum/consortium/node"
            >节点管理</el-menu-item
          >
          <el-menu-item
            :route="{ path: '/quorum/consortium/contract', query: { id: id } }"
            index="/quorum/consortium/contract"
            >合约管理</el-menu-item
          >
          <el-menu-item
            :route="{ path: '/quorum/consortium/jsonrpc', query: { id: id } }"
            index="/quorum/consortium/jsonrpc"
            >JSON-RPC防火墙</el-menu-item
          >
        </el-menu>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: "", //联盟id
    };
  },
  created() {
    this.id = this.$route.query.id;
    if (!this.id) {
      this.$router.go(-1);
    }
  },
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
  border-right: 1px solid #ebebeb;
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
