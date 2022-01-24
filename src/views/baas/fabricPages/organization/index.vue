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
            <el-button type="primary" icon="el-icon-refresh-right" plain @click="reloadOrganTable" />
          </div>
        </div>
      </div>
      <div class="show-datalist" v-loading="loadingOrganData" element-loading-text="加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
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
          <el-table-column prop="name" align="left" label="组织名称" min-width="20%">
            <template slot-scope="scope">
              <div v-if="scope.row.name">
                <router-link :to="{ name: 'organDetail', params: { orgId: scope.row.id, canDel: !scope.row.consortium } }"><span v-text="scope.row.name"></span></router-link>
              </div>
              <div v-else>--</div>
            </template>
          </el-table-column>
          <el-table-column prop="enName" align="left" label="英文名" min-width="20%" />
          <el-table-column prop="consortium" align="left" label="所在联盟" min-width="20%" />
          <el-table-column prop="permission" align="left" width="130" label="组织内权限" />
          <el-table-column prop="createTime" align="left" label="创建时间" width="180">
            <template slot-scope="scope">
              <div v-if="scope.row.createTime">
                <span v-if="msIsString(scope.row.createTime) && scope.row.createTime.includes(':')">scope.row.createTime</span>
                <span v-else v-text="formatMillisecond2Str(scope.row.createTime)"></span>
              </div>
              <div v-else>--</div>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="left" class-name="small-padding fixed-width" width="200">
            <template slot-scope="scope">
              <el-button size="small" v-if="!scope.row.consortium" type="text" @click="handleDelete(scope.row)">删除</el-button>
              <el-tooltip v-else class="popper-del-tip" popper-class="tip-msg" effect="light" content="该组织已加入联盟，请先退出联盟后再删除" placement="top">
                <span class="cmd-btn-disabled">删除</span>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination class="pagination" @current-change="handleCurrentChange" :current-page="page.currentPage" layout="prev, pager, next" :total="page.total" background />
      </div>
    </section>
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
        <el-button type="primary" size="small" @click="delCurrentOrgan">确定</el-button>
        <el-button size="small" @click="delOrganModal=false">取消</el-button>
      </template>
    </el-dialog>
    <!-- 删除组织的对话框 end -->

    <!-- start 创建组织的对话框 -->
    <el-dialog
      :visible.sync="createOrganModal"
      :close-on-click-modal="false"
      :destroy-on-close="true"
      :show-close="false"
      id="createOrganDialog"
      center
      width="650px"
      :top="addOrganModalTop"
    >
      <template slot="title">
        <h3 style="text-align:left;">创建组织</h3>
        <x-icon size="16" class="close-ico" @click="createOrganModal=false"></x-icon>
      </template>
      <el-alert class="alert-custom" title="温馨提示：CA部署方式默认有平台自动生成，组织信息创建成功后不可修改" type="warning" :closable="false" />
      <el-form :model="organForm" label-position="left" :rules="organFiledsrules" ref="organForm" label-width="100px" size="mini" class="add-organForm">
        <el-form-item label="组织名称" prop="name">
          <el-input placeholder="请输入组织名称" v-model="organForm.name" style="width:270px;" maxlength="20" />
        </el-form-item>
        <div class="explain">支持大小写字母、数字、中文以及-_/.特殊字符，不能以特殊字符开头，长度1-20</div>
        <el-form-item label="英文名" prop="enName">
          <el-input placeholder="请输入组织英文名" v-model="organForm.enName" style="width:270px;" maxlength="16" />
        </el-form-item>
        <div class="explain">支持小写字母、数字以及-，必须以字母开头，长度1-16</div>
        <el-form-item label="组织描述" prop="desc" style="margin-bottom:10px;">
          <el-input type="textarea" placeholder="请输入组织描述" :rows="5" minlength="1" maxlength="200" style="width:380px;" resize="none" v-model="organForm.desc" show-word-limit />
        </el-form-item>
      </el-form>
      <template slot="footer">
        <el-button type="primary" size="small" @click="addOnetOrgan">确定</el-button>
        <el-button size="small" @click="cancelCreateOrgan">取消</el-button>
      </template>
    </el-dialog>
    <!-- 创建组织的对话框 end -->
  </div>
</template>

<script>
import FabricOrganWorkflow from "@components/fabricOrganProcessSteps";
import { XIcon, AlertCircleIcon } from "vue-feather-icons";
import { isString, dateFormat } from "@utils";
import { getOrgansOnePage, delOneOrgan } from "@api/fabric/organ";

export default {
  name: "OrganizationList",
  components: {
    FabricOrganWorkflow,
    XIcon,
    AlertCircleIcon
  },
  data() {
    const validateName = (rule, value, callback) => {
      let reg =
        value.length == 1
          ? /[\u4E00-\u9FA5A-Za-z0-9]/
          : /^[\u4E00-\u9FA5A-Za-z0-9][\u4E00-\u9FA5A-Za-z0-9-_/.]+$/;
      if (reg.test(value) && value.length >= 1 && value.length <= 20) {
        callback();
      } else {
        callback(new Error("组织名称名不符合规则"));
      }
    };
    const validateEnName = (rule, value, callback) => {
      let reg = value.length == 1 ? /[a-z]/ : /^[a-z][a-z0-9-]+$/;
      if (reg.test(value) && value.length >= 1 && value.length <= 16) {
        callback();
      } else {
        callback(new Error("组织英文名不符合规则"));
      }
    };
    const validateDesc = (rule, value, callback) => {
      if (value.length >= 1 && value.length <= 200) {
        callback();
      } else {
        callback(new Error("请填写"));
      }
    };
    return {
      page: {
        total: 0,
        currentPage: 1,
        pageSize: 10,
      },
      loadingOrganData: false,
      tableData: [
        {
          id: '123',
          name: '太平运动组织',
          enName: 'tp-org',
          consortium: '天平军',
          permission: 'admin',
          createTime: 1641373955000 
        },
        {
          id: '124',
          name: '太平运动组织',
          enName: 'tp-org',
          consortium: '',
          permission: 'admin',
          createTime: 1641375663602
        },
        {
          id: '125',
          name: '太平运动组织',
          enName: 'tp-org',
          consortium: '',
          permission: 'admin',
          createTime: 1641375796601
        }
      ],
      delOrganModal: false,
      createOrganModal: false,
      organForm: {
        name: '',
        enName: '',
        desc: ''
      },
      organFiledsrules: {
        name: [
          { required: true, message: '请填写', trigger: 'blur' },
          { min: 1, max: 20, message: '组织名称不符合规则', trigger: 'blur' },
          { validator: validateName, trigger: "blur" }
        ],
        enName: [
          { required: true, message: '请填写', trigger: 'blur' },
          { min: 1, max: 16, message: '组织英文名不符合规则', trigger: 'blur' },
          { validator: validateEnName, trigger: "blur" },
        ],
        desc: [
          { required: true, message: '请填写', trigger: 'blur' },
          { validator: validateDesc, trigger: "blur" }
        ]
      }
    };
  },
  created() {
    // this.getOrganList(); // TODO
  },
  computed: {
    delOrganModalTop: function() {
      return "calc(50vh - 108px)";
    },
    addOrganModalTop: function() {
      return "calc(50vh - 225px)";
    },
  },
  methods: {
    createOrganShowModal() {
      this.createOrganModal = true;
    },
    msIsString(str) {
      return isString(str);
    },
    formatMillisecond2Str(ms) {
      return dateFormat('yyyy-MM-dd hh:mm:ss', new Date(ms));
    },
    // 获取后台组织列表数据 TODO
    async getOrganList(params) {
      this.loadingOrganData = true;
      let { items, page_num, page_size, total } = await getOrgansOnePage({ ...params })
      /* if (items) {
        this.orderBillLists = items
        this.page.page_num = page_num
        this.page.page_size = page_size
        this.page.page_total = total
        this.loadingOrganData = false;
      } */
    },
    // 重新加载当前组织列表
    reloadOrganTable() {
      alert("刷新当前页组织列表！");
      // this.getOrganList(); TODO
    },
    // 切换第几页
    handleCurrentChange(page) {
      this.page.currentPage = page;
      // this.getOrganList();  TODO
    },
    handleDelete(row) {
      this.delOrganModal = true;
    },
    async delCurrentOrgan() {
      this.delOrganModal = false;
      this.$message({
        type: 'success',
        message: '删除成功！',
        center: true,
        duration: 2600
      });
      // let { items, page_num, page_size, total } = await delOneOrgan({ ...params }) // TODO
      setTimeout(() => {
        // this.getOrganList(); TODO
      }, 800)
      
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
          // 获取组织列表第一页
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    addOnetOrgan() {
      this.submitForm('organForm');
    },
    cancelCreateOrgan() {
      this.resetForm('organForm');
      this.createOrganModal=false;
    }
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
      .pagination {
        text-align: right;
        margin-top: 10px;
      }
      ::v-deep .el-icon-loading {
        font-size: 20px;
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
  .alert-custom {
    width: 460px;
    padding: 10px 2px;
    margin-bottom: 20px;
    background-color: #FCF7F1;
    line-height: 20px;
    color: #F38900;
  }
  .explain {
    color: #999;
    padding-left: 100px;
    font-size: 12px;
    margin-top: -14px;
    margin-bottom: 14px;
  }
  .add-organForm {
    ::v-deep .el-input__inner {
      padding: 0 6px;
    }
    ::v-deep .el-form-item__error {
      position: absolute;
      top: 8px;
      left: 280px;
    }
    ::v-deep .el-textarea__inner {
      padding: 4px 6px;
      width: 380px;
    }
    ::v-deep .el-textarea+.el-form-item__error {
      position: absolute;
      top: 40px;
      left: 390px;
    }
  }
  
</style>
