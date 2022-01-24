<template>
  <div class="content-container">
    <FabricLeagueWorkflow></FabricLeagueWorkflow>
    <section class="operational-data">
      <div class="list-page-toolbar">
        <div class="list-page-tb-left">
          <div class="create-organ">
            <el-button type="primary" icon="el-icon-plus" @click="createLeagueShowModal">创建联盟</el-button>
          </div>
        </div>
        <div class="list-page-tb-right">
          <div class="filter-organs">
            组织：
            <el-select v-model="selectedOrgan" placeholder="请选择" size="medium" @change="filterLeaguesByOrgan">
              <el-option v-for="(item,index) in organList" :key="index + '-' + item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </div>
          <div class="btn-wrapper">
            <el-button type="primary" icon="el-icon-refresh-right" plain @click="reloadLeagueTable" />
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
          <el-table-column prop="name" align="left" label="联盟名称" min-width="20%">
            <template slot-scope="scope">
              <div v-if="scope.row.name">
                <router-link :to="{  name: 'fabricConsortiumMg', params: { leagueId: scope.row.id } }"><span v-text="scope.row.name"></span></router-link>
              </div>
              <div v-else>--</div>
            </template>
          </el-table-column>
          <el-table-column prop="enName" align="left" label="英文名" min-width="20%" />
          <el-table-column prop="member" align="left" label="联盟成员" min-width="20%" />
          <el-table-column prop="state" align="left" label="联盟状态" width="130">
            <template slot-scope="scope">
              <div v-if="scope.row.state === '失败'"><font-awesome-icon class="red-round" :icon="['fas', 'circle']" />{{ scope.row.state }}</div>
              <div v-else-if="scope.row.state === '部署中'"><font-awesome-icon class="in-progess-round" :icon="['fas', 'circle']" />{{ scope.row.state }}</div>
              <div v-else><font-awesome-icon class="green-round" :icon="['fas', 'circle']" />{{ scope.row.state }}</div>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" align="left" label="创建时间" width="180">
            <template slot-scope="scope">
              <div v-if="scope.row.createTime">
                <span v-if="msIsString(scope.row.createTime) && scope.row.createTime.includes(':')">scope.row.createTime</span>
                <span v-else v-text="formatMillisecond2Str(scope.row.createTime)"></span>
              </div>
              <div v-else>--</div>
            </template>
          </el-table-column>
          <el-table-column prop="allianceLeader" align="left" label="盟主" width="130" />
          <el-table-column label="操作" align="left" class-name="small-padding fixed-width" width="200">
            <template slot-scope="scope">
              <div v-if="scope.row.state === '失败'" class="show-vertical">
                <span class="cmd-btn-disabled" v-for="(menuItem, seq) in actionList.slice(0,-1)" :key="seq">{{ menuItem }}</span>
                <el-button size="small" type="text" @click="handleDelete(scope.row)">删除联盟</el-button>
              </div>
              <div v-if="scope.row.state === '部署中'" class="show-vertical">
                <span class="cmd-btn-disabled" v-for="(menuItem, seq) in actionList" :key="seq">{{ menuItem }}</span>                
              </div>
              <div v-if="scope.row.state === '运行中'" class="show-vertical">
                <router-link :to="{ name: 'fabricConsortiumMg', params: { leagueId: scope.row.id } }">
                  <span>联盟管理</span>
                </router-link>
                <router-link :to="{ name: 'fabricConsortiumMemberMg', params: { leagueId: scope.row.id } }">
                  <span>成员管理</span>
                </router-link>
                <router-link :to="{ name: 'fabricNodeMg', params: { leagueId: scope.row.id } }">
                  <span>节点管理</span>
                </router-link>
                <router-link :to="{ name: 'fabricChannelMg', params: { leagueId: scope.row.id } }">
                  <span>通道管理</span>
                </router-link>
                <el-button size="small" type="text" @click="handleDelete(scope.row)">删除联盟</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination class="pagination" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page.currentPage" :page-sizes="[10, 20, 30, 40]" layout="sizes, prev, pager, next" :total="page.total" background />
      </div>
    </section>
    <!-- start 删除联盟的对话框 -->
    <el-dialog
      :visible.sync="delLeagueModal"
      :close-on-click-modal="false"
      :destroy-on-close="true"
      :show-close="false"
      id="delOrganDialog"
      center
      width="400px"
      :top="delLeagueModalTop"
    >
      <template slot="title">
        <h3 style="text-align:left;">删除联盟</h3>
        <x-icon size="16" class="close-ico" @click="delLeagueModal=false"></x-icon>
      </template>
      <div class="tip-del-league">
        <alert-circle-icon size="24" class="warning-ico"></alert-circle-icon>
        <p>
          是否确认删除该联盟?
        </p>
      </div>
      <template slot="footer">
        <el-button type="primary" size="small" @click="delCurrentLeague">确定</el-button>
        <el-button size="small" @click="delLeagueModal=false">取消</el-button>
      </template>
    </el-dialog>
    <!-- 删除组织的对话框 end -->
  </div>
