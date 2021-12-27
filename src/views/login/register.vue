<template>
  <div class="login">
    <div class="title">Baas平台</div>
    <div class="content">
      <div class="form">
        <div class="tit">注册</div>
        <div class="link">
          已有账号?<router-link to="login">登录</router-link>
        </div>
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="70px"
          label-position="left"
          class="ruleForm"
        >
          <el-tooltip
            class="item"
            effect="dark"
            content="设置后不可更改，中英文均可，最长14个英文或7个中文"
            placement="top"
          >
            <el-form-item label="用户名" prop="name">
              <el-input
                type="text"
                v-model="ruleForm.name"
                autocomplete="off"
                placeholder="请设置用户名"
              ></el-input>
            </el-form-item>
          </el-tooltip>
          <el-form-item label="手机号" prop="phone">
            <el-input
              type="text"
              v-model="ruleForm.phone"
              placeholder="可用于登录和找回密码"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input
              type="password"
              placeholder="请设置登录密码"
              v-model.number="ruleForm.pass"
            ></el-input>
          </el-form-item>
          <el-form-item label="验证码" prop="code">
            <div class="code-wrapper">
              <el-input
                type="text"
                maxlength="6"
                placeholder="验证码"
                v-model="ruleForm.code"
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
            @click="submitForm('ruleForm')"
            >注册</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import loginApi from "./api";
export default {
  data() {
    var validateName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请设置用户名"));
      } else {
        let cnReg = /([\u4e00-\u9fa5]|[\u3000-\u303F]|[\uFF00-\uFF60])/g;
        let mat = value.match(cnReg);
        let leg = 0;
        if (mat) {
          leg = mat.length + (value.length - mat.length) * 0.5;
        } else {
          leg = value.length * 0.5;
        }
        if (leg > 7) {
          callback(new Error("最长14个英文或7个中文"));
        } else {
          callback();
        }
      }
    };
    var validatephone = (rule, value, callback) => {
      var myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
      if (myreg.test(value)) {
        callback();
      } else {
        callback(new Error("请输入正确的手机号"));
      }
    };
    var validatepass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请设置登录密码"));
      } else {
        callback();
      }
    };
    var validateCode = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入验证码"));
      } else {
        callback();
      }
    };
    return {
      valiBtn: "获取验证码",
      disabled: false,
      ruleForm: {
        name: "",
        phone: "",
        pass: "",
        code: "",
      },
      rules: {
        name: [{ validator: validateName, trigger: "blur" }],
        phone: [{ validator: validatephone, trigger: "blur" }],
        pass: [{ validator: validatepass, trigger: "blur" }],
        code: [{ validator: validateCode, trigger: "blur" }],
      },
    };
  },
  created() {},
  methods: {
    getCode() {
      this.$refs["ruleForm"].validateField("phone", (err) => {
        if (err) {
          return;
        } else {
          this.$http({
            method: "post",
            url: loginApi.sendcode,
            params: {
              userPhone: this.ruleForm.phone,
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
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //校验验证码
          this.$http({
            method: "post",
            url: loginApi.checkcode,
            params: {
              smsCode: this.ruleForm.code,
              userPhone: this.ruleForm.phone,
            },
          }).then((rel) => {
            if (rel.code == 0) {
              //注册
              this.$http({
                method: "post",
                url: loginApi.register,
                data: {
                  userEmail: "",
                  userName: this.ruleForm.name,
                  userPhone: this.ruleForm.phone,
                  userPwd: this.ruleForm.pass,
                },
              }).then((rel) => {
                if (rel.code == 0) {
                  this.$message({
                    message: "注册成功",
                    type: "success",
                  });
                  this.$router.push({ name: "login" });
                } else {
                  this.$message(rel.msg);
                }
              });
            } else {
              this.$message("验证码有误");
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
    background: rgba(255, 255, 255, 0.9);
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
      width: 320px;
      margin: 0 auto;
      padding: 30px 0;
      .tit {
        margin-bottom: 10px;
        color: #111;
        font-weight: 500;
        font-size: 24px;
        line-height: 33px;
        text-align: center;
      }
      .link {
        margin-bottom: 30px;
        text-align: center;
      }
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
