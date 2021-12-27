<template>
  <div class="organ">
    <p>你还未加入任何机构</p>
    <router-link :to="{ name: 'organauth' }">立即认证</router-link>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
.organ {
  background: #fff;
  margin-top: 20px;
  padding: 20px;
  text-align: center;
}
</style>
