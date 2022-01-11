<template>
  <div class="fabric">
    <div id="main">
      <div class="page">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
.page {
  width: auto;
  margin: 20px 20px 0 180px;
  background: #fff;
}
</style>
