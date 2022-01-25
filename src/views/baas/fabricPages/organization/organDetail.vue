<template>
  <div id="main" v-loading="loadingCurContainer">
    <div class="page">
      <div class="page-main">
        <div class="instance-info">
          <div class="back" @click="back">
            <i class="el-icon-arrow-left"></i>
          </div>
          <h2 class="headline">{{ data.name }}</h2>
          <div class="del">
            <el-button size="small" v-if="isNullByVue(data.joinTime)" type="primary" plain @click="handleDelete">删除</el-button>
            <el-tooltip v-else class="popper-del-tip" popper-class="tip-msg" effect="light" content="该组织已加入联盟，请先退出联盟后再删除" placement="top">
              <span class="cmd-btn-disabled has-bg">删除</span>
            </el-tooltip>

          </div>
        </div>
        <div class="info-content">
          <el-row :gutter="20">
            <el-col :span="6"><label>英文名：<span>{{ data.enName }}</span></label></el-col>
            <el-col :span="6"><label style="margin-left: 15px">创建时间：<span>{{ data.createTime }}</span></label></el-col>
            <el-col :span="6"><div class="grid-content bg-purple">是否加入联盟：<span>{{ data.joinTime === null ?  '否' : '是'}}</span></div></el-col>
            <el-col :span="6"><label style="margin-left: 15px">组织描述：<span>{{ data.note }}</span></label></el-col>
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
                    :data="tableData"
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
                      <template slot-scope="scope">
                        <div v-if="scope.row.name">
                          <span>scope.row.name</span>
                        </div>
                        <div v-else>-</div>
                      </template>
                    </el-table-column>
                    <el-table-column prop="enName" label="英文名">
                      <template slot-scope="scope">
                        <div v-if="scope.row.enName">
                          <span>scope.row.enName</span>
                        </div>
                        <div v-else>-</div>
                      </template>
                    </el-table-column>
                    <el-table-column prop="status" label="联盟状态">
                      <template slot-scope="scope">
                        <div v-if="scope.row.status === '失败'"><font-awesome-icon class="red-round" :icon="['fas', 'circle']" />{{ scope.row.status }}</div>
                        <div v-else-if="scope.row.status === '成功'"><font-awesome-icon class="green-round" :icon="['fas', 'circle']" />{{ scope.row.status }}</div>
                        <div v-else>-</div>
                      </template>
                    </el-table-column>
                    <el-table-column prop="members" label="联盟成员">
                      <template slot-scope="scope">
                        <div v-if="scope.row.members">
                          <span>scope.row.members</span>
                        </div>
                        <div v-else>-</div>
                      </template>                     
                    </el-table-column>
                  </el-table>
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- start 删除组织的对话框 -->
    <el-dialog
      :visible.sync="delOrganModal"
      :close-on-click-modal="false"
      :destroy-on-close="true"
      :show-close="false"
      id="delOrganDialog"
      center
      width="400px"
      :top="delOrganModalTop"
    >
      <template slot="title">
        <h3 style="text-align:left;">组织未加入联盟</h3>
        <x-icon size="16" class="close-ico" @click="delOrganModal=false"></x-icon>
      </template>
      <div class="tip-del-organ">
        <alert-circle-icon size="24" class="warning-ico"></alert-circle-icon>
        <p>
          该组织没有加入任何联盟,<br />确认是否删除该组织?
        </p>
      </div>
      <template slot="footer">
        <el-button type="primary" size="small" @click="delCurrentOrgan" :loading="delBtnLoading">确定</el-button>
        <el-button size="small" @click="delOrganModal=false">取消</el-button>
      </template>
    </el-dialog>
    <!-- 删除组织的对话框 end -->
  </div>
</template>

<script>
import { XIcon, AlertCircleIcon } from "vue-feather-icons";
import organsList from "@api/fabric/organ";
import { isNull } from "@utils";

export default {
  name: 'organDetail',
  components: {
    XIcon,
    AlertCircleIcon
  },
  data() {
    return {
      delOrganModal: false,
      delBtnLoading: false,
      loadingCurContainer: true,
      data: {},
      tableLoading: false,
      tableData: [],
    };
  },
  created() {
    this.getOrganDetail(this.$route.params.orgId);
  },
  computed: {
    delOrganModalTop: function() {
      return "calc(50vh - 108px)";
    }
  },
  methods: {
    isNullByVue(val) {
      return isNull(val);
    },
    back() {
      this.$router.go(-1);
    },
    getOrganDetail(orgId) {
      this.$http({
        method: "get",
        url: organsList.getOneOrganDetail + orgId,
      }).then((res) => {
        if (res.code === 0 && res.success === true) {
          this.data = {...res.data.org};
          this.tableData = [res.data.alliance];
          this.tableLoading = false;
          this.loadingCurContainer = false;
        } else {
          this.tableLoading = false;
          this.loadingCurContainer = false;
          this.$message(res.msg);
        }
      });
    },
    handleDelete() {      
      this.delOrganModal = true;
    },
    delCurrentOrgan() {
      this.delBtnLoading = true;
      this.$http({
        method: "post",
        url: organsList.delOneOrgan + this.$route.params.orgId,
      }).then((res) => {
        if (res.code === 0 && res.success === true) {
          this.delOrganModal = false;
          this.$message({
            type: 'success',
            message: '删除成功！',
            center: true,
            duration: 2600
          });         
          setTimeout(() => {            
            this.$router.go(-1);
          }, 800)
        } else {
          this.delOrganModal = false;
          this.delBtnLoading = false;
          this.$message(res.msg);
        }
      });
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
::v-deep .el-dialog--center {
  .el-dialog__header {
    padding: 10px 15px;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    background-color: #f6f7fb;
    h3 {
      color: #333;
      font-weight: normal;
    }
    .close-ico {
      cursor: pointer;
      color: #333;
    }
  }
  .tip-del-organ {
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 5px 5px 0;
    .warning-ico {
      width: 24px;
      height: 30px;
      color: #F4B329;
    }
    p {
      padding-left: 26px;
      display: inline-block;
      height: 60px;
      line-height: 30px;
      font-size: 14px;
      color: #666;
    }
  }
  .el-dialog__footer {
    border-top: 1px solid #eceff8;
    padding: 12px 30px 12px 0;
    text-align: right;
  }
}
</style>
