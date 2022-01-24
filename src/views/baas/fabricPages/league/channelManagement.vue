<template>
  <div class="container-wrapper" v-loading="loadingChannelInfo">
    <el-row type="flex" class="row-base">
      <el-col :span="16">
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
      <el-col :span="8" class="channel-top-tool">
        <div class="btn-wrapper">
          <el-button type="primary" icon="el-icon-refresh-right" plain @click="reloadPage" />
        </div>
      </el-col>
    </el-row>
    <div class="page-item">      
      <el-row type="flex" class="item-row-base">
        <el-col :span="16">
          <div class="moudelTlt">通道管理</div>
        </el-col>
        <el-col :span="8" class="invite-btn-wrapper">
          <el-button type="primary" size="small" icon="el-icon-plus" @click="createChannel">创建通道</el-button>
        </el-col>
      </el-row>
      <el-tabs v-model="activeName" class="channel-tabs" type="card" @tab-click="handleClick">
        <el-tab-pane label="已加入" name="first">
          <div class="show-datalist" v-loading="loadingAddChannel" element-loading-text="加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
            <el-table
              :data="addChannelTable"
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
              <el-table-column prop="channelName" align="left" label="通道名称" min-width="220">
                <template slot-scope="scope">
                  <router-link v-if="scope.row.channelState === '运行中'" :to="{ path: `/fabric/channelInfo/${scope.row.id}` }">
                    <span>{{ scope.row.channelName }}</span>
                  </router-link>
                  <div v-else>
                    <span>{{ scope.row.channelName }}</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="enName" align="left" label="英文名" min-width="180" />
              <el-table-column prop="channelDesc" align="left" label="通道描述" min-width="240" />
              <el-table-column prop="organized" align="left" label="发起组织" min-width="150" />
              <el-table-column prop="channelMembers" align="left" label="通道成员" min-width="150" />
              <el-table-column prop="channelState" align="left" label="通道状态" min-width="130">
                <template slot-scope="scope">
                  <span v-if="scope.row.channelState === '待启动'">
                    <font-awesome-icon class="in-progess-start" :icon="['fas', 'circle']" />{{ scope.row.channelState }}
                  </span>
                  <span v-else>
                    <font-awesome-icon class="green-round" :icon="['fas', 'circle']" />{{ scope.row.channelState }}
                  </span>
                </template>
              </el-table-column>
              <el-table-column prop="addTime" align="left" label="加入时间" min-width="180">
                <template slot-scope="scope">
                  <div v-if="scope.row.addTime">
                    <span v-if="msIsString(scope.row.addTime) && scope.row.addTime.includes(':')">scope.row.addTime</span>
                    <span v-else v-text="formatMillisecond2Str(scope.row.addTime)"></span>
                  </div>
                  <div v-else>--</div>
                </template>
              </el-table-column>
              <el-table-column label="操作" align="left" class-name="small-padding fixed-width" width="180">
                <template slot-scope="scope">
                  <div v-if="scope.row.channelState === '运行中'" class="show-vertical">
                    <router-link :to="{ name: 'fabricChainCode', params: { channelId: scope.row.id } }">
                      <span>链码管理</span>
                    </router-link>
                  </div>
                  <div v-else-if="scope.row.channelState === '待启动'" class="show-vertical">
                    <el-button size="small" type="text" v-on:click="createChannel">创建通道</el-button>
                  </div>
                </template>
              </el-table-column>          
            </el-table>
            <el-pagination class="pagination" v-if="addChannelpage.total" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="addChannelpage.currentPage" :page-sizes="[10, 20, 30, 40]" layout="sizes, prev, pager, next" :total="addChannelpage.total" background />
          </div>
        </el-tab-pane>
        <el-tab-pane label="未加入" name="second">
          <div class="show-datalist" v-loading="loadingNoChannel" element-loading-text="加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
            <el-table
              :data="noChannelTable"
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
              <el-table-column prop="channelName" align="left" label="通道名称" min-width="220">
                <template slot-scope="scope">
                  <router-link :to="{ path: `/fabric/channelInfo/${scope.row.id}` }">
                    <span>{{ scope.row.channelName }}</span>
                  </router-link>
                </template>
              </el-table-column>
              <el-table-column prop="enName" align="left" label="英文名" min-width="180" />
              <el-table-column prop="channelDesc" align="left" label="通道描述" min-width="240" />
              <el-table-column prop="organized" align="left" label="发起组织" min-width="150" />
              <el-table-column prop="channelMembers" align="left" label="通道成员" min-width="150" />
              <el-table-column prop="channelState" align="left" label="通道状态" min-width="130">
                <template slot-scope="scope">
                  <span v-if="scope.row.channelState === '运行中'">
                    <font-awesome-icon class="green-round" :icon="['fas', 'circle']" />{{ scope.row.channelState }}
                  </span>
                </template>
              </el-table-column>              
              <el-table-column label="操作" align="left" class-name="small-padding fixed-width" width="180">
                <template slot-scope="scope">
                  <div v-if="scope.row.channelState === '运行中'" class="show-vertical">
                    <el-button size="small" type="text" v-on:click="applyToJoin">申请加入</el-button>
                  </div>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination class="pagination" v-if="noChannelpage.total" @size-change="handleSizeChangeTab2" @current-change="handleCurrentChangeTab" :current-page="noChannelpage.currentPage" :page-sizes="[10, 20, 30, 40]" layout="sizes, prev, pager, next" :total="noChannelpage.total" background />
          </div>
        </el-tab-pane>
      </el-tabs>      
    </div>
    <!-- start 创建通道的对话框 -->
    <el-dialog
      :visible.sync="createChannelModal"
      :close-on-click-modal="false"
      :destroy-on-close="true"
      :show-close="false"
      center
      width="750px"
      :top="modalTop"
      class="invite-modal"
    >
      <template slot="title">
        <h3 style="text-align:left;">创建通道</h3>
        <x-icon size="16" class="close-ico" @click="createChannelModal=false"></x-icon>
      </template>
      <el-alert class="alert-custom" title="温馨提示：邀请的组织将收到站内信通知，您可在事件中心查看进度" type="warning" :closable="false" />
      <el-form :model="createChannelForm" label-position="left" :rules="addChannelFiledsRules" ref="createChannelForm" label-width="120px" size="mini" class="add-channel-form">
        <el-form-item label="通道名称：" prop="channelName">
          <el-input placeholder="请输入通道名称" v-model="createChannelForm.channelName" style="width:270px;" maxlength="20" />
        </el-form-item>
        <div class="explain">{{ createChannelForm.channelNameDesc }}</div>        
        <el-form-item label="通道英文名称：" prop="enName">
          <el-input placeholder="请输入通道英文名称" v-model="createChannelForm.enName" style="width:270px;" maxlength="16" />
        </el-form-item>
        <div class="explain">{{ createChannelForm.channeEnNameDesc }}</div>
        <el-form-item label="加入组织" prop="addOrgans">
          <el-select v-model="createChannelForm.addOrgans" multiple collapse-tags clearable style="width:270px;" placeholder="请选择">
            <el-option v-for="item in organOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="通道描述" prop="channelDesc" style="margin-bottom:10px;">
          <el-input type="textarea" placeholder="请输入通道描述" :rows="5" minlength="1" maxlength="200" style="width:380px;" resize="none" v-model="createChannelForm.channelDesc" show-word-limit />
        </el-form-item>
      </el-form>
      <template slot="footer">
        <el-button type="primary" size="small" @click="createChannelByApi">确定</el-button>
        <el-button size="small" @click="createChannelModal=false">取消</el-button>
      </template>
    </el-dialog>
    <!-- 创建通道的对话框 end -->
  </div>
</template>

<script>
import { XIcon } from "vue-feather-icons";
import { isString, dateFormat } from "@utils";

export default {
  name: "channelInfo",
  components: {
    XIcon,
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
        callback(new Error("按规则填写"));
      }
    };
    const validateEnName = (rule, value, callback) => {
      let reg = value.length == 1 ? /[a-z]/ : /^[a-z][a-z0-9-]+$/;
      if (reg.test(value) && value.length >= 1 && value.length <= 16) {
        callback();
      } else {
        callback(new Error("按规则填写"));
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
      alianceDetails: {
        name: "联盟1",
        state: "运行中",
        enName: "union01",
      },
      createChannelForm: {
        channelName: '',
        channelNameDesc: "支持大小写字母、数字、中文以及-_/.特殊字符，不能以特殊字符开头，长度1-20",
        enName: '',
        channeEnNameDesc: "支持小写字母、数字以及-.特殊字符，必须以字母开头，长度1-16",
        addOrgans: [],
        channelDesc: ''
      },
      organOptions: [
        {
          label: '组织1',
          value: 'org1',
        },
        {
          label: '组织2',
          value: 'org2',
        },
        {
          label: '组织3',
          value: 'org3',
        },
        {
          label: '组织4',
          value: 'org4',
        },
        {
          label: '组织5',
          value: 'org5',
        },
      ],
      addChannelFiledsRules: {
        channelName: [
          { required: true, message: '请输入通道名称', trigger: 'blur' },
          { min: 1, max: 20, message: '按规则填写', trigger: 'blur' },
          { validator: validateName, trigger: "blur" }
        ],
        enName: [
          { required: true, message: '请输入通道英文名称', trigger: 'blur' },
          { min: 1, max: 20, message: '按规则填写', trigger: 'blur' },
          { validator: validateEnName, trigger: "blur" }
        ],
        addOrgans: [
          { required: true, message: '请选择初始组织', trigger: 'change' }
        ],        
        channelDesc: [
          { required: true, message: '请填写', trigger: 'blur' },
          { validator: validateDesc, trigger: "blur" }
        ]
      },
      loadingChannelInfo: false,
      createChannelModal: false,
      loadingAddChannel: false,
      loadingNoChannel: false,
      addChannelTable: [
        {
          id: 986,
          channelName: 'org通道2',
          enName: 'org-channel2',
          channelDesc: '第一个新建的通道',
          organized: '测试Fabric-ORG2',
          channelMembers: '测试Fabric-ORG2',
          channelState: '待启动',
          addTime: 1642058177617,
        },
        {
          id: 986,
          channelName: 'org通道3',
          enName: 'org-channel3',
          channelDesc: '第一个新建的通道',
          organized: '测试Fabric-ORG3',
          channelMembers: '测试Fabric-ORG3',
          channelState: '创建中',
          addTime: 1642058177617,
        },
        {
          id: 987,
          channelName: 'org通道1',
          enName: 'org-channel1',
          channelDesc: '第一个新建的通道',
          organized: '测试Fabric-ORG1',
          channelMembers: '测试Fabric-ORG1',
          channelState: '运行中',
          addTime: 1642058177617,
        },
      ],
      noChannelTable: [
        {
          channelName: 'channel1',
          enName: 'channel01',
          channelDesc: 'channel1',
          organized: 'zh-test',
          channelMembers: 'zh-test',
          channelState: '运行中',
        },
      ],
      addChannelpage: {
        total: 0,
        currentPage: 1,
        pageSize: 10,
      },
      noChannelpage: {
        total: 0,
        currentPage: 1,
        pageSize: 10,
      },
      activeName: 'first'
    };
  },
  created() {
    this.$root.$emit('changeLeftMenu', 'fabricLeagueMenus')
  },
  computed: {
    modalTop: function() {
      return "calc(50vh - 245px)";
    },
  },
  methods: {
    handleClick(tab, event) {
      // 切换tab 标签页
      console.log(tab, event);
    },
    createChannel() {
      this.createChannelModal = true;
    },
    applyToJoin() {
      alert("向后台触发申请加入的事件！");
    },
    createChannelByApi() {
      this.$refs["createChannelForm"].validate((valid) => {
        if (valid) {
          this.createChannelModal = false;
          alert("创建通道中！");
        } else {
          return false;
        }
      });
    },
    msIsString(str) {
      return isString(str);
    },
    formatMillisecond2Str(ms) {
      return dateFormat('yyyy-MM-dd hh:mm:ss', new Date(ms));
    },
    handleSizeChange: function (sizeNum) {
      this.addChannelpage.pageSize = sizeNum;
    },
    handleSizeChangeTab2: function (sizeNum) {
      this.noChannelpage.pageSize = sizeNum;
    },
    // 切换第几页
    handleCurrentChange(pageNo) {
      this.addChannelpage.currentPage = pageNo;
    },
    // 切换第几页
    handleCurrentChangeTab(pageNo) {
      this.noChannelpage.currentPage = pageNo;
    },
    reloadPage() {
      alert("刷新当前页的通道表格！");
    },
  },
}
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
    .channel-top-tool {
      display: flex;
      flex-flow: row nowrap;
      justify-content: flex-end;
      align-items: center;
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
  }
  .page-item {
    padding-bottom: 15px;
    min-height: 400px;
    .channel-tabs {
      padding: 0 15px;
      ::v-deep .el-tabs__item {
        padding: 0 15px;
        height: 32px;
        line-height: 32px;
      }
    }
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
      .show-vertical {
        ::v-deep .el-button--text {
          color: #108cee;
        }
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

.invite-modal {
  ::v-deep .el-dialog--center {
    .el-dialog__header {
      padding: 10px 15px;
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      align-items: center;
      background-color: #f6f7fb;
      h3 {
        font-size: 14px;
        color: #333;
        font-weight: normal;
      }
      .close-ico {
        cursor: pointer;
        color: #333;
      }
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
    width: 455px;
    padding: 5px 2px;
    margin-bottom: 20px;
    background-color: #F5F5F5;
    line-height: 20px;
    color: #999;
  }
  .add-channel-form {
    ::v-deep .el-form-item__error {
      position: absolute;
      top: 8px;
      left: 280px;
    }
    ::v-deep .el-textarea+.el-form-item__error {
      position: absolute;
      top: 40px;
      left: 390px;
    }
    .explain {
      color: #999;
      padding-left: 120px;
      font-size: 14px;
      margin-top: -14px;
      margin-bottom: 15px;
    }

  }
}

</style>