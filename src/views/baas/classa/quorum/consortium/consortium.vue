<template>
  <div class="list-page-body">
    <div class="list-page-title">
      <h2>联盟</h2>
      <div class="list-page-helps">
        <a
          href="https://docs.goquorum.consensys.net/en/latest/"
          target="_blank"
        >
          <i class="el-icon-chat-line-square"></i>Quorum开源社区
        </a>
        <a href="https://cloud.baidu.com/doc/BBE/index.html" target="_blank">
          <i class="el-icon-warning-outline"></i>区块链解决方案介绍
        </a>
      </div>
    </div>
    <div class="list-page-content">
      <div class="list-page-tip">
        <div class="list-tip">
          温馨提示：<a href="#">如何使用合约网关快速构建去中心化业务系统</a>
        </div>
        <div>
          <div class="module-container">
            <div class="step step1">
              <div class="arrow-right"></div>
            </div>
            <div class="module module2">
              <div class="operation">
                <div><i class="el-icon-potato-strips icon-font"></i></div>
                <div>创建联盟</div>
                <div class="create" @click="create">
                  <div class="skin-create-button btn-con">
                    <i class="el-icon-plus"></i> 创建
                  </div>
                </div>
              </div>
              <div>
                <span>创建组织部署Quorum网络</span>
              </div>
            </div>
            <div class="step step2">
              <div class="arrow-right"></div>
            </div>
            <div class="module module3">
              <div class="operation">
                <div><i class="el-icon-potato-strips icon-font"></i></div>
                <div>邀请组织</div>
                <div class="link">
                  <i class="el-icon-link"></i>
                  <a
                    href="https://cloud.baidu.com/doc/BBE/s/jjy4d5fwi#创建联盟"
                    target="_blank"
                    >查看文档</a
                  >
                </div>
              </div>
              <div>
                <span>邀请组织加入联盟网络</span>
              </div>
            </div>
            <div class="step step3">
              <div class="arrow-right"></div>
            </div>
            <div class="module module4">
              <div class="operation">
                <div><i class="el-icon-potato-strips icon-font"></i></div>
                <div>合约管理</div>
                <div class="link">
                  <i class="el-icon-link"></i>
                  <a
                    href="https://cloud.baidu.com/doc/BBE/s/5jyjtjmch"
                    target="_blank"
                    >查看文档</a
                  >
                </div>
              </div>
              <div>
                <span>部署区块链智能合约</span>
              </div>
            </div>
            <div class="module module4">
              <div class="operation">
                <div><i class="el-icon-potato-strips icon-font"></i></div>
                <div>配置Dapp参数</div>
                <div class="link">
                  <i class="el-icon-link"></i>
                  <a
                    href="https://cloud.baidu.com/doc/BBE/s/Bjwvxwrkx"
                    target="_balnk"
                    >查看文档</a
                  >
                </div>
              </div>
              <div>
                <span>创建分布式应用</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="list-page-toolbar">
        <div class="left" @click="create">+ 创建联盟</div>
        <div class="right">
          <div class="selet">
            组织
            <el-select v-model="filterVal" placeholder="请选择">
              <el-option
                v-for="item in filterOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
          <div class="btn" @click="refresh">
            <i class="el-icon-refresh-right"></i>
          </div>
        </div>
      </div>
      <div class="form">
        <template>
          <el-table
            v-loading="tableLoading"
            :data="tableDataFilter"
            :header-cell-style="{
              background: '#F6F7FB',
              color: 'rgba(0, 0, 0, 0.85)',
              borderRight: '1px solid #fff',
              fontWeight: 'normal',
            }"
            style="width: 100%; font-size: 12px"
          >
            <el-table-column prop="name" label="联盟名称">
              <template slot-scope="scope">
                <div class="handle">
                  <span class="blue" @click="goDetaile(scope.row)">{{
                    scope.row.name
                  }}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="enName" label="文案"> </el-table-column>
            <el-table-column prop="note" label="联盟描述"> </el-table-column>
            <el-table-column prop="orgNames" label="联盟成员">
            </el-table-column>
            <el-table-column label="联盟状态">
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
            <el-table-column prop="createTime" label="创建时间">
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <div class="handle">
                  <p>
                    <span
                      v-if="scope.row.status == 2"
                      class="blue"
                      @click="invitShow(scope.row)"
                      >邀请成员</span
                    >
                    <span v-else>邀请成员</span>
                  </p>
                  <p>
                    <span
                      v-if="scope.row.status == 2"
                      class="blue"
                      @click="goNode(scope.row)"
                      >节点管理</span
                    >
                    <span v-else>节点管理</span>
                  </p>
                  <p>
                    <span
                      v-if="scope.row.status == 2"
                      class="blue"
                      @click="goContract(scope.row)"
                      >合约管理</span
                    >
                    <span v-else>合约管理</span>
                  </p>
                  <p>
                    <span
                      v-if="scope.row.status != 1"
                      class="blue"
                      @click="del(scope.row)"
                      >退出联盟</span
                    >
                    <span v-else>退出联盟</span>
                  </p>
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
    <!-- 邀请成员 -->
    <el-dialog title="邀请成员" :visible.sync="invitFlag" width="600px">
      <div class="create-main">
        <div class="alt">
          温馨提示：邀请信息将通过系统发送给相关账户，您可在事件中心查看进度
        </div>
        <el-form
          :model="invitFrom"
          ref="invitFrom"
          label-width="140px"
          label-position="left"
          :rules="rules"
        >
          <el-form-item label="邀请人手机号" prop="phone">
            <el-input
              type="text"
              v-model="invitFrom.phone"
              class="ipt"
              autocomplete="off"
              clearable
            ></el-input>
          </el-form-item>
          <div class="error" v-if="invitError">该用户需是BaaS已存在用户</div>
        </el-form>
      </div>
      <div class="create-bot">
        <el-button type="primary" @click="invitSubmit('invitFrom')"
          >确定</el-button
        >
        <el-button @click="invitClose">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import quorumApi from "../api.js";
export default {
  data() {
    return {
      filterOptions: [],
      filterVal: "",
      tableData: [],
      tableLoading: true,
      emptyMsg: " ", //空数据提示
      pageNo: 1, //当前页数
      pageSize: 10, //每页条数
      totalPage: null, //总页数
      invitId: "",
      invitFlag: false,
      invitError: false,
      invitFrom: {
        phone: "",
      },
      rules: {
        phone: [
          {
            pattern: /^[1][3,4,5,6,7,8,9][0-9]{9}$/,
            message: `请输入正确的手机号`,
            trigger: "blur",
          },
          { required: true, message: "请输入手机号", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    //获取联盟列表
    this.getData();
    setInterval(() => {
      this.getData();
    }, 30000);
    //获取组织
    this.getOrg();
  },
  computed: {
    //过滤方法
    tableDataFilter: function () {
      var _search = this.filterVal;
      if (_search && this.filterVal != "") {
        return this.tableData.filter(function (e) {
          return e.orgNames == _search;
        });
      }
      return this.tableData;
    },
  },
  methods: {
    getData() {
      this.$http({
        method: "get",
        url: quorumApi.consortPage,
        params: {
          pageNo: this.pageNo,
          pageSize: this.pageSize,
          userName: this.search,
        },
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
    pageChange(num) {
      this.pageNo = num;
      this.getData();
    },
    create() {
      this.$router.push("/quorum/creatconsortium");
    },
    goDetaile(e) {
      this.$router.push({ name: "consortdetaile", query: { id: e.id } });
    },
    getOrg() {
      this.$http({
        method: "get",
        url: quorumApi.orgList,
      }).then((rel) => {
        if (rel.code == 0) {
          if (rel.data.length > 0) {
            this.filterOptions = rel.data.map((val) => {
              return {
                value: val.name,
                label: val.name,
              };
            });
            this.filterOptions.unshift({
              value: "",
              label: "ALL",
            });
          }
        }
      });
    },
    refresh() {
      this.tableData = [];
      this.getData();
      this.getOrg();
      this.filterVal = "";
      this.tableLoading = true;
      this.emptyMsg = "";
      this.pageNo = 1;
      this.pageSize = 10;
      this.totalPage = null;
    },
    goNode(e) {
      this.$router.push({ name: "consortnode", query: { id: e.id } });
    },
    goContract(e) {
      this.$router.push({ name: "consortcontract", query: { id: e.id } });
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
          h("span", { style: "color: #666" }, `确定退出${e.name}吗`),
        ]),
        showCancelButton: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(() => {
          //退出联盟
          this.$http({
            method: "post",
            url: quorumApi.outConsort,
            params: {
              allianceId: e.id,
            },
          }).then((rel) => {
            console.log(rel);
            if (rel.code == 0) {
              this.getData();
              this.$message({
                message: "退出成功",
                type: "success",
              });
            } else {
              this.$message(rel.msg);
            }
          });
        })
        .catch(() => {});
    },
    invitSubmit(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.$http({
            method: "post",
            url: quorumApi.invitConsort,
            data: {
              allianceId: this.invitId,
              allianceType: 2,
              userPhone: this.invitFrom.phone,
            },
          }).then((rel) => {
            if (rel.code == 0) {
              this.$message({
                message: "邀请成功",
                type: "success",
              });
              this.invitFlag = false;
            } else {
              this.invitError = true;
            }
          });
        }
      });
    },
    invitShow(e) {
      this.invitId = e.id;
      this.invitFlag = true;
    },
    invitClose() {
      this.invitFlag = false;
      this.invitError = false;
    },
  },
};
</script>
<style scoped lang="scss">
.list-page-body {
  background: #fff;
  .list-page-title {
    height: 55px;
    line-height: 55px;
    font-weight: normal;
    border-bottom: 1px solid #e8ebee;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    .list-page-helps {
      font-size: 12px;
      a {
        margin-left: 10px;
        i {
          font-size: 17px;
          vertical-align: -2px;
          margin-right: 3px;
        }
      }
    }
  }
  .list-page-content {
    overflow: hidden;

    .list-page-tip {
      margin: 10px 20px 20px;
      .list-tip {
        margin-bottom: 20px;
        height: 30px;
        line-height: 30px;
        background-color: #f5f5f5;
        padding-left: 20px;
        color: #999;
      }
      .module-container {
        position: relative;
        height: 216px;
        margin-bottom: 10px;
      }
      .step {
        position: absolute;
        width: 40px;
        top: 50%;
        transform: translateY(-50%);
        border-left: 1px solid #118dee;
        .arrow-right {
          height: 1px;
          background-color: #118dee;
          &::after {
            content: "";
            position: absolute;
            width: 0;
            height: 0;
            left: 90%;
            top: -4px;
            border-top: 5px solid transparent;
            border-left: 8px solid #118dee;
            border-bottom: 5px solid transparent;
          }
        }
      }
      .step1 {
        margin-left: calc(20% - 35px);
      }
      .step2 {
        margin-left: calc(40% - 35px);
      }
      .step3 {
        margin-left: calc(60% - 35px);
      }
      .module {
        &:last-child {
          margin-right: 0;
        }
        width: calc(20% - 65px);
        height: 176px;
        background-color: #f6f7fb;
        margin-right: 25px;
        padding: 20px 20px;
        float: left;
        .operation {
          width: 100%;
          height: 86px;
          background-color: #e2e5ec;
          position: relative;
          padding: 20px 0;
          margin-bottom: 20px;
          color: #333;
          text-align: center;
          .icon-font {
            margin-bottom: 5px;
            display: inline-block;
            color: #118dee;
          }
          .create,
          .link {
            width: 88px;
            position: absolute;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            .skin-create-button {
              color: #fff;
              background: #108cee;
              border-color: #108cee;
            }
            .btn-con {
              height: 30px;
              cursor: pointer;
              line-height: 30px;
              width: 60px;
              margin: 0 auto;
              i {
                font-size: 14px;
                font-weight: bold;
                vertical-align: -1px;
              }
            }
          }
        }
      }
      .module2,
      .module3,
      .module4,
      .module5 {
        text-align: center;
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
        display: flex;
        align-items: center;
        .selet {
          margin-right: 5px;
          ::v-deep .el-input,
          ::v-deep .el-input__inner {
            height: 30px;
            width: 150px;
            line-height: 30px;
            background: #eaf6fe;
            border: none;
            color: #108cee;
            .el-input__icon {
              line-height: 30px;
              color: #108cee;
            }
          }
          &:hover {
            ::v-deep .el-input,
            ::v-deep .el-input__inner {
              height: 30px;
              background: #d2ecfd;
            }
          }
        }
        .btn {
          height: 30px;
          line-height: 30px;
          background: #eaf6fe;
          width: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.5s;
          cursor: pointer;
          i {
            font-size: 14px;
            font-weight: bold;
            color: #108cee;
            transition: all 0.5s;
          }
          &:hover {
            background: #d2ecfd;
          }
        }
      }
    }
  }
}
.pagination {
  padding: 20px 0 40px;
  text-align: right;
}
.reminder {
  width: 420px;
  padding: 10px 10px;
  margin-bottom: 30px;
  background-color: #fcf7f1;
  line-height: 20px;
  color: #f38900;
  font-size: 12px;
}
.create-bot {
  border-top: 1px solid #eceff8;
  text-align: right;
  padding-top: 20px;
  margin-top: 50px;
}
.formalt {
  color: #999;
  padding-left: 128px;
  font-size: 12px;
  margin-top: -8px;
  margin-bottom: 20px;
}
.textipt ::v-deep .el-textarea__inner {
  width: 100%;
  font-size: 14px;
  height: 50px !important;
  resize: none;
}
.handle {
  color: #999;
  cursor: pointer;
  .blue {
    color: #108cee;
  }
}
.create-main {
  .alt {
    background-color: #fcf7f1;
    color: #f38900;
    padding: 6px 13px;
    margin-bottom: 30px;
  }
  .error {
    padding: 0 0 20px 140px;
  }
}
.create-bot {
  border-top: 1px solid #eceff8;

  text-align: right;
  padding-top: 20px;
}
</style>
