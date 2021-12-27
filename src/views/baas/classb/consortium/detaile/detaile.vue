<template>
  <div>
    <div class="detail-content">
      <div class="detail-parts-table">
        <div class="dt">
          <div class="tit">基本信息</div>
        </div>
        <div class="info">
          <div class="block">
            <p>共识机制：{{ data.consensus }}</p>
            <p>出块周期：{{ data.cycle }}</p>
          </div>
          <div class="block">
            <p>同步模式：{{ data.syncMode }}</p>
            <p>联盟描述：{{ data.note }}</p>
          </div>
        </div>
      </div>
      <div class="detail-parts-table">
        <div class="dt">
          <div class="tit">联盟成员</div>
        </div>
        <div class="list-page-toolbar">
          <div class="left">+ 邀请成员</div>
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
                <el-table-column prop="name" label="组织名称">
                </el-table-column>
                <el-table-column prop="enName" label="组织英文名">
                </el-table-column>
                <el-table-column prop="state" label="组织状态">
                  <template slot-scope="scope">
                    <div class="state">
                      <span v-if="scope.row.status == 0"
                        ><i class="success"></i>正常</span
                      >
                      <span v-else> ><i class="err"></i>异常</span>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="state" label="交易节点数">
                </el-table-column>
                <el-table-column prop="state" label="验证节点数">
                </el-table-column>
                <el-table-column prop="createTime" label="加入日期">
                </el-table-column>
                <el-table-column prop="state" label="节点类型">
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
      data: {},
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
      console.log(rel);
      if (rel.code == 0) {
        this.data = rel.data.alliance;
        this.tableData = rel.data.orgList || [];
        console.log(this.tableData);
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
          background: #eb5252;
        }
        .err {
          width: 9px;
          height: 9px;
          display: inline-block;
          border-radius: 50%;
          background: #2cb663;
        }
      }
    }
  }
}
</style>
