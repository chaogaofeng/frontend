<template>
  <div class="info">
    <div class="title">账号信息</div>
    <div class="block">
      <div class="menu">基本信息</div>
      <el-descriptions>
        <el-descriptions-item label="账号">{{
          userInfo.userName
        }}</el-descriptions-item>
        <el-descriptions-item label="手机号码">{{
          phone
        }}</el-descriptions-item>
        <el-descriptions-item label="创建时间">{{
          userInfo.createTime
        }}</el-descriptions-item>
        <el-descriptions-item label="密码">
          <span>******</span><em class="blue" @click="passShow">修改密码</em>
        </el-descriptions-item>
        <el-descriptions-item label="邮箱地址"
          >{{ userInfo.userEmail }}
          <em @click="emailShow('editForm1')" class="el-icon-edit"></em>
        </el-descriptions-item>
      </el-descriptions>
    </div>
    <div class="row">
      <div class="block" style="margin-right: 20px">
        <div class="menu">认证信息</div>
        <div class="con">
          <el-descriptions v-if="userInfo.authStatus != 2">
            <el-descriptions-item label="个人认证状态">
              <div v-if="userInfo.authStatus == 1" class="rz">
                已认证
                <router-link :to="{ name: 'infoauth' }">（查看）</router-link>
              </div>
              <div v-else class="red rz">
                <router-link :to="{ name: 'infoauth' }">去认证</router-link>
              </div>
            </el-descriptions-item>
          </el-descriptions>
          <div class="p">
            企业认证与机构绑定，查看请前往
            <router-link :to="{ name: 'organ' }">我的机构</router-link>
          </div>
        </div>
      </div>
      <div class="block">
        <div class="menu">账号注销</div>
        <div class="con">
          <div class="p">
            注销账号后，账号将不可使用，使用过的认证信息不可用来认证其他账号。账号内个人下资源将被删除，机构下资源归机构所有。
          </div>
          <div class="a" @click="userDel">注销账号</div>
        </div>
      </div>
    </div>
    <!-- 修改邮箱 -->
    <el-dialog title="修改邮箱" :visible.sync="emailDialogFlag" width="800px">
      <div class="create-main">
        <el-form
          :model="editForm1"
          ref="editForm1"
          label-width="100px"
          label-position="left"
          :rules="rules"
        >
          <el-form-item label="邮箱" prop="userEmail">
            <el-input
              type="text"
              v-model="editForm1.userEmail"
              class="ipt"
              autocomplete="off"
              clearable
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="create-bot">
        <el-button type="primary" @click="emailSubmit('editForm1')"
          >确定</el-button
        >
        <el-button @click="emailClose">取消</el-button>
      </div>
    </el-dialog>
    <!-- 修改密码 -->
    <el-dialog title="修改密码" :visible.sync="passDialogFlag" width="800px">
      <div class="create-main">
        <el-form
          :model="editForm"
          ref="editForm"
          label-width="100px"
          label-position="left"
          :rules="rules"
        >
          <el-form-item label="新密码" prop="newpass">
            <el-input
              type="password"
              v-model="editForm.newpass"
              class="ipt"
            ></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="newpassTwo">
            <el-input
              type="password"
              v-model="editForm.newpassTwo"
              class="ipt"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="create-bot">
        <el-button type="primary" @click="passSubmit('editForm')"
          >确定</el-button
        >
        <el-button @click="passClose">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import infoApi from "../api";
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.editForm.newpass !== "") {
          this.$refs.editForm.validateField("newpassTwo");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.editForm.newpass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      passDialogFlag: false,
      emailDialogFlag: false,
      editForm: {
        newpass: "",
        newpassTwo: "",
      },
      editForm1: {
        userEmail: "",
      },
      rules: {
        newpass: [{ validator: validatePass, trigger: "blur" }],
        newpassTwo: [{ validator: validatePass2, trigger: "blur" }],
        userEmail: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"],
          },
        ],
      },
      phone: "",
      userInfo: {}, //用户信息
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
          this.userInfo = rel.data;
          this.phone =
            rel.data.userPhone.substr(0, 3) +
            "****" +
            rel.data.userPhone.substr(7);
        } else {
          this.$message(rel.msg);
        }
      });
    },
    emailSubmit(form) {
      //修改邮箱
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.$http({
            method: "post",
            url: infoApi.editEmail,
            params: {
              email: this.editForm1.userEmail,
            },
          }).then((rel) => {
            if (rel.code == 0) {
              this.emailDialogFlag = false;
              this.editForm1.userEmail = "";
              this.getdata();
              this.$message({
                message: "邮箱设置成功",
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
    emailClose() {
      this.emailDialogFlag = false;
    },
    emailShow() {
      this.emailDialogFlag = true;
    },
    passClose() {
      this.passDialogFlag = false;
    },
    passShow() {
      this.passDialogFlag = true;
    },
    passSubmit(form) {
      //修改密码
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.$http({
            method: "post",
            url: infoApi.resetPwd,
            params: {
              newPwd: this.editForm.newpass,
              userPhone: this.userInfo.userPhone,
            },
          }).then((rel) => {
            if (rel.code == 0) {
              this.passDialogFlag = false;
              this.editForm.newpass = "";
              this.editForm.newpassTwo = "";
              this.$message({
                message: "密码设置成功",
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
    userDel() {
      this.$confirm("确认注销该账号吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //注销账号
          this.$http({
            method: "post",
            url: `${infoApi.userDel}/${this.userInfo.id}`,
          }).then((rel) => {
            if (rel.code == 0) {
              this.$message({
                type: "success",
                message: "注销成功!",
              });
              this.$router.push({ name: "logout" });
            } else {
              this.$message(rel.msg);
            }
          });
        })
        .catch(() => {});
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
  .row {
    display: flex;
    align-items: stretch;
  }
  .block {
    background: #fff;
    padding: 20px;
    box-shadow: 0 0 5px #dedede;
    margin-bottom: 20px;
    flex: 1;
    .blue {
      cursor: pointer;
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
      cursor: pointer;
    }
    em {
      cursor: pointer;
    }
  }
}
.ipt {
  width: 230px;
}
.create-bot {
  border-top: 1px solid #eceff8;
  text-align: right;
  padding-top: 20px;
}
</style>
