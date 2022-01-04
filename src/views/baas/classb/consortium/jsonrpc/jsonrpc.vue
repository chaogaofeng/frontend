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
                <el-table-column prop="orgName" label="账号ID">
                </el-table-column>
                <el-table-column prop="orgEnName" label="用户名">
                </el-table-column>
                <el-table-column prop="orgEnName" label="创建时间">
                </el-table-column>
                <el-table-column prop="orgEnName" label="状态">
                </el-table-column>
                <el-table-column prop="state" label="操作">
                  <template slot-scope="scope">
                    <div class="state">
                      <span v-if="scope.row.status == 1"
                        ><i class="el-icon-loading"></i>部署中</span
                      >
                      <span v-if="scope.row.status == 2"
                        ><i class="success"></i>部署成功</span
                      >
                      <span v-if="scope.row.status == 3"
                        ><i class="err"></i>部署失败</span
                      >
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </template>
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
          <el-form-item label="密码" prop="passwords">
            <el-input
              type="text"
              v-model="createForm.passwords"
              class="ipt"
              autocomplete="off"
              clearable
            ></el-input>
          </el-form-item>
        </el-form>
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
      // if (value === "") {
      //   callback(new Error("请输入密码"));
      // } else {
      //   if (this.editForm.newpass !== "") {
      //     this.$refs.editForm.validateField("newpassTwo");
      //   }
      //   callback();
      // }
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
        passwords: [{ required: true, trigger: "blur" }],
      },
    };
  },
  created() {
    this.id = this.$route.query.id;
    this.$http({
      method: "get",
      url: `${quorumApi.consortDetaile}/${this.id}`,
    }).then((rel) => {
      if (rel.code == 0) {
        this.data = rel.data.alliance;
        this.tableData = this.data.orgList || [];
        this.tableLoading = false;
      } else {
        this.$message(rel.msg);
      }
    });
  },
  methods: {
    createSubmit(form) {
      this.createDialogFlag = false;
      this.$refs[form].validate((valid) => {
        if (valid) {
          console.log(1);
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
        .success {
          width: 9px;
          height: 9px;
          display: inline-block;
          border-radius: 50%;
          background: #2cb663;
        }
        .err {
          width: 9px;
          height: 9px;
          display: inline-block;
          border-radius: 50%;
          background: #eb5252;
        }
      }
    }
  }
}
.create-bot {
  border-top: 1px solid #eceff8;
  text-align: right;
  padding-top: 20px;
}
</style>
