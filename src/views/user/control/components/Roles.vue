<template>
  <div class="roles">
    <div class="left">
      <div class="table-tit">全部角色（{{ rolesData.length }}）</div>
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
            placeholder="请输入角色名称进行搜索"
            @input="searchChange"
          ></el-input>
        </div>
        <div class="box">
          <el-table
            :row-key="getKey"
            ref="multipleTable"
            :data="rolesDataFilter"
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
            <el-table-column width="160" prop="roleName" label="角色名称">
            </el-table-column>
            <el-table-column prop="roleNote" label="角色描述">
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <div class="right">
      <div class="table-tit">
        已选择的角色（{{ chooseTable.length }}）
        <span @click="clearItem" v-show="chooseTable.length > 0">全部清除</span>
      </div>
      <div class="table-con">
        <div
          class="chooseitem"
          v-for="(item, index) in chooseTable"
          :key="index"
        >
          {{ item.roleName }}
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
          label: "全部角色",
        },
      ],
      filterVal: "全部角色",
      filterSearch: "",
    };
  },
  watch: {
    chooseTable: {
      handler: function (val) {
        this.$nextTick(() => {
          if (val.length > 0) {
            val.forEach((data) => {
              if (this.rolesData.indexOf(data) != -1) {
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
    //文字搜索
    rolesDataFilter: function () {
      var _search = this.filterSearch;
      if (_search) {
        return this.rolesData.filter(function (e) {
          return e.roleName == _search;
        });
      }
      return this.rolesData;
    },
  },
  props: {
    chooseTable: {
      type: Array,
    },
    rolesData: {
      type: Array,
    },
  },
  methods: {
    getKey(e) {
      return e.id;
    },
    clearSearch() {
      this.filterSearch = "";
    },
    searchChange(e) {
      this.filterSearch = e;
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
.roles {
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
