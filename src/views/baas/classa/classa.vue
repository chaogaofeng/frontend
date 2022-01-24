<template>
  <div>
    <sidebar v-if="leftMenu === 'default'"></sidebar>
    <AsideFabricLeague v-else-if="leftMenu === 'fabricLeagueMenus'"></AsideFabricLeague>
    <router-view></router-view>
  </div>
</template>

<script>
import Sidebar from "./components/SideBar.vue";
import AsideFabricLeague from "@/views/baas/fabricPages/league/leftMenus";
export default {
  name: 'LayoutMain',
  components: { Sidebar, AsideFabricLeague },
  data() {
    return {
      leftMenu: 'default', // 'fabricLeagueMenus'
    };
  },
  created() {
    this.$root.$on('changeLeftMenu', (msg) => {
      this.leftMenu = msg;
    })
  }
};
</script>

<style scoped lang="scss"></style>
