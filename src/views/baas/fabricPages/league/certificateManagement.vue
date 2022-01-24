<template>
  <div class="container-wrapper" v-loading="loadingCertificateInfo">
    <el-row type="flex" class="row-base">
      <el-col :span="24">
        <h2 class="current-title">{{ alianceDetails.name }}</h2>
        <span v-if="alianceDetails.state === '失败'" class="league-state">
          <font-awesome-icon class="red-round" :icon="['fas', 'circle']" />{{ alianceDetails.state }}
        </span>
        <span v-else-if="alianceDetails.state === '部署中'">
          <font-awesome-icon class="in-progess-round" :icon="['fas', 'circle']" />{{ alianceDetails.state }}
        </span>
        <span v-else>
          <font-awesome-icon class="green-round" :icon="['fas', 'circle']" />{{ alianceDetails.state }}
        </span>
      </el-col>
    </el-row>
    <div class="page-item">
      <el-row type="flex" class="item-row-base">
        <el-col :span="16">
          <div class="moudelTlt">证书管理</div>
        </el-col>
        <el-col :span="8" class="invite-btn-wrapper">
          <el-button type="primary" size="small" icon="el-icon-plus" @click="applicationCertificate">申请证书</el-button>
        </el-col>
      </el-row>
      <!-- 放证书表格 -->
      <div class="show-datalist" v-loading="loadingCertificateTable" element-loading-text="加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
        <el-table
          :data="certificateListTable"
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
          <el-table-column prop="username" align="left" label="用户名" min-width="250" />
          <el-table-column prop="attributeSet" align="left" label="属性集" min-width="180" />
          <el-table-column prop="state" align="left" label="状态" min-width="130">
            <template slot-scope="scope">
              <span v-if="scope.row.state === '正常'">  
                <font-awesome-icon class="green-round" :icon="['fas', 'circle']" />{{ scope.row.state }}
              </span>
              <span v-else-if="scope.row.state === '无效'">
                <font-awesome-icon class="red-round" :icon="['fas', 'circle']" />{{ scope.row.state }}
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="applicationDate" align="left" label="申请日期" min-width="180">
            <template slot-scope="scope">
              <div v-if="scope.row.applicationDate">
                <span v-if="msIsString(scope.row.applicationDate) && scope.row.applicationDate.includes(':')">scope.row.applicationDate</span>
                <span v-else v-text="formatMillisecond2Str(scope.row.applicationDate)"></span>
              </div>
              <div v-else>--</div>
            </template>
          </el-table-column>
          <el-table-column prop="failureDate" align="left" label="失效日期" min-width="180">
            <template slot-scope="scope">
              <div v-if="scope.row.failureDate">
                <span v-if="msIsString(scope.row.failureDate) && scope.row.failureDate.includes(':')">scope.row.failureDate</span>
                <span v-else v-text="formatMillisecond2Str(scope.row.failureDate)"></span>
              </div>
              <div v-else>--</div>
            </template>
          </el-table-column>
          <el-table-column prop="publicKeyAlgorithm" align="left" label="公钥密码算法" min-width="150" />
          <el-table-column label="操作" align="left" class-name="small-padding fixed-width" width="180">
            <template slot-scope="scope">
              <div v-if="scope.row.state === '正常'" class="show-horizontal">
                <el-button size="small" type="text" v-on:click="downloadFile">下载</el-button>
              </div>
              <div v-else-if="scope.row.state === '无效'" class="show-horizontal">
                <!-- 什么操作也没有 -->
              </div>
            </template>
          </el-table-column>         
        </el-table>
        <el-pagination class="pagination" v-if="page.currentPage > 1" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page.currentPage" :page-sizes="[10, 20, 30, 40]" layout="sizes, prev, pager, next" :total="page.total" background />
      </div>
    </div>
    <!-- start 申请证书的对话框 -->
    <el-dialog
      :visible.sync="applyForModal"
      :close-on-click-modal="false"
      :destroy-on-close="true"
      :show-close="false"
      center
      width="480px"
      :top="applyModalTop"
      class="apply-modal"
    >
      <template slot="title">
        <h3 style="text-align:left;">申请证书</h3>
        <x-icon size="18" class="close-ico" @click="applyForModal=false"></x-icon>
      </template>
      <el-form :model="createCertificateForm" label-position="left" :rules="certificateFiledsRules" ref="createCertificateForm" label-width="80px" size="mini" class="create-certificate-form">
        <el-form-item label="用户名：" prop="username">
          <el-input placeholder="请输入用户名, 最长20位" v-model="createCertificateForm.username" style="width:320px;" maxlength="20" />
        </el-form-item>
        <el-form-item label="属性集：" prop="attributeSet" style="margin-top:20px;">
          <el-input placeholder="请输入属性集, 如：name=bob,age=23" v-model="createCertificateForm.attributeSet" style="width:320px;" maxlength="11" />
        </el-form-item>
      </el-form>
      <template slot="footer">
        <el-button type="primary" size="small" @click="addCertificate">确定</el-button>
        <el-button size="small" @click="applyForModal=false">取消</el-button>
      </template>
    </el-dialog>
    <!-- 申请证书的对话框 end -->
  </div>
</template>

<script>
import { XIcon, AlertCircleIcon } from "vue-feather-icons";
import { isString, dateFormat } from "@utils";

export default {
  name: "certificateInfo",
  components: {
    XIcon,
    AlertCircleIcon
  },
  data() {
    return {
      alianceDetails: {
        name: "联盟1",
        state: "运行中",
        enName: "union01",
      },
      loadingCertificateInfo: false,
      applyForModal: false,
      loadingCertificateTable: false,
      certificateListTable: [
        {
          username: 'Bob',
          attributeSet: 'role=admin,permission=1',
          state: '正常',
          applicationDate: 1642647939590,
          failureDate: 1642647939590,
          publicKeyAlgorithm: 'ECC'
        },
      ],
      page: {
        total: 0,
        currentPage: 1,
        pageSize: 10,
      },
      createCertificateForm: {
        username: '',
        attributeSet: ''
      },
      certificateFiledsRules: {
        username: [
          { required: true, message: '请输入用户名，最长20位', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
        ],
        attributeSet: [
          { required: true, message: '请输入属性集', trigger: 'blur' },
          {
            pattern: /^(.+=.+)?(.+=[^\,]+)+$/,
            message: "格式错误，请输入name=bob,age=23格式的属性集",
            trigger: "blur",
          }
        ]
      },
    };
  },
  created() {
    this.$root.$emit("changeLeftMenu", "fabricLeagueMenus");
  },
  computed: {
    applyModalTop: function() {
      return "calc(50vh - 118px)";
    },
  },
  methods: {
    downloadFile(fileName) {
      alert("下载证书！");
    },
    addCertificate() {
      alert("添加了证书");
      this.applyForModal = false;
    },
    applicationCertificate() {
      this.applyForModal = true;
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
  },
};
</script>

<style lang='scss' scoped>
.container-wrapper {
  .row-base {
    padding: 0 15px;
    border-bottom: 1px solid #E8EBEE;
    .current-title {
      display: inline-block;
      font-size: 16px;
      width: 90px;
      height: 50px;
      line-height: 50px;
    }
  }
  .page-item {
    padding-bottom: 15px;
    min-height: 400px;
    .item-row-base {
      padding: 20px 15px 15px;
      .moudelTlt {
        color: #333;
        font-size: 14px;
        border-left: solid 4px #108cee;
        padding-left: 14px;
        height: 32px;
        line-height: 32px;
      }
      .invite-btn-wrapper {
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
    .row-content-oneline {      
      padding: 0 15px;
      height: 32px;
      line-height: 32px;
      .record-item {
        display: inline-flex;
        font-size: 12px;
        .plain {
          margin-left: 10px;
        }
      }
    }
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
  }  
}

.apply-modal {
  ::v-deep .el-dialog--center {
    .el-dialog__header {
      padding: 10px 15px;
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      align-items: center;
      background-color: #f6f7fb;
      h3 {
        font-size: 16px;
        color: #333;
        font-weight: normal;
      }
      .close-ico {
        cursor: pointer;
        color: #333;
      }
    }
    .el-dialog__body {
      padding: 25px 25px 20px;
    }
    .tip-info {
      display: flex;
      flex-flow: row nowrap;
      justify-content: flex-start;
      align-items: flex-start;
      padding: 5px 5px;
      height: 150px;
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
  .alert-custom {
    width: 435px;
    padding: 10px 2px;
    margin-bottom: 20px;
    background-color: #FCF7F1;
    line-height: 20px;
    color: #F38900;
  }
}

</style>