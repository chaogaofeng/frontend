<template>
  <div class="agement-list">
    <div class="title">秘钥管理</div>
    <div class="msg">
      <i class="el-icon-warning-outline"></i
      ><span
        >温馨提示：平台提供秘钥托管服务，可按需生成对应秘钥，也可自主上传秘钥，通过平台来管理。合约冻结，解冻和升级时使用的秘钥需与部署合约时使用的秘钥一致，请谨慎删除！</span
      >
    </div>
    <div class="page-body">
      <div class="content">
        <div class="list-page-toolbar">
          <div class="left" @click="createDialogFlag = true">创建秘钥</div>
        </div>
        <div class="form">
          <template>
            <el-table
              v-loading="tableLoading"
              :empty-text="emptyMsg"
              :data="roleTable"
              :header-cell-style="{
                background: '#F6F7FB',
                color: 'rgba(0, 0, 0, 0.85)',
                borderRight: '1px solid #fff',
                fontWeight: 'normal',
              }"
              style="width: 100%; font-size: 12px"
            >
              <el-table-column prop="name" label="别名"> </el-table-column>
              <el-table-column prop="createType" label="创建方式">
              </el-table-column>
              <el-table-column label="权限策略">
                <template slot-scope="scope"
                  ><div class="policy">
                    {{ scope.row.strategyNames }}
                  </div></template
                >
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <div class="handle">
                    <span class="blue" @click="showTransfer(scope.row)"
                      >编辑权限</span
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
    <!-- 创建秘钥 -->
    <el-dialog title="创建秘钥" :visible.sync="createDialogFlag" width="500px">
      <div class="create-main">
        <el-form
          :model="editForm"
          ref="editForm"
          label-width="100px"
          label-position="left"
          :rules="rules"
        >
          <el-form-item label="创建方式">
            <div class="ceate-type">
              <span :class="{ act: ceateType == 1 }" @click="ceateType = 1"
                >系统生成</span
              >
              <span :class="{ act: ceateType == 2 }" @click="ceateType = 2"
                >自主上传</span
              >
            </div>
          </el-form-item>
          <el-form-item label="别名" prop="otherName">
            <el-input
              type="text"
              v-model="editForm.otherName"
              class="ipt"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
          <el-form-item label="加密算法" v-show="ceateType == 1">
            <el-radio v-model="createRadio" label="1">SM2（国密）</el-radio>
            <el-radio v-model="createRadio" label="2">ECDSA（非国密）</el-radio>
          </el-form-item>
          <el-form-item label="秘钥" v-show="ceateType == 2">
            <el-upload
              class="upload"
              :action="action"
              :multiple="false"
              :limit="1"
              :on-success="uploadSuccess"
            >
              <div class="uploadBtn">
                <i class="el-icon-upload"></i>上传文件
              </div>
            </el-upload>
          </el-form-item>
        </el-form>
      </div>
      <div class="create-bot">
        <el-button type="primary" @click="createSubmit('editForm')"
          >确定</el-button
        >
        <el-button @click="createClose">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import controlApi from "../api";
export default {
  data() {
    var validateName = (rule, value, callback) => {
      if (
        !/^[0-9a-zA-Z\u4e00-\u9fa5]+$/g.test(value) ||
        value.length < 2 ||
        value.length > 20
      ) {
        callback(new Error("2-20个汉字、字母和数字至少包含1种"));
      } else {
        callback();
      }
    };
    return {
      roleTable: [],
      tableLoading: true,
      emptyMsg: " ", //空数据提示
      dialogTransfer: false,
      pageNo: 1, //当前页数
      pageSize: 10, //每页条数
      totalPage: null, //总页数
      createDialogFlag: false,
      ceateType: 1,
      editForm: {
        otherName: "",
      },
      rules: {
        otherName: [{ validator: validateName, trigger: "blur" }],
      },
      createRadio: "1",
      action: controlApi.upload, //上传地址
      uuid: "", //文件id
    };
  },
  created() {
    //获取秘钥
    this.getData();
  },
  methods: {
    getData() {
      this.$http({
        url: controlApi.secretKey,
        method: "get",
        params: {
          pageNo: this.pageNo,
          pageSize: this.pageSize,
        },
      }).then((rel) => {
        console.log(rel);
        if (rel.code == 0) {
          this.roleTable = [];
          if (rel.data.dataList.length > 0) {
            this.roleTable = rel.data.dataList || [];
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
    pageChange(num) {
      this.pageNo = num;
      this.getData();
    },
    uploadSuccess(res) {
      if (res.code == 0) {
        this.uuid = res.data.uuid;
      } else {
        this.$message(res.msg);
      }
    },
    createSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.ceateType == 2 && this.uuid == "") {
            this.$message("请上传文件");
            return;
          }
          this.$http({
            url: controlApi.secretAdd,
            method: "post",
            data: {
              algo: "1",
              aliasName: this.editForm.otherName,
              fileUuid: this.uuid,
              type: this.ceateType,
            },
          }).then((rel) => {
            console.log(rel);
            // if (rel.code == 0) {
            //   this.roleTable = [];
            //   if (rel.data.dataList.length > 0) {
            //     this.roleTable = rel.data.dataList || [];
            //     this.totalPage = rel.data.totalPage;
            //   } else {
            //     this.emptyMsg = "暂无数据";
            //     this.totalPage = null;
            //   }
            //   this.tableLoading = false;
            // } else {
            //   this.$message(rel.msg);
            // }
          });
        }
      });
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
              "color:#d29a1d;font-size:20px;vertical-align: middle;margin-right: 7px;",
          }),
          h(
            "span",
            { style: "color: #666" },
            `是否确认删除该${e.roleName}角色，删除后不可恢复！请确定是否删除?`
          ),
        ]),
        showCancelButton: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(() => {
          //删除角色
          this.$http({
            method: "post",
            url: `${controlApi.delRole}/${e.id}`,
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
  },
};
</script>

<style scoped lang="scss">
.agement-list {
  .title {
    padding: 20px 0;
    font-size: 20px;
  }
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
  .page-body {
    background: #fff;
    .content {
      overflow: hidden;
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
        margin: 20px 20px 10px;
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
      .pagination {
        padding: 20px 0 40px;
        text-align: right;
      }
    }
    .form {
      .policy {
        max-width: 300px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
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
  }
}
.transfer-tit {
  font-size: 14px;
  padding-bottom: 15px;
}
.transfer-bot {
  padding-top: 20px;
  text-align: right;
}
.create-bot {
  border-top: 1px solid #eceff8;
  text-align: right;
  padding-top: 20px;
}
.ceate-type {
  overflow: hidden;
  span {
    border: 1px solid #dcdfe6;
    float: left;
    padding: 0 18px;
    cursor: pointer;
  }
  .act {
    background: #ecebff;
    border-color: #108cee;
    color: #108cee;
  }
}
.uploadBtn {
  border: 1px solid #dcdfe6;
  float: left;
  padding: 0 15px;
  i {
    font-size: 20px;
    vertical-align: middle;
    margin-right: 6px;
  }
}
</style>
