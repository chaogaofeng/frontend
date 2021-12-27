<template>
  <div class="page-body"></div>
</template>

<script>
export default {
  created() {
    localStorage.clear();
    this.$router.replace("/login");
    this.$message({
      message: "退出成功",
      type: "success",
    });
  },
};
</script>

<style></style>
