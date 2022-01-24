<template>
  <div class="container-wrapper" v-loading="loadingAlianceInfo">
    <el-row type="flex" class="row-base has-bottom-line">
      <el-col :span="16">
        <h2 class="current-title">{{ alianceDetails.name }}</h2>
      </el-col>
      <el-col :span="8" class="node-top-tools">
        <el-button type="primary" size="small" @click="goDiskExpansionPage">数据盘扩容</el-button>
        <div class="btn-wrapper">
          <el-button type="primary" icon="el-icon-refresh-right" plain @click="reloadPage" />
        </div>
      </el-col>
    </el-row>
    <div class="page-item" style="border-bottom:1px solid #E8EBEE;">      
      <!-- 放联盟成员表格 -->
      <div class="show-datalist" v-loading="loadingNodes" element-loading-text="加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
        <el-table
          :data="tableData"
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
          <el-table-column prop="nodeName" align="left" label="节点名称" min-width="250" />
          <el-table-column prop="nodeType" align="left" label="节点类型" min-width="150" />
          <el-table-column prop="nodeUrl" align="left" label="节点地址" min-width="250" />
          <el-table-column prop="createTime" align="left" label="创建时间" min-width="180">
            <template slot-scope="scope">
              <div v-if="scope.row.createTime">
                <span v-if="msIsString(scope.row.createTime) && scope.row.createTime.includes(':')">scope.row.createTime</span>
                <span v-else v-text="formatMillisecond2Str(scope.row.createTime)"></span>
              </div>
              <div v-else>--</div>
            </template>
          </el-table-column>
          <el-table-column prop="cpuUsageRate" align="left" label="CPU使用率" min-width="100" />
          <el-table-column prop="memoryUsageRate" align="left" label="内存使用率" min-width="100" />
          <el-table-column prop="dataDiskSpace" align="left" label="数据盘空间" min-width="180" />
          <el-table-column prop="bookStoreSpace" align="left" label="账本存储空间" min-width="120" />
          <el-table-column label="操作" align="left" class-name="small-padding fixed-width" width="180">
            <template slot-scope="scope">
              <div v-if="scope.row.nodeType === 'orderer'" class="show-vertical">
                <el-button size="small" type="text">节点日志</el-button>
              </div>
              <div v-if="scope.row.nodeType === 'peer'" class="show-vertical">
                <span class="cmd-btn-disabled">浏览器</span>
                <el-button size="small" type="text">节点日志</el-button>                
              </div>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination class="pagination" v-if="page.total > page.pageSize" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page.currentPage" :page-sizes="[10, 20, 30, 40]" layout="sizes, prev, pager, next" :total="page.total" background />
      </div>
    </div>
    <div class="page-item">
      <el-row type="flex" class="row-base" style="height: 45px;">
        <el-col :span="16" class="node-middle-tools">
          <label class="select-node">
            <span class="label-txt">选择节点：</span>
            <el-select v-model="watchNode" size="small" class="small-select">
              <el-option
                v-for="item in nodeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </label>
          <div class="btn-wrapper">
            <el-button type="primary" icon="el-icon-refresh-right" plain @click="reloadPageGraph" />
          </div>
        </el-col>
      </el-row>
      <el-row class="row-charts">
        <el-col :span="12" class="left-chart">
          <div class="title-chart">
            <div class="ico-wrapper">
              <activity-icon size="14" class="ico-desc"></activity-icon>
            </div>
            <h3>节点CPU负载</h3>
          </div>
          <div>
            <ve-line :data="chartData" height="360px" width="96%" :settings="chartSettings" :legend-visible="false" :title="leftChartTitle"></ve-line>
          </div>
        </el-col>
        <el-col :span="12" class="right-chart">
          <div class="title-chart">
            <div class="ico-wrapper">
              <activity-icon size="14" class="ico-desc"></activity-icon>
            </div>
            <h3>节点内存负载</h3>
          </div>
          <div>
            <ve-line :data="chartData" height="360px" width="96%" :settings="chartSettings" :legend-visible="false" :title="rightChartTitle"></ve-line>
          </div>
        </el-col>
      </el-row>
    </div>    
  </div>
</template>

<script>
import { ActivityIcon } from "vue-feather-icons";
import { isString, dateFormat } from "@utils";
import Vue from 'vue';
import 'echarts/lib/component/title';
import VeLine from 'v-charts/lib/line.common';
Vue.component(VeLine.name, VeLine);

