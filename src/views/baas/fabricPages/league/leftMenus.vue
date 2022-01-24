<template>
  <div class="slidebar">
    <div class="sidebar-wrap">
      <div class="title" @click="goBack"><i class="el-icon-arrow-left"></i> <span>联盟列表</span></div>
      <div class="main">
        <el-menu
          :default-active="activeMenu"
          class="el-menu-vertical-demo"
        >
          <el-menu-item index="/baas/fabric/consortiumMg" @click="entry('consortiumMg')">联盟信息</el-menu-item>
          <el-menu-item index="/baas/fabric/memberMg" @click="entry('memberMg')">联盟成员</el-menu-item>
          <el-menu-item index="/baas/fabric/nodeMg" @click="entry('nodeMg')">节点管理</el-menu-item>
          <el-menu-item index="/baas/fabric/channelMg" @click="entry('channelMg')">通道管理</el-menu-item>          
          <el-menu-item index="/baas/fabric/certificateMg" @click="entry('certificateMg')">证书管理</el-menu-item>
        </el-menu>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FabricLeagueMenus',
  data() {
    return {
      alianceId: ''
    };
  },
  computed: {
    activeMenu() {
      const route = this.$route;
      const { path } = route;
      return path.replace('/'+this.$route.params.leagueId, '');
    },
  },
  created() {
    this.alianceId = this.$route.params.leagueId;
  },
  methods: {
    goBack() {
      this.$root.$emit('changeLeftMenu', 'default');
      this.$router.push({name: 'fabricConsortiumList'});
    },
    entry(pathMain) {
      this.$router.push({path: `/baas/fabric/${pathMain}/${this.alianceId}`});
    }
  },
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
      font-size: 16px;
      color: #666;
      padding-left: 8px;
      line-height: 50px;
      border-bottom: 1px solid #e8ecf0;      
      color: #0786e9;
      .el-icon-arrow-left {
        font-weight: bold;
        cursor: pointer;
      }
      span {
        cursor: pointer;
      }
    }
    .main {
      .el-menu {
        border: none;        
        .el-menu-item {
          font-size: 12px;
          border-left: 3px solid #fff;
        }
        ::v-deep .el-menu-item.is-active {
          border-left: 3px solid #108cee;
          background-color: #ecf5ff;
        }
        ::v-deep .el-submenu__title {
          font-size: 12px;
        }
      }
    }
  }
}
</style>
