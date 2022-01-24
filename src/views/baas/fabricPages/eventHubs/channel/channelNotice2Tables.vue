<template>
  <div class="page-item">
    <div class="show-datalist">
      <el-table
        :data="channelNoticeEventTable2"
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
        <el-table-column prop="startingTime" align="left" label="发起时间" min-width="180">
          <template slot-scope="scope">
            <div v-if="scope.row.startingTime">
              <span v-if="msIsString(scope.row.startingTime) && scope.row.startingTime.includes(':')">scope.row.startingTime</span>
              <span v-else v-text="formatMillisecond2Str(scope.row.startingTime)"></span>
            </div>
            <div v-else>--</div>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination class="pagination" v-if="pageChannelNotice2.total" @current-change="changeChannelNotice2Page" :current-page="pageChannelNotice2.currentPage" layout="prev, pager, next" :total="pageChannelNotice2.total" background />
    </div>    
  </div>
</template>

<script>
import { isString, dateFormat } from "@utils";
export default {
  name: 'EventChannelNotice2',
  data() {
    return {
      channelNoticeEventTable2: [
        {
          eventName: '用户同意加入联盟',
          initiator: '联盟01',
          startingTime: 1642731906068
        },
        {
          eventName: '用户91435a0a995b46dd8bca5e306853fe5a同意加入联盟',
          initiator: '联盟01',
          startingTime: 1642731906068
        },
      ],
      pageChannelNotice2: {
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
    changeChannelNotice2Page(pageNo) {
      this.pageChannelNotice2.currentPage = pageNo;
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