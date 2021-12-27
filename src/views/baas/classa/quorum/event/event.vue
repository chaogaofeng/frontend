<template>
  <div class="create-main">
    <div class="event-title">事件中心</div>
    <div class="content">
      <div class="event-select">
        <div class="left">
          <label>事件类型：</label>
          <span :class="{ act: menu == 1 }" @click="menu = 1">待办</span>
          <span :class="{ act: menu == 2 }" @click="menu = 2">已完成</span>
          <span :class="{ act: menu == 3 }" @click="menu = 3">通知</span>
        </div>
        <div class="right">
          <div class="btn"><i class="el-icon-refresh-right"></i></div>
        </div>
      </div>
      <div class="detail-parts-table">
        <div class="box border" v-show="menu == 1 || menu == 2">
          <div class="tit">申请事件</div>
          <div class="form">
            <template>
              <el-table
                v-loading="applyLoading"
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
                <el-table-column prop="from" label="发起方"> </el-table-column>
                <el-table-column prop="about" label="相关联盟">
                </el-table-column>
                <el-table-column prop="state" label="事件状态">
                </el-table-column>
                <el-table-column prop="startTime" label="发起时间">
                </el-table-column>
                <el-table-column prop="endTime" label="结束时间">
                </el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <div class="handle">
                      <span class="blue" @click="del(scope.row)">删除</span>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </div>
        </div>
        <div class="box" v-show="menu == 1 || menu == 2">
          <div class="tit">申请事件</div>
          <div class="form">
            <template>
              <el-table
                v-loading="applyLoading"
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
                <el-table-column prop="from" label="发起方"> </el-table-column>
                <el-table-column prop="about" label="相关联盟">
                </el-table-column>
                <el-table-column prop="state" label="事件状态">
                </el-table-column>
                <el-table-column prop="startTime" label="发起时间">
                </el-table-column>
                <el-table-column prop="endTime" label="结束时间">
                </el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <div class="handle">
                      <span class="blue" @click="del(scope.row)">删除</span>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </div>
        </div>
        <div class="box" v-show="menu == 3">
          <div class="tit">申请事件</div>
          <div class="form">
            <template>
              <el-table
                v-loading="eventLoading"
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
                <el-table-column prop="from" label="发起方"> </el-table-column>
                <el-table-column prop="startTime" label="发起时间">
                </el-table-column>
              </el-table>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      applyLoading: false,
      menu: 1,
      applyTable: [
        // {
        //   name: "123",
        //   from: "123",
        //   about: "123",
        //   state: "1",
        //   startTime: "123",
        //   endTime: "123",
        // },
      ],
      eventLoading: false,
      eventTable: [
        // {
        //   name: "123",
        //   from: "123",
        //   startTime: "123",
        // },
      ],
    };
  },
  created() {},
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
</style>
