<template>
  <div class="transfer">
    <div class="left">
      <div class="table-tit">全部策略（{{ transferData.length }}）</div>
      <div class="table-con">
        <div class="filters">
          <el-select class="select" v-model="filterVal" placeholder="请选择">
            <el-option
              v-for="item in filterOpt"
              :key="item.value"
              :value="item.label"
            >
            </el-option>
          </el-select>
          <el-input
            class="ipt"
            v-model="filterSearch"
            placeholder="请输入策略名称进行搜索"
          ></el-input>
        </div>
        <div class="box">
          <el-table
            :row-key="getKey"
            ref="multipleTable"
            :data="tableDataFilter"
            tooltip-effect="dark"
            :header-cell-style="{
              background: '#f6f7fb',
              fontSize: '12px',
              color: '#333',
            }"
            :cell-style="{ fontSize: '12px' }"
            @select="chooseItem"
            @select-all="chooseItem"
          >
            <el-table-column
              :reserve-selection="true"
              type="selection"
              width="50"
            >
            </el-table-column>
            <el-table-column width="160" prop="strategyName" label="策略名称">
            </el-table-column>
            <el-table-column prop="strategyNote" label="策略描述">
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <div class="right">
      <div class="table-tit">
        已选择的策略（{{ chooseTable.length }}）
        <span @click="clearItem" v-show="chooseTable.length > 0">全部清除</span>
      </div>
      <div class="table-con">
        <div
          class="chooseitem"
          v-for="(item, index) in chooseTable"
          :key="index"
        >
          {{ item.strategyName }}
          <i @click="delItem(item, index)" class="el-icon-circle-close"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      filterOpt: [
        {
          value: "1",
          label: "全部策略",
        },
        {
          value: "2",
          label: "系统策略",
        },
        {
          value: "3",
          label: "自定义策略",
        },
      ],
      filterVal: "全部策略",
      filterSearch: "",
    };
  },
  watch: {
    chooseTable: {
      handler: function (val) {
        this.$nextTick(() => {
          if (val.length > 0) {
            val.forEach((data) => {
              if (this.transferData.indexOf(data) != -1) {
                this.$refs.multipleTable.toggleRowSelection(data, true);
              }
            });
          }
        });
      },
      deep: true,
      immediate: true,
    },
  },
  computed: {
    //过滤方法
    tableDataFilter: function () {
      var _search = this.filterVal;
      var that = this;
      if (_search && that.filterVal != "全部策略") {
        if (that.filterSearch) {
          return that.transferData.filter(function (e) {
            let str = e.strategyType == 1 ? "自定义策略" : "系统策略";
            return str == _search && e.strategyName == that.filterSearch;
          });
        } else {
          return that.transferData.filter(function (e) {
            let str = e.strategyType == 1 ? "自定义策略" : "系统策略";
            return str == _search;
          });
        }
      } else {
        //文字搜索
        if (that.filterSearch) {
          return that.transferData.filter(function (e) {
            return e.strategyName == that.filterSearch;
          });
        } else {
          return that.transferData;
        }
      }
    },
  },
  props: {
    chooseTable: {
      type: Array,
    },
    transferData: {
      type: Array,
    },
  },
  methods: {
    clearSearch() {
      this.filterSearch = "";
      this.filterVal = "全部策略";
    },
    getKey(e) {
      return e.id;
    },
    chooseItem(e) {
      this.$emit("getTable", [...e]);
    },
    delItem(e, index) {
      this.chooseTable.splice(index, 1);
      this.$refs.multipleTable.toggleRowSelection(e, false);
    },
    clearItem() {
      this.$refs.multipleTable.clearSelection();
      this.$emit("clearItem");
    },
  },
};
</script>

<style scoped lang="scss">
.transfer {
  overflow: hidden;
  width: 800px;
  background: #fff;
  .left {
    width: 500px;
    float: left;
    margin-right: 20px;
    border: 1px solid #eceff7;
  }
  .right {
    width: 250px;
    float: left;
    border: 1px solid #eceff7;
  }
  .table-tit {
    padding: 10px 15px;
    background: #f6f7fb;
    span {
      float: right;
      color: #368de7;
      margin-right: 10px;
      cursor: pointer;
    }
  }
  .table-con {
    padding: 10px;
    height: 300px;
    overflow-y: scroll;
    .filters {
      display: flex;
      align-items: center;
      margin-bottom: 15px;
      .select {
        width: 120px;
        margin-right: 10px;
        ::v-deep .el-input__inner {
          font-size: 12px;
          color: #108cee;
          background-color: #eaf6fe;
          border: 1px solid #eaf6fe;
        }
        ::v-deep .el-input__suffix-inner i {
          color: #2468f2;
          font-weight: bold;
        }
      }
      .ipt {
        flex: 1;
        width: 0;
      }
    }
    .chooseitem {
      padding-right: 15px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      position: relative;
      margin-bottom: 8px;
      i {
        position: absolute;
        right: 0;
        top: 0;
        font-size: 16px;
        color: #999;
        cursor: pointer;
      }
    }
  }
}
</style>
