<template>
  <div>
    <div class="detail-content">
      <div class="detail-parts-table">
        <div class="dt">
          <div class="tit">基本信息</div>
        </div>
        <div class="info">
          <div class="block">
            <p>共识机制：{{ data.consensus }}</p>
            <p>出块周期：{{ data.cycle }}</p>
          </div>
          <div class="block">
            <p>同步模式：{{ data.syncMode }}</p>
            <p>联盟描述：{{ data.note }}</p>
          </div>
        </div>
      </div>
      <div class="detail-parts-table">
        <div class="dt">
          <div class="tit">联盟成员</div>
        </div>
        <div class="list-page-toolbar">
          <div class="left" @click="invitShow">+ 邀请成员</div>
        </div>
        <div class="dd">
          <div class="form">
            <template>
              <el-table
                v-loading="tableLoading"
                :data="tableData"
                :header-cell-style="{
                  background: '#F6F7FB',
                  color: 'rgba(0, 0, 0, 0.85)',
                  borderRight: '1px solid #fff',
                  fontWeight: 'normal',
                }"
                style="width: 100%; font-size: 12px"
              >
                <el-table-column prop="name" label="组织名称">
                </el-table-column>
                <el-table-column prop="enName" label="组织英文名">
                </el-table-column>
                <el-table-column prop="state" label="组织状态">
                  <template slot-scope="scope">
                    <div class="state">
                      <span v-if="scope.row.status == 0"
                        ><i class="success"></i>正常</span
                      >
                      <span v-else> ><i class="err"></i>异常</span>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="交易节点数">
                  <template slot-scope="scope">
                    <span v-if="scope.row.txNodeNum">{{
                      scope.row.txNodeNum
                    }}</span>
                    <span v-else> -</span>
                  </template>
                </el-table-column>
                <el-table-column label="验证节点数">
                  <template slot-scope="scope">
                    <span v-if="scope.row.validateNodeNum">{{
                      scope.row.validateNodeNum
                    }}</span>
                    <span v-else> -</span>
                  </template>
                </el-table-column>
                <el-table-column prop="createTime" label="加入日期">
                </el-table-column>
                <el-table-column prop="state" label="节点类型">
                </el-table-column>
              </el-table>
            </template>
          </div>
        </div>
      </div>
    </div>
    <!-- 邀请成员 -->
    <el-dialog title="邀请成员" :visible.sync="invitFlag" width="600px">
      <div class="create-main">
        <div class="alt">
          温馨提示：邀请信息将通过系统发送给相关账户，您可在事件中心查看进度
        </div>
        <el-form
          :model="invitFrom"
          ref="invitFrom"
          label-width="140px"
          label-position="left"
          :rules="rules"
        >
          <el-form-item label="邀请人手机号" prop="phone">
            <el-input
              type="text"
              v-model="invitFrom.phone"
              class="ipt"
              autocomplete="off"
              clearable
            ></el-input>
          </el-form-item>
          <div class="error" v-if="invitError">该用户需是BaaS已存在用户</div>
        </el-form>
      </div>
      <div class="create-bot">
        <el-button type="primary" @click="invitSubmit('invitFrom')"
          >确定</el-button
        >
        <el-button @click="invitClose">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import quorumApi from "../../../classa/quorum/api";
export default {
  data() {
    return {
      id: "",
      data: {},
      tableLoading: true,
      tableData: [],
      invitFlag: false,
      invitError: false,
      invitFrom: {
        phone: "",
      },
      rules: {
        phone: [
          {
            pattern: /^[1][3,4,5,6,7,8,9][0-9]{9}$/,
            message: `请输入正确的手机号`,
            trigger: "blur",
          },
          { required: true, message: "请输入手机号", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.id = this.$route.query.id;
    this.$http({
      method: "get",
      url: `${quorumApi.consortDetaile}/${this.id}`,
    }).then((rel) => {
      console.log(rel);
      if (rel.code == 0) {
        this.data = rel.data.alliance;
        this.tableData = rel.data.orgList || [];
        console.log(this.tableData);
        this.tableLoading = false;
      } else {
        this.$message(rel.msg);
      }
    });
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    invitSubmit(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.$http({
            method: "post",
            url: quorumApi.invitConsort,
            data: {
              allianceId: this.id,
              allianceType: 2,
              userPhone: this.invitFrom.phone,
            },
          }).then((rel) => {
            if (rel.code == 0) {
              this.$message({
                message: "邀请成功",
                type: "success",
              });
              this.invitFlag = false;
            } else {
              this.invitError = true;
            }
          });
        }
      });
    },
    invitShow() {
      this.invitFlag = true;
    },
    invitClose() {
      this.invitFlag = false;
      this.invitError = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.detail-content {
  padding: 50px 0 0;
  min-height: 600px;
  .detail-parts-table {
    padding: 30px 20px;
    border-top: 1px solid #ebeef5;
    .dt {
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .tit {
        color: #333;
        font-size: 16px;
        border-left: solid 4px #108cee;
        padding-left: 14px;
      }
      .alt {
        color: #999;
        float: right;
        line-height: 30px;
      }
    }
    .info {
      overflow: hidden;
      .block {
        float: left;
        width: 50%;
        p {
          margin-top: 15px;
        }
      }
    }
    .list-page-toolbar {
      margin: 10px 0 15px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .left {
        height: 32px;
        color: #fff;
        background: #108cee;
        text-align: center;
        padding: 0 15px;
        line-height: 32px;
        cursor: pointer;
      }
    }
    .form {
      .state {
        i {
          margin-right: 10px;
        }
        .success {
          width: 9px;
          height: 9px;
          display: inline-block;
          border-radius: 50%;
          background: #2cb663;
        }
        .err {
          width: 9px;
          height: 9px;
          display: inline-block;
          border-radius: 50%;
          background: #eb5252;
        }
      }
    }
  }
}
.create-main {
  .alt {
    background-color: #fcf7f1;
    color: #f38900;
    padding: 6px 13px;
    margin-bottom: 30px;
  }
  .error {
    padding: 0 0 20px 140px;
  }
}
.create-bot {
  border-top: 1px solid #eceff8;

  text-align: right;
  padding-top: 20px;
}
</style>
