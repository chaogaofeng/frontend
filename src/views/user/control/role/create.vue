<template>
  <div class="agement-list">
    <div class="breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>用户中心</el-breadcrumb-item>
        <el-breadcrumb-item class="color" :to="{ name: 'role' }"
          >角色管理</el-breadcrumb-item
        >
        <el-breadcrumb-item>新建角色</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="page-body">
      <div class="block">
        <div class="tit">基本信息</div>
        <div class="con">
          <div class="form">
            <el-form
              :model="ruleForm"
              ref="ruleForm"
              label-width="100px"
              label-position="left"
              :rules="rules"
            >
              <el-form-item
                label="角色名称："
                class="required-label"
                prop="name"
                title="角色名称"
              >
                <el-input
                  type="text"
                  placeholder="长度1-64位的英文字母、数字或“_”"
                  v-model="ruleForm.name"
                  class="ipt"
                ></el-input>
              </el-form-item>
              <el-form-item label="备注：" prop="desc" title="备注">
                <el-input
                  placeholder="长度1-128个字符"
                  type="textarea"
                  autosize
                  v-model="ruleForm.desc"
                  class="textipt"
                ></el-input>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
      <div class="block noborder">
        <div class="tit">策略管理</div>
        <div class="con">
          <div class="table">
            <div class="label">策略：</div>
            <div class="table-main">
              <Transfer
                ref="trans"
                v-if="transferData != null"
                :transferData="transferData"
                :chooseTable="chooseTable"
                @getTable="getTable"
                @getTransfer="getTransfer"
                @clearItem="clearItem"
              ></Transfer>
            </div>
          </div>
        </div>
      </div>
      <div class="button">
        <el-button type="primary" @click="submit('ruleForm')">确定</el-button>
        <el-button @click="back">取消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import controlApi from "../api";
import Transfer from "../components/Transfer";
export default {
  data() {
    var validateName = (rule, value, callback) => {
      if (/[^\w]/g.test(value) || value == "" || value.length > 64) {
        callback(new Error("长度1-64位的英文字母、数字或“_”"));
      } else {
        callback();
      }
    };
    var validateDesc = (rule, value, callback) => {
      if (value.length > 128) {
        callback(new Error("长度1-128个字符"));
      } else {
        callback();
      }
    };
    return {
      transferData: null, //全部策略
      ruleForm: {
        name: "", //角色名称
        desc: "", //备注
      },
      rules: {
        name: [
          {
            validator: validateName,
            trigger: "blur",
          },
        ],
        desc: [{ validator: validateDesc, trigger: "blur" }],
      },
      chooseTable: [],
    };
  },
  created() {
    //获取全部策略
    this.getTransfer();
  },
  components: {
    Transfer,
  },
  methods: {
    getTransfer(e) {
      let filterSearch = e || "";
      this.$http({
        method: "get",
        url: controlApi.policyList,
        params: {
          strategyName: filterSearch,
        },
      }).then((rel) => {
        if (rel.code == 0) {
          this.transferData = rel.data || [];
        }
      });
    },
    getTable(arr) {
      this.chooseTable = arr;
    },
    clearItem() {
      this.chooseTable = [];
    },
    back() {
      this.$router.go(-1);
    },
    submit(formName) {
      let strategyNames = "";
      if (this.chooseTable.length > 0) {
        let arr = [];
        this.chooseTable.forEach((val) => {
          arr.push(val.strategyName);
        });
        strategyNames = arr.join(",");
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http({
            url: controlApi.addRole,
            method: "post",
            data: {
              roleName: this.ruleForm.name,
              roleNote: this.ruleForm.desc,
              strategyNames: strategyNames,
            },
          }).then((rel) => {
            if (rel.code == 0) {
              this.$router.push({ name: "role" });
            } else {
              this.$message(rel.msg);
            }
          });
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style scoped lang="scss">
.agement-list {
  .breadcrumb {
    padding: 15px 0;
    .el-breadcrumb {
      font-size: 12px;
    }
  }
  .page-body {
    background: #fff;
    padding: 20px;
    .block {
      padding: 30px 0 20px;
      position: relative;
      &::after {
        position: absolute;
        bottom: 0;
        right: -20px;
        left: -20px;
        content: "";
        border-bottom: 1px solid #e3e5eb;
      }
      &.noborder::after {
        border-bottom: none;
      }
      .tit {
        color: #333;
        font-size: 16px;
        border-left: solid 4px #108cee;
        padding-left: 14px;
        margin-bottom: 25px;
      }
      .con {
        .form {
          .ipt {
            width: 300px;
            font-size: 14px;
          }
          ::v-deep .el-textarea__inner {
            width: 300px;
            font-size: 14px;
            height: 110px !important;
            resize: none;
          }
        }
        .table {
          display: flex;
          align-items: flex-start;
          .label {
            width: 100px;
            font-size: 14px;
            position: relative;
            &::after {
              content: "*";
              position: absolute;
              line-height: inherit;
              left: -10px;
              color: #eb5252;
              top: 2px;
            }
          }
          .table-main {
            flex: 1;
          }
        }
      }
    }
  }
}
</style>
