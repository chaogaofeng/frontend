<template>
  <div class="agement-list">
    <div class="breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>用户中心</el-breadcrumb-item>
        <el-breadcrumb-item>子用户</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="page-body">
      <div class="title">
        <h2>
          子用户管理
          <el-tooltip
            class="item"
            effect="light"
            content="子用户可以独立登录控制台和通过API访问，可被赋予权限。"
            placement="right"
          >
            <i class="el-icon-question"></i>
          </el-tooltip>
        </h2>
        <h3>
          <i class="el-icon-warning-outline"></i>
          <a target="_blank" href="http://www.baidu.com">帮助文档</a>
        </h3>
      </div>
      <div class="content">
        <div class="list-page-toolbar">
          <div class="left" @click="createDialog">+ 创建子用户</div>
          <div class="right">
            <el-input
              placeholder="请输入用户名进行搜索"
              v-model="search"
              class="input"
            >
              <el-button
                @click="searchSub"
                slot="append"
                icon="el-icon-search"
              ></el-button>
            </el-input>
          </div>
        </div>
        <div class="form">
          <template>
            <el-table
              v-loading="tableLoading"
              :data="tableData"
              :header-cell-style="{
                background: '#F6F7FB',
                color: 'rgba(0, 0, 0, 0.85)',
                borderRight: '1px solid #fff',
                fontWeight: 'normal',
              }"
              style="width: 100%; font-size: 12px"
            >
              <el-table-column prop="userName" label="用户名">
              </el-table-column>
              <el-table-column label="密码">
                <template slot-scope="scope">
                  <div class="pass" v-if="scope.row.userPwd == ''">
                    <span>未设置</span> |
                    <span class="btn" @click="editShow(scope.row)">设置</span>
                  </div>
                  <div class="pass" v-else>
                    <span>已设置</span> |
                    <span class="btn" @click="editShow(scope.row)">修改</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="userNote" label="说明"> </el-table-column>
              <el-table-column
                label="状态"
                :filters="[
                  { text: '活跃', value: 0 },
                  { text: '禁用', value: -1 },
                ]"
                :filter-method="formFilter"
                width="100"
              >
                <template slot-scope="scope">
                  <div class="state">
                    <span
                      ><i :class="{ act: scope.row.userStatus == 0 }"></i>
                      {{ scope.row.state }}</span
                    >
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="createUser" label="所属角色" width="150">
              </el-table-column>
              <el-table-column prop="createTime" label="创建时间">
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <div class="handle">
                    <span class="blue" @click="showRoles(scope.row)"
                      >编辑角色</span
                    >
                    <span class="blue" @click="openclose(scope.row)"
                      ><i v-if="scope.row.userStatus == 0">禁用</i
                      ><i v-else>启用</i></span
                    >
                    <span class="blue" @click="del(scope.row)">删除</span>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </div>
        <div class="pagination" v-if="totalPage != null">
          <el-pagination
            :page-size="pageSize"
            :page-count="totalPage"
            background
            @current-change="pageChange"
            layout="prev, pager, next"
          >
          </el-pagination>
        </div>
      </div>
    </div>
    <!-- 创建子用户 -->
    <el-dialog
      title="创建子用户"
      :visible.sync="createDialogFlag"
      width="800px"
    >
      <div class="create-main">
        <el-form
          :model="createForm"
          ref="createForm"
          label-width="80px"
          label-position="right"
          :rules="rules"
        >
          <el-form-item label="用户名" prop="userName">
            <el-input
              type="text"
              v-model="createForm.userName"
              class="ipt"
              autocomplete="off"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="电话" prop="userPhone">
            <el-input
              type="text"
              v-model="createForm.userPhone"
              class="ipt"
              autocomplete="off"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="userEmail">
            <el-input
              type="text"
              v-model="createForm.userEmail"
              class="ipt"
              autocomplete="off"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="userPwd">
            <el-input
              autocomplete="new-password"
              type="password"
              v-model="createForm.userPwd"
              clearable
              class="ipt"
            ></el-input>
          </el-form-item>
          <el-form-item label="说明" prop="userNote">
            <el-input
              type="text"
              v-model="createForm.userNote"
              class="ipt"
              autocomplete="off"
              clearable
            ></el-input>
          </el-form-item>
          <!-- <el-form-item label="快速授权" prop="checked" class="check">
            <el-checkbox v-model="createForm.checked">系统管理员</el-checkbox>
            <p>（其他权限可创建后添加）</p>
          </el-form-item> -->
        </el-form>
      </div>
      <div class="create-bot">
        <el-button type="primary" @click="createSubmit('createForm')"
          >确定</el-button
        >
        <el-button @click="createClose">取消</el-button>
      </div>
    </el-dialog>

    <!-- 设置密码 -->
    <el-dialog title="设置密码" :visible.sync="editDialogFlag" width="800px">
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
        <el-button type="primary" @click="editSubmit('editForm')"
          >确定</el-button
        >
        <el-button @click="editClose">取消</el-button>
      </div>
    </el-dialog>
    <!-- 编辑角色 -->
    <el-dialog
      title="编辑角色"
      :visible.sync="dialogRoles"
      @close="editCloseFun"
      width="820px"
    >
      <div class="Roles-tit">授权用户:{{ actList.userName }}</div>
      <Roles
        ref="roles"
        v-if="rolesData != null"
        :rolesData="rolesData"
        :chooseTable="chooseTable"
        @getTable="getTable"
        @clearItem="clearItem"
      ></Roles>
      <div class="Roles-bot">
        <el-button type="primary" @click="editRoles">确定</el-button>
        <el-button @click="closeRoles">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import controlApi from "../api";
