<template>
  <div id="main">
    <div class="page-body">
      <div class="title">切换角色</div>
      <div class="content">
        <div>
          <div class="msg">
            <span
              >切换角色后，你将放弃当前身份的权限，使用目标角色的权限访问其所在云账户的资源。如需帮助请查看</span
            >
            <a href="http://www.baidu.com" target="_blank">帮助文档</a>
          </div>
        </div>
        <div class="create-main">
          <el-form
            :model="createForm"
            ref="createForm"
            label-width="120px"
            label-position="left"
            :rules="rules"
          >
            <el-form-item label="账户ID或别名：" prop="id">
              <el-input
                type="text"
                placeholder="请输入账户ID或别名"
                v-model="createForm.id"
                class="ipt"
              ></el-input>
            </el-form-item>
            <el-form-item label="角色名称" prop="name">
              <el-input
                type="password"
                placeholder="请输入角色名称"
                v-model="createForm.name"
                class="ipt"
              ></el-input>
            </el-form-item>
            <el-form-item class="item">
              <el-button type="primary">切换</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      createForm: {
        id: "",
        name: "",
      },
      rules: {
        id: [
          { required: true, message: "请输入账户ID或别名", trigger: "blur" },
        ],
        name: [{ required: true, message: "请输入角色名称", trigger: "blur" }],
      },
    };
  },
};
</script>

<style scoped lang="scss">
.page-body {
  background: #fff;
  margin-left: 20px;
  margin-right: 20px;
  .title {
    height: 55px;
    line-height: 55px;
    font-weight: normal;
    border-bottom: 1px solid #e8ebee;
    margin: 0;
    padding-left: 20px;
    font-size: 16px;
  }
  .content {
    padding: 20px;
    .msg {
      background: #ecebff;
      display: inline-block;
      padding: 10px;
      margin-bottom: 40px;
      border: 1px solid #a7baf9;
      a {
        margin-left: 10px;
      }
    }
    .create-main {
      .ipt {
        max-width: 230px;
      }
      .item {
        padding-top: 30px;
      }
    }
  }
}
</style>
