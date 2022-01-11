<template>
  <div class="notFoundWrap">
    <img src="../assets/img/404.png" alt="Not Found" />
    <div class="tip">您要查看的页面不存在</div>
    <div class="btn" @click="goHome">返回首页</div>
  </div>
</template>

<script>
export default {
  name: "404",
  methods: {
    goHome() {
      this.$router.replace('/baas');
    },
  },
};
</script>

<style lang="scss" scoped>
.notFoundWrap {
  padding: 30px 0 80px;
  img {
    display: block;
    width: 380px;
    margin: 0 auto;
  }
  .tip {
    text-align: center;
    padding: 60px 0 40px;
    font-size: 16px;
    color: #333;
  }
  .btn {
    width: 212px;
    line-height: 50px;
    border-radius: 25px;
    background: #4054b2;
    color: #fff;
    text-align: center;
    font-size: 16px;
    margin: 0 auto;
    cursor: pointer;
  }
}
</style>