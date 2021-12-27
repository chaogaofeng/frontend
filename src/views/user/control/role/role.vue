<template>
  <div class="agement-list">
    <div class="breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>用户中心</el-breadcrumb-item>
        <el-breadcrumb-item>角色管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="page-body">
      <div class="title"><h2>角色管理</h2></div>
      <div class="content">
        <div class="list-page-toolbar">
          <router-link class="left" tag="div" :to="{ name: 'roleCreate' }"
            >+ 创建新角色</router-link
          >
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
              <el-table-column prop="roleName" label="角色名称">
              </el-table-column>
              <el-table-column prop="roleNote" label="描述"> </el-table-column>
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
    <el-dialog
      title="编辑权限"
      :visible.sync="dialogTransfer"
      width="820px"
      @close="editCloseFun"
    >
      <div class="transfer-tit">授权用户:{{ activeRule.roleName }}</div>
      <Transfer
        ref="trans"
        v-if="transferData != null"
        :transferData="transferData"
        :chooseTable="chooseTable"
        @getTable="getTable"
        @getTransfer="getTransfer"
        @clearItem="clearItem"
      ></Transfer>
      <div class="transfer-bot">
        <el-button type="primary" @click="editTransfer">确定</el-button>
        <el-button @click="closeTransfer">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import controlApi from "../api";
import Transfer from "../components/Transfer";
export default {
  data() {
    return {
      search: "",
      roleTable: [],
      tableLoading: true,
      emptyMsg: " ", //空数据提示
      activeRule: {}, //编辑当前角色
      chooseTable: [], //编辑选中角色权限
      dialogTransfer: false,
      pageNo: 1, //当前页数
      pageSize: 10, //每页条数
      totalPage: null, //总页数
      transferData: null, //全部策略
    };
  },
  created() {
    //获取角色
    this.getData();
    //获取全部策略
    this.getTransfer();
  },
  components: {
    Transfer,
  },
  methods: {
    getTransfer(e) {
      let filterSearch = e || "";
      this.$http({
        method: "get",
        url: controlApi.policyList,
        params: {
          strategyName: filterSearch,
        },
      }).then((rel) => {
        if (rel.code == 0) {
          this.transferData = rel.data || [];
        }
      });
    },
    getData() {
      this.$http({
        url: controlApi.roleListPage,
        method: "get",
        params: {
          pageNo: this.pageNo,
          pageSize: this.pageSize,
          roleName: "",
        },
      }).then((rel) => {
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
    getTable(arr) {
      this.chooseTable = arr;
    },
    clearItem() {
      this.chooseTable = [];
    },
    closeTransfer() {
      this.dialogTransfer = false;
    },
    editTransfer() {
      let strategyNames = "";
      if (this.chooseTable.length > 0) {
        let arr = [];
        this.chooseTable.forEach((val) => {
          arr.push(val.strategyName);
        });
        strategyNames = arr.join(",");
      }
      //修改角色
      this.$http({
        url: controlApi.editRole,
        method: "post",
        data: {
          id: this.activeRule.id,
          roleNote: this.activeRule.desc,
          strategyNames: strategyNames,
        },
      }).then((rel) => {
        if (rel.code == 0) {
          this.$message({
            message: "修改成功",
            type: "success",
          });
          this.chooseTable = [];
          this.dialogTransfer = false;
          this.getData();
        } else {
          this.$message(rel.msg);
        }
      });
    },
    showTransfer(e) {
      this.activeRule = e;
      if (e.strategyNames) {
        this.chooseTable = this.transferData.filter((val) => {
          let chooseArr = e.strategyNames.split(",");
          return chooseArr.indexOf(String(val.strategyName)) != -1;
        });
      }
      this.dialogTransfer = true;
    },
    editCloseFun() {
      this.$refs.trans.clearSearch();
      this.$refs.trans.clearItem();
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
      padding-left: 20px;
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
</style>
