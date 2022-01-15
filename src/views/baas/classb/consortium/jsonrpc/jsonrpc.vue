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
                <el-table-column prop="status" label="状态"> </el-table-column>
                <el-table-column prop="state" label="操作">
                  <template slot-scope="scope">
                    <div class="state">
                      <span class="blue">删除</span>
                      <span class="blue">更改</span>
                      <span class="blue">禁用</span>
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
      id: "",
      data: {},
      tableLoading: true,
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
    };
  },
  created() {
    this.getData();
  },
  methods: {
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
        console.log(rel);
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
            params: {
              name: this.createForm.userName,
            },
          }).then((rel) => {
            console.log(rel);
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
</style>
