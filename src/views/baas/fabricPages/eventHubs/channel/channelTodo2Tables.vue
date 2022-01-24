<template>
  <div class="page-item">
    <el-row type="flex" class="item-row-base">
      <el-col :span="16">
        <div class="moudelTlt">申请事件</div>
      </el-col>
    </el-row>
    <div class="show-datalist">
      <el-table
        :data="applyChannelTodoEventTable"
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
            <span v-if="scope.row.eventState === '申请中'">  
              <font-awesome-icon class="in-progess-start" :icon="['fas', 'circle']" />{{ scope.row.eventState }}
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
        <el-table-column label="操作" align="left" class-name="small-padding fixed-width" width="180">
          <template slot-scope="scope">
            <div v-if="scope.row.eventState === '申请中'" class="show-horizontal">
              <el-button size="small" type="text" v-on:click="viewDetails">查看详情</el-button>
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
      <el-pagination class="pagination" v-if="pageChannelTodoApply.total" @current-change="changeChannelTodoApply" :current-page="pageChannelTodoApply.currentPage" layout="prev, pager, next" :total="pageChannelTodoApply.total" background />
    </div>
    <el-row type="flex" class="item-row-base">
      <el-col :span="16">
        <div class="moudelTlt">审批事件</div>
      </el-col>
    </el-row>
    <div class="show-datalist">
      <el-table
        :data="approvalChannelTodoEventTable"
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
            <span v-if="scope.row.eventState === '审批中'">  
              <font-awesome-icon class="in-progess-start" :icon="['fas', 'circle']" />{{ scope.row.eventState }}
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
        <el-table-column label="操作" align="left" class-name="small-padding fixed-width" width="180">
          <template slot-scope="scope">
            <div v-if="scope.row.eventState === '审批中'" class="show-horizontal">
              <el-button size="small" type="text" v-on:click="reception">接收</el-button>
              <el-button size="small" type="text" v-on:click="refuse" class="mr-15">拒绝</el-button>
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
      <el-pagination class="pagination" v-if="pageChannelTodoApproval.total" @current-change="changeChannelTodoApproval" :current-page="pageChannelTodoApproval.currentPage" layout="prev, pager, next" :total="pageChannelTodoApproval.total" background />
    </div>
  </div>
</template>

<script>
import { isString, dateFormat } from "@utils";
export default {
  name: 'EventChanelTodo',
  data() {
    return {
      applyChannelTodoEventTable: [{
        eventName: 'zh-test邀请用户3cec085510884e4488a431c426eac95f加入联盟esb-test',
        initiator: '我',
        relatedChannel: 'esb-test',
        eventState: '申请中',
        startingTime: 1642731906068
      }],
      approvalChannelTodoEventTable: [{
        eventName: '测试Fabric-ORG1邀请用户91435a0a995b46dd8bca5e306853fe5a加入联盟联盟01',
        initiator: '测试Fabric-ORG1',
        relatedChannel: '联盟01',
        eventState: '审批中',
        startingTime: 1642731906068
      }],
      pageChannelTodoApply: {
        total: 0,
        currentPage: 1,
        pageSize: 10,
      },
      pageChannelTodoApproval: {
        total: 0,
        currentPage: 1,
        pageSize: 10,
      },
    }

  },
  methods: {
    msIsString(str) {
      return isString(str);
    },
    formatMillisecond2Str(ms) {
      return dateFormat('yyyy-MM-dd hh:mm:ss', new Date(ms));
    },
    changeChannelTodoApply(pageNo) {
      this.pageChannelTodoApply.currentPage = pageNo;
    },
    changeChannelTodoApproval(pageNo) {
      this.pageChannelTodoApproval.currentPage = pageNo;
    },
    viewDetails() {
      alert("查看详情！");
    },
    reception() {
      alert("接收审批事件！");
    },
    refuse() {
      alert("拒绝审批事件！");
    },
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
</style>