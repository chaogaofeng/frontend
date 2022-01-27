<template>
  <div id="main">
    <div class="page">
      <div class="header">
        <div class="back" @click="back">
          <i class="el-icon-arrow-left"></i>
          <span>返回联盟列表</span>
        </div>
        <h2>创建联盟</h2>
      </div>
      <div class="content">
        <div class="table">          
          <el-form :model="createForm" ref="createForm" class="oneline" label-position="left" label-width="140px" size="mini" :rules="leagueFiledsRules">
            <div class="box border">
              <div class="tit">
                <div class="left">创建联盟</div>
              </div>
              <div class="form">                
                <el-form-item label="初始组织：" prop="defaultOrgan" class="label imp">
                  <el-select
                    v-model="createForm.defaultOrgan"
                    placeholder="请选择初始组织"
                    style="width:450px;"
                    size="small"
                  >
                    <el-option
                      v-for="(organItem,index) in organListOptions"
                      :key="index + '-' + organItem.value"
                      :label="organItem.label"
                      :value="organItem.value"
                    >
                      <span style="font-size: 12px">{{ organItem.label }}</span>
                    </el-option>                    
                    <div class="creat-organ">
                      <el-button type="text" icon="el-icon-plus" @click="createOrgan">新建组织</el-button>
                    </div>
                  </el-select>
                </el-form-item>
                <el-form-item label="联盟名称：" prop="leagueName" class="label imp">
                  <el-input
                    type="text"
                    style="width:450px;"
                    v-model="createForm.leagueName"
                    class="ipt"
                    size="small"
                    maxlength="20"
                    autocomplete="off"
                    placeholder="请输入联盟名称"
                    clearable
                  ></el-input>
                  <div class="error" :class="{ red: err.leagueName == false }">
                    支持大小写字母、数字、中文以及-_
                    /.特殊字符，不能以特殊字符开头，长度1-20
                  </div>
                </el-form-item>
                <el-form-item label="联盟英文名：" prop="leagueEnName" class="label imp">
                  <el-input
                    type="text"
                    style="width:450px;"
                    v-model="createForm.leagueEnName"
                    class="ipt"
                    size="small"
                    autocomplete="off"
                    placeholder="请输入联盟英文名"
                    maxlength="16"
                    clearable
                  ></el-input>
                  <div class="error" :class="{ red: err.leagueEnName == false }">
                    支持小写字母、数字以及-，必须以字母开头，长度1-16
                  </div>
                </el-form-item>
                <el-form-item label="联盟描述：" class="label imp">
                  <el-input type="textarea" placeholder="请输入组织描述" style="width:500px;" :rows="5" minlength="1" maxlength="200" resize="none" v-model="createForm.desc" show-word-limit />
                </el-form-item> 

                <el-form-item label="通道创建策略：" class="label imp">
                  <el-select
                    v-model="createForm.strategy"
                    placeholder="请选择"
                    size="small"
                  >
                    <el-option
                      v-for="oneItem in strategies"
                      :key="oneItem.value"
                      :label="oneItem.label"
                      :value="oneItem.value"
                    >
                      <span style="font-size: 12px">{{
                        oneItem.label
                      }}</span>
                    </el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="共识机制：" class="label imp">
                  <el-select
                    v-model="createForm.machvalue"
                    placeholder="请选择"
                    size="small"
                  >
                    <el-option
                      v-for="item in macharr"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                      <span style="font-size: 12px">{{
                        item.label
                      }}</span>
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>
            </div>
            <div class="box">
              <div class="tit">
                <div class="left">购买集群</div>
              </div>
              <div class="form">
                <div class="row">
                  <div class="label imp">可用区：</div>
                  <div class="con">
                    <div class="ipt">
                      <el-checkbox disabled v-model="areaFlag"
                        >可用集群</el-checkbox
                      >
                      <el-popover
                        placement="right"
                        width="300"
                        trigger="hover"
                        content="可用区是指在同一区域下，电力和网络互相独立的区域，故障会被隔离在一个可用区内。如果您的应用程序需要更高的高可用性，建议您将云服务创建在不同的可用区内。"
                      >
                        <el-button class="nostyle" slot="reference">
                          <em class="icon el-icon-warning-outline"></em
                        ></el-button>
                      </el-popover>
                    </div>
                    <div class="error">
                      多个可用区的资源完全一致；创建服务时，会将容器自动化地分配至多个可用区的节点上，构建高可用架构。
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="label imp">IPv6网络：</div>
                  <div class="con">
                    <div class="ipt">
                      <el-switch
                        v-model="ipv6"
                        active-color="#108cee"
                        inactive-color="#ea2e2e"
                        disabled
                      >
                      </el-switch>
                      <el-popover
                        placement="right"
                        width="300"
                        trigger="hover"
                        content="IPv6网络开启后不支持变更，请谨慎选择"
                      >
                        <el-button class="nostyle" slot="reference">
                          <em class="icon el-icon-question"></em
                        ></el-button>
                      </el-popover>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="label imp">容器集群节点：</div>
                  <div class="con">
                    <div class="config">
                      <div
                        class="item"
                        :class="{ act: high === 0 }"
                        @click="high = 0"
                      >
                        <h1>普通配置</h1>
                        <p>{{ severSettings.normal.name }}</p>
                        <p>内存：{{ severSettings.normal.cpu }}／{{ severSettings.normal.ram }}</p>
                        <p>系统盘：{{ severSettings.normal.systemRom }}</p>
                        <p>高性能云磁盘：{{ severSettings.normal.cloudRom }}</p>
                      </div>
                      <div
                        class="item"
                        :class="{ act: high === 1 }"
                        @click="high = 1"
                      >
                        <h1>豪华配置</h1>
                        <p>{{ severSettings.pro.name }}</p>
                        <p>内存：{{ severSettings.pro.cpu }}／{{ severSettings.pro.ram }}</p>
                        <p>系统盘：{{ severSettings.pro.systemRom }}</p>
                        <p>高性能云磁盘：{{ severSettings.pro.cloudRom }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </el-form>
        </div>
        <div class="order-confirm">
          <div class="box">
            <div class="tit">
              <div class="left">所选配置</div>
              <div class="right" @click="refresh">清空配置</div>
            </div>
            <div class="con">
              <div class="row" v-if="pay_switch == 1">
                <div class="label">付费方式：</div>
                <div class="text">后付费</div>
              </div>
              <div class="row">
                <div class="label">可用区：</div>
                <div class="text">可用集群</div>
              </div>
              <div class="row">
                <div class="label">购买配置：</div>
                <div class="text">
                  <span v-if="high">CPU：{{ severSettings.pro.cpu }}、内存：{{ severSettings.pro.ram }}、系统盘：{{ severSettings.pro.systemRom }}</span>
                  <span v-else>CPU：{{ severSettings.normal.cpu }}、内存：{{ severSettings.normal.ram }}、系统盘：{{ severSettings.normal.systemRom }}</span>
                </div>
              </div>
              <div class="row">
                <div class="label">购买配额：</div>
                <div class="text">
                  <span v-if="high">可用区C：{{ severSettings.pro.count }}</span>
                  <span v-else>可用区C：{{ severSettings.normal.count }}</span>
                </div>
              </div>
              <div class="row" v-if="pay_switch == 1">
                <div class="label">配置费用：</div>
                <div class="text">
                  <span class="price" v-if="high">{{ severSettings.pro.money }}</span>
                  <span class="price" v-else>{{ severSettings.normal.money }}</span>
                </div>
              </div>
            </div>
          </div>
          <el-button
            @click="submit('createForm')"
            type="primary"
            class="next"
            :disabled="authStatus == 0 || !areaFlag"
            >下一步</el-button
          >
          <div class="box" v-if="authStatus == 0">
            <div class="tip">
              温馨提示：您还没有实名认证，请立即去<router-link
                to="/user/info/infoauth"
                >认证</router-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>
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
      <el-form :model="organForm" label-position="left" :rules="organFiledsRules" ref="organForm" label-width="100px" size="mini" class="add-organForm">
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
import { getParent } from "@utils";
import { XIcon, AlertCircleIcon } from "vue-feather-icons";
import { mapState } from "vuex";
export default {
  name: "AddLeague",
  components: {
    XIcon
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
    const validateLeagueName = (rule, value, callback) => {
      let reg =
        value.length == 1
          ? /[\u4E00-\u9FA5A-Za-z0-9]/
          : /^[\u4E00-\u9FA5A-Za-z0-9][\u4E00-\u9FA5A-Za-z0-9-_/.]+$/;
      if (reg.test(value) && value.length >= 1 && value.length <= 20) {
        callback();
      } else {
        callback(new Error("联盟名称名不符合规则"));
      }
    };
    const validateLeagueEnName = (rule, value, callback) => {
      let reg = value.length == 1 ? /[a-z]/ : /^[a-z][a-z0-9-]+$/;
      if (reg.test(value) && value.length >= 1 && value.length <= 16) {
        callback();
      } else {
        callback(new Error("联盟英文名不符合规则"));
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
      advanced: false, //高级配置开关
      createDialogFlag: false,
      strategies: [
        {
          label: "ANY",
          value: "any",
        },
        {
          label: "ALL",
          value: "all",
        },
      ],
      showOrganListFg: false,
      organListOptions: [
        {
          value: "Chengdu",
          label: "成都-org",
        },
        {
          value: "Shenzhen",
          label: "深圳-org",
        },
        {
          value: "Guangzhou",
          label: "广州-org",
        },
        {
          value: "Dalian",
          label: "大连-org",
        },
      ],
      organList: {},
      severSettings: {
        normal: {
          name: '普通型III',
          cpu: '4核',
          ram: '8GB',
          systemRom: '40GB',
          cloudRom: '100GB',
          count: '4台',
          money: '￥200/天'
        },
        pro: {
          name: '普通型III',
          cpu: '16核',
          ram: '32GB',
          systemRom: '40GB',
          cloudRom: '500GB',
          count: '7台',
          money: '￥300/天'
        }
      },
      createOrganModal: false,
      organForm: {
        name: '',
        enName: '',
        desc: ''
      },
      createForm: {
        leagueName: "", //联盟名
        leagueEnName: "", //英文名
        desc: "", //备注
        defaultOrgan: null, //选中组织
        organValue: "", //选中组织id
        strategy: "ANY",
        machvalue: "RAFT", //选中共识机制
        cycle: 5, //出块周期
        gasLimit: 4294967295,
        mbgasLimit: 4294967295,
        syncMode: "", //同步模式
      },
      err: {
        leagueName: true,
        leagueEnName: true,
      },
      organFiledsRules: {
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
      },
      leagueFiledsRules: {
        defaultOrgan: [
          { required: true, message: '请选择初始组织', trigger: 'change' }
        ],
        leagueName: [
          { required: true, message: '请输入联盟名称', trigger: 'blur' },
          { min: 1, max: 20, message: '联盟名称不符合规则', trigger: 'blur' },
          { validator: validateLeagueName, trigger: "blur" }
        ],
        leagueEnName: [
          { required: true, message: '请输入联盟英文名称', trigger: 'blur' },
          { min: 1, max: 16, message: '联盟英文名不符合规则', trigger: 'blur' },
          { validator: validateLeagueEnName, trigger: "blur" },
        ],
      },
      organs: [], //组织

      macharr: [
        {
          value: "RAFT",
          label: "RAFT共识",
        },
      ], //共识机制
      descNum: 0, //当前描述字符数
      areaFlag: true, //可用区开关
      ipv6: true, //ipv6
      high: 0, // 是否豪华配置, 0 普通配置， 1豪华配置
      pay_switch: 0, //1设置付费，0不设置
    };
  },
  created() {
    this.getOrg();
    this.paySwitch();
  },
  watch: {
    createForm: {
      handler: function (val) {
        this.descNum = val.desc.length;
      },
      deep: true,
    },
  },
  computed: {
    ...mapState(["authStatus"]),
    addOrganModalTop: function() {
      return "calc(50vh - 225px)";
    },
  },
  methods: {
    createOrganShowModal() {
      this.createOrganModal = true;
    },
    cancelCreateOrgan() {
      this.resetForm('organForm');
      this.createOrganModal=false;
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
    createOrgan(e) {
      // document.querySelector("div.el-input.el-input--suffix.is-focus>input[placeholder='请选择初始组织']").click();
      // alert('组织创建');
      this.createOrganShowModal();
    },
    chooseOrg(e) {
      this.createForm.organValue = e;
    },
    back() {
      this.$router.go(-1);
    },
    refresh() {
      this.advanced = false;
      this.createDialogFlag = false;
      this.createForm = {
        leagueName: "",
        leagueEnName: "",
        desc: "",
        defaultOrgan: null,
        organValue: "",
        nodenum: 1,
        strategy: "ANY",
        machvalue: "RAFT共识",
        cycle: 5,
        gasLimit: 4294967295,
        mbgasLimit: 4294967295,
      };
      this.high = 0;
    },
    paySwitch() {},
    getOrg() {},
    createSubmit(form) {},
    submit(form) {
      console.log("+++++==========++++++");
      console.log(this.createForm);
      const _this = this;
      this.$refs[form].validate((valid) => {
        if (valid) {
          // 跳转到订单确认页面
          _this.$router.push({
            name: 'fabricLeagueOrder',
            params: {
              highNum: this.high
            }
          });
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.page {
  padding: 0 20px;
  .header {
    height: 50px;
    background: #f6f7fb;
    color: #666;
    line-height: 50px;
    margin-bottom: 20px;
    position: relative;
    text-align: center;
    .back {
      position: absolute;
      left: 20px;
      top: 1px;
      color: #0786e9;
      font-size: 14px;
      cursor: pointer;
      i {
        font-size: 18px;
        vertical-align: -2px;
      }
    }
  }
  .content {
    .tit {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 25px;
      .left {
        color: #333;
        font-size: 16px;
        border-left: solid 4px #108cee;
        padding-left: 14px;
      }
      .right {
        font-size: 12px;
        color: #209bfd;
        cursor: pointer;
      }
    }
    .box {
      padding: 20px 20px 0;
      &.border {
        border-bottom: 1px solid #e3e5eb;
      }
    }
    display: flex;
    align-items: flex-start;
    .table {
      flex: 1;
      width: 0;
      background: #fff;
      min-height: 300px;
      margin-right: 20px;
      .form {
        ::v-deep .el-form-item__label {
          font-size: 12px;
        }
        .error {
          font-size: 12px;
          color: #333;
        }
        ::v-deep .el-form-item--mini .el-form-item__error {
          top: 10px;
          left: 460px;
        }
        .row {
          display: flex;
          align-items: flex-start;
          margin-bottom: 25px;
          .label {
            font-size: 12px;
            color: #666;
            width: 130px;
            position: relative;
            height: 30px;
            line-height: 30px;
            &.imp::after {
              content: "*";
              position: absolute;
              left: -10px;
              color: #f00;
            }
          }
          .con {
            .config {
              display: flex;
              align-items: flex-start;
              .item {
                margin-right: 20px;
                width: 180px;
                background: #ffffff;
                border: 1px solid #cccccc;
                font-size: 12px;
                color: #666666;
                line-height: 30px;
                cursor: pointer;
                h1 {
                  background: #f5f5f5;
                  color: #000;
                  font-weight: 400;
                  font-size: 12px;
                  padding: 0 10px;
                }
                p {
                  padding: 0 10px;
                }
                &.act {
                  border: 1px solid #108cee;
                  color: #108cee;
                  h1 {
                    color: #108cee;
                    background: rgba(16, 140, 238, 0.05);
                  }
                }
              }
            }
            .el-form-item {
              margin: 0;
            }
            .ipt {
              width: 300px;
              display: flex;
              align-items: center;
              margin-bottom: 5px;
              input {
                width: 280px;
                resize: none;
                box-sizing: border-box;
                font-size: 12px;
                background: #fff;
                vertical-align: middle;
                color: #333;
                border: 1px solid #ccc;
                height: 28px;
                padding: 0 10px;
                outline: none;
                border-radius: 3px;
                transition: all 0.5s;
                &:hover {
                  border-color: #0786e9;
                }
                &:focus {
                  background-color: #f8fbfe;
                }
              }
            }
            .textarea {
              height: 65px;
              width: 288px;
              padding: 5px 5px 20px 5px;
              position: relative;
              border-radius: 3px;
              border: 1px solid #ccc;
              &:hover {
                border-color: #0786e9;
              }
              &:focus {
                background-color: #f8fbfe;
              }
              textarea {
                width: 100%;
                height: 100%;
                box-sizing: border-box;
                border: none;
                background: none;
                outline: none;
                resize: none;
                color: #333;
                font-size: 12px;
              }
              span {
                position: absolute;
                right: 5px;
                bottom: 5px;
                color: #999;
              }
            }
            .icon {
              font-size: 20px;
              color: #999;
              vertical-align: -3px;
              margin-left: 5px;
              cursor: pointer;
              &:hover {
                font-size: 20px;
                color: #108cee;
              }
            }
            .red {
              color: #f00;
            }
          }
        }
        .nostyle {
          outline: none;
          border: none;
          padding: 0;
          background: none !important;
        }
        .advanced {
          color: #999;
          font-size: 12px;
          span {
            color: #108cee;
            margin-right: 10px;
          }
          em {
            color: #108cee;
            font-weight: bold;
            font-size: 14px;
            margin-right: 2px;
            cursor: pointer;
          }
        }
      }
    }
    .order-confirm {
      width: 280px;
      .box {
        background: #fff;
        overflow: hidden;
        .tit {
          .left {
            font-size: 14px;
          }
        }
        .con {
          .row {
            display: flex;
            align-items: flex-start;
            margin-bottom: 18px;
            .label {
              width: 60px;
            }
            .text {
              width: 0;
              flex: 1;
              .price {
                font-size: 24px;
                color: #eb5252;
              }
              .postpay-range-price {
                color: #999;
                font-size: 12px;
              }
            }
          }
        }
      }
      .next {
        height: 40px;
        font-size: 16px;
        text-align: center;
        line-height: 40px;
        width: 100%;
        padding: 0;
      }
      .tip {
        margin-bottom: 20px;
        color: #f18d36;
      }
    }
  }
}
.creat-organ {
  color: #108cee;
  height: 34px;
  line-height: 34px;
  cursor: pointer;
  padding: 0 20px;
  span {
    font-size: 19px;
    font-weight: bold;
    vertical-align: -3px;
    margin-right: 4px;
  }
}
.reminder {
  width: 420px;
  padding: 10px 10px;
  margin-bottom: 30px;
  background-color: #fcf7f1;
  line-height: 20px;
  color: #f38900;
  font-size: 12px;
}
.create-bot {
  border-top: 1px solid #eceff8;
  text-align: right;
  padding-top: 20px;
  margin-top: 50px;
}
.formalt {
  color: #999;
  padding-left: 128px;
  font-size: 12px;
  margin-top: -8px;
  margin-bottom: 20px;
}
.textipt ::v-deep .el-textarea__inner {
  width: 100%;
  font-size: 12px;
  height: 50px !important;
  resize: none;
}
.handle {
  color: #999;
  cursor: pointer;
  .blue {
    color: #108cee;
  }
}

.creat-organ {
  margin-top: 0;
  ::v-deep .el-button {
    padding: 8px 0;
    [class^="el-icon-"] {
      font-family: element-icons !important;
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
  .oneline {
    ::v-deep .el-input--small .el-input__inner {
      font-size: 12px;
    }
  }
</style>
