<template>
  <div id="main">
    <div class="page">
      <div class="page-main">
        <div class="instance-info">
          <h2 class="headline">{{ channelDetals.channelName }}-链码管理</h2>
          <div class="back" @click="back">
            <el-link icon="el-icon-arrow-left" type="primary" :underline="false">返回通道管理</el-link>
          </div>         
        </div>        
        <div class="detail-content">
          <div class="detail-parts-table">
            <div class="top-tools">
              <el-button type="primary" size="small" icon="el-icon-plus" @click="showModalTocreateChain">新增链码</el-button>
              <el-button type="primary" size="small" @click="editChainByLink" plain>链码在线编辑器</el-button>
              <div class="btn-wrapper">
                <el-button type="primary" icon="el-icon-refresh-right" plain @click="reloadPage" />
              </div>          
            </div>
            <div class="help-add-chain">
              <div class="link">
                <i class="el-icon-warning-outline"></i>
                <a target="_blank" href="https://cloud.baidu.com/doc/BBE/s/Yk35z579x">新增链码指南</a>
              </div>
            </div>
            <div class="show-datalist" v-loading="loadingTable" element-loading-text="加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
              <el-table
                :data="chainsTable"
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
                <el-table-column prop="chainName" align="left" label="链码名称" min-width="220" />
                <el-table-column prop="version" align="left" label="版本" min-width="100" />
                <el-table-column prop="path" align="left" label="路径" min-width="240" />
                <el-table-column prop="instantiationParams" align="left" label="实例化参数" min-width="240" />
                <el-table-column prop="endorseStrategy" align="left" label="背书策略" min-width="350" />
                <el-table-column prop="submitTime" align="left" label="提交时间" min-width="180">
                  <template slot-scope="scope">
                    <div v-if="scope.row.submitTime">
                      <span v-if="msIsString(scope.row.submitTime) && scope.row.submitTime.includes(':')">scope.row.submitTime</span>
                      <span v-else v-text="formatMillisecond2Str(scope.row.submitTime)"></span>
                    </div>
                    <div v-else>--</div>
                  </template>
                </el-table-column>
                <el-table-column prop="deployTime" align="left" label="部署时间" min-width="180">
                  <template slot-scope="scope">
                    <div v-if="scope.row.deployTime">
                      <span v-if="msIsString(scope.row.deployTime) && scope.row.deployTime.includes(':')">scope.row.deployTime</span>
                      <span v-else v-text="formatMillisecond2Str(scope.row.deployTime)"></span>
                    </div>
                    <div v-else>--</div>
                  </template>
                </el-table-column>
                <el-table-column prop="chainState" align="left" label="链码状态" min-width="130">
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
                    <span v-else-if="scope.row.chainState === '初始状态'">
                      <font-awesome-icon class="green-round" :icon="['fas', 'circle']" />{{ scope.row.chainState }}
                    </span>
                    <span v-else-if="scope.row.chainState === '正在安装'" style="color:#F4B32F;">
                      <font-awesome-icon class="in-progess-start" :icon="['fas', 'circle']" />{{ scope.row.chainState }}
                    </span>
                    <span v-else-if="scope.row.chainState === '正在更新'" style="color:#F4B32F;">
                      <font-awesome-icon class="in-progess-start" :icon="['fas', 'circle']" />{{ scope.row.chainState }}
                    </span>
                    <span v-else-if="scope.row.chainState === '未发布'">
                      <font-awesome-icon class="green-round" :icon="['fas', 'circle']" />{{ scope.row.chainState }}
                    </span>
                    <span v-else-if="scope.row.chainState === '停止运行'">
                      <font-awesome-icon class="red-round" :icon="['fas', 'circle']" />{{ scope.row.chainState }}
                    </span>
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
                    <div v-else-if="scope.row.chainState === '正在实例化'" class="show-horizontal">
                      <el-button size="small" type="text" v-on:click="editChain">编辑链码</el-button>
                    </div>
                    <div v-else-if="scope.row.chainState === '实例化失败'" class="show-horizontal">
                      <el-button size="small" type="text" v-on:click="viewingErrorCauses" style="color:#E02929">错误原因</el-button>
                      <el-button size="small" type="text" v-on:click="editChain">编辑链码</el-button>
                    </div>
                    <div v-else-if="scope.row.chainState === '已经安装'" class="show-horizontal">
                      <el-button size="small" type="text" v-on:click="instantiationChain">实例化</el-button>
                      <el-button size="small" type="text" v-on:click="editChain">编辑链码</el-button>
                      <!-- 如果版本有高的 -->
                      <br />
                      <el-button size="small" type="text" v-on:click="updateChain">升级</el-button>
                      <el-button size="small" type="text" v-on:click="editChain">编辑链码</el-button>
                    </div>
                    <div v-else-if="scope.row.chainState === '正在更新'" class="show-horizontal">
                      <el-button size="small" type="text" v-on:click="editChain">编辑链码</el-button>
                    </div>
                    <div v-else-if="scope.row.chainState === '运行中'" class="show-horizontal">
                      <el-button size="small" type="text" v-on:click="editChain">编辑链码</el-button>
                    </div>
                    <div v-else-if="scope.row.chainState === '停止运行'" class="show-horizontal">
                      <!-- 什么操作也没有 -->
                    </div>
                  </template>
                </el-table-column>
              </el-table>
              <el-pagination class="pagination" v-if="page.total" @current-change="handleCurrentChange" :current-page="page.currentPage" layout="prev, pager, next" :total="page.total" background />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- start 创建链码的对话框 -->
    <el-dialog
      :visible.sync="createChainModal"
      :close-on-click-modal="false"
      :destroy-on-close="true"
      :show-close="false"
      center
      width="750px"
      :top="modalTop"
      class="add-chain-modal"
    >
      <template slot="title">
        <h3 style="text-align:left;">新增链码</h3>
        <x-icon size="16" class="close-ico" @click="createChainModal=false"></x-icon>
      </template>
      <el-form :model="createChainForm" label-position="left" :rules="addChainFiledsRules" ref="createChainForm" label-width="120px" size="mini" class="add-channel-form">
        <el-form-item label="通道名称：" prop="channelName">
          <el-input placeholder="请输入通道名称" v-model="createChainForm.channelName" :disabled="true" style="width:270px;" maxlength="20" />
        </el-form-item>     
        <el-form-item label="链码名称：" prop="chainName">
          <el-input placeholder="请输入链码名称" v-model="createChainForm.chainName" style="width:270px;" maxlength="20" />
        </el-form-item>
        <div class="explain">支持小写字母、数字以及-_，不能以-_开头和结尾，长度1-20</div>
        <el-form-item label="版本" prop="version">
          <el-input v-model="createChainForm.version" minlength="3" maxlength="3" style="width:270px;" placeholder="请输入版本"></el-input>
        </el-form-item>
        <el-form-item label="实例化参数" prop="instantiationParams" class="long-form-item">
          <el-input v-model="createChainForm.instantiationParams" minlength="8" style="width:320px;" placeholder="请输入实例化参数"></el-input>
        </el-form-item>
        <div class="explain">init + 参数，如：init,a,100,b,200</div>
        <el-form-item label="背书策略" prop="endorseStrategy" style="margin-bottom:10px;">
          <el-input v-model="createChainForm.endorseStrategy" style="width:450px;" />
        </el-form-item>
        <div class="explain" style="margin-top:-5px;">链码所关联的背书策略，支持 and or outof 三种表达式（大小写敏感）</div>
        <div class="explain-warning">如果为空则采用默认背书策略，即通道内任一成员背书</div>

        <el-form-item prop="codeFile" label="上传链码" class="upload-span">                    
          <el-upload
            ref="upload"
            :action="uploadActionUrl"
            :on-error="uploadFalse"
            :on-success="uploadSuccess"
            :on-remove="handleRemove"
            :show-file-list="false"
            :on-change="handleZipUpload"
            :headers="headers"            
            :auto-upload="true">            
            <el-button size="small" slot="trigger" type="primary" plain>请选择文件</el-button>
          </el-upload>
          <el-input v-if="createChainForm.codeFile" v-model="createChainForm.codeFile" :readonly="true" style="width:270px;" />
        </el-form-item>
        <div class="explain">只支持go语言链码，链码引用的第三方库放入vendor中。将链码外层文件夹打包成tar.gz或zip操作命令如（cd/src && tar czf chaincode.tar.gz *）</div>
      </el-form>
      <template slot="footer">
        <el-button type="primary" size="small" @click="addChainByApi">确定</el-button>
      </template>
    </el-dialog>
    <!-- 创建链码的对话框 end -->
    <!-- start 发布链码到通道的对话框 -->
    <el-dialog
      :visible.sync="deployChannelModal"
      :close-on-click-modal="false"
      :destroy-on-close="true"
      :show-close="false"
      id="deployChainToChannel"
      center
      width="400px"
      :top="deployModalTop"
      class="deploy-chain-to-channel"
    >
      <template slot="title">
        <h3 style="text-align:left;">请确认</h3>
        <x-icon size="16" class="close-ico" @click="deployChannelModal=false"></x-icon>
      </template>
      <div class="tip-deploy-chain">
        <alert-circle-icon size="24" class="warning-ico"></alert-circle-icon>
        <p>
          确认发布到通道吗?
        </p>
      </div>
      <template slot="footer">
        <el-button type="primary" size="small" @click="deployChain">确定</el-button>
        <el-button size="small" @click="deployChannelModal=false">取消</el-button>
      </template>
    </el-dialog>
    <!-- 发布链码到通道的对话框 end -->
    <!-- start 安装链码的对话框 -->
    <el-dialog
      :visible.sync="installChainModal"
      :close-on-click-modal="false"
      :destroy-on-close="true"
      :show-close="false"
      id="deployChainToChannel"
      center
      width="400px"
      :top="deployModalTop"
      class="deploy-chain-to-channel"
    >
      <template slot="title">
        <h3 style="text-align:left;">请确认</h3>
        <x-icon size="16" class="close-ico" @click="installChainModal=false"></x-icon>
      </template>
      <div class="tip-deploy-chain">
        <alert-circle-icon size="24" class="warning-ico"></alert-circle-icon>
        <p>
          确认安装吗?
        </p>
      </div>
      <template slot="footer">
        <el-button type="primary" size="small" @click="installChainByApi">确定</el-button>
        <el-button size="small" @click="installChainModal=false">取消</el-button>
      </template>
    </el-dialog>
    <!-- 安装链码对话框 end -->
    <!-- start 实例化链码的对话框 -->
    <el-dialog
      :visible.sync="instantiationChainModal"
      :close-on-click-modal="false"
      :destroy-on-close="true"
      :show-close="false"
      id="deployChainToChannel"
      center
      width="400px"
      :top="deployModalTop"
      class="deploy-chain-to-channel"
    >
      <template slot="title">
        <h3 style="text-align:left;">请确认</h3>
        <x-icon size="16" class="close-ico" @click="instantiationChainModal=false"></x-icon>
      </template>
      <div class="tip-deploy-chain">
        <alert-circle-icon size="24" class="warning-ico"></alert-circle-icon>
        <p>
          确认实例化吗?
        </p>
      </div>
      <template slot="footer">
        <el-button type="primary" size="small" @click="instantiationChainByApi">确定</el-button>
        <el-button size="small" @click="instantiationChainModal=false">取消</el-button>
      </template>
    </el-dialog>
    <!-- 实例化链码对话框 end -->
    <!-- start 升级链码的对话框 -->
    <el-dialog
      :visible.sync="updateChainModal"
      :close-on-click-modal="false"
      :destroy-on-close="true"
      :show-close="false"
      id="deployChainToChannel"
      center
      width="400px"
      :top="deployModalTop"
      class="deploy-chain-to-channel"
    >
      <template slot="title">
        <h3 style="text-align:left;">请确认</h3>
        <x-icon size="16" class="close-ico" @click="updateChainModal=false"></x-icon>
      </template>
      <div class="tip-deploy-chain">
        <alert-circle-icon size="24" class="warning-ico"></alert-circle-icon>
        <p>
          确认升级吗?
        </p>
      </div>
      <template slot="footer">
        <el-button type="primary" size="small" @click="updateChainByApi">确定</el-button>
        <el-button size="small" @click="updateChainModal=false">取消</el-button>
      </template>
    </el-dialog>
    <!-- 升级链码对话框 end -->
  </div>