import Roles from "../components/Roles";
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
      search: "", //根据名字查看子用户
      tableData: [],
      tableLoading: true,
      emptyMsg: " ", //空数据提示
      createDialogFlag: false,
      createForm: {
        userName: "", //用户名
        userPwd: "", //密码
        userNote: "", //备注
        userEmail: "", //邮箱
        userPhone: "", //电话
      },
      editDialogFlag: false,
      editForm: {
        newpass: "",
        newpassTwo: "",
      },
      rules: {
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        userEmail: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"],
          },
        ],
        userPhone: [
          {
            pattern: /^[1][3,4,5,6,7,8,9][0-9]{9}$/,
            message: `请输入正确的电话`,
            trigger: "blur",
          },
          { required: true, message: "请输入电话", trigger: "blur" },
        ],
        newpass: [{ validator: validatePass, trigger: "blur" }],
        newpassTwo: [{ validator: validatePass2, trigger: "blur" }],
      },
      chooseTable: [], //选中的角色
      rolesData: null, //全部角色
      dialogRoles: false,
      actList: {}, //当前编辑子用户
      pageNo: 1, //当前页数
      pageSize: 10, //每页条数
      totalPage: null, //总页数
    };
  },
  created() {
    //获取子用户列表
    this.getData();
    //获取全部角色列表
    this.getRoles();
  },
  components: {
    Roles,
  },
  methods: {
    editCloseFun() {
      this.$refs.roles.clearSearch();
      this.$refs.roles.clearItem();
    },
    getData() {
      this.$http({
        method: "get",
        url: controlApi.agementlistPage,
        params: {
          pageNo: this.pageNo,
          pageSize: this.pageSize,
          userName: this.search,
        },
      }).then((rel) => {
        if (rel.code == 0) {
          this.tableData = [];
          if (rel.data.dataList.length > 0) {
            this.tableData = rel.data.dataList || [];
            this.totalPage = rel.data.totalPage;
          } else {
            this.emptyMsg = "暂无数据";
            this.totalPage = null;
          }
          this.tableLoading = false;
        } else {
          this.$message(rel.msg);
        }
      });
    },
    searchSub() {
      this.pageNo = 1;
      this.getData();
    },
    pageChange(num) {
      this.pageNo = num;
      this.getData();
    },
    editShow(e) {
      this.actList = e;
      this.editDialogFlag = true;
    },
    editSubmit(form) {
      //修改密码
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.$http({
            method: "post",
            url: controlApi.editAgementPass,
            params: {
              newPwd: this.editForm.newpass,
              userPhone: this.actList.userPhone,
            },
          }).then((rel) => {
            if (rel.code == 0) {
              this.editDialogFlag = false;
              this.editForm.newpass = "";
              this.editForm.newpassTwo = "";
              this.getData();
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
    editClose() {
      this.editDialogFlag = false;
    },
    getTable(arr) {
      this.chooseTable = arr;
    },
    clearItem() {
      this.chooseTable = [];
    },
    closeRoles() {
      this.dialogRoles = false;
    },
    editRoles() {
      let userRoles = "";
      if (this.chooseTable.length > 0) {
        let arr = [];
        this.chooseTable.forEach((val) => {
          arr.push(val.id);
        });
        userRoles = arr.join(",");
      }

      //更改角色
      this.$http({
        method: "post",
        url: controlApi.updateRoles,
        params: {
          id: this.actList.id,
          userRoles: userRoles,
        },
      }).then((rel) => {
        if (rel.code == 0) {
          this.dialogRoles = false;
          this.getData();
          this.$message({
            message: "编辑成功",
            type: "success",
          });
        } else {
          this.$message({
            message: rel.msg,
          });
        }
      });
    },
    showRoles(e) {
      this.actList = e;
      if (e.userRoles) {
        this.chooseTable = this.rolesData.filter((val) => {
          let chooseArr = e.userRoles.split(",");
          return chooseArr.indexOf(String(val.id)) != -1;
        });
      }
      this.dialogRoles = true;
    },
    getRoles() {
      this.$http({
        method: "get",
        url: controlApi.roleList,
      }).then((rel) => {
        if (rel.code == 0) {
          this.rolesData = rel.data || [];
        }
      });
    },
    formFilter(value, row) {
      return row.userStatus === value;
    },
    createDialog() {
      this.createDialogFlag = true;
    },
    createClose() {
      this.createDialogFlag = false;
    },
    del(e) {
      const h = this.$createElement;
      this.$msgbox({
        title: " ",
        message: h("p", { style: "font-size:13px" }, [
          h("i", {
            class: "el-icon-warning-outline",
            style:
              "color:#d29a1d;font-size:26px;vertical-align: -5px;margin-right: 10px;",
          }),
          h(
            "span",
            { style: "color: #666;lin-height:2.5" },
            `删除用户后，也会删除本用户的所有权限、密码等，您确定要删除 ${e.userName} 吗?`
          ),
        ]),
        showCancelButton: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(() => {
          //删除子用户
          this.$http({
            method: "post",
            url: `${controlApi.delAgementlist}/${e.id}`,
          }).then((rel) => {
            if (rel.code == 0) {
              this.getData();
              this.$message({
                message: "删除成功",
                type: "success",
              });
            } else {
              this.$message(rel.msg);
            }
          });
        })
        .catch(() => {});
    },
    openclose(e) {
      if (e.userStatus == 0) {
        const h = this.$createElement;
        this.$msgbox({
          title: " ",
          message: h("div", { style: "font-size:13px" }, [
            h("p", { style: "margin-bottom:15px" }, [
              h("i", {
                class: "el-icon-warning-outline",
                style:
                  "color:#d29a1d;font-size:26px;vertical-align:-6px;margin-right: 20px;",
              }),
              h(
                "span",
                { style: "color: #666" },
                `您确定要禁用用户 ${e.userName} 吗？`
              ),
            ]),
            h(
              "p",
              { style: "padding-left: 45px;font-size: 12px;color: #EB5252;" },
              "禁用后该用户将不能进行任何操作。"
            ),
          ]),
          showCancelButton: true,
          confirmButtonText: "确定",
          cancelButtonText: "取消",
        })
          .then(() => {
            //禁用子用户
            this.$http({
              method: "post",
              url: controlApi.stateAgementlist,
              params: {
                id: e.id,
                status: -1,
              },
            }).then((rel) => {
              if (rel.code == 0) {
                this.getData();
                this.$message({
                  message: "禁用成功",
                  type: "success",
                });
              } else {
                this.$message(rel.msg);
              }
            });
          })
          .catch(() => {});
      } else {
        const h = this.$createElement;
        this.$msgbox({
          title: " ",
          message: h("div", { style: "font-size:13px" }, [
            h("p", { style: "margin-bottom:15px" }, [
              h("i", {
                class: "el-icon-warning-outline",
                style:
                  "color:#d29a1d;font-size:26px;vertical-align:-6px;margin-right: 20px;",
              }),
              h(
                "span",
                { style: "color: #666" },
                `您确定要恢复用户 ${e.userName} 吗？`
              ),
            ]),
          ]),
          showCancelButton: true,
          confirmButtonText: "确定",
          cancelButtonText: "取消",
        })
          .then(() => {
            //禁用子用户
            this.$http({
              method: "post",
              url: controlApi.stateAgementlist,
              params: {
                id: e.id,
                status: 0,
              },
            }).then((rel) => {
              if (rel.code == 0) {
                this.getData();
                this.$message({
                  message: "启动成功",
                  type: "success",
                });
              } else {
                this.$message(rel.msg);
              }
            });
          })
          .catch(() => {});
      }
    },
    createSubmit(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.$http({
            method: "post",
            url: controlApi.addAgementlist,
            data: {
              userEmail: this.createForm.userEmail,
              userName: this.createForm.userName,
              userNote: this.createForm.userNote,
              userPhone: this.createForm.userPhone,
              userPwd: this.createForm.userPwd,
            },
          }).then((rel) => {
            if (rel.code == 0) {
              this.createDialogFlag = false;
              this.createForm.userEmail = "";
              this.createForm.userName = "";
              this.createForm.userPwd = "";
              this.createForm.userPhone = "";
              this.createForm.userNote = "";
              this.getData();
              this.$message({
                message: "创建成功",
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
.agement-list {
  .breadcrumb {
    padding: 15px 0;
    .el-breadcrumb {
      font-size: 12px;
    }
  }
  .page-body {
    background: #fff;
    .title {
      height: 55px;
      line-height: 55px;
      font-weight: normal;
      border-bottom: 1px solid #e8ebee;
      margin: 0;
      padding: 0 20px;
      overflow: hidden;
      h2 {
        float: left;
        i {
          font-size: 17px;
          color: #333;
          &:hover {
            color: #108cee;
          }
        }
      }
      h3 {
        float: right;
        color: #108cee;
        font-size: 14px;
        i {
          margin-right: 5px;
        }
      }
    }
    .content {
      .list-page-tip {
        margin: 10px 20px;
        .tip-grey {
          color: #999;
          background-color: #f7f7f7;
          display: inline-block;
          padding: 5px 15px;
          line-height: 20px;
          font-size: 12px;
          -webkit-border-radius: 3px;
          -moz-border-radius: 3px;
          border-radius: 3px;
          i {
            margin-left: 10px;
            font-style: normal;
          }
        }
        .setLoginUrl {
          height: 30px;
          font-size: 12px;
          padding: 0 12px;
          line-height: 30px;
          text-align: center;
          color: #108cee;
          background-color: #eaf6fe;
          display: inline-block;
          margin-left: 5px;
        }
      }
      .list-page-toolbar {
        margin: 10px 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .left {
          height: 32px;
          color: #fff;
          background: #108cee;
          text-align: center;
          padding: 0 15px;
          line-height: 32px;
          cursor: pointer;
        }
        .right {
          .input {
            width: 300px;
            font-size: 12px;
          }
        }
      }
      .form {
        .pass {
          .btn {
            cursor: pointer;
            color: #108cee;
          }
        }
        .state i {
          width: 9px;
          height: 9px;
          display: inline-block;
          border-radius: 50%;
          background: #eb5252;
        }
        .state .act {
          background: #2cb663;
        }
        .handle {
          span {
            cursor: pointer;
          }
          .blue {
            color: #108cee;
            margin-right: 5px;
          }
        }
      }
      .pagination {
        padding: 20px 0 40px;
        text-align: right;
      }
    }
  }
}
.create-main {
  .ipt {
    width: 230px;
  }
  .check {
    margin-bottom: 40px;
    p {
      font-size: 12px;
      color: #999;
      height: 20px;
      line-height: 20px;
      margin-top: -6px;
    }
  }
}
.create-bot {
  border-top: 1px solid #eceff8;
  text-align: right;
  padding-top: 20px;
}
.Roles-tit {
  font-size: 14px;
  padding-bottom: 15px;
}
.Roles-bot {
  padding-top: 20px;
  text-align: right;
}
</style>
