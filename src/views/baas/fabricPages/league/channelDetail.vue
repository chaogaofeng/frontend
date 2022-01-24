<template>
  <div id="main">
    <div class="page">
      <div class="page-main">
        <div class="instance-info">
          <div class="back" @click="back">
            <i class="el-icon-arrow-left"></i>
          </div>
          <h2 class="headline">{{ channelDetals.channelName }}</h2>
          <span>
            <font-awesome-icon class="green-round" :icon="['fas', 'circle']" />{{ channelDetals.state }}
          </span>
        </div>
        
        <div class="detail-content">
          <div class="detail-parts-table">
            <div class="dt">
              <div class="tit">基本信息</div>              
            </div>
            <div class="page-item">
              <el-row class="row-content-oneline" align="middle">
                <el-col :span="8">
                  <label class="record-item">UUID:<span class="plain">{{ channelDetals.uuid }}</span></label>          
                </el-col>
                <el-col :span="8">
                  <label class="record-item">所属联盟:<span class="plain">{{ channelDetals.leagueName }}</span></label>
                </el-col>
                <el-col :span="8">
                  <label class="record-item">发起组织:<span class="plain">{{ channelDetals.startOrgan }}</span></label>
                </el-col>
              </el-row>
              <el-row class="row-content-oneline" align="middle">
                <el-col :span="8">
                  <label class="record-item">发起时间:<span class="plain">{{ formatMillisecond2Str(channelDetals.startTime) }}</span></label>
                </el-col>
                <el-col :span="8">
                  <label class="record-item">出块大小:<span class="plain">{{ channelDetals.blockSize }}</span>
                    <i class="el-icon-edit-outline" @click="editBolckSize"></i>                    
                    <alert-octagon-icon size="16" class="alert-wraning"></alert-octagon-icon>
                  </label>
                </el-col>
                <el-col :span="8">
                  <label class="record-item">出块超时时间:<span class="plain">{{ channelDetals.blockTimeoutPeriod }}</span>ms
                    <i class="el-icon-edit-outline" @click="editBolckTimeOutNum"></i>
                    <alert-octagon-icon size="16" class="alert-wraning"></alert-octagon-icon>
                  </label>
                </el-col>
              </el-row>
              <el-row class="row-content-oneline" align="middle" style="margin-bottom:50px;">
                <el-col :span="8">
                  <label class="record-item">通道描述:<span class="plain">{{ channelDetals.blockDesc }}</span>
                    <i class="el-icon-edit-outline" @click="editChannelDesc"></i>
                  </label>
                </el-col>
              </el-row>
            </div>
            <div class="dt">
              <div class="tit">通道成员</div>              
            </div>
            <div class="show-datalist" v-loading="loadingTable" element-loading-text="加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
              <el-table
                :data="channelMembersTable"
                :border="false"
                style="width: 100%"
                header-cell-class-name="table-header"          
                :cell-style="{
                  textAlign: 'left',
                  height: '24px',
                  lineHeight: '24px',
                  padding: '4px 0'
                }"
              >
                <el-table-column prop="name" align="left" label="组织名称" min-width="220" />
                <el-table-column prop="enName" align="left" label="英文名" min-width="180" />
                <el-table-column prop="desc" align="left" label="组织描述" min-width="240" />
                <el-table-column prop="addTime" align="left" label="加入时间" min-width="180">
                  <template slot-scope="scope">
                    <div v-if="scope.row.addTime">
                      <span v-if="msIsString(scope.row.addTime) && scope.row.addTime.includes(':')">scope.row.addTime</span>
                      <span v-else v-text="formatMillisecond2Str(scope.row.addTime)"></span>
                    </div>
                    <div v-else>--</div>
                  </template>
                </el-table-column>         
              </el-table>
              <el-pagination class="pagination" v-if="page.total" @current-change="handleCurrentChange" :current-page="page.currentPage" layout="prev, pager, next" :total="page.total" background />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { isString, dateFormat } from "@utils";
  import { AlertOctagonIcon } from "vue-feather-icons";

  export default {
    name: "channelDetail",
    components: {
      AlertOctagonIcon
    },
    data() {
      return {
        fromId: '',
        channelDetals: {
          channelName: 'channel1',
          state: '运行中',
          uuid: 'eedhdjgf-4556j3-ddjhffg-23455',
          leagueName: '-q',
          startOrgan: 'org1',
          startTime: 1642487832029,
          blockSize: '20',
          blockTimeoutPeriod: '2000',
          blockDesc: 'channel1'
        },
        loadingTable: false,
        channelMembersTable: [
          {
            name: 'org1',
            enName: 'org1',
            desc: '张虹的测试组织1',
            addTime: 1642487832029
          }
        ],
        page: {
          total: 0,
          currentPage: 1,
          pageSize: 10,
        }
      }
    },
    created() {
      this.fromId = this.$route.params.channelId;
    },
    methods: {
      back() {
        this.$router.go(-1);
      },
      // 切换第几页
      handleCurrentChange(pageNo) {
        this.page.currentPage = pageNo;
      },
      msIsString(str) {
        return isString(str);
      },
      formatMillisecond2Str(ms) {
        return dateFormat('yyyy-MM-dd hh:mm:ss', new Date(ms));
      },
      editBolckSize() {
        this.$prompt('请输入出块大小,只支持正整数', '修改出块大小', {
          confirmButtonText: '保存',
          cancelButtonText: '取消',
          inputPattern: /^[1-9]\d*$/,
          inputErrorMessage: '区块只能输入正整数',
          closeOnClickModal: false,
          closeOnPressEscape: false
        }).then(({ value }) => {
          this.$set(this.channelDetals, 'blockSize', value);
          this.$message({
            type: 'success',
            message: '修改后的区块大小是: ' + value
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });       
        });
      },
      editBolckTimeOutNum() {
        this.$prompt('请输入出块超时时间,只支持正整数', '修改出块超时时间', {
          confirmButtonText: '保存',
          cancelButtonText: '取消',
          inputPattern: /^[1-9]\d*$/,
          inputErrorMessage: '出块超时时间只能输入正整数',
          closeOnClickModal: false,
          closeOnPressEscape: false
        }).then(({ value }) => {
          this.$set(this.channelDetals, 'blockTimeoutPeriod', value);
          this.$message({
            type: 'success',
            message: '修改后的超时时间是: ' + value + 'ms'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });       
        });
      },
      editChannelDesc() {
        this.$prompt('请输入通道描述内容，最长输入255个字符', '修改通道描述', {
          confirmButtonText: '保存',
          cancelButtonText: '取消',
          inputType: 'textarea',
          inputPattern: /^[^\s]{1,255}$/,
          inputErrorMessage: '通道描述为必填项,最多只能输入255个字符',
          closeOnClickModal: false,
          closeOnPressEscape: false,
          customClass: 'custom-message',
          maxlength: '10'
        }).then(({ value }) => {
          this.$set(this.channelDetals, 'blockDesc', value);
          this.$message({
            type: 'success',
            message: '修改后的通道描述是: ' + value
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });       
        });
      }
    }
  }
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
    padding: 15px 0 15px 20px;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    border-bottom: 1px solid #E5E9EC;
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
      .page-item {
        .row-content-oneline {      
          padding: 0;
          height: 32px;
          line-height: 32px;
          .record-item {
            display: inline-flex;
            font-size: 12px;
            flex-flow: row nowrap;
            justify-content: center;
            align-items: center;
            .plain {
              margin-left: 10px;
            }
            ::v-deep .el-icon-edit-outline {
              padding-left: 10px;
              font-size: 16px;
              cursor: pointer;
          
            }
            .alert-wraning {
              margin-left: 10px;
              color: #EB741C;
            }
          }
        }
      }
      .show-datalist {
        margin-top: 20px;
        min-height: 200px;
        .el-table {
          ::v-deep tbody tr:hover>td {
            background: #F5FBFF;
          }
          ::v-deep td {
            font-size: 12px;
          }        
        }
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
        .show-vertical {
          ::v-deep .el-button--text {
            color: #108cee;
          }
        }
        .pagination {
          text-align: center;
          margin-top: 10px;
        }
        ::v-deep .el-icon-loading {
          font-size: 20px;
        }
      }
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
      }
    }
  }
}
</style>