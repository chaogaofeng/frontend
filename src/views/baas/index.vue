<template>
  <div class="content-container">
    <FabricOrganWorkflow></FabricOrganWorkflow>
    <section class="operational-data">
      <div class="list-page-toolbar">
        <div class="list-page-tb-left">
          <div class="create-organ">
            <el-button type="primary" icon="el-icon-plus" @click="createOrganShowModal">创建组织</el-button>
          </div>
        </div>
        <div class="list-page-tb-right">
          <div class="btn-wrapper">
            <el-button type="primary" icon="el-icon-refresh-right" plain />
          </div>
        </div>
      </div>
      <div class="show-datalist">
        <el-table
          :data="tableData"
          :border="false"
          style="width: 100%"
          header-cell-class-name="table-header"          
          :cell-style="{
            textAlign: 'left',
          }"
        >
          <el-table-column prop="name" align="left" label="组织名称" min-width="20%" />
          <el-table-column prop="enName" align="left" label="英文名" min-width="20%" />
          <el-table-column prop="consortium" align="left" label="所在联盟" min-width="20%" />
          <el-table-column prop="permission" align="left" width="130" label="组织内权限" />
          <el-table-column prop="createTime" align="left" label="创建时间" width="180">
            <!-- <template slot-scope="scope">
              <el-tag v-if="scope.row.status == 0" type="warning">待部署</el-tag>
            </template> -->
          </el-table-column>
          <el-table-column label="操作" align="left" class-name="small-padding fixed-width" width="200">
            <template slot-scope="scope">              
              <el-button size="small" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          class="pagination"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page.currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="page.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="page.total"
          background
        >
        </el-pagination>
      </div>
    </section>
  </div>
</template>

<script>
import FabricOrganWorkflow from "@components/fabricOrganProcessSteps";
export default {
  name: "OrganizationList",
  components: {
    FabricOrganWorkflow,
  },
  data() {
    return {
      page: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 10, // 默认每页显示多少条
      },
      tableData: [
        {
          name: '太平运动组织',
          enName: 'tp-org',
          consortium: '天平军',
          permission: 'admin',
          createTime: '2021-12-30 14:47:42'  
        }
      ],
    };
  },
  created() {},
  methods: {
    createOrganShowModal() {
      alert("弹出创建组织模态框！");
    },

    // 获取集群内的链列表
    getList(page) {
      let colonyId = this.$route.query.colonyId;
      let toPage = {
        current: page.currentPage,
        size: page.pageSize,
      };
      chainPage(toPage, colonyId).then((res) => {
        if (res.data.success) {
          this.tableData = res.data.data.records;
        }
      });
    },
    // 切换第几页
    handleCurrentChange: function (page) {
      this.page.currentPage = page;
      this.getList(this.page);
    },
    // 每页几条
    handleSizeChange: function (sizeNum) {
      this.page.pageSize = sizeNum;
      this.getList(this.page);
    },

  },
};
</script>

<style scoped lang="scss">
  .operational-data {
    padding: 0 20px 20px;
    .list-page-toolbar {
      display: flex;
      flex-flow: row nowrap;
      justify-content: flex-start;
      align-items: center;
      margin-bottom: 10px;
      .list-page-tb-left {
        display: inline-block;
        width: 200px;
        .create-organ {
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
        }
      }
      .list-page-tb-right {
        display: inline-block;
        flex: 1;
        .btn-wrapper {
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
    }
    .show-datalist {
      ::v-deep .table-header {
        color: #333;
        background: #F6F7FB;
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
    }
  }
</style>
