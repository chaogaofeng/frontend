<template>
  <div class="list-page-body">
    <div class="list-page-title">
      <h2>组织</h2>
      <div class="list-page-helps">
        <a
          href="https://docs.goquorum.consensys.net/en/latest/"
          target="_blank"
        >
          <i class="el-icon-chat-line-square"></i>Quorum开源社区
        </a>
        <a href="https://cloud.baidu.com/doc/BBE/index.html" target="_blank">
          <i class="el-icon-warning-outline"></i>区块链解决方案介绍
        </a>
      </div>
    </div>
    <div class="list-page-content">
      <div class="list-page-tip">
        <div>
          <div class="module-container">
            <div class="step step1">
              <div class="arrow-right"></div>
            </div>
            <div class="module module2">
              <div class="operation">
                <div><i class="el-icon-potato-strips icon-font"></i></div>
                <div>创建组织</div>
                <div class="create" @click="createDialog">
                  <div class="skin-create-button btn-con">
                    <i class="el-icon-plus"></i> 创建
                  </div>
                </div>
              </div>
              <div>
                <span>创建组织部署Quorum网络</span>
              </div>
            </div>
            <div class="step step2">
              <div class="arrow-right"></div>
            </div>
            <div class="module module3">
              <div class="operation">
                <div><i class="el-icon-potato-strips icon-font"></i></div>
                <div>创建联盟</div>
                <div class="link">
                  <i class="el-icon-link"></i>
                  <a
                    href="https://cloud.baidu.com/doc/BBE/s/jjy4d5fwi#创建联盟"
                    target="_blank"
                    >查看文档</a
                  >
                </div>
              </div>
              <div>
                <span>创建／加入联盟网络</span>
              </div>
            </div>
            <div class="step step3">
              <div class="arrow-right"></div>
            </div>
            <div class="module module4">
              <div class="operation">
                <div><i class="el-icon-potato-strips icon-font"></i></div>
                <div>合约管理</div>
                <div class="link">
                  <i class="el-icon-link"></i>
                  <a
                    href="https://cloud.baidu.com/doc/BBE/s/5jyjtjmch"
                    target="_blank"
                    >查看文档</a
                  >
                </div>
              </div>
              <div>
                <span>部署区块链智能合约</span>
              </div>
            </div>
            <div class="module module4">
              <div class="operation">
                <div><i class="el-icon-potato-strips icon-font"></i></div>
                <div>配置Dapp参数</div>
                <div class="link">
                  <i class="el-icon-link"></i>
                  <a
                    href="https://cloud.baidu.com/doc/BBE/s/Bjwvxwrkx"
                    target="_balnk"
                    >查看文档</a
                  >
                </div>
              </div>
              <div>
                <span>创建分布式部署应用Dapp</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="list-page-toolbar">
        <div class="left" @click="createDialog">+ 创建组织</div>
        <div class="btn" @click="refresh">
          <i class="el-icon-refresh-right"></i>
        </div>
      </div>
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
              <template slot-scope="scope">
                <div class="handle">
                  <span class="blue" @click="goDetaile(scope.row)">{{
                    scope.row.name
                  }}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="enName" label="英文名"> </el-table-column>
            <el-table-column prop="note" label="组织描述"> </el-table-column>
            <el-table-column prop="allianceName" label="所在联盟">
            </el-table-column>
            <el-table-column prop="createTime" label="创建时间">
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <div class="handle">
                  <span v-if="scope.row.allianceName">删除</span>
                  <span v-else class="blue" @click="del(scope.row)">删除</span>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </div>
      <div class="pagination" v-if="totalPage != null">
        <el-pagination
          :page-size="pageSize"
          :page-count="totalPage"
          background
          @current-change="pageChange"
          layout="prev, pager, next"
        >
        </el-pagination>
      </div>
    </div>
    <!-- 创建组织 -->
    <el-dialog title="创建组织" :visible.sync="createDialogFlag" width="650px">
      <div class="create-main">
        <div class="reminder">
          温馨提示： CA部署方式默认有平台自动生成，组织信息创建成功后不可修改
        </div>
        <el-form
          :model="createForm"
          ref="createForm"
          label-width="128px"
          label-position="left"
          :rules="rules"
        >
          <el-form-item label="组织名称：" prop="organName">
            <el-input
              type="text"
              v-model="createForm.organName"
              class="ipt"
              autocomplete="off"
              clearable
            ></el-input>
          </el-form-item>
          <div class="formalt">
            支持大小写字母、数字、中文以及-_
            /.特殊字符，不能以特殊字符开头，长度1-20
          </div>
          <el-form-item label="英文名：" prop="enName">
            <el-input
              type="text"
              v-model="createForm.enName"
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
              v-model="createForm.desc"
              class="textipt"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="create-bot">
        <el-button type="primary" @click="createSubmit('createForm')"
          >确定</el-button
        >
        <el-button @click="createClose">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import quorumApi from "../api.js";
