<template>
  <div>
    <div class="detail-content">
      <div class="detail-parts-table">
        <div class="list-page-toolbar">
          <div class="menu">
            <span :class="{ act: menu == 1 }" @click="chooseMenu(1)"
              >共有合约</span
            >
            <span :class="{ act: menu == 2 }" @click="chooseMenu(2)"
              >私有合约</span
            >
            <span :class="{ act: menu == 3 }" @click="chooseMenu(3)"
              >基础合约</span
            >
          </div>
          <router-link tag="div" to="/quorum/consortium/node" class="left"
            >合约部署</router-link
          >
        </div>
        <div class="dd padding" v-if="menu == 1">
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
                <el-table-column prop="orgName" label="合约名称">
                </el-table-column>
                <el-table-column prop="orgEnName" label="状态">
                </el-table-column>
                <el-table-column prop="orgEnName" label="部署时间">
                </el-table-column>
                <el-table-column prop="state" label="操作">
                  <template slot-scope="scope">
                    <p><a href="#">API调用</a></p>
                    <p><a href="#">删除基础库合约</a></p>
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
                :data="tableData"
                :header-cell-style="{
                  background: '#F6F7FB',
                  color: 'rgba(0, 0, 0, 0.85)',
                  borderRight: '1px solid #fff',
                  fontWeight: 'normal',
                }"
                style="width: 100%; font-size: 12px"
              >
                <el-table-column prop="orgName" label="合约名称">
                </el-table-column>
                <el-table-column prop="orgEnName" label="状态">
                </el-table-column>
                <el-table-column prop="orgEnName" label="部署时间">
                </el-table-column>
                <el-table-column prop="state" label="操作">
                  <template slot-scope="scope">
                    <p><a href="#">API调用</a></p>
                    <p><a href="#">删除基础库合约</a></p>
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
                :data="tableData"
                :header-cell-style="{
                  background: '#F6F7FB',
                  color: 'rgba(0, 0, 0, 0.85)',
                  borderRight: '1px solid #fff',
                  fontWeight: 'normal',
                }"
                style="width: 100%; font-size: 12px"
              >
                <el-table-column prop="orgName" label="合约名称">
                </el-table-column>
                <el-table-column prop="orgEnName" label="合约简介">
                </el-table-column>
                <el-table-column prop="orgEnName" label="合约全局ID">
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
      tableData: [],
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
    back() {
      this.$router.go(-1);
    },
    chooseMenu(type) {
      this.menu = type;
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
    }
  }
}
</style>
