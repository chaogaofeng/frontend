<template>
  <div class="login">
    <div class="title">Baas平台</div>
    <div class="content">
      <div class="form">
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          class="ruleForm"
        >
          <div class="tit">登录</div>
          <div class="ipt">
            <el-form-item prop="name">
              <el-input
                placeholder="请输入账号"
                prefix-icon="el-icon-user"
                v-model="ruleForm.name"
              >
              </el-input
            ></el-form-item>
          </div>
          <div class="ipt">
            <el-form-item prop="pass">
              <el-input
                show-password
                placeholder="请输入密码"
                prefix-icon="el-icon-s-goods"
                v-model="ruleForm.pass"
              >
              </el-input>
            </el-form-item>
          </div>
          <div class="submit">
            <el-button type="primary" size="medium" @click="login('ruleForm')"
              >登录</el-button
            >
          </div>
        </el-form>
        <div class="link">
          <router-link to="password">忘记密码</router-link>
          <router-link to="register">新用户注册</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import loginApi from "./api";
export default {
  data() {
    var validatename = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入账号"));
      } else {
        callback();
      }
    };
    var validatepass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        name: "",
        pass: "",
      },
      rules: {
        name: [{ validator: validatename, trigger: "blur" }],
        pass: [{ validator: validatepass, trigger: "blur" }],
      },
    };
  },
  methods: {
    ...mapMutations(["changeLogin"]),
    login(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http({
            method: "post",
            url: loginApi.login,
            data: {
              userNameOrUserPhone: this.ruleForm.name,
              userPwd: this.ruleForm.pass,
            },
          }).then((rel) => {
            if (rel.code == 0) {
              this.changeLogin(rel.data.token);
              this.$router.push(this.$route.query.redirect || "/");
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
.login {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  min-height: 600px;
  background-image: url("../../assets/img/login-bg.png");
  background-repeat: no-repeat;
  background-position: 50%;
  background-size: cover;
  .title {
    margin-top: -100px;
    margin-bottom: 25px;
    color: #fff;
    font-weight: 600;
    font-size: 28px;
    line-height: 40px;
  }
  .content {
    align-items: center;
    justify-content: center;
    width: 480px;
    height: 376px;
    background: rgba(255, 255, 255, 0.9);
    .form {
      width: 320px;
      margin: 0 auto;
      padding: 30px 0;
      .tit {
        margin-bottom: 40px;
        color: #111;
        font-weight: 500;
        font-size: 24px;
        line-height: 33px;
        text-align: center;
      }
      .ipt {
        margin-bottom: 20px;
      }
      .submit {
        padding: 20px 0;
        button {
          height: 45px;
          width: 100%;
        }
      }
      .link {
        display: flex;
        align-items: center;
        a {
          flex: 1;
          text-align: center;
          font-size: 14px;
          color: #409eff;
        }
      }
    }
  }
}
</style>