</template>

<script>
import FabricLeagueWorkflow from "@components/fabricLeagueProcessSteps";
import { XIcon, AlertCircleIcon } from "vue-feather-icons";
import { isString, dateFormat } from "@utils";
import { getLeaguesOnePage, getLeaguesOnePageByOrgan } from '@api/fabric/league';

export default {
  name: "OrganizationList",
  components: {
    FabricLeagueWorkflow,
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
      selectedOrgan: '',
      actionList: ['联盟管理', '成员管理', '节点管理', '通道管理', '删除联盟'],
      organList: [
        { name: 'ALL', id: '' },
        { name: '天平运动组织', id: 'msp01' },
        { name: '武当派', id: 'msp02' },
        { name: '恒大', id: 'msp03' },
      ],
      tableData: [
        {
          id: '123',
          name: '太平军',
          enName: 'tpj',
          member: '天平运动组织',
          state: '失败',
          createTime: 1641373955000,
          allianceLeader: '太平运动组织'
        },
        {
          id: '124',
          name: '武林盟主',
          enName: 'wuLinBoss',
          member: '武当派',
          state: '部署中',
          createTime: 1641373955000,
          allianceLeader: '武当派'
        },
        {
          id: '125',
          name: '商业联盟',
          enName: 'syBoss',
          member: '恒大',
          state: '运行中',
          createTime: 1641373955000,
          allianceLeader: '恒大'
        }
      ],
      delLeagueModal: false,
      organForm: {
        name: '',
        enName: '',
        desc: ''
      },
      organFiledsrules: {
        name: [
          { required: true, message: '请填写', trigger: 'blur' },
          { min: 1, max: 20, message: '组织名称名不符合规则', trigger: 'blur' },
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
    // this.getLeagueList(); // TODO
  },
  computed: {
    delLeagueModalTop: function() {
      return "calc(50vh - 93px)";
    },
  },
  methods: {
    // TODO 过滤联盟通过组织id
    filterLeaguesByOrgan(organId) {
      alert(organId);
    },
    createLeagueShowModal() {
      this.$router.push({ name: 'fabricAddConsortium' });
    },
    msIsString(str) {
      return isString(str);
    },
    formatMillisecond2Str(ms) {
      return dateFormat('yyyy-MM-dd hh:mm:ss', new Date(ms));
    },
    // 获取后台组织列表数据 TODO
    async getLeagueList(params) {
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
    reloadLeagueTable() {
      alert("刷新当前页联盟列表！");
      // this.getLeagueList(); TODO
    },
    // 切换第几页
    handleCurrentChange(page) {
      this.page.currentPage = page;
      // this.getLeagueList();  TODO
    },
    handleSizeChange: function (sizeNum) {
      this.page.pageSize = sizeNum;
      // this.getLeagueList();  TODO
    },
    handleDelete(row) {
      this.delLeagueModal = true;
    },
    async delCurrentLeague() {
      this.delLeagueModal = false;
      this.$message({
        type: 'success',
        message: '删除成功！',
        center: true,
        duration: 2600
      });
      // let { items, page_num, page_size, total } = await delOneOrgan({ ...params }) // TODO
      setTimeout(() => {
        // this.getLeagueList(); TODO
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
        display: inline-flex;
        flex: 1;
        flex-flow: row nowrap;
        justify-content: flex-end;
        align-items: center;
        .filter-organs {
          margin-right: 15px;
        }
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
    .tip-del-league {
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
        height: 30px;
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
