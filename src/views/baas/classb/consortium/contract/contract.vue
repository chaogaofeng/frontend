<template>
  <div>
    <div class="detail-content">
      <div class="detail-parts-table">
        <div class="list-page-toolbar">
          <div class="menu">
            <span :class="{ act: menu == 1 }" @click="chooseMenu(1)"
              >公有合约</span
            >
            <span :class="{ act: menu == 2 }" @click="chooseMenu(2)"
              >私有合约</span
            >
            <span :class="{ act: menu == 3 }" @click="chooseMenu(3)"
              >基础合约</span
            >
          </div>
          <div class="left" @click="bushu">合约部署</div>
        </div>
        <div class="dd padding" v-if="menu == 1">
          <div class="form">
            <template>
              <el-table
                v-loading="tableLoading"
                :data="tableData1"
                :header-cell-style="{
                  background: '#F6F7FB',
                  color: 'rgba(0, 0, 0, 0.85)',
                  borderRight: '1px solid #fff',
                  fontWeight: 'normal',
                }"
                style="width: 100%; font-size: 12px"
              >
                <el-table-column label="合约名称">
                  <template slot-scope="scope">
                    <span @click="golist(scope.row)" class="blue">{{
                      scope.row.name
                    }}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="status" label="状态"> </el-table-column>
                <el-table-column prop="createTime" label="部署时间">
                </el-table-column>
                <el-table-column prop="state" label="操作">
                  <template slot-scope="scope">
                    <p><a href="#">API调用</a></p>
                    <p>
                      <span @click="del(scope.row)" class="blue">销毁合约</span>
                    </p>
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </div>
        </div>
        <div class="dd padding" v-if="menu == 2">
          <div class="form">
            <template>
              <el-table
                v-loading="tableLoading"
                :data="tableData2"
                :header-cell-style="{
                  background: '#F6F7FB',
                  color: 'rgba(0, 0, 0, 0.85)',
                  borderRight: '1px solid #fff',
                  fontWeight: 'normal',
                }"
                style="width: 100%; font-size: 12px"
              >
                <el-table-column label="合约名称">
                  <template slot-scope="scope">
                    <span @click="golist(scope.row)" class="blue">{{
                      scope.row.name
                    }}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="status" label="状态"> </el-table-column>
                <el-table-column prop="createTime" label="部署时间">
                </el-table-column>
                <el-table-column prop="state" label="操作">
                  <template slot-scope="scope">
                    <p><a href="#">API调用</a></p>
                    <p>
                      <span @click="del(scope.row)" class="blue">销毁合约</span>
                    </p>
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </div>
        </div>
        <div class="dd" v-if="menu == 3">
          <div class="header">基础库部署</div>
          <div class="form">
            <template>
              <el-table
                v-loading="tableLoading"
                :data="tableData3"
                :header-cell-style="{
                  background: '#F6F7FB',
                  color: 'rgba(0, 0, 0, 0.85)',
                  borderRight: '1px solid #fff',
                  fontWeight: 'normal',
                }"
                style="width: 100%; font-size: 12px"
              >
                <el-table-column prop="name" label="合约名称">
                </el-table-column>
                <el-table-column prop="note" label="合约简介">
                </el-table-column>
                <el-table-column prop="globalId" label="合约全局ID">
                </el-table-column>
                <el-table-column prop="state" label="操作">
                  <template slot-scope="scope">
                    <p><a href="#">部署</a></p>
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import quorumApi from "../../../classa/quorum/api";
export default {
  data() {
    return {
      id: "",
      menu: 1,
      tableLoading: true,
      tableData1: [],
      tableData2: [],
      tableData3: [],
    };
  },
  created() {
    this.id = this.$route.query.id;
    this.getData();
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    golist(e) {
      this.$router.push({ name: "contractdetaile", query: { id: e.id } });
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
          h("span", { style: "color: #666" }, `删除后该合约将不能访问`),
        ]),
        showCancelButton: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(() => {
          //退出联盟
          this.$http({
            method: "post",
            url: quorumApi.delContractDeploy,
            params: {
              id: e.id,
            },
          }).then((rel) => {
            console.log(rel);
            if (rel.code == 0) {
              this.getData();
              this.$message({
                message: "合约销毁成功",
                type: "success",
              });
            } else {
              this.$message(rel.msg);
            }
          });
        })
        .catch(() => {});
    },
    getData() {
      //合约
      this.$http({
        method: "get",
        url: quorumApi.contractDeploy,
        params: {
          type: this.menu,
          allianceId: this.id,
        },
      }).then((rel) => {
        console.log(rel);
        if (rel.code == 0) {
          if (this.menu == 1) {
            this.tableData1 = rel.data || [];
          }
          if (this.menu == 2) {
            this.tableData2 = rel.data || [];
          }
          this.tableLoading = false;
        } else {
          this.$message(rel.msg);
        }
      });
    },
    chooseMenu(type) {
      this.menu = type;
      this.tableLoading = true;
      if (this.menu == 1 || this.menu == 2) {
        this.getData();
      }
      if (this.menu == 3) {
        //基础合约
        this.$http({
          method: "get",
          url: quorumApi.contractTemp,
        }).then((rel) => {
          console.log(rel);
          if (rel.code == 0) {
            this.tableData3 = rel.data || [];
            this.tableLoading = false;
          } else {
            this.$message(rel.msg);
          }
        });
      }
    },
    bushu() {
      // window.open("http://www.jb51.net");
    },
  },
};
</script>

<style lang="scss" scoped>
.detail-content {
  min-height: 600px;
  .detail-parts-table {
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
      border-bottom: 1px solid #ebeef5;
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
        margin-right: 20px;
      }
      .menu {
        overflow: hidden;
        span {
          font-size: 14px;
          padding: 15px;
          float: left;
          position: relative;
          cursor: pointer;
          &.act {
            border-bottom: 1px solid #409eff;
            color: #409eff;
          }
        }
      }
    }
    .header {
      height: 50px;
      background: #f6f7fb;
      color: #666;
      line-height: 50px;
      position: relative;
      text-align: center;
      border-bottom: 20px solid #e8ecf0;
    }
    .dd.padding {
      padding-top: 20px;
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
      .blue {
        color: #108cee;
      }
    }
  }
}
</style>
