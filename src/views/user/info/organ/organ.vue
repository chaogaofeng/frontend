<template>
  <div v-if="load">
    <div class="info" v-if="userInfo.authStatus == 2">
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
              <div>
                <img :src="imageUrl" v-if="imageUrl" class="avatar" />
              </div>
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
      </div>
    </div>
    <div class="organ" v-else>
      <p>你还未加入任何机构</p>
      <router-link :to="{ name: 'organauth' }">立即认证</router-link>
    </div>
  </div>
</template>

<script>
import infoApi from "../api";
export default {
  data() {
    return {
      load: false,
      userInfo: {},
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
  created() {
    this.$http({
      url: infoApi.userInfo,
      method: "get",
    }).then((rel) => {
      this.load = true;
      if (rel.code == 0) {
        this.userInfo = rel.data;
      } else {
        this.$message(rel.msg);
      }
    });
    this.$http({
      url: infoApi.organAuthInfo,
      method: "get",
    }).then((rel) => {
      this.ruleForm.code = rel.data.code;
      this.ruleForm.usercode = rel.data.idCard;
      this.ruleForm.name = rel.data.name;
      this.ruleForm.username = rel.data.userName;
      if (rel.code == 0) {
        this.$http({
          url: `${infoApi.getload}/${rel.data.photo}`,
          method: "get",
          responseType: "arraybuffer",
        })
          .then((data) => {
            return (
              "data:image/png;base64," +
              btoa(
                new Uint8Array(data).reduce(
                  (data, byte) => data + String.fromCharCode(byte),
                  ""
                )
              )
            );
          })
          .then((rel) => {
            this.imageUrl = rel;
          });
      } else {
        this.$message(rel.msg);
      }
    });
  },
};
</script>

<style scoped lang="scss">
.organ {
  background: #fff;
  margin-top: 20px;
  padding: 20px;
  text-align: center;
}
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