export default {
  name: "nodesInfo",
  components: {
    ActivityIcon,
  },
  data() {
    return {
      alianceDetails: {
        name: "联盟1"
      },
      chartData: {
        columns: ['日期', '销售额'],
        rows: [
          { '日期': '12-27 18:38:54', '销售额': 0.01 },
          { '日期': '12-27 18:41:54', '销售额': 0.015 },
          { '日期': '12-27 18:44:54', '销售额': 0.02 },
          { '日期': '12-27 18:47:54', '销售额': 0.4 },
          { '日期': '12-27 18:50:54', '销售额': 0.5 },
          { '日期': '12-27 18:53:54', '销售额': 0.6 }
        ]
      },
      chartSettings: {
        yAxisType: ['percent'],
        min: [0],
        max: [1],        
      },
      leftChartTitle: {
        text: 'CPU使用率（%）',
        left: 'center',
        textStyle: {
          fontWeight: 'normal'
        }
      },
      rightChartTitle: {
        text: '内存使用率（%）',
        left: 'center',
        textStyle: {
          fontWeight: 'normal'
        }
      },
      tableData: [
        {
          nodeName: 'orderer0',
          nodeType: 'orderer',
          nodeUrl: 'grpcs://180.76.226.25:7050',
          createTime: 1642129207320,
          cpuUsageRate: '0.10%',
          memoryUsageRate: '0.22%',
          dataDiskSpace: '100G 已使用6.04%',
          bookStoreSpace: '44k',
        },
        {
          nodeName: 'orderer1',
          nodeType: 'orderer',
          nodeUrl: 'grpcs://180.76.246.161:7050',
          createTime: 1642129207320,
          cpuUsageRate: '0.07%',
          memoryUsageRate: '0.24%',
          dataDiskSpace: '100G 已使用7.18%',
          bookStoreSpace: '44k',
        },
        {
          nodeName: 'orderer2',
          nodeType: 'orderer',
          nodeUrl: 'grpcs://180.76.99.177:7050',
          createTime: 1642129207320,
          cpuUsageRate: '0.10%',
          memoryUsageRate: '0.24%',
          dataDiskSpace: '100G 已使用7.93%',
          bookStoreSpace: '44k',
        },
        {
          nodeName: 'orderer3',
          nodeType: 'orderer',
          nodeUrl: 'grpcs://120.48.1.92:7050',
          createTime: 1642129207320,
          cpuUsageRate: '0.10%',
          memoryUsageRate: '0.24%',
          dataDiskSpace: '100G 已使用5.79%',
          bookStoreSpace: '44k',
        },
        {
          nodeName: 'orderer4',
          nodeType: 'orderer',
          nodeUrl: 'grpcs://180.76.56.99:7050',
          createTime: 1642129207320,
          cpuUsageRate: '0.10%',
          memoryUsageRate: '0.29%',
          dataDiskSpace: '100G 已使用6.04%',
          bookStoreSpace: '44k',
        },
        {
          nodeName: 'tf-org-peer0',
          nodeType: 'peer',
          nodeUrl: 'grpcs://180.76.159.249:7051',
          createTime: 1642129207320,
          cpuUsageRate: '0.65%',
          memoryUsageRate: '0.61%',
          dataDiskSpace: '100G 已使用7.18%',
          bookStoreSpace: '112k',
        },
        {
          nodeName: 'tf-org-peer1',
          nodeType: 'peer',
          nodeUrl: 'grpcs://180.76.199.105:7051',
          createTime: 1642129207320,
          cpuUsageRate: '0.88%',
          memoryUsageRate: '0.62%',
          dataDiskSpace: '100G 已使用7.93%',
          bookStoreSpace: '112k',
        },
      ],
      watchNode: 'orderer0',
      nodeOptions: [
        {
          label: 'orderer0',
          value: 0
        },
        {
          label: 'orderer1',
          value: 1
        },
        {
          label: 'orderer2',
          value: 2
        },
        {
          label: 'orderer3',
          value: 3
        },
        {
          label: 'orderer4',
          value: 5
        },
        {
          label: 'tf-org-peer0',
          value: 6
        },
        {
          label: 'tf-org-peer1',
          value: 7
        },
      ],
      loadingAlianceInfo: false,
      loadingNodes: false,
      page: {
        total: 0,
        currentPage: 1,
        pageSize: 10,
      },
    };
  },
  created() {
    this.$root.$emit('changeLeftMenu', 'fabricLeagueMenus')
  },
  computed: {
    inviteModalTop: function() {
      return "calc(50vh - 155px)";
    },
  },
  methods: {
    goDiskExpansionPage() {
      // 跳转磁盘扩容页面
      this.$router.push({
        name: 'fabricDiskAdd'
      });
    },
    msIsString(str) {
      return isString(str);
    },
    formatMillisecond2Str(ms) {
      return dateFormat('yyyy-MM-dd hh:mm:ss', new Date(ms));
    },
    handleSizeChange: function (sizeNum) {
      this.page.pageSize = sizeNum;
    },
    // 切换第几页
    handleCurrentChange(page) {
      this.page.currentPage = page;
    },
    reloadPage() {
      alert("刷新当前页的节点表格和可视化图标！");
    },
    reloadPageGraph() {
      alert("刷新当前页的可视化图标！");
    }
  },
};
</script>

