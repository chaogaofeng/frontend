<template>
  <div id="main">
    <div class="page">
      <div class="page-main">
        <div class="instance-info">
          <div class="back" @click="back">
            <i class="el-icon-arrow-left"></i>
          </div>
          <h2 class="headline">{{ data.orgName }}</h2>
          <div class="del">
            <el-button size="small" v-if="this.$route.params.canDel" type="primary" plain @click="handleDelete(scope.row)">删除</el-button>
            <el-tooltip v-else class="popper-del-tip" popper-class="tip-msg" effect="light" content="该组织已加入联盟，请先退出联盟后再删除" placement="top">
              <span class="cmd-btn-disabled has-bg">删除</span>
            </el-tooltip>

          </div>
        </div>
        <div class="info-content">
          <el-row :gutter="20">
            <el-col :span="6"><label>英文名：<span>{{ data.enName }}</span></label></el-col>
            <el-col :span="6"><label style="margin-left: 15px">创建时间：<span>{{ formatTime(data.createTime) }}</span></label></el-col>
            <el-col :span="6"><div class="grid-content bg-purple">是否加入联盟：<span>{{ $route.params.canDel ? '否' : '是' }}</span></div></el-col>
            <el-col :span="6"><label style="margin-left: 15px">组织描述：<span>{{ data.desc }}</span></label></el-col>
          </el-row>
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
                    :data="$route.params.canDel ? []: tableData"
                    :border="false"
                    style="width:100%;font-size:12px;"
                    header-cell-class-name="table-header"          
                    :cell-style="{
                      textAlign: 'left',
                      height: '24px',
                      lineHeight: '24px',
                      padding: '4px 0'
                    }"
                  >
                    <el-table-column prop="name" label="联盟名称">
                    </el-table-column>
                    <el-table-column prop="enName" label="英文名">
                    </el-table-column>
                    <el-table-column prop="state" label="联盟状态">
                      <template slot-scope="scope">
                        <div v-if="scope.row.state === '失败'"><font-awesome-icon class="red-round" :icon="['fas', 'circle']" />{{ scope.row.state }}</div>
                        <div v-else><font-awesome-icon class="green-round" :icon="['fas', 'circle']" />{{ scope.row.state }}</div>
                      </template>
                    </el-table-column>
                    <el-table-column prop="member" label="联盟成员">
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
import { dateFormat } from "@utils";
import { getOneOrganDetail } from "@api/fabric/organ";

export default {
  data() {
    return {
      id: "",
      data: {
        orgName: "太平运动组织",
        enName: 'org0',
        createTime: 1641373955000,
        desc: '123'
      },
      tableLoading: false,
      tableData: [
        {
          name: '太平军',
          enName: 'tpj',
          state: '失败',
          member: '太平运动组织'
        }
      ],
    };
  },
  created() {
    this.id = this.$route.params.orgId;
    this.getOrganDetail(this.id);
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    formatTime(ms) {
      return dateFormat('yyyy-MM-dd hh:mm:ss', new Date(ms));
    },
    // TODO 获取组织的详情
    getOrganDetail(orgId) {
      // getOneOrganDetail(orgId)
    }
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
    .headline {
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
      ::v-deep .table-header {
        color: #333;
        background: #F6F7FB;
        font-size: 12px;
        text-align: left;
        padding: 8px 0;
        height: 40px;
        border-bottom: 0 none;
        border-right: 1px solid #fff;
      }
      ::v-deep .el-table_1_column_6 {
        border-right: 0 none;
      }
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