</template>

<script>
  import { isString, dateFormat, isNull } from "@utils";
  import { XIcon, AlertOctagonIcon, AlertCircleIcon } from "vue-feather-icons";

  export default {
    name: "chainMg",
    components: {
      XIcon,
      AlertOctagonIcon,
      AlertCircleIcon
    },
    data() {
      const validateName = (rule, value, callback) => {
        let reg = value.length == 1 ? /[\u4E00-\u9FA5A-Za-z0-9]/
          : /^[\u4E00-\u9FA5A-Za-z0-9][\u4E00-\u9FA5A-Za-z0-9-_/.]+$/;
        if (reg.test(value) && value.length >= 1 && value.length <= 20) {
          callback();
        } else {
          callback(new Error("按规则填写"));
        }
      };
      const validateFile = (rule, value, callback) => {
        if (!isNull(value)) {
          callback();
        } else {
          callback(new Error("请选择文件"));
        }
      };
      return {
        fromId: '',
        channelDetals: {
          channelName: 'channel1',
        },
        loadingTable: false,
        chainsTable: [
          {
            chainName: 'mycc1',
            version: '1.0',
            path: '',
            instantiationParams: 'init,a,100,b,200',
            endorseStrategy: 'OR{"Org1MSP.member"}',
            submitTime: 1642058177617,
            deployTime: 1642058177617,
            chainState: '未发布',
          },
          {
            chainName: 'mycc1',
            version: '1.0',
            path: '',
            instantiationParams: 'init,a,100,b,200',
            endorseStrategy: 'OR{"Org1MSP.member","Org2MSP.member"}',
            submitTime: 1642058177617,
            deployTime: 1642058177617,
            chainState: '初始状态',
          },
          {
            chainName: 'mycc1',
            version: '1.0',
            path: '',
            instantiationParams: 'init,a,100,b,200',
            endorseStrategy: 'OR{"Org1MSP.member","Org2MSP.member"}',
            submitTime: 1642058177617,
            deployTime: 1642058177617,
            chainState: '正在安装',
          },
          {
            chainName: 'mycc1',
            version: '1.0',
            path: '',
            instantiationParams: 'init,a,100,b,200',
            endorseStrategy: 'OR{"Org1MSP.member","Org2MSP.member"}',
            submitTime: 1642058177617,
            deployTime: 1642058177617,
            chainState: '已经安装',
          },
          {
            chainName: 'mycc1',
            version: '1.0',
            path: '',
            instantiationParams: 'init,a,100,b,200',
            endorseStrategy: 'OR{"Org1MSP.member","Org2MSP.member"}',
            submitTime: 1642058177617,
            deployTime: 1642058177617,
            chainState: '正在实例化',
          },
          {
            chainName: 'mycc1',
            version: '1.0',
            path: '',
            instantiationParams: 'init,a,100,b,200',
            endorseStrategy: 'OR{"Org1MSP.member","Org2MSP.member"}',
            submitTime: 1642058177617,
            deployTime: 1642058177617,
            chainState: '实例化失败',
          },
          {
            chainName: 'mycc1',
            version: '2.0',
            path: '',
            instantiationParams: 'init,a,100,b,200',
            endorseStrategy: 'OR{"Org1MSP.member","Org2MSP.member"}',
            submitTime: 1642058177617,
            deployTime: 1642058177617,
            chainState: '运行中',
          },
          {
            chainName: 'mycc1',
            version: '2.1',
            path: '',
            instantiationParams: 'init,a,100,b,200',
            endorseStrategy: 'OR{"Org1MSP.member","Org2MSP.member"}',
            submitTime: 1642058177617,
            deployTime: 1642058177617,
            chainState: '正在更新',
          },
          {
            chainName: 'mycc1',
            version: '3.0',
            path: '',
            instantiationParams: 'init,a,100,b,200',
            endorseStrategy: 'OR{"Org1MSP.member","Org2MSP.member"}',
            submitTime: 1642058177617,
            deployTime: 1642058177617,
            chainState: '已经安装',
          },
          {
            chainName: 'mycc1',
            version: '2.0',
            path: '',
            instantiationParams: 'init,a,100,b,200',
            endorseStrategy: 'OR{"Org1MSP.member","Org2MSP.member"}',
            submitTime: 1642058177617,
            deployTime: 1642058177617,
            chainState: '停止运行',
          },
          {
            chainName: 'mycc1',
            version: '3.0',
            path: '',
            instantiationParams: 'init,a,100,b,200',
            endorseStrategy: 'OR{"Org1MSP.member","Org2MSP.member"}',
            submitTime: 1642058177617,
            deployTime: 1642058177617,
            chainState: '运行中',
          },

        ],
        page: {
          total: 0,
          currentPage: 1,
          pageSize: 10,
        },
        createChainModal: false,
        uploadActionUrl: "", // 上传文件地址
        headers: {},
        createChainForm: {
          channelName: 'org通道1', // 默认可以获取到通道名称
          chainName: '',
          version: '',
          instantiationParams: '',
          endorseStrategy: '',
          codeFile: null
        },
        addChainFiledsRules: {
          chainName: [
            { required: true, message: '请输入链码名称', trigger: 'blur' },
            { min: 1, max: 20, message: '按规则填写', trigger: 'blur' },
            { validator: validateName, trigger: "blur" }
          ],
          version: [
            { required: true, message: "请输入版本号", trigger: "blur" },
            {
              required: true,
              pattern: /^[1-9]\.[0-9]$/,
              message: "按规则填写，要求版本号大于等于1.0",
              trigger: "blur",
            },
          ],
          instantiationParams: [
            { required: true, message: '请选择实例化参数', trigger: 'blur' },
            {
              required: true,
              pattern: /^init\,[A-z\,0-9]*[0-9]$/,
              message: "按规则填写",
              trigger: "blur",
            },
          ],        
          codeFile: [
            { required: true, message: '请选择文件上传代码', trigger: 'blur' },
            { validator: validateFile, trigger: "blur" }
          ]
        },
        deployChannelModal: false,
        installChainModal: false,
        instantiationChainModal: false,
        updateChainModal: false
      }
    },
    created() {
      this.fromId = this.$route.params.channelId;
      this.headers = {
        // Authorization: "Bearer" + tokenVal,
        // "TENANT-ID": tenantId,
      };
    },
    computed: {
      modalTop: function() {
        return "calc(50vh - 245px)";
      },
      deployModalTop: function() {
        return "calc(50vh - 93px)";
      },
    },
    methods: {
      showModalTocreateChain() {
        // 新建链码
        // alert("设置新建链码弹窗展示！");
        this.createChainModal = true;
      },
      editChainByLink() {
        // 链码编辑器
        alert("打开链码编辑器！");
      },
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
      reloadPage() {
        alert("刷新当前页的链码页面！");
      },
      releaseChannel() {
        // alert("发布链码到通道");
        this.deployChannelModal = true;
      },
      editChain() {
        alert("编辑链码");
      },
      installChain() {
        // alert("安装链码");
        this.installChainModal = true;
      },
      instantiationChain() {
        // alert("实例化链码");
        this.instantiationChainModal = true;
      },
      updateChain() {
        // alert("升级链码");
        this.updateChainModal = true;
      },
      addChainByApi() {        
        this.$refs["createChainForm"].validate((valid) => {
          if (valid) {
            alert("创建链码！");
            this.createChainModal = false;
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      uploadFalse(response, file, fileList) {
        this.$message({
          message: "上传链码文件失败！",
          type: "error",
        });
      },
      uploadSuccess(response, file, fileList) {
        /* if (response.success == true) {
          this.$set(this.form, 'zipFileUrl', response.data);
          this.$message({
            message: "文件上传成功",
            type: "success",
          });
        } else if (response.success == false && response.msg == "用户凭证已过期") {
          this.$message({
            message: response.msg || "上传链码失败",
            type: "error",
          });
          this.$router.push({ path: "/login" });
        } else {
          this.$message({
            message: response.msg || "上传链码失败",
            type: "error",
          });
        } */
      },
      handleRemove(file, fileList) {
        // this.$set(this.form, 'zipFileUrl', '');
        // this.$set(this.form, 'fileUrl', '');
      },
      handleZipUpload(file, fileList) {
        /* this.$set(this.form, 'fileUrl', '');
        let chainCodeFileSize = file.size < 5 * 1024 * 1024 ? true : false;
        const extension = file.name.endsWith(".zip");
        if (!chainCodeFileSize) {
          this.$message({
            message: "上传文件大小不超过5M!",
            type: "error",
          });
          return
        }
        if (!extension) {
          this.$message({
            message: "上传格式必须为.zip文件!",
            type: "error",
          });
        }
        this.$set(this.form, 'fileUrl', file.name); */
      },
      submitUpload() {
        /* if(this.form.fileUrl && this.form.fileUrl.length > 4 && this.form.fileUrl.endsWith(".zip")) {
          this.$refs.upload.submit();
        } else {
          this.$message({
            message: '上传链码文件格式不正确，禁止上传！',
            type: 'warning'
          });
        } */
      },
      deployChain() {
        alert("发布链码到通道！");
        this.deployChannelModal = false;
      },
      installChainByApi() {
        alert("安装链码！");
        this.installChainModal = false;
      },
      instantiationChainByApi() {
        alert("实例化链码！");
        this.instantiationChainModal = false;
      },
      updateChainByApi() {
        alert("升级链码！");
        this.updateChainModal = false;
      },
      viewingErrorCauses() {
        alert("弹错误原因！");
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
    padding: 15px 0 15px 5px;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    border-bottom: 1px solid #E5E9EC;
    flex-flow: row nowrap;
    justify-content: space-between;
    .headline {
      padding: 0 15px;
    }
    .back {
      height: 32px;
      line-height: 32px;
      width: 146px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.5s;
      cursor: pointer;
      ::v-deep .el-icon-arrow-left {
        font-size: 16px;
        font-weight: bold;
        color: #108cee;
        transition: all 0.5s;
      }
    }
  }
  .detail-content {
    padding: 10px 20px 20px;
    .detail-parts-table {
      overflow-y: auto;
      min-height: 600px;
      padding: 0;
      .top-tools {
        width: 500px;
        display: inline-block;
        ::v-deep .el-button {
          padding: 9px 10px;
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
          display: inline-block;
          margin-left: 10px;
          height: 32px;
          ::v-deep .el-button {
            height: 32px;
            box-sizing: border-box;
            font-size: 16px;
            padding: 7px 8px 7px;
            [class^=el-icon-] {
              font-family: element-icons!important;
              font-style: normal;
              font-weight: bold;
              font-variant: normal;
              text-transform: none;
              max-height: 16px;
              line-height: 1;
              vertical-align: middle;
              display: inline-block;
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
            }
          }
        }
      }
      .help-add-chain {
        display: inline-block;
        width: calc(100% - 500px);
        text-align: right;
        .link {
          i {
            font-size: 14px;
          }
          a {
            margin-left: 4px;
          }
        }
      }
      .show-datalist {
        margin-top: 15px;
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
      .show-horizontal {
        padding-top: 3px;
        ::v-deep .el-button--text {
          color: #108cee;
        }
        ::v-deep .el-button--small {
          padding: 0;
        }
      }
    }
  }
}
.add-chain-modal {
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
    
    .el-dialog__body {
      text-align: initial;
      padding: 15px 20px 10px;
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
    
    .long-form-item {
      ::v-deep .el-form-item__error {
        position: absolute;
        top: 8px;
        left: 330px;
      }
    }
    .upload-span {
      ::v-deep .el-form-item__error {
        position: absolute;
        top: 8px;
        left: 110px;
        width: 200px;
      }
      ::v-deep .el-form-item__content {
        display: inline-flex;
        flex-flow: row nowrap;
        justify-content: flex-start;
        align-items: center;
        margin-left: 0 !important;
        .el-input {
          margin-left: 20px;
          input {
            border: 0 none;
          }
        }
      }
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
    .explain-warning {
      color: #FFB04C;
      padding-left: 120px;
      font-size: 14px;
      margin-top: -14px;
      margin-bottom: 15px;
    }

  }
}
.deploy-chain-to-channel {
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
    .tip-deploy-chain {
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
}
</style>