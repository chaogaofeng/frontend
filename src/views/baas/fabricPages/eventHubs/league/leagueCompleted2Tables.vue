<template>
  <div class="page-item">
    <el-row type="flex" class="item-row-base">
      <el-col :span="16">
        <div class="moudelTlt">申请事件</div>
      </el-col>
    </el-row>
    <div class="show-datalist">
      <el-table
        :data="applyLeagueCompletedEventTable"
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
        <el-table-column prop="eventName" align="left" label="事件名称" min-width="220" />
        <el-table-column prop="initiator" align="left" label="发起方" min-width="180" />
        <el-table-column prop="relatedChannel" align="left" label="相关通道" min-width="180" />
        <el-table-column prop="eventState" align="left" label="事件状态" min-width="150">
          <template slot-scope="scope">
            <span v-if="scope.row.eventState === '申请通过'">  
              <font-awesome-icon class="green-round" :icon="['fas', 'circle']" />{{ scope.row.eventState }}
            </span>
            <!-- <span v-else-if="scope.row.chainState === '已经安装'">
              <font-awesome-icon class="green-round" :icon="['fas', 'circle']" />{{ scope.row.chainState }}
            </span>
            <span v-else-if="scope.row.chainState === '正在实例化'" style="color:#F4B32F;">
              <font-awesome-icon class="in-progess-start" :icon="['fas', 'circle']" />{{ scope.row.chainState }}
            </span>
            <span v-else-if="scope.row.chainState === '实例化失败'">
              <font-awesome-icon class="red-round" :icon="['fas', 'circle']" />{{ scope.row.chainState }}
            </span> -->
          </template>
        </el-table-column>
        <el-table-column prop="startingTime" align="left" label="发起时间" min-width="180">
          <template slot-scope="scope">
            <div v-if="scope.row.startingTime">
              <span v-if="msIsString(scope.row.startingTime) && scope.row.startingTime.includes(':')">scope.row.startingTime</span>
              <span v-else v-text="formatMillisecond2Str(scope.row.startingTime)"></span>
            </div>
            <div v-else>--</div>
          </template>
        </el-table-column>
        <el-table-column prop="endTime" align="left" label="结束时间" min-width="180">
          <template slot-scope="scope">
            <div v-if="scope.row.endTime">
              <span v-if="msIsString(scope.row.endTime) && scope.row.endTime.includes(':')">scope.row.endTime</span>
              <span v-else v-text="formatMillisecond2Str(scope.row.endTime)"></span>
            </div>
            <div v-else>--</div>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="left" class-name="small-padding fixed-width" width="180">
          <template slot-scope="scope">
            <div v-if="scope.row.eventState === '申请通过'" class="show-horizontal">
              <el-button size="small" type="text" v-on:click="viewApprovalFlow">查看审批流</el-button>
            </div>
            <!-- <div v-else-if="scope.row.chainState === '初始状态'" class="show-horizontal">
              <el-button size="small" type="text" v-on:click="installChain">安装</el-button>
              <el-button size="small" type="text" v-on:click="editChain">编辑链码</el-button>
            </div>
            <div v-else-if="scope.row.chainState === '正在安装'" class="show-horizontal">
              <el-button size="small" type="text" v-on:click="editChain">编辑链码</el-button>
            </div>
            <div v-else-if="scope.row.chainState === '停止运行'" class="show-horizontal">
            </div> -->
          </template>
        </el-table-column>
      </el-table>
      <el-pagination class="pagination" v-if="pageLeagueCompletedApply.total" @current-change="changeLeagueCompletedApply" :current-page="pageLeagueCompletedApply.currentPage" layout="prev, pager, next" :total="pageLeagueCompletedApply.total" background />
    </div>
    <el-row type="flex" class="item-row-base">
      <el-col :span="16">
        <div class="moudelTlt">审批事件</div>
      </el-col>
    </el-row>
    <div class="show-datalist">
      <el-table
        :data="approvalLeagueCompletedEventTable"
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
        <el-table-column prop="eventName" align="left" label="事件名称" min-width="220" />
        <el-table-column prop="initiator" align="left" label="发起方" min-width="180" />
        <el-table-column prop="relatedChannel" align="left" label="相关通道" min-width="180" />
        <el-table-column prop="eventState" align="left" label="事件状态" min-width="150">
          <template slot-scope="scope">
            <span v-if="scope.row.chainState === '运行中'">  
              <font-awesome-icon class="green-round" :icon="['fas', 'circle']" />{{ scope.row.chainState }}
            </span>
            <span v-else-if="scope.row.chainState === '已经安装'">
              <font-awesome-icon class="green-round" :icon="['fas', 'circle']" />{{ scope.row.chainState }}
            </span>
            <span v-else-if="scope.row.chainState === '正在实例化'" style="color:#F4B32F;">
              <font-awesome-icon class="in-progess-start" :icon="['fas', 'circle']" />{{ scope.row.chainState }}
            </span>
            <span v-else-if="scope.row.chainState === '实例化失败'">
              <font-awesome-icon class="red-round" :icon="['fas', 'circle']" />{{ scope.row.chainState }}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="startingTime" align="left" label="发起时间" min-width="180">
          <template slot-scope="scope">
            <div v-if="scope.row.startingTime">
              <span v-if="msIsString(scope.row.startingTime) && scope.row.startingTime.includes(':')">scope.row.startingTime</span>
              <span v-else v-text="formatMillisecond2Str(scope.row.startingTime)"></span>
            </div>
            <div v-else>--</div>
          </template>
        </el-table-column>
        <el-table-column prop="endTime" align="left" label="结束时间" min-width="180">
          <template slot-scope="scope">
            <div v-if="scope.row.endTime">
              <span v-if="msIsString(scope.row.endTime) && scope.row.endTime.includes(':')">scope.row.endTime</span>
              <span v-else v-text="formatMillisecond2Str(scope.row.endTime)"></span>
            </div>
            <div v-else>--</div>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="left" class-name="small-padding fixed-width" width="180">
          <template slot-scope="scope">
            <div v-if="scope.row.chainState === '未发布'" class="show-horizontal">
              <el-button size="small" type="text" v-on:click="releaseChannel">发布到通道</el-button>
              <el-button size="small" type="text" v-on:click="editChain" class="mr-15">编辑链码</el-button>
            </div>
            <div v-else-if="scope.row.chainState === '初始状态'" class="show-horizontal">
              <el-button size="small" type="text" v-on:click="installChain">安装</el-button>
              <el-button size="small" type="text" v-on:click="editChain">编辑链码</el-button>
            </div>
            <div v-else-if="scope.row.chainState === '正在安装'" class="show-horizontal">
              <el-button size="small" type="text" v-on:click="editChain">编辑链码</el-button>
            </div>
            <div v-else-if="scope.row.chainState === '停止运行'" class="show-horizontal">
              <!-- 什么操作也没有 -->
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination class="pagination" v-if="pageLeagueCompletedApproval.total" @current-change="changeLeagueCompletedApproval" :current-page="pageLeagueCompletedApproval.currentPage" layout="prev, pager, next" :total="pageLeagueCompletedApproval.total" background />
    </div>

    <!-- start 升级链码的对话框 -->
    <el-dialog
      :visible.sync="viewApprovalFlowModal"
      :close-on-click-modal="false"
      :destroy-on-close="true"
      :show-close="false"
      id="deployChainToChannel"
      center
      width="450px"
      :top="deployModalTop"
      class="view-approval-flow"
    >
      <template slot="title">
        <h3 style="text-align:left;">审批流查看</h3>
        <x-icon size="16" class="close-ico" @click="viewApprovalFlowModal=false"></x-icon>
      </template>
      <div class="show-datalist">
        <el-table
          :data="completedApprovalFlowTable"
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
          <el-table-column prop="approval" align="left" label="审批方" min-width="220" />
          <el-table-column prop="approvalOpinion" align="left" label="审批意见" min-width="150">
            <template slot-scope="scope">
              <span v-if="scope.row.approvalOpinion === '审批通过'">  
                <font-awesome-icon class="green-round" :icon="['fas', 'circle']" />{{ scope.row.approvalOpinion }}
              </span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-dialog>
    <!-- 升级链码对话框 end -->
  </div>
