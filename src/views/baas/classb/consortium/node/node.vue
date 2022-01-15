<template>
  <div>
    <div class="detail-content">
      <div class="detail-parts-table">
        <div class="list-page-toolbar">
          <router-link tag="div" to="/quorum/creatconsortium" class="left"
            >+ 新增节点</router-link
          >
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
                <el-table-column prop="nodeId" label="节点ID/节点类型">
                </el-table-column>
                <el-table-column prop="createTime" label="创建时间">
                </el-table-column>
                <el-table-column prop="jsonRpc" label="JSON RPC">
                </el-table-column>
                <el-table-column prop="cpu" label="CPU使用率">
                  <template slot-scope="scope">
                    <span v-if="scope.row.cpu">{{ scope.row.cpu }}</span>
                    <span v-else>-</span>
                  </template>
                </el-table-column>
                <el-table-column prop="memory" label="内存使用率">
                  <template slot-scope="scope">
                    <span v-if="scope.row.memory">{{ scope.row.memory }}</span>
                    <span v-else>-</span>
                  </template>
                </el-table-column>
                <el-table-column prop="storage" label="储存空间">
                  <template slot-scope="scope">
                    <span v-if="scope.row.storage">{{
                      scope.row.storage
                    }}</span>
                    <span v-else>-</span>
                  </template>
                </el-table-column>
                <el-table-column prop="phase" label="部署状态">
                  <template slot-scope="scope">
                    <span v-if="scope.row.phase">{{ scope.row.phase }}</span>
                    <span v-else>-</span>
                  </template>
                </el-table-column>
                <el-table-column prop="state" label="操作">
                  <template slot-scope="scope">
                    <p>
                      <a
                        v-if="scope.row.phase == 'Running'"
                        href="#"
                        target="_blank"
                        >智能合约编辑器</a
                      >
                      <span v-else>智能合约编辑器</span>
                    </p>
                    <p>
                      <a
                        v-if="scope.row.phase == 'Running'"
                        target="_blank"
                        :href="scope.row.browserUrl"
                        >区块链浏览器</a
                      >
                      <span v-else>区块链浏览器</span>
                    </p>
                    <p>
                      <a
                        v-if="scope.row.phase == 'Running'"
                        href="#"
                        target="_blank"
                        >节点控制台</a
                      >
                      <span v-else>节点控制台</span>
                    </p>
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
      tableLoading: true,
      tableData: [],
    };
  },
  created() {
    this.id = this.$route.query.id;
    this.$http({
      method: "get",
      url: quorumApi.quorumNode,
      params: {
        allianceId: this.id,
        allianceType: 1,
      },
    }).then((rel) => {
      console.log(rel);
      if (rel.code == 0) {
        this.tableData = rel.data || [];
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
      margin-bottom: 30px;
      padding: 10px 20px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
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
      padding: 0 20px;
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
      p span {
        color: #999;
      }
    }
  }
}
</style>
