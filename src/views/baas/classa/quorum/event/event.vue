<template>
  <div class="create-main">
    <div class="event-title">事件中心</div>
    <div class="content">
      <div class="event-select">
        <div class="left">
          <label>事件类型：</label>
          <span :class="{ act: menu == 1 }" @click="checkMenu(1)">待办</span>
          <span :class="{ act: menu == 2 }" @click="checkMenu(2)">已完成</span>
          <span :class="{ act: menu == 3 }" @click="checkMenu(3)">通知</span>
        </div>
        <div class="right">
          <div class="btn" @click="refresh">
            <i class="el-icon-refresh-right"></i>
          </div>
        </div>
      </div>
      <div class="detail-parts-table">
        <div class="box border" v-show="menu == 1 || menu == 2">
          <div class="tit">申请事件</div>
          <div class="form">
            <template>
              <el-table
                v-loading="tableLoading1"
                :data="applyTable"
                max-height="600"
                :header-cell-style="{
                  background: '#F6F7FB',
                  color: 'rgba(0, 0, 0, 0.85)',
                  borderRight: '1px solid #fff',
                  fontWeight: 'normal',
                }"
                style="width: 100%; font-size: 12px"
              >
                <el-table-column prop="name" label="事件名称">
                </el-table-column>
                <el-table-column prop="bringUser" label="发起方">
                </el-table-column>
                <el-table-column prop="allianceName" label="相关联盟">
                </el-table-column>
                <el-table-column prop="status" label="事件状态">
                  <template slot-scope="scope">
                    <span v-if="scope.row.status == 1">审批中</span>
                    <span v-else-if="scope.row.status == 2">已完成</span>
                    <span v-else>-</span>
                  </template>
                </el-table-column>
                <el-table-column prop="beginTime" label="发起时间">
                </el-table-column>
                <el-table-column label="结束时间">
                  <template slot-scope="scope">
                    <span v-if="scope.row.endTime">{{
                      scope.row.endTime
                    }}</span>
                    <span v-else>-</span>
                  </template>
                </el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <div class="handle">
                      <p>
                        <span class="blue" @click="look(scope.row)"
                          >查看审批流</span
                        >
                      </p>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </div>
          <div class="pagination" v-if="totalPage1 != null">
            <el-pagination
              :page-size="pageSize"
              :page-count="totalPage1"
              background
              @current-change="pageChange1"
              layout="prev, pager, next"
            >
            </el-pagination>
          </div>
        </div>
        <div class="box" v-show="menu == 1 || menu == 2">
          <div class="tit">审批事件</div>
          <div class="form">
            <template>
              <el-table
                v-loading="tableLoading2"
                :data="eventTable"
                max-height="600"
                :header-cell-style="{
                  background: '#F6F7FB',
                  color: 'rgba(0, 0, 0, 0.85)',
                  borderRight: '1px solid #fff',
                  fontWeight: 'normal',
                }"
                style="width: 100%; font-size: 12px"
              >
                <el-table-column prop="name" label="事件名称">
                </el-table-column>
                <el-table-column prop="bringUser" label="发起方">
                </el-table-column>
                <el-table-column prop="allianceName" label="相关联盟">
                </el-table-column>
                <el-table-column prop="status" label="事件状态">
                  <template slot-scope="scope">
                    <span v-if="scope.row.status == 1">审批中</span>
                    <span v-else-if="scope.row.status == 2">已完成</span>
                    <span v-else>-</span>
                  </template>
                </el-table-column>
                <el-table-column prop="beginTime" label="发起时间">
                </el-table-column>
                <el-table-column label="结束时间">
                  <template slot-scope="scope">
                    <span v-if="scope.row.endTime">{{
                      scope.row.endTime
                    }}</span>
                    <span v-else>-</span>
                  </template>
                </el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <div class="handle" v-if="scope.row.status == 1">
                      <p>
                        <span class="blue" @click="applyApprove(scope.row, 1)"
                          >接受邀请</span
                        >
                      </p>
                      <p>
                        <span class="blue" @click="applyApprove(scope.row, 2)"
                          >拒绝邀请</span
                        >
                      </p>
                    </div>
                    <div class="handle" v-else>
                      <div v-if="scope.row.canAdd2Alliance == true">
                        <span class="blue" @click="join(scope.row)"
                          >加入联盟</span
                        >
                      </div>
                      <div v-else>
                        <p>
                          <span class="blue" @click="approve(scope.row, 1)"
                            >通过申请</span
                          >
                        </p>

                        <p>
                          <span class="blue" @click="approve(scope.row, 2)"
                            >驳回申请</span
                          >
                        </p>
                      </div>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </div>
          <div class="pagination" v-if="totalPage2 != null">
            <el-pagination
              :page-size="pageSize"
              :page-count="totalPage2"
              background
              @current-change="pageChange2"
              layout="prev, pager, next"
            >
            </el-pagination>
          </div>
        </div>
        <div class="box" v-show="menu == 3">
          <div class="form">
            <template>
              <el-table
                v-loading="tableLoading3"
                :data="messageTabale"
                max-height="600"
                :header-cell-style="{
                  background: '#F6F7FB',
                  color: 'rgba(0, 0, 0, 0.85)',
                  borderRight: '1px solid #fff',
                  fontWeight: 'normal',
                }"
                style="width: 100%; font-size: 12px"
              >
                <el-table-column prop="name" label="事件名称">
                </el-table-column>
                <el-table-column prop="bringUser" label="发起方">
                </el-table-column>
                <el-table-column prop="beginTime" label="发起时间">
                </el-table-column>
              </el-table>
            </template>
          </div>
          <div class="pagination" v-if="totalPage3 != null">
            <el-pagination
              :page-size="pageSize"
              :page-count="totalPage3"
              background
              @current-change="pageChange3"
              layout="prev, pager, next"
            >
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import quorumApi from "../api.js";
export default {
  data() {
    return {
      tableLoading1: true,
      tableLoading2: true,
      tableLoading3: true,
      menu: 1,
      eventType: 1, // 1：申请事件 2：审批事件
      status: 1, //事件状态 1：审批中 2：已完成
      subType: 1, //子类别 1 ：普通事件 2：通知
      pageNo1: 1, //当前页数
      pageNo2: 1, //当前页数
      pageNo3: 1, //当前页数
      pageSize: 10, //每页条数
      totalPage1: null, //总页数
      totalPage2: null, //总页数
      totalPage3: null, //总页数
      applyTable: [],
      eventTable: [],
      messageTabale: [],
    };
  },
  created() {
    this.getData(1, this.status, this.subType);
    this.getData(2, this.status, this.subType);
  },
  methods: {
    approve(e, type) {
      this.$http({
        method: "post",
        url: quorumApi.applyApprove,
        data: {
          eventId: e.id,
          type: type,
        },
      }).then((rel) => {
        if (rel.code == 0) {
          this.getData(1, this.status, this.subType);
          this.getData(2, this.status, this.subType);
        } else {
          this.$message(rel.msg);
        }
      });
    },
    applyApprove(e, type) {
      this.$http({
        method: "post",
        url: quorumApi.inviteApprove,
        data: {
          eventId: e.id,
          type: type,
        },
      }).then((rel) => {
        if (rel.code == 0) {
          this.getData(1, this.status, this.subType);
          this.getData(2, this.status, this.subType);
        } else {
          this.$message(rel.msg);
        }
      });
    },
    look(e) {
      console.log(e);
    },
    join(e) {
      this.$router.push({
        name: "creatconsortium",
        query: { type: "join", allianceId: e.allianceId },
      });
    },
    checkMenu(type) {
      this.menu = type;
      if (type == 1) {
        this.status = 1;
        this.subType = 1;
        this.getData(1, this.status, this.subType);
        this.getData(2, this.status, this.subType);
      }
      if (type == 2) {
        this.status = 2;
        this.subType = 1;
        this.getData(1, this.status, this.subType);
        this.getData(2, this.status, this.subType);
      }
      if (type == 3) {
        this.status = 1;
        this.subType = 2;
        this.getData(1, this.status, this.subType);
      }
    },
    pageChange1(num) {
      this.pageNo1 = num;
      this.getData(1, this.status, this.subType);
    },
    pageChange2(num) {
      this.pageNo2 = num;
      this.getData(2, this.status, this.subType);
    },
    pageChange3(num) {
      this.pageNo3 = num;
      this.getData(1, this.status, this.subType);
    },
    refresh() {
      this.menu = 1;
      this.pageNo1 = 1;
      this.pageNo2 = 1;
      this.pageNo3 = 1;
      this.eventType = 1;
      this.status = 1;
      this.subType = 1;
      this.totalPage1 = null;
      this.totalPage2 = null;
      this.totalPage3 = null;
      this.getData(1, this.status, this.subType);
      this.getData(2, this.status, this.subType);
    },
    getData(eventType, status, subType) {
      let pageNo = "";
      if (subType == 1 && eventType == 1) {
        pageNo = this.pageNo1;
      }
      if (subType == 1 && eventType == 2) {
        pageNo = this.pageNo2;
      }
      if (subType == 2) {
        pageNo = this.pageNo3;
      }

      this.$http({
        method: "get",
        url: quorumApi.getEvent,
        params: {
          pageNo: pageNo,
          pageSize: this.pageSize,
          status: status,
          subType: subType,
          allianceType: 2,
          eventType: eventType,
          type: 1,
        },
      }).then((rel) => {
        console.log(rel);
        if (rel.code == 0) {
          if (subType == 1 && eventType == 1) {
            this.applyTable = [];
            if (rel.data.dataList.length > 0) {
              this.applyTable = rel.data.dataList || [];
              this.totalPage1 = rel.data.totalPage;
            } else {
              this.totalPage1 = null;
            }
            this.tableLoading1 = false;
          }

          if (subType == 1 && eventType == 2) {
            this.eventTable = [];
            if (rel.data.dataList.length > 0) {
              this.eventTable = rel.data.dataList || [];
              this.totalPage2 = rel.data.totalPage;
            } else {
              this.totalPage2 = null;
            }
            this.tableLoading2 = false;
          }
          if (subType == 2) {
            this.messageTabale = [];
            if (rel.data.dataList.length > 0) {
              this.messageTabale = rel.data.dataList || [];
              this.totalPage3 = rel.data.totalPage;
            } else {
              this.totalPage3 = null;
            }
            this.tableLoading3 = false;
          }
        } else {
          this.$message(rel.msg);
        }
      });
    },
  },
};
</script>
<style scoped lang="scss">
.create-main {
  padding: 10px 20px;
}
.event-title {
  font-size: 16px;
}
.content {
  .event-select {
    padding: 20px 20px 10px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 12px;
    .left {
      span {
        background: #eaf6fe;
        color: #108cee;
        padding: 8px 12px;
        margin-right: 1px;
        cursor: pointer;
        &:hover {
          background: #d2ecfd;
        }
        &.act {
          background: #108cee;
          color: #fff;
        }
        &.act:hover {
          background-color: #209bfd;
        }
      }
    }
    .right {
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
  .detail-parts-table {
    padding: 20px;
    min-height: 300px;

    .box {
      .tit {
        color: #333;
        font-size: 16px;
        border-left: solid 4px #108cee;
        padding-left: 14px;
        margin-bottom: 15px;
      }
      &.border {
        border-bottom: 1px solid #e3e5eb;
        margin-bottom: 30px;
      }
      .form {
        margin-bottom: 20px;
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
}
.handle {
  color: #999;
  cursor: pointer;
  .blue {
    color: #108cee;
  }
}
.pagination {
  padding: 20px 0 40px;
  text-align: right;
}
</style>