</template>

<script>
import { isString, dateFormat } from "@utils";
import { XIcon } from "vue-feather-icons";
export default {
  name: 'EventLeagueCompleted',
  components: {
    XIcon
  },
  data() {
    return {
      applyLeagueCompletedEventTable: [{
        eventName: '测试Fabric-ORG1邀请用户91435a0a995b46dd8bca5e306853fe5a加入联盟联盟01',
        initiator: '我',
        relatedChannel: '联盟01',
        eventState: '申请通过',
        startingTime: 1642731906068,
        endTime: 1642731906068
      }],
      approvalLeagueCompletedEventTable: [{
        eventName: '',
        initiator: '',
        relatedChannel: '',
        eventState: '',
        startingTime: '',
        endTime: ''
      }],
      pageLeagueCompletedApply: {
        total: 0,
        currentPage: 1,
        pageSize: 10,
      },
      pageLeagueCompletedApproval: {
        total: 0,
        currentPage: 1,
        pageSize: 10,
      },
      viewApprovalFlowModal: false,
      completedApprovalFlowTable: [
        {
          approval: '91435a0a995b46dd8bca5e306853fe5a',
          approvalOpinion: '审批通过'
        },
      ]
    }

  },
  computed: {
    deployModalTop: function() {
      return "calc(50vh - 93px)";
    },
  },
  methods: {
    msIsString(str) {
      return isString(str);
    },
    formatMillisecond2Str(ms) {
      return dateFormat('yyyy-MM-dd hh:mm:ss', new Date(ms));
    },
    changeLeagueCompletedApply(pageNo) {
      this.pageLeagueCompletedApply.currentPage = pageNo;
    },
    changeLeagueCompletedApproval(pageNo) {
      this.pageLeagueCompletedApproval.currentPage = pageNo;
    },
    viewApprovalFlow() {
      // alert("查看审批流！");
      this.viewApprovalFlowModal = true;
    }
  },
}
</script>

<style lang='scss' scoped>
.page-item {
  padding-bottom: 15px;
  min-height: 400px;
  .item-row-base {
    padding: 20px 0 15px;
    .moudelTlt {
      color: #333;
      font-size: 14px;
      border-left: solid 4px #108cee;
      padding-left: 14px;
      height: 26px;
      line-height: 26px;
    }
  }
  .show-datalist {
    margin-top: 20px;
    min-height: 200px;
    padding: 0;
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
    .pagination {
      text-align: right;
      margin-top: 10px;
    }
    ::v-deep .el-icon-loading {
      font-size: 20px;
    }
  }
}
.view-approval-flow {
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
    .el-dialog__body {
      text-align: initial;
      padding: 25px 15px 25px;
    }
    .show-datalist {
      margin-top: 0;
      min-height: 30px;
      padding: 0;
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
      ::v-deep .el-table_1_column_2 {
        border-right: 0 none;
      }      
      .pagination {
        text-align: right;
        margin-top: 10px;
      }
      ::v-deep .el-icon-loading {
        font-size: 20px;
      }
    }
  }
}
</style>