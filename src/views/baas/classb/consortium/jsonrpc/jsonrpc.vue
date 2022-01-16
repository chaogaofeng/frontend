<template>
  <div>
    <div class="detail-content">
      <div class="detail-parts-table">
        <div class="dt">
          <div class="tit">JSON-RPC防火墙</div>
        </div>
        <div class="info">
          <p>JSON-RPC防火墙是一种可配置的JSON-RPC请求鉴权服务。</p>
          <p>
            管理员可为JSON-RPC调用者创建账号并根据JSON-RPC方法为只读或读写为调用者账号授权。
          </p>
          <p>
            防火墙使用Basic
            Auth方式认证鉴权，服务启用后，网络JSON-RPC地址不变，调用者在使用JSON-RPC时需要携带认证信息。
          </p>
        </div>
        <div class="list-page-toolbar">
          <div class="left" @click="createDialogFlag = true">
            + 创建JSON-RPC权限账号
          </div>
        </div>
        <div class="dd">
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
                <el-table-column prop="accountId" label="账号ID">
                </el-table-column>
                <el-table-column prop="name" label="用户名"> </el-table-column>
                <el-table-column prop="createTime" label="创建时间">
                </el-table-column>
                <el-table-column label="状态">
                  <template slot-scope="scope">
                    <span v-if="scope.row.status == 1">使用中</span>
                    <span v-else>已禁用</span>
                  </template>
                </el-table-column>
                <el-table-column prop="state" label="操作">
                  <template slot-scope="scope">
                    <div class="state">
                      <span class="blue" @click="del(scope.row)">删除</span>
                      <span class="blue" @click="edit(scope.row)">更改</span>
                      <span class="blue" @click="editStatus(scope.row)">
                        <em v-if="scope.row.status == 1">禁用</em>
                        <em v-else>启用</em>
                      </span>
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
    </div>
    <!-- 创建RPC -->
    <el-dialog
      title="创建JSON-RPC账号"
      :visible.sync="createDialogFlag"
      width="500px"
    >
      <div class="create-title">平台不储存密码，请创建账号前复制并记住密码</div>
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
              placeholder="用户名由6-12位字母数字组成"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="passwords">
            <el-input
              type="text"
              v-model="createForm.passwords"
              class="ipt"
              disabled
              autocomplete="off"
              clearable
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="create-b">
        <span @click="createBase64('createForm')">生成并复制密码</span>
      </div>
      <div class="create-bot">
        <el-button type="primary" @click="createSubmit('createForm')"
          >确定</el-button
        >
        <el-button @click="createClose">取消</el-button>
      </div>
    </el-dialog>
    <!-- 权限更改 -->
    <el-dialog title="权限配置" :visible.sync="configFlag" width="400px">
      <div class="radios">
        <el-table
          :data="config"
          :header-cell-style="{
            background: '#F6F7FB',
            color: 'rgba(0, 0, 0, 0.85)',
            borderRight: '1px solid #fff',
            fontWeight: 'normal',
          }"
          style="width: 100%; font-size: 12px"
        >
          <el-table-column prop="key" label="授权方法"> </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <div class="ipt">
                <el-radio v-model="scope.row.val" :label="1">读写</el-radio>
                <el-radio v-model="scope.row.val" :label="2">只读</el-radio>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="create-bot">
        <el-button type="primary" @click="subConfig">确定</el-button>
        <el-button @click="createClose">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import quorumApi from "../../../classa/quorum/api";
export default {
  data() {
    var validateName = (rule, value, callback) => {
      if (
        /^[a-zA-Z0-9]+$/g.test(value) &&
        value.length >= 6 &&
        value.length <= 12
      ) {
        callback();
      } else {
        callback(new Error("用户名由6-12位字母数字组成"));
      }
    };
    return {
      configRadio: true,
      id: "",
      data: {},
      tableLoading: true,
      config: [], //权限配置
      tableData: [],
      createForm: {
        userName: "",
        passwords: "",
      },
      createDialogFlag: false,
      rules: {
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { validator: validateName, trigger: "blur" },
        ],
      },
      emptyMsg: " ", //空数据提示
      pageNo: 1, //当前页数
      pageSize: 10, //每页条数
      totalPage: null, //总页数
      configFlag: false,
      actData: {}, //当前修改的RPC
    };
  },
  created() {
    this.getData();
  },
  methods: {
    edit(e) {
      this.actData = e;
      this.config = JSON.parse(e.roles);
      this.configFlag = true;
    },
    editStatus(e) {
      const h = this.$createElement;
      let alt =
        e.status == 1
          ? `确认禁用用户${e.name}吗，禁用后该账号将不能调用JSON-RPC相关方法`
          : `确认启用用户${e.name}吗，启用后可以使用该账号调用JSON-RPC授权方法`;
      this.$msgbox({
        title: " ",
        message: h("p", { style: "font-size:13px" }, [
          h("i", {
            class: "el-icon-warning-outline",
            style:
              "color:#d29a1d;font-size:20px;vertical-align: middle;margin-right: 7px;",
          }),
          h("span", { style: "color: #666" }, alt),
        ]),
        showCancelButton: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      }).then(() => {
        this.$http({
          method: "post",
          url: quorumApi.updateStatus,
          data: {
            id: e.id,
            status: e.status == 1 ? 2 : 1,
          },
        }).then((rel) => {
          if (rel.code == 0) {
            let msg = e.status == 1 ? "禁用成功" : "启用成功";
            this.tableLoading = true;
            this.getData();
            this.$message({
              message: msg,
              type: "success",
            });
          } else {
            this.$message(rel.msg);
          }
        });
      });
    },
    subConfig() {
      this.$http({
        method: "post",
        url: quorumApi.updateRoles,
        data: {
          roles: this.config,
          id: this.actData.id,
        },
      }).then((rel) => {
        if (rel.code == 0) {
          this.tableLoading = true;
          this.configFlag = false;
          this.getData();
          this.$message({
            message: "更改成功",
            type: "success",
          });
        } else {
          this.$message(rel.msg);
        }
      });
    },
    createBase64(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          let Base64 = require("js-base64").Base64;
          this.createForm.passwords = Base64.encode(this.createForm.userName);
          this.$copyText(this.createForm.passwords);
        }
      });
    },
    pageChange(num) {
      this.pageNo = num;
      this.getData();
    },
    getData() {
      this.$http({
        method: "get",
        url: quorumApi.rpcFirewall,
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
        }
      });
    },
    createSubmit(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          if (this.createForm.passwords == "") {
            this.$message("请生成密码");
            return;
          }
          this.$http({
            method: "post",
            url: quorumApi.createRpcAccount,
            data: {
              name: this.createForm.userName,
              pwd: this.createForm.passwords,
            },
          }).then((rel) => {
            if (rel.code == 0) {
              this.$message({
                message: "创建成功",
                type: "success",
              });
              this.getData();
              this.createDialogFlag = false;
            } else {
              this.$message(rel.msg);
            }
          });
        }
      });
    },
    createClose() {
      this.createDialogFlag = false;
      this.configFlag = false;
    },
    del(e) {
      const h = this.$createElement;
      this.$msgbox({
        title: " ",
        message: h("p", { style: "font-size:13px" }, [
          h("i", {
            class: "el-icon-warning-outline",
            style:
              "color:#d29a1d;font-size:20px;vertical-align: middle;margin-right: 7px;",
          }),
          h(
            "span",
            { style: "color: #666" },
            `确认删除用户${e.name}吗，删除后该账号将不能调用JSON-RPC相关方法`
          ),
        ]),
        showCancelButton: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(() => {
          this.$http({
            method: "post",
            url: `${quorumApi.deldateRoles}/${e.id}`,
          }).then((rel) => {
            console.log(rel);
            // if (rel.code == 0) {
            //   this.getData();
            //   this.$message({
            //     message: "退出成功",
            //     type: "success",
            //   });
            // } else {
            //   this.$message(rel.msg);
            // }
          });
        })
        .catch(() => {});
    },
  },
};
</script>

<style lang="scss" scoped>
.detail-content {
  padding: 50px 0 0;
  min-height: 600px;
  .detail-parts-table {
    padding: 30px 20px;
    border-top: 1px solid #ebeef5;
    .dt {
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .tit {
        color: #333;
        font-size: 16px;
        border-left: solid 4px #108cee;
        padding-left: 14px;
      }
      .alt {
        color: #999;
        float: right;
        line-height: 30px;
      }
    }
    .info {
      overflow: hidden;
      .block {
        float: left;
        width: 50%;
        p {
          margin-top: 15px;
        }
      }
    }
    .list-page-toolbar {
      margin: 10px 0 15px;
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
    }
    .form {
      .state {
        i {
          margin-right: 10px;
        }
        .blue {
          color: #108cee;
          margin-right: 5px;
          cursor: pointer;
        }
      }
    }
  }
}
.create-title {
  text-align: center;
  padding-bottom: 30px;
  font-size: 16px;
  color: #000;
}
.create-bot {
  border-top: 1px solid #eceff8;
  text-align: right;
  padding-top: 20px;
}
.create-b {
  text-align: right;
  margin-bottom: 20px;
  span {
    color: #409eff;
    cursor: pointer;
  }
}
.pagination {
  padding: 20px 0 40px;
  text-align: right;
}
.radios {
  margin-bottom: 30px;
  .ipt {
    display: flex;
    align-items: center;
    ::v-deep .el-radio__label {
      font-size: 12px;
    }
  }
}
</style>
