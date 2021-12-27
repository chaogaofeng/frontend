<template>
  <div class="agement-list">
    <div class="breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>用户中心</el-breadcrumb-item>
        <el-breadcrumb-item>策略管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="page-body">
      <div class="title"><h2>权限策略列表</h2></div>
      <div class="content">
        <div class="list-page-toolbar">
          <div class="left">
            <router-link class="btn" tag="div" :to="{ name: 'policyCreate' }"
              >+ 创建策略</router-link
            >
            <el-select class="select" v-model="filterVal">
              <el-option
                v-for="item in filterOpt"
                :key="item.value"
                :value="item.label"
              >
              </el-option>
            </el-select>
          </div>
          <div class="right">
            <el-input
              placeholder="请输入策略名称进行搜索"
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
              :data="tableDataFilter"
              :empty-text="emptyMsg"
              :header-cell-style="{
                background: '#F6F7FB',
                color: 'rgba(0, 0, 0, 0.85)',
                borderRight: '1px solid #fff',
                fontWeight: 'normal',
              }"
              style="width: 100%; font-size: 12px"
            >
              <el-table-column prop="strategyName" label="策略名称">
              </el-table-column>
              <el-table-column prop="strategyNote" label="说明">
              </el-table-column>
              <el-table-column label="策略类型">
                <template slot-scope="scope">
                  <span v-if="scope.row.strategyType == 0">系统策略</span>
                  <span v-else>自定义策略</span>
                </template>
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <div class="handle">
                    <span class="blue" @click="showPolicy(scope.row)"
                      >查看</span
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
    <el-dialog title="查看策略" :visible.sync="dialogPolicy" width="1100px">
      <div class="policy-top">
        <policy-config
          :checkedPolicy="checkedPolicy"
          :policy="policy"
          @getPolicyConfig="getPolicyConfig"
        ></policy-config>
      </div>
      <div class="policy-bot">
        <el-button type="primary" @click="editPolicy">确定</el-button>
        <el-button @click="closePolicy">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import controlApi from "../api";
import PolicyConfig from "../components/PolicyConfig.vue";
export default {
  data() {
    return {
      search: "", //根据名字查看策略
      tableData: [],
      tableLoading: true,
      emptyMsg: " ", //空数据提示
      filterOpt: [
        {
          value: "1",
          label: "全部策略",
        },
        {
          value: "2",
          label: "系统策略",
        },
        {
          value: "3",
          label: "自定义策略",
        },
      ],
      filterVal: "全部策略",
      dialogPolicy: false,
      checkedPolicy: [],
      policy: [], //策略元数据
      actPolicy: {}, //当前编辑策略
      pageNo: 1, //当前页数
      pageSize: 10, //每页条数
      totalPage: null, //总页数
    };
  },
  computed: {
    //过滤方法
    tableDataFilter: function () {
      var _search = this.filterVal;
      if (_search && this.filterVal != "全部策略") {
        return this.tableData.filter(function (e) {
          let str = e.strategyType == 1 ? "自定义策略" : "系统策略";
          return str == _search;
        });
      }
      return this.tableData;
    },
  },
  components: {
    PolicyConfig,
  },
  created() {
    //获取策略
    this.getData();
    //获取权限元数据
    this.$http({
      method: "get",
      url: controlApi.policyMeta,
    }).then((rel) => {
      if (rel.code == 0) {
        this.policy = rel.data || [];
      }
    });
  },
  methods: {
    getData() {
      this.$http({
        method: "get",
        url: controlApi.policyListPage,
        params: {
          pageNo: this.pageNo,
          pageSize: this.pageSize,
          strategyName: this.search,
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
    showPolicy(e) {
      this.actPolicy = e;
      this.dialogPolicy = true;
      console.log(e);
    },
    getPolicyConfig(e) {
      this.checkedPolicy = e;
    },
    editPolicy() {
      let strategyPermissionList = this.checkedPolicy.map((val) => {
        return {
          permKey: val.permKey,
          permVal: val.permVal,
        };
      });
      //修改策略
      this.$http({
        method: "post",
        url: controlApi.editPolicy,
        data: {
          id: this.actPolicy.id,
          strategyNote: this.actPolicy.strategyNote,
          strategyPermissionList: strategyPermissionList,
        },
      }).then((rel) => {
        if (rel.code == 0) {
          this.$message({
            message: "修改成功",
            type: "success",
          });
          this.checkedPolicy = [];
          this.dialogPolicy = false;
          this.getData();
        } else {
          this.$message(rel.msg);
        }
      });
    },
    closePolicy() {
      this.dialogPolicy = false;
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
            `是否要删除${e.strategyName}策略吗?`
          ),
        ]),
        showCancelButton: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(() => {
          //删除策略
          this.$http({
            method: "post",
            url: `${controlApi.delPolicy}/${e.id}`,
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
        margin: 10px 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .left {
          display: flex;
          align-items: center;
          .btn {
            height: 32px;
            color: #fff;
            background: #108cee;
            text-align: center;
            padding: 0 15px;
            line-height: 32px;
            cursor: pointer;
          }
          .select {
            width: 120px;
            margin-right: 10px;
            ::v-deep .el-input__inner {
              font-size: 12px;
              color: #108cee;
              background-color: #eaf6fe;
              border: 1px solid #eaf6fe;
              height: 32px;
              line-height: 32px;
              margin-left: 10px;
            }
            ::v-deep .el-input__suffix-inner i {
              color: #2468f2;
              font-weight: bold;
              line-height: 32px;
            }
          }
        }
        .right {
          .input {
            width: 300px;
            font-size: 12px;
          }
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
      .pagination {
        padding: 20px 0 40px;
        text-align: right;
      }
    }
  }
}
.policy-top {
  margin-bottom: 40px;
}
.policy-bot {
  text-align: right;
}
</style>