export default {
  data() {
    var validateName = (rule, value, callback) => {
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
    var validateName1 = (rule, value, callback) => {
      let reg = value.length == 1 ? /[a-z]/ : /^[a-z][a-z0-9-]+$/;
      if (reg.test(value) && value.length >= 1 && value.length <= 16) {
        callback();
      } else {
        callback(new Error("填写有误"));
      }
    };
    var validateDesc = (rule, value, callback) => {
      if (value.length >= 1 && value.length <= 128) {
        callback();
      } else {
        callback(new Error("填写有误"));
      }
    };
    return {
      tableData: [],
      tableLoading: true,
      emptyMsg: " ", //空数据提示
      createDialogFlag: false,
      createForm: {
        organName: "", //组织名
        enName: "", //英文名
        desc: "", //备注
      },
      rules: {
        organName: [
          { required: true, message: "请填写", trigger: "blur" },
          {
            validator: validateName,
            trigger: "blur",
          },
        ],
        enName: [
          { required: true, message: "请填写", trigger: "blur" },
          {
            validator: validateName1,
            trigger: "blur",
          },
        ],
        desc: [
          { required: true, message: "请填写", trigger: "blur" },
          {
            validator: validateDesc,
            trigger: "blur",
          },
        ],
      },
      pageNo: 1, //当前页数
      pageSize: 10, //每页条数
      totalPage: null, //总页数
    };
  },
  created() {
    //获取组织列表
    this.getData();
  },
  methods: {
    getData() {
      this.$http({
        method: "get",
        url: quorumApi.orgListpage,
        params: {
          pageNo: this.pageNo,
          pageSize: this.pageSize,
        },
      }).then((rel) => {
        console.log(rel);
        if (rel.code == 0) {
          this.tableData = [];
          if (rel.data.dataList.length > 0) {
            this.tableData = rel.data.dataList || [];
            this.totalPage = rel.data.totalPage;
          } else {
            this.emptyMsg = "暂无数据";
            this.totalPage = null;
          }
          this.tableLoading = false;
        } else {
          this.$message(rel.msg);
        }
      });
    },
    pageChange(num) {
      this.pageNo = num;
      this.getData();
    },
    editShow(e) {
      this.actList = e;
      this.editDialogFlag = true;
    },
    createDialog() {
      this.createDialogFlag = true;
    },
    createClose() {
      this.createDialogFlag = false;
    },
    createSubmit(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.$http({
            method: "post",
            url: quorumApi.addOrg,
            data: {
              enName: this.createForm.enName,
              name: this.createForm.organName,
              note: this.createForm.desc,
            },
          }).then((rel) => {
            console.log(rel);
            if (rel.code == 0) {
              this.createDialogFlag = false;
              this.createForm.enName = "";
              this.createForm.property = "";
              this.createForm.desc = "";
              this.getData();
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
    goDetaile(e) {
      this.$router.push({ name: "organdetaile", query: { id: e.id } });
    },
    refresh() {
      this.tableLoading = true;
      this.getData();
    },
    del(e) {
      const h = this.$createElement;
      this.$msgbox({
        title: " ",
        message: h("p", { style: "font-size:13px" }, [
          h("i", {
            class: "el-icon-warning-outline",
            style:
              "color:#d29a1d;font-size:20px;vertical-align: middle;margin-right: 7px;",
          }),
          h(
            "span",
            { style: "color: #666" },
            `该组织没有加入任何联盟，确认是否删除${e.name}组织`
          ),
        ]),
        showCancelButton: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(() => {
          //删除组织
          this.$http({
            method: "post",
            url: `${quorumApi.delOrg}/${e.id}`,
          }).then((rel) => {
            if (rel.code == 0) {
              this.getData();
              this.$message({
                message: "删除成功",
                type: "success",
              });
            } else {
              this.$message(rel.msg);
            }
          });
        })
        .catch(() => {});
    },
  },
};
</script>
<style scoped lang="scss">
.list-page-body {
  background: #fff;
  .list-page-title {
    height: 55px;
    line-height: 55px;
    font-weight: normal;
    border-bottom: 1px solid #e8ebee;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    .list-page-helps {
      font-size: 12px;
      a {
        margin-left: 10px;
        i {
          font-size: 17px;
          vertical-align: -2px;
          margin-right: 3px;
        }
      }
    }
  }
  .list-page-content {
    overflow: hidden;
    .list-page-tip {
      margin: 10px 20px 20px;
      .module-container {
        position: relative;
        height: 216px;
        margin-bottom: 10px;
      }
      .step {
        position: absolute;
        width: 55px;
        top: 50%;
        transform: translateY(-50%);
        border-left: 1px solid #118dee;
        .arrow-right {
          height: 1px;
          background-color: #118dee;
          &::after {
            content: "";
            position: absolute;
            width: 0;
            height: 0;
            left: 55px;
            top: -4px;
            border-top: 5px solid transparent;
            border-left: 8px solid #118dee;
            border-bottom: 5px solid transparent;
          }
        }
      }
      .step1 {
        margin-left: 198px;
      }
      .step2 {
        margin-left: 441px;
      }
      .step3 {
        margin-left: 684px;
      }
      .module {
        &:last-child {
          margin-right: 0;
        }
        width: 178px;
        height: 176px;
        background-color: #f6f7fb;
        margin-right: 25px;
        padding: 20px 20px;
        float: left;
        .operation {
          width: 178px;
          height: 86px;
          background-color: #e2e5ec;
          position: relative;
          padding: 20px 0;
          margin-bottom: 20px;
          color: #333;
          text-align: center;
          .icon-font {
            margin-bottom: 5px;
            display: inline-block;
            color: #118dee;
          }
          .create,
          .link {
            width: 88px;
            position: absolute;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            .skin-create-button {
              color: #fff;
              background: #108cee;
              border-color: #108cee;
            }
            .btn-con {
              height: 30px;
              cursor: pointer;
              line-height: 30px;
              width: 60px;
              margin: 0 auto;
              i {
                font-size: 14px;
                font-weight: bold;
                vertical-align: -1px;
              }
            }
          }
        }
      }
      .module2,
      .module3,
      .module4,
      .module5 {
        text-align: center;
      }
    }
    .list-page-toolbar {
      margin: 10px 20px;
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
      .btn {
        height: 30px;
        line-height: 30px;
        background: #eaf6fe;
        width: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.5s;
        cursor: pointer;
        i {
          font-size: 14px;
          font-weight: bold;
          color: #108cee;
          transition: all 0.5s;
        }
        &:hover {
          background: #d2ecfd;
        }
      }
    }
  }
}
.pagination {
  padding: 20px 0 40px;
  text-align: right;
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
  span {
    color: #999;
    cursor: no-drop;
  }

  .blue {
    color: #108cee;
    cursor: pointer;
  }
}
</style>
