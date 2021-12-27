<template>
  <div>
    <sidebar></sidebar>
    <router-view></router-view>
  </div>
</template>

<script>
import Sidebar from "./components/SideBar.vue";
export default {
  components: { Sidebar },
};
</script>

<style scoped lang="scss"></style>
