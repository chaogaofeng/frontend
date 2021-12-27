<template>
  <div class="baas">
    <div class="header">
      <router-link to="/" tag="div" class="logo">
        <img src="../../assets/img/logo.png" alt="logo" />
      </router-link>
      <div class="content">
        <router-link to="/login"> 返回登录 </router-link>
      </div>
    </div>
    <div id="main">
      <div class="page">
        <div class="pass-top">
          <el-steps :active="active" finish-status="success">
            <el-step title="账号验证"></el-step>
            <el-step title="重置密码"></el-step>
            <el-step title="完成"></el-step>
          </el-steps>
        </div>
        <div class="pass-bot">
          <div class="con" v-if="active == 0">
            <h1>账号验证</h1>
            <el-form
              :model="ruleOne"
              status-icon
              :rules="rules"
              ref="ruleOne"
              label-width="70px"
              label-position="left"
            >
              <el-form-item label="手机号" prop="phone">
                <el-input
                  type="text"
                  v-model="ruleOne.phone"
                  placeholder="请输入手机号"
                  autocomplete="off"
                ></el-input>
              </el-form-item>

              <el-form-item label="验证码" prop="code">
                <div class="code-wrapper">
                  <el-input
                    type="text"
                    maxlength="6"
                    placeholder="验证码"
                    v-model="ruleOne.code"
                  />
                  <el-button
                    class="code-btn"
                    :disabled="disabled"
                    @click="getCode"
                    >{{ valiBtn }}</el-button
                  >
                </div>
              </el-form-item>
            </el-form>
            <div class="submit">
              <el-button
                type="primary"
                size="medium"
                @click="submitOne('ruleOne')"
                >下一步</el-button
              >
            </div>
          </div>
          <div class="con" v-if="active == 1">
            <h1>重置密码</h1>
            <el-form
              :model="ruleTwo"
              status-icon
              :rules="rules"
              ref="ruleTwo"
              label-width="70px"
              label-position="left"
            >
              <el-form-item label="密码" prop="pass">
                <el-input
                  type="password"
                  v-model="ruleTwo.pass"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item label="确认密码" prop="checkPass">
                <el-input
                  type="password"
                  v-model="ruleTwo.checkPass"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-form>
            <div class="submit">
              <el-button
                type="primary"
                size="medium"
                @click="submitTwo('ruleTwo')"
                >下一步</el-button
              >
            </div>
          </div>
          <div class="con" v-if="active == 3">
            <div class="success-tit">
              <div class="icon">
                <i class="el-icon-circle-check"></i>
              </div>
              <div class="text">
                <h2>密码重置成功</h2>
                <p>你的密码已重置，请重新登录</p>
              </div>
            </div>
            <div class="success-bot">
              <router-link to="/login">立即登录</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import loginApi from "./api";
export default {
  data() {
    var validatephone = (rule, value, callback) => {
      var myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
      if (myreg.test(value)) {
        callback();
      } else {
        callback(new Error("请输入正确的手机号"));
      }
    };
    var validateCode = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入验证码"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleTwo.checkPass !== "") {
          this.$refs.ruleTwo.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleTwo.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      valiBtn: "获取验证码",
      disabled: false,
      ruleOne: {
        phone: "",
        code: "",
      },
      ruleTwo: {
        pass: "",
        checkPass: "",
      },
      rules: {
        phone: [{ validator: validatephone, trigger: "blur" }],
        code: [{ validator: validateCode, trigger: "blur" }],
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
      },
      active: 0,
    };
  },
  methods: {
    getCode() {
      this.$refs["ruleOne"].validateField("phone", (err) => {
        if (err) {
          return;
        } else {
          this.$http({
            method: "post",
            url: loginApi.sendcode,
            params: {
              userPhone: this.ruleOne.phone,
            },
          }).then(() => {
            this.tackBtn(); //验证码倒数60秒
          });
        }
      });
    },
    tackBtn() {
      //验证码倒数60秒
      let time = 60;
      let timer = setInterval(() => {
        if (time == 0) {
          clearInterval(timer);
          this.valiBtn = "获取验证码";
          this.disabled = false;
        } else {
          this.disabled = true;
          this.valiBtn = time + "秒后重试";
          time--;
        }
      }, 1000);
    },
    submitOne(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //校验验证码
          this.$http({
            method: "post",
            url: loginApi.checkcode,
            params: {
              smsCode: this.ruleOne.code,
              userPhone: this.ruleOne.phone,
            },
          }).then((rel) => {
            if (rel.code == 0) {
              this.active = 1;
            } else {
              this.$message("验证码有误");
            }
          });
        } else {
          return false;
        }
      });
    },
    submitTwo(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http({
            method: "post",
            url: loginApi.resetPwd,
            params: {
              newPwd: this.ruleTwo.pass,
              userPhone: this.ruleOne.phone,
            },
          }).then((rel) => {
            if (rel.code == 0) {
              this.active = 3;
            } else {
              this.$message(rel.msg);
            }
          });
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style scoped lang="scss">
.header {
  position: fixed;
  top: 0;
  width: auto;
  left: 0;
  right: 0;
  height: 50px;
  background: #fff;
  color: #000;
  min-width: 960px;
  z-index: 999;
  box-shadow: 0 4px 6px 0 rgb(8 14 26 / 4%), 0 1px 10px 0 rgb(8 14 26 / 5%),
    0 2px 4px -1px rgb(8 14 26 / 6%);
  display: flex;
  align-items: center;
  padding: 0 0 0 20px;
  .logo {
    width: 104px;
    height: 100%;
    img {
      width: 100%;
      max-height: 100%;
    }
  }
  .content {
    flex: 1;
    align-items: center;
    height: 100%;
    justify-content: flex-end;
    display: flex;
    a {
      color: #333;
      font-size: 14px;
      padding-right: 20px;
    }
  }
}
.page {
  padding: 20px;
  .pass-top {
    background: #fff;
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 10%);
    margin-bottom: 12px;
    padding: 26px;
  }
  .pass-bot {
    background: #fff;
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 10%);
    padding: 80px 26px 30px;
    min-height: 400px;
    .con {
      margin: 0 auto;
      width: 320px;
      .success-tit {
        padding-top: 60px;
        display: flex;
        align-items: center;
        margin-bottom: 40px;
        .icon {
          font-size: 40px;
          color: #67c23a;
          margin-right: 15px;
        }
        .text {
          h2 {
            font-size: 20px;
            color: #000;
            margin-bottom: 10px;
          }
          p {
            font-size: 14px;
            color: #999;
          }
        }
      }
      .success-bot {
        padding-left: 56px;
        a {
          background: #66b1ff;
          color: #fff;
          padding: 10px 20px;
          font-size: 14px;
          display: inline-block;
        }
      }
      h1 {
        margin-bottom: 40px;
        color: #111;
        font-weight: 500;
        font-size: 24px;
        line-height: 33px;
        text-align: center;
      }
      .code-wrapper {
        display: flex;
        align-items: center;
        .code-btn {
          width: 90px;
          padding: 12px 10px;
          margin-left: 10px;
        }
      }
      .form {
        margin: 0 auto;
        padding: 30px 0;
        .block {
          display: flex;
          align-items: center;
          margin-bottom: 20px;
          .label {
            width: 55px;
            font-size: 14px;
            margin-right: 10px;
          }
          .ipt {
            flex: 1;
            input {
              width: 100%;
            }
          }
        }
      }
      .submit {
        padding: 30px 0 10px;
        button {
          height: 45px;
          width: 100%;
        }
      }
    }
  }
}
</style>
