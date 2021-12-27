<template>
  <div class="agement-list">
    <div class="breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>安全认证</el-breadcrumb-item>
        <el-breadcrumb-item>Access Key</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="page-body">
      <div class="title"><h2>Access Key</h2></div>
      <div class="content">
        <div class="list-page-toolbar">
          <div class="left">+ 创建Access Key</div>
        </div>
        <div class="form">
          <template>
            <el-table
              :data="accessList"
              :header-cell-style="{
                background: '#F6F7FB',
                color: 'rgba(0, 0, 0, 0.85)',
                borderRight: '1px solid #fff',
                fontWeight: 'normal',
              }"
              style="width: 100%; font-size: 12px"
            >
              <el-table-column prop="access" label="Access Key">
              </el-table-column>
              <el-table-column prop="secret" label="Secret Key">
              </el-table-column>
              <el-table-column label="状态" width="100">
                <template slot-scope="scope"
                  ><div class="policy">{{ scope.row.status }}</div></template
                >
              </el-table-column>
              <el-table-column prop="msg" label="说明"></el-table-column>
              <el-table-column prop="starttime" label="创建时间">
              </el-table-column>
              <el-table-column prop="endtime" label="最后使用时间">
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <div class="handle">
                    <span class="blue" @click="del(scope.row)">禁用</span>
                    <span class="blue" @click="del(scope.row)">删除</span>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </div>
        <div class="pagination">
          <el-pagination background layout="prev, pager, next" :total="10">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: "",
      accessList: [
        {
          access: "6f7f04b3ff0d461d82f67c571c7b5105",
          secret: "显示",
          status: "已启用",
          msg: "-",
          starttime: "2021-11-18 16:47:18",
          endtime: "2021-11-19 16:47:18",
        },
        {
          access: "6f7f04b3ff0d461d82f67c571c7b5105",
          secret: "显示",
          status: "已启用",
          msg: "-",
          starttime: "2021-11-18 16:47:18",
          endtime: "2021-11-19 16:47:18",
        },
      ],
    };
  },
  methods: {
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
            `是否确认删除该${e.name}角色，删除后不可恢复！请确定是否删除?`
          ),
        ]),
        showCancelButton: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(() => {
          this.$message({
            message: "删除成功",
            type: "success",
          });
        })
        .catch(() => {});
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
    .title {
      height: 55px;
      line-height: 55px;
      font-weight: normal;
      border-bottom: 1px solid #e8ebee;
      margin: 0;
      padding-left: 20px;
    }
    .content {
      .list-page-tip {
        margin: 10px 20px;
        .tip-grey {
          color: #999;
          background-color: #f7f7f7;
          display: inline-block;
          padding: 5px 15px;
          line-height: 20px;
          font-size: 12px;
          -webkit-border-radius: 3px;
          -moz-border-radius: 3px;
          border-radius: 3px;
          i {
            margin-left: 10px;
            font-style: normal;
          }
        }
        .setLoginUrl {
          height: 30px;
          font-size: 12px;
          padding: 0 12px;
          line-height: 30px;
          text-align: center;
          color: #108cee;
          background-color: #eaf6fe;
          display: inline-block;
          margin-left: 5px;
        }
      }
      .list-page-toolbar {
        margin: 20px 20px 10px;
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
        .right {
          .input {
            width: 300px;
            font-size: 12px;
          }
        }
      }
      .pagination {
        padding: 20px 0 40px;
        text-align: right;
      }
    }
    .form {
      .policy {
        max-width: 300px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .handle {
        span {
          cursor: pointer;
        }
        .blue {
          color: #108cee;
          margin-right: 5px;
        }
      }
    }
  }
}
.transfer-tit {
  font-size: 14px;
  padding-bottom: 15px;
}
.transfer-bot {
  padding-top: 20px;
  text-align: right;
}
</style>
