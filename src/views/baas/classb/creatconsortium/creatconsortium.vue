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
      <div class="content" v-if="pay_switch != null">
        <div class="table">
          <el-form :model="createForm" ref="createForm" :rules="rules">
            <div class="box border">
              <div class="tit">
                <div class="left">创建联盟</div>
              </div>
              <div class="form">
                <div class="row">
                  <div class="label imp">联盟名称：</div>
                  <div class="con">
                    <div class="ipt">
                      <el-form-item prop="name">
                        <el-input
                          :disabled="readonly"
                          type="text"
                          v-model="createForm.name"
                          class="ipt"
                          autocomplete="off"
                          placeholder="请输入联盟名称"
                          clearable
                        ></el-input>
                      </el-form-item>
                    </div>
                    <div class="errow" :class="{ red: err.name == false }">
                      支持大小写字母、数字、中文以及-_
                      /.特殊字符，不能以特殊字符开头，长度1-20
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="label imp">联盟英文名：</div>
                  <div class="con">
                    <div class="ipt">
                      <el-form-item prop="enName">
                        <el-input
                          :disabled="readonly"
                          type="text"
                          v-model="createForm.enName"
                          class="ipt"
                          autocomplete="off"
                          placeholder="请输入联盟英文名"
                          clearable
                        ></el-input>
                      </el-form-item>
                    </div>
                    <div class="errow" :class="{ red: err.enName == false }">
                      支持小写字母、数字以及-，必须以字母开头，长度1-16
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="label">联盟描述：</div>
                  <div class="con">
                    <div class="ipt">
                      <el-input
                        type="textarea"
                        :disabled="readonly"
                        :autosize="{ minRows: 2, maxRows: 4 }"
                        placeholder="请输入联盟描述"
                        v-model="createForm.desc"
                        show-word-limit
                        maxlength="200"
                      >
                      </el-input>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="label imp">初始组织：</div>
                  <div class="con">
                    <div class="select">
                      <el-select
                        @change="chooseOrg"
                        v-model="createForm.organLabel"
                        placeholder="请选择"
                      >
                        <el-option
                          v-for="item in organs"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        >
                          <span style="font-size: 12px">{{ item.label }}</span>
                        </el-option>
                        <div
                          class="creat-organ"
                          @click="createDialogFlag = true"
                        >
                          <span>+</span>新建组织
                        </div>
                      </el-select>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="advanced">
                    <span>高级选项</span
                    ><em
                      @click="changeAdvanced"
                      :class="[
                        advanced ? 'el-icon-arrow-up' : 'el-icon-arrow-down',
                      ]"
                    ></em
                    >高级选项中的默认配置为推荐配置，请您谨慎修改
                  </div>
                </div>
                <div v-if="advanced">
                  <div class="row">
                    <div class="label imp">本组织交易节点数：</div>
                    <div class="con">
                      <div class="select">
                        <el-input-number
                          v-model="createForm.nodenum"
                          :min="1"
                          :max="4"
                        ></el-input-number>
                        <el-popover
                          placement="right"
                          width="300"
                          trigger="hover"
                          content="只同步块而不参与出块的节点个数"
                        >
                          <el-button class="nostyle" slot="reference">
                            <em class="icon el-icon-question"></em
                          ></el-button>
                        </el-popover>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="label imp">共识机制：</div>
                    <div class="con">
                      <div class="con">
                        <div class="select">
                          <el-select
                            v-model="createForm.machvalue"
                            placeholder="请选择"
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
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="label imp">出块周期(s)：</div>
                    <div class="con">
                      <div class="select">
                        <el-input-number
                          v-model="createForm.cycle"
                          :min="1"
                          :max="999"
                        ></el-input-number>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="label imp">GasLimit：</div>
                    <div class="con">
                      <div class="ipt">
                        <el-input
                          v-model="createForm.gasLimit"
                          type="number"
                          placeholder="请输入内容"
                          max="4294967297"
                          min="3000000"
                          disabled
                        ></el-input>
                        <el-popover
                          placement="right"
                          width="300"
                          trigger="hover"
                          content="一次交易可使用的Gas的上限"
                        >
                          <el-button class="nostyle" slot="reference">
                            <em class="icon el-icon-question"></em
                          ></el-button>
                        </el-popover>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="label imp">目标GasLimit：</div>
                    <div class="con">
                      <div class="ipt">
                        <el-input
                          v-model="createForm.mbgasLimit"
                          type="number"
                          placeholder="请输入内容"
                          disabled
                          max="4294967297"
                          min="3000000"
                        ></el-input>
                        <el-popover
                          placement="right"
                          width="300"
                          trigger="hover"
                          content="设置最低gas限制"
                        >
                          <el-button class="nostyle" slot="reference">
                            <em class="icon el-icon-question"></em
                          ></el-button>
                        </el-popover>
                      </div>
                    </div>
                  </div>
                </div>
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
                      <el-checkbox :disabled="readonly" v-model="areaFlag"
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
                    <div class="errow">
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
                        :disabled="readonly"
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
                        :class="{ act: high == '0' }"
                        @click="high = '0'"
                      >
                        <h1>普通配置</h1>
                        <p>普通型III</p>
                        <p>内存：4核／8GB</p>
                        <p>系统盘：40GB</p>
                        <p>高性能云磁盘：100GB</p>
                      </div>
                      <div
                        class="item"
                        :class="{ act: high == '1' }"
                        @click="high = '1'"
                      >
                        <h1>豪华配置</h1>
                        <p>普通型III</p>
                        <p>内存：16核／32GB</p>
                        <p>系统盘：40GB</p>
                        <p>高性能云磁盘：500GB</p>
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
                  <span v-if="high">CPU：16核、内存：32GB、系统盘：40GB</span>
                  <span v-else>CPU：4核、内存：8GB、系统盘：40GB</span>
                </div>
              </div>
              <div class="row">
                <div class="label">购买配额：</div>
                <div class="text">
                  <span v-if="high">可用区C：7台</span>
                  <span v-else>可用区C：4台</span>
                </div>
              </div>
              <div class="row" v-if="pay_switch == 1">
                <div class="label">配置费用：</div>
                <div class="text">
                  <span class="price" v-if="high">￥300/天</span>
                  <span class="price" v-else>￥200/天</span>
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
    <!-- 创建组织 -->
    <el-dialog title="创建组织" :visible.sync="createDialogFlag" width="650px">
      <div class="create-main">
        <div class="reminder">
          温馨提示： CA部署方式默认有平台自动生成，组织信息创建成功后不可修改
        </div>
        <el-form
          :model="createOrg"
          ref="createOrg"
          label-width="128px"
          label-position="left"
          :rules="rules"
        >
          <el-form-item label="组织名称：" prop="organName">
            <el-input
              type="text"
              v-model="createOrg.organName"
              class="ipt"
              autocomplete="off"
              clearable
            ></el-input>
          </el-form-item>
          <div class="formalt">
            支持大小写字母、数字、中文以及-_
            /.特殊字符，不能以特殊字符开头，长度1-20
          </div>
          <el-form-item label="英文名：" prop="organenName">
            <el-input
              type="text"
              v-model="createOrg.organenName"
              class="ipt"
              autocomplete="off"
              clearable
            ></el-input>
          </el-form-item>
          <div class="formalt">
            支持小写字母、数字以及-，必须以字母开头，长度1-16
          </div>
          <el-form-item label="组织描述：" prop="desc" title="组织描述：">
            <el-input
              placeholder="长度1-128个字符"
              type="textarea"
              autosize
              v-model="createOrg.desc"
              class="textipt"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="create-bot">
        <el-button type="primary" @click="createSubmit('createOrg')"
          >确定</el-button
        >
        <el-button @click="createDialogFlag = false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import quorumApi from "../../classa/quorum/api";
import { mapState } from "vuex";
export default {
  data() {
    var validateName = (rule, value, callback) => {
      let reg =
        value.length == 1
          ? /[\u4E00-\u9FA5A-Za-z0-9]/
          : /^[\u4E00-\u9FA5A-Za-z0-9][\u4E00-\u9FA5A-Za-z0-9-_/.]+$/;
      if (reg.test(value) && value.length >= 1 && value.length <= 20) {
        this.err.name = true;
        callback();
      } else {
        this.err.name = false;
      }
    };
    var validateName1 = (rule, value, callback) => {
      let reg = value.length == 1 ? /[a-z]/ : /^[a-z][a-z0-9-]/;
      if (reg.test(value) && value.length >= 1 && value.length <= 16) {
        this.err.enName = true;
        callback();
      } else {
        this.err.enName = false;
      }
    };
    var organName = (rule, value, callback) => {
      let reg =
        value.length == 1
          ? /[\u4E00-\u9FA5A-Za-z0-9]/
          : /^[\u4E00-\u9FA5A-Za-z0-9][\u4E00-\u9FA5A-Za-z0-9-_/.]+$/;
      if (reg.test(value) && value.length >= 1 && value.length <= 20) {
        callback();
      } else {
        callback(new Error("填写有误"));
      }
    };
    var organenName = (rule, value, callback) => {
      let reg = value.length == 1 ? /[a-z]/ : /^[a-z][a-z0-9-]+$/;
      if (reg.test(value) && value.length >= 1 && value.length <= 16) {
        callback();
      } else {
        callback(new Error("填写有误"));
      }
    };
    var organenDesc = (rule, value, callback) => {
      if (value.length >= 1 && value.length <= 128) {
        callback();
      } else {
        callback(new Error("填写有误"));
      }
    };
    return {
      readonly: false, //是否可配置
      advanced: false, //高级配置开关
      createDialogFlag: false,
      createOrg: {
        organName: "", //组织名
        enName: "", //英文名
        desc: "", //备注
      },
      createForm: {
        name: "", //联盟名
        enName: "", //英文名
        desc: "", //备注
        organLabel: "", //选中组织
        organValue: "", //选中组织id
        nodenum: 1, //交易节点数
        machvalue: "IBFT", //选中共识机制
        cycle: 5, //出块周期
        gasLimit: 4294967295,
        mbgasLimit: 4294967295,
        syncMode: "", //同步模式
      },
      err: {
        name: true,
        enName: true,
      },
      rules: {
        name: [
          {
            validator: validateName,
            trigger: "change",
          },
        ],
        enName: [
          {
            validator: validateName1,
            trigger: "change",
          },
        ],
        organName: [
          { required: true, message: "请填写", trigger: "blur" },
          {
            validator: organName,
            trigger: "blur",
          },
        ],
        organenName: [
          { required: true, message: "请填写", trigger: "blur" },
          {
            validator: organenName,
            trigger: "blur",
          },
        ],
        desc: [
          { required: true, message: "请填写", trigger: "blur" },
          {
            validator: organenDesc,
            trigger: "blur",
          },
        ],
      }, //提交表单
      organs: [], //组织

      macharr: [
        {
          value: "IBFT",
          label: "IBFT",
        },
      ], //共识机制
      areaFlag: true, //可用区开关
      ipv6: true, //ipv6
      high: "0", //是否豪华配置
      pay_switch: null, //1设置付费，0不设置
    };
  },
  created() {
    let type = this.$route.query.type;
    if (type == "join") {
      this.readonly = true;
    } else {
      this.readonly = false;
    }
    this.getOrg();
    this.paySwitch();
  },
  computed: {
    ...mapState(["authStatus"]),
  },
  methods: {
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
        name: "",
        enName: "",
        desc: "",
        organLabel: "",
        organValue: "",
        nodenum: 1,
        machvalue: "IBFT",
        cycle: 5,
        gasLimit: 4294967295,
        mbgasLimit: 4294967295,
      };
      this.getOrg();
      this.paySwitch();
      this.high = "0";
    },
    changeAdvanced() {
      this.advanced = !this.advanced;
    },
    paySwitch() {
      this.$http({
        method: "get",
        url: quorumApi.getValByKey,
        params: {
          dictKey: "pay_switch",
        },
      }).then((rel) => {
        if (rel.code == 0) {
          this.pay_switch = rel.data;
        } else {
          this.$message({
            message: rel.msg,
          });
        }
      });
    },
    getOrg() {
      this.$http({
        method: "get",
        url: quorumApi.orgList,
      }).then((rel) => {
        if (rel.code == 0) {
          if (rel.data.length > 0) {
            this.organs = rel.data.map((val, index) => {
              if (index == 0) {
                this.createForm.organLabel = val.name;
                this.createForm.organValue = val.id;
              }
              return {
                value: val.id,
                label: val.name,
              };
            });
          } else {
            this.$message({
              message: rel.msg,
            });
          }
        }
      });
    },
    createSubmit(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.$http({
            method: "post",
            url: quorumApi.addOrg,
            data: {
              enName: this.createOrg.enName,
              name: this.createOrg.organName,
              note: this.createOrg.desc,
            },
          }).then((rel) => {
            if (rel.code == 0) {
              this.createDialogFlag = false;
              this.createOrg.enName = "";
              this.createOrg.property = "";
              this.createOrg.desc = "";
              this.getOrg();
              this.$message({
                message: "创建成功",
                type: "success",
              });
            } else {
              this.$message({
                message: rel.msg,
              });
            }
          });
        }
      });
    },
    submit(form) {
      console.log(this.createForm);
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.$router.push({
            name: "consortorder",
            params: { high: this.high, createForm: this.createForm },
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
        .row {
          display: flex;
          align-items: flex-start;
          margin-bottom: 25px;
          .label {
            font-size: 12px;
            color: #666;
            width: 130px;
            position: relative;
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
                font-size: 14px;
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
  font-size: 14px;
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
</style>
