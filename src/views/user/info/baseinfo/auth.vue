<template>
  <div class="info" v-if="load">
    <div class="title">
      <span v-if="userInfo.authStatus == 1">认证信息</span>
      <span v-else>个人认证</span>
    </div>
    <div class="msg">
      <i class="el-icon-warning-outline"></i
      ><span>温馨提示：对于个人认证，同一身份证只能认证一个账号。</span>
    </div>
    <div v-if="userInfo.authStatus == 1">
      <div class="success">
        <div class="box">
          <i class="el-icon-success"></i>
          <h1>您已完成个人认证</h1>
          <p>您可以点击按钮返回控制台继续使用产品</p>
          <router-link :to="{ name: 'baseinfo' }" class="btn" tag="div"
            >返回控制台</router-link
          >
        </div>
      </div>
      <div class="block">
        <div class="menu">认证信息</div>
        <el-descriptions>
          <el-descriptions-item label="认证状态">
            <div class="rz">已认证</div>
          </el-descriptions-item>
          <el-descriptions-item label="真实姓名">{{
            userInfo.realName
          }}</el-descriptions-item>
          <el-descriptions-item label="身份证号">{{
            idCard
          }}</el-descriptions-item>
          <el-descriptions-item label="手机号码">{{
            phone
          }}</el-descriptions-item>
          <el-descriptions-item label="认证时间">{{
            userInfo.authTime
          }}</el-descriptions-item>
        </el-descriptions>
      </div>
    </div>
    <div v-else>
      <div class="block">
        <div class="menu">认证信息</div>
        <div class="form">
          <el-form
            :model="ruleForm"
            ref="ruleForm"
            label-width="100px"
            label-position="left"
            :rules="rules"
          >
            <el-form-item label="真实姓名" prop="name" title="真实姓名">
              <el-input
                type="text"
                placeholder="请输入真实姓名"
                v-model="ruleForm.name"
                class="ipt"
              ></el-input>
            </el-form-item>
            <el-form-item label="身份证号" prop="sfz" title="身份证号">
              <el-input
                type="text"
                placeholder="请输入身份证号"
                v-model="ruleForm.sfz"
                class="ipt"
              ></el-input>
            </el-form-item>
            <el-form-item label="绑定的手机号"> {{ phone }} </el-form-item>
          </el-form>
        </div>
        <div class="submit">
          <el-button type="primary" @click="authsubmit('ruleForm')"
            >提交认证</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import infoApi from "../api";
export default {
  data() {
    var validateSfz = (rule, value, callback) => {
      if (
        /^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(
          value
        )
      ) {
        callback();
      } else {
        callback(new Error("请输入正确的身份证号"));
      }
    };
    var validateName = (rule, value, callback) => {
      if (value.trim() == "") {
        callback(new Error("请输入姓名"));
      } else {
        callback();
      }
    };
    return {
      load: false,
      phone: "",
      idCard: "",
      userInfo: {}, //用户信息
      ruleForm: {
        name: "", //姓名
        sfz: "", //身份证
      },
      rules: {
        name: [{ validator: validateName, trigger: "blur" }],
        sfz: [{ validator: validateSfz, trigger: "blur" }],
      },
    };
  },
  created() {
    //获取用户信息
    this.getdata();
  },
  methods: {
    getdata() {
      this.$http({
        url: infoApi.userInfo,
        method: "get",
      }).then((rel) => {
        if (rel.code == 0) {
          this.load = true;
          this.userInfo = rel.data;
          this.idCard =
            rel.data.idCard.substr(0, 6) +
            "******" +
            rel.data.idCard.substr(16);
          this.phone =
            rel.data.userPhone.substr(0, 3) +
            "****" +
            rel.data.userPhone.substr(7);
        } else {
          this.$message(rel.msg);
        }
      });
    },
    authsubmit(form) {
      //个人认证
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.$http({
            method: "post",
            url: infoApi.authUser,
            params: {
              authStatus: 1,
              idCard: this.ruleForm.sfz,
              realName: this.ruleForm.name,
            },
          }).then((rel) => {
            if (rel.code == 0) {
              this.getdata();
              this.$message({
                message: "个人认证成功",
                type: "success",
              });
            } else {
              this.$message({
                message: rel.msg,
              });
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
    height: 280px;
    box-shadow: 0 0 5px #dedede;
    position: relative;
    .box {
      position: absolute;
      left: 54%;
      transform: translate(-50%, -50%);
      top: 50%;
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
</style>
