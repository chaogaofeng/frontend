<template>
  <div id="main">
    <div class="page">
      <div class="page-main">
        <div class="instance-info">
          <div class="back" @click="back">
            <i class="el-icon-arrow-left"></i>
          </div>
          <h1>{{ data.name }}</h1>
          <div class="del">
            <el-button size="mini " disabled>删除</el-button>
          </div>
        </div>
        <div class="info-content">
          <p>
            <label>英文名：</label><span>{{ data.enName }}</span>
            <label style="margin-left: 10px">组织描述：</label
            ><span>{{ data.note }}</span>
          </p>
        </div>
        <div class="detail-content">
          <div class="detail-parts-table">
            <div class="dt">
              <div class="tit">所在联盟</div>
              <div class="alt">温馨提示：仅能被邀请加入联盟</div>
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
                    <el-table-column prop="consName" label="联盟名称">
                    </el-table-column>
                    <el-table-column prop="enName" label="英文名">
                    </el-table-column>
                    <el-table-column prop="state" label="联盟状态">
                    </el-table-column>
                  </el-table>
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import quorumApi from "../../classa/quorum/api";
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
      url: `${quorumApi.orgListDetaile}/${this.id}`,
    }).then((rel) => {
      console.log(rel);
      if (rel.code == 0) {
        this.data = rel.data;
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
.page {
  padding: 20px;
  .page-main {
    background: #fff;
  }
  .instance-info {
    margin: 0;
    height: 45px;
    padding: 20px;
    display: flex;
    align-items: center;
    h1 {
      padding: 0 25px;
    }
    .back {
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
        font-size: 16px;
        font-weight: bold;
        color: #108cee;
        transition: all 0.5s;
      }
      &:hover {
        background: #d2ecfd;
      }
    }
  }
  .info-content {
    padding: 0 20px 15px;
    background-color: #fff;
    border-bottom: 1px solid #e8ebee;
  }
  .detail-content {
    padding: 20px;
    .detail-parts-table {
      overflow-y: auto;
      height: 600px;
      padding: 10px;
      border: 1px solid #e8ebee;
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
    }
  }
}
</style>