<style lang='scss' scoped>
.container-wrapper {
  .has-bottom-line {
    border-bottom: 1px solid #E8EBEE;
  }
  .row-base {
    padding: 0 15px;    
    .current-title {
      display: inline-block;
      font-size: 16px;
      width: 90px;
      height: 50px;
      line-height: 50px;
    }
    .node-top-tools {
      display: flex;
      flex-flow: row nowrap;
      justify-content: flex-end;
      align-items: center;
      ::v-deep .el-button {
        padding: 10px 12px;
        [class^=el-icon-] {
          font-family: element-icons!important;
          font-style: normal;
          font-weight: bold;
          font-variant: normal;
          text-transform: none;
          line-height: 1;
          vertical-align: baseline;
          display: inline-block;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
      }
      .btn-wrapper {
        margin-left: 20px;
        width: 40px;
        text-align: right;
        ::v-deep .el-button {
          font-size: 20px;
          padding: 7px 8px;
          [class^=el-icon-] {
            font-family: element-icons!important;
            font-style: normal;
            font-weight: bold;
            font-variant: normal;
            text-transform: none;
            line-height: 1;
            vertical-align: baseline;
            display: inline-block;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }
        }
      }
    }
    .node-middle-tools {      
      padding-bottom: 15px;
      .select-node {
        display: inline-block;
        width: 290px;
      }
      .btn-wrapper {
        display: inline-block;
        width: 40px;
        text-align: right;
        ::v-deep .el-button {
          font-size: 20px;
          padding: 5px 8px;
          [class^=el-icon-] {
            font-family: element-icons!important;
            font-style: normal;
            font-weight: bold;
            font-variant: normal;
            text-transform: none;
            line-height: 1;
            vertical-align: baseline;
            display: inline-block;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }
        }
      }
    }
  }
  .page-item {
    margin-top: 25px;
    padding-bottom: 15px;
    min-height: 400px;
    .show-datalist {
      min-height: 200px;
      padding: 0 15px;
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
    .row-charts {
      margin-left: 15px !important;      
      width: calc(100% - 30px);
      height: 250px;
      display: flex;
      flex-flow: row nowrap;
      justify-content: center;
      align-items: center;
      .left-chart {
        border: 1px solid #E8EBEE;
        border-right: 0 none;
        margin: 0;
        height: 230px;
        .title-chart {
          display: flex;
          flex-flow: row nowrap;
          justify-content: flex-start;
          align-items: center;
          height: 40px;
          padding-left: 10px;
          .ico-wrapper {
            width: 18px;
            height: 14px;
            border: 2px solid #8B8A8B;
            border-radius: 2px;
            text-align: center;
            .ico-desc {
              font-size: 14px;
            }
          }
          
          h3 {
            margin-left: 5px;
            font-size: 14px;
          }
        }
      }
      .right-chart {
        border: 1px solid #E8EBEE;
        border-left: 0 none;
        margin: 0;
        height: 230px;
        .title-chart {
          display: flex;
          flex-flow: row nowrap;
          justify-content: flex-start;
          align-items: center;
          height: 40px;
          padding-left: 10px;
          .ico-wrapper {
            width: 18px;
            height: 14px;
            border: 2px solid #8B8A8B;
            border-radius: 2px;
            text-align: center;
            .ico-desc {
              font-size: 14px;
            }
          }
          
          h3 {
            margin-left: 5px;
            font-size: 14px;
          }
        }
      }
    }
  }  
}

</style>