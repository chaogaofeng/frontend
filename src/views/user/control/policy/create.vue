<template>
  <div class="agement-list">
    <div class="breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>用户中心</el-breadcrumb-item>
        <el-breadcrumb-item class="color" :to="{ name: 'policy' }">
          权限策略列表
        </el-breadcrumb-item>
        <el-breadcrumb-item>创建权限策略</el-breadcrumb-item>
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
                label="策略名称："
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
              <el-form-item label="说明" prop="desc" title="说明">
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
        <div class="tit">权限配置</div>
        <div class="con">
          <policy-config
            :checkedPolicy="checkedPolicy"
            :policy="policy"
            v-if="policy.length > 0"
            @getPolicyConfig="getPolicyConfig"
          ></policy-config>
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
import PolicyConfig from "../components/PolicyConfig.vue";
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
      ruleForm: {
        name: "", //策略名称
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
      checkedPolicy: [],
      policy: [],
    };
  },
  created() {
    //获取权限元数据
    this.$http({
      method: "get",
      url: controlApi.policyMeta,
    }).then((rel) => {
      if (rel.code == 0) {
        this.policy = rel.data || [];
      }
    });
  },
  components: {
    PolicyConfig,
  },
  methods: {
    getPolicyConfig(e) {
      this.checkedPolicy = e;
    },
    back() {
      this.$router.go(-1);
    },
    submit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let strategyPermissionList = this.checkedPolicy.map((val) => {
            return {
              permKey: val.permKey,
              permVal: val.permVal,
            };
          });
          //新建策略
          this.$http({
            method: "post",
            url: controlApi.addPolicy,
            data: {
              strategyName: this.ruleForm.name,
              strategyNote: this.ruleForm.desc,
              strategyPermissionList: strategyPermissionList,
            },
          }).then((rel) => {
            if (rel.code == 0) {
              this.$router.push({ name: "policy" });
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
      }
    }
  }
}
</style>
