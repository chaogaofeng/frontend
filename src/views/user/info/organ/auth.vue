<template>
  <div class="info">
    <div class="msg">
      <i class="el-icon-warning-outline"></i
      ><span>温馨提示：对于企业认证，统一企业信息只能认证一次。</span>
    </div>
    <div class="block">
      <div class="menu">认证信息</div>
      <div class="form">
        <el-form
          :model="ruleForm"
          ref="ruleForm"
          label-width="120px"
          label-position="left"
          :rules="rules"
        >
          <el-form-item label="营业执照" prop="pic">
            <el-upload
              class="avatar-uploader"
              :action="action"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
              :headers="headers"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <p>1.支持的图片包括JPG、JPEG和PNG，图片大小不得超过5M</p>
            <p>2.上传的图片需清晰完整</p>
          </el-form-item>
          <el-form-item label="企业名称" prop="name">
            <el-input
              type="text"
              placeholder="请输入"
              v-model="ruleForm.name"
              class="ipt"
            ></el-input>
          </el-form-item>
          <el-form-item label="社会信用代码" prop="code">
            <el-input
              type="text"
              placeholder="请输入"
              v-model="ruleForm.code"
              class="ipt"
            ></el-input>
          </el-form-item>
          <el-form-item label="法人姓名" prop="username">
            <el-input
              type="text"
              placeholder="请输入"
              v-model="ruleForm.username"
              class="ipt"
            ></el-input>
          </el-form-item>
          <el-form-item label="法人身份证号" prop="usercode">
            <el-input
              type="text"
              placeholder="请输入"
              v-model="ruleForm.usercode"
              class="ipt"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="submit">
        <el-button type="primary" @click="submit('ruleForm')"
          >提交认证</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import infoApi from "../api";
export default {
  data() {
    return {
      headers: {
        token: localStorage.getItem("token"),
      },
      action: infoApi.upload, //上传地址
      uuid: "",
      imageUrl: "",
      ruleForm: {
        name: "", //公司名
        code: "", //信用代码
        username: "", //法人名
        usercode: "", //法人身份证号
      },
      rules: {
        name: [{ required: true, message: "请输入企业名称", trigger: "blur" }],
        code: [
          { required: true, message: "请输入社会信用代码", trigger: "blur" },
        ],
        username: [
          { required: true, message: "请输入法人姓名", trigger: "blur" },
        ],
        usercode: [
          { required: true, message: "请输入法人身份证号", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.uuid = res.data.uuid;
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    submit(formName) {
      if (!this.uuid) {
        this.$message("请上传营业执照");
        return;
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http({
            method: "post",
            url: infoApi.organAuth,
            data: {
              code: this.ruleForm.code,
              idCard: this.ruleForm.usercode,
              name: this.ruleForm.name,
              photo: this.uuid,
              userName: this.ruleForm.username,
            },
          }).then((rel) => {
            if (rel.code == 0) {
              this.$message({
                message: "提交认证成功",
                type: "success",
              });
            } else {
              this.$message(rel.msg);
            }
          });
        }
      });
    },
  },
};
</script>

<style scoped lang="scss">
.title {
  padding: 20px 0;
  font-size: 20px;
}
.info {
  padding-top: 20px;
  .msg {
    background: #ecebff;
    padding: 10px;
    margin-bottom: 20px;
    border: 1px solid #a7baf9;
    i {
      color: #108cee;
      font-size: 16px;
      vertical-align: -1px;
      margin-right: 5px;
    }
  }
  .success {
    background: #fff;
    margin-bottom: 20px;
    padding: 80px 0;
    box-shadow: 0 0 5px #dedede;
    position: relative;
    .box {
      position: relative;
      left: 50%;
      margin-left: -50px;
      i {
        position: absolute;
        left: -60px;
        top: -5px;
        font-size: 50px;
        color: #2cb663;
      }
      h1 {
        font-size: 20px;
        margin-bottom: 10px;
      }
      p {
        font-size: 13px;
        color: #999;
        margin-bottom: 30px;
      }
      .btn {
        height: 32px;
        color: #fff;
        background: #108cee;
        text-align: center;
        padding: 0 15px;
        line-height: 32px;
        cursor: pointer;
        width: 80px;
      }
    }
  }
  .block {
    background: #fff;
    padding: 20px;
    box-shadow: 0 0 5px #dedede;
    margin-bottom: 20px;
    flex: 1;
    .blue {
      color: #108cee;
    }
    .menu {
      color: #333;
      font-size: 16px;
      border-left: solid 4px #108cee;
      padding-left: 14px;
      margin-top: 10px;
      margin-bottom: 25px;
    }
    .form {
      padding-right: 50%;
      p {
        font-size: 12px;
        color: #999;
        line-height: 1.5;
      }
    }
    .submit {
      padding: 30px 0;
      border-top: 1px solid #e8ebee;
    }
    .rz {
      padding-left: 20px;
      position: relative;
      &::after {
        content: "";
        position: absolute;
        left: 5px;
        top: 6px;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #2cb663;
      }
      &.red::after {
        background: #eb5252;
      }
    }
    .p {
      font-size: 14px;
      color: #606266;
      margin-bottom: 10px;
      a {
        margin-left: 10px;
      }
    }
    .a {
      font-size: 14px;
      color: #bfbebe;
    }
  }
}

.avatar-uploader-icon {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
