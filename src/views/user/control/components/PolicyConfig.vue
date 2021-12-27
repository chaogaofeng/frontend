<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="Fabric" name="Fabric">
      <div class="check-tit">
        <el-checkbox
          :indeterminate="isIndeterminate"
          v-model="checkAll"
          @change="handleCheckAllChange"
          >权限类别</el-checkbox
        >
      </div>
      <div class="check-con">
        <el-checkbox-group v-model="checkItem" @change="itemChange">
          <el-checkbox
            class="item"
            v-for="item in policy"
            :label="item"
            :key="item.permKey"
            >{{ item.permVal }}</el-checkbox
          >
        </el-checkbox-group>
      </div></el-tab-pane
    >
    <el-tab-pane label="ETH" name="ETH">
      <div class="check-tit">
        <el-checkbox
          :indeterminate="isIndeterminate"
          v-model="checkAll"
          @change="handleCheckAllChange"
          >权限类别</el-checkbox
        >
      </div>
      <div class="check-con">
        <el-checkbox-group v-model="checkItem" @change="itemChange">
          <el-checkbox
            class="item"
            v-for="item in policy"
            :label="item"
            :key="item.permKey"
            >{{ item.permVal }}</el-checkbox
          >
        </el-checkbox-group>
      </div></el-tab-pane
    >
    <el-tab-pane label="Quorum" name="Quorum">
      <div class="check-tit">
        <el-checkbox
          :indeterminate="isIndeterminate"
          v-model="checkAll"
          @change="handleCheckAllChange"
          >权限类别</el-checkbox
        >
      </div>
      <div class="check-con">
        <el-checkbox-group v-model="checkItem" @change="itemChange">
          <el-checkbox
            class="item"
            v-for="item in policy"
            :label="item"
            :key="item.permKey"
            >{{ item.permVal }}</el-checkbox
          >
        </el-checkbox-group>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  data() {
    return {
      activeName: "Quorum",
      checkAll: false,
      isIndeterminate: true,
      checkItem: [],
    };
  },
  watch: {
    checkedPolicy: {
      handler: function (val) {
        this.checkItem = val;
      },
      deep: true,
      immediate: true,
    },
  },
  props: {
    checkedPolicy: {
      type: Array,
    },
    policy: {
      type: Array,
    },
  },
  methods: {
    handleCheckAllChange(val) {
      if (val) {
        this.$emit("getPolicyConfig", this.policy);
      } else {
        this.$emit("getPolicyConfig", []);
      }
      this.isIndeterminate = false;
    },
    itemChange(value) {
      let checkedCount = value.length;
      if (checkedCount > 0) {
        this.$emit("getPolicyConfig", value);
      }
      this.checkAll = checkedCount === this.policy.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.policy.length;
    },
  },
};
</script>

<style scoped lang="scss">
.check-tit {
  padding: 12px;
  background: rgb(246, 247, 251);
  margin-bottom: 15px;
}
.check-con {
  padding: 12px;
  .item {
    width: 14%;
    padding: 8px 0;
    margin: 0;
  }
}
</style>
