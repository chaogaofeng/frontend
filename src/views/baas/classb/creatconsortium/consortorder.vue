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
      <div class="content">
        <div class="table">
          <template>
            <el-table
              :data="tableData"
              :header-cell-style="{
                background: '#F6F7FB',
                color: 'rgba(0, 0, 0, 0.85)',
                borderRight: '1px solid #fff',
                fontWeight: 'normal',
              }"
              style="width: 100%; font-size: 12px"
            >
              <el-table-column prop="type" label="产品类型"></el-table-column>
              <el-table-column prop="name" label="产品名称"> </el-table-column>
              <el-table-column label="配置">
                <template slot-scope="scope">
                  <div class="handle">
                    <div v-html="scope.row.config"></div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="number" label="数量"> </el-table-column>
              <el-table-column prop="time" label="时长"> </el-table-column>
              <el-table-column prop="price" label="单价"> </el-table-column>
              <el-table-column prop="pricetype" label="计算方式">
              </el-table-column>
            </el-table>
          </template>
        </div>
        <div class="info">
          <p class="red">
            *后付费服务根据使用情况从账户余额中扣除，请保证有足够的金额。
          </p>
          <p>
            <a href="#">区块链BaaS线上订购协议</a>
          </p>
          <p class="btn">
            <span @click="back1">返回修改</span>
            <el-button @click="submit" size="medium" type="danger"
              >确认</el-button
            >
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import quorumApi from "../../classa/quorum/api";
export default {
  data() {
    return {
      tableData: [],
      createForm: {},
      types: 1,
      allianceId: "",
    };
  },
  created() {
    let high = this.$route.params.high;
    this.types = this.$route.params.types;
    this.allianceId = this.$route.params.allianceId;
    this.createForm = this.$route.params.createForm;
    if (high != undefined && high != null && high != "") {
      if (high == 0) {
        this.tableData = [
          {
            type: "后付费-区块链baas平台",
            name: "区块链Quorum平台",
            config: `<p>可用集群：可用集群</p>
          <p>cpu：4核</p>
          <p>内存：8GB</p>
          <p>高性能储存：100GB</p>
          <p>所在网络：默认私有网络</p>
          <p>所在子网：系统预定义子网</p>`,
            number: 4,
            time: "-",
            price: "￥200/天",
            pricetype: "按时长",
          },
        ];
      } else {
        this.tableData = [
          {
            type: "后付费-区块链baas平台",
            name: "区块链Quorum平台",
            config: `<p>可用集群：可用集群</p>
          <p>cpu：16核</p>
          <p>内存：32GB</p>
          <p>高性能储存：500GB</p>
          <p>所在网络：默认私有网络</p>
          <p>所在子网：系统预定义子网</p>`,
            number: 7,
            time: "-",
            price: "￥300/天",
            pricetype: "按时长",
          },
        ];
      }
    } else {
      this.$router.go(-1);
    }
  },
  methods: {
    back() {
      this.$router.go(-2);
    },
    back1() {
      this.$router.go(-1);
    },
    submit() {
      if (this.types == 2) {
        this.$http({
          method: "post",
          url: quorumApi.addToAlliance,
          params: {
            allianceId: this.allianceId,
            nodeNum: this.createForm.nodenum,
            orgId: this.createForm.organValue,
          },
        }).then((rel) => {
          if (rel.code == 0) {
            this.$router.push("/quorum/consortsuccess");
          } else {
            this.$message(rel.msg);
          }
        });
      } else {
        this.$http({
          method: "post",
          url: quorumApi.addConsort,
          data: {
            nodeNum: this.createForm.nodenum,
            consensus: this.createForm.machvalue,
            cycle: this.createForm.cycle,
            enName: this.createForm.enName,
            name: this.createForm.name,
            note: this.createForm.desc,
            orgId: this.createForm.organValue,
            syncMode: this.createForm.syncMode,
          },
        }).then((rel) => {
          if (rel.code == 0) {
            this.$router.push("/quorum/consortsuccess");
          } else {
            this.$message(rel.msg);
          }
        });
      }
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
  .info {
    text-align: right;
    background: #fff;
    padding: 20px;
    .btn {
      margin-top: 20px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }
    .red {
      color: red;
    }
    a,
    span {
      color: #2468f2;
      cursor: pointer;
    }
    span {
      margin-right: 20px;
    }
  }
}
</style>
