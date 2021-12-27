<template>
  <div>
    <sidebar></sidebar>
    <div id="main">
      <div class="page">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from "./components/SideBar.vue";
export default {
  components: { Sidebar },
};
</script>

<style scoped lang="scss">
.page {
  width: auto;
  margin: 20px 20px 0 180px;
  background: #fff;
}
</style>
