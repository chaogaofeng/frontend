<template>
  <div id="main">
    <div class="page">
      <div class="page-main">
        <div class="block">
          <div class="instance-info">
            <h1>名字</h1>
            <p class="api">api在线调用</p>
          </div>
        </div>
        <div class="block">
          <div class="info">
            <div class="tit">基本信息</div>
            <div class="con">
              <div class="row">
                <div class="l">
                  <div class="label">合约名称：</div>
                  <div class="ipt">2321323</div>
                </div>
                <div class="l">
                  <div class="label">合约Uuid：</div>
                  <div class="ipt">2321323</div>
                </div>
              </div>
              <div class="row">
                <div class="l">
                  <div class="label">合约地址：</div>
                  <div class="ipt">2321323</div>
                </div>
                <div class="l">
                  <div class="label">owner地址：</div>
                  <div class="ipt">2321323</div>
                </div>
              </div>
              <div class="row">
                <div class="l">
                  <div class="label">合约状态：</div>
                  <div class="ipt"><span>运行中</span></div>
                </div>
                <div class="l">
                  <div class="label">合约类型：</div>
                  <div class="ipt"><span>自定义合约</span></div>
                </div>
              </div>
              <div class="row">
                <div class="l">
                  <div class="label">合约创建时间：</div>
                  <div class="ipt">2321323</div>
                </div>
                <div class="l">
                  <div class="label">合约更新时间：</div>
                  <div class="ipt">2321323</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="block">
          <div class="info">
            <div class="tit">合约简介</div>
            <div class="con">
              <div class="row">
                <div class="l">
                  <div class="ipt">大大大</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="block">
          <div class="info">
            <div class="tit">ABI <i class="el-icon-arrow-right"></i></div>
          </div>
        </div>
        <div class="block">
          <div class="info">
            <div class="tit">合约源码 <i class="el-icon-arrow-right"></i></div>
          </div>
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
      id: "",
      data: {},
    };
  },
  created() {
    this.id = this.$route.query.id;
    this.$http({
      method: "get",
      url: `${quorumApi.contractDeployDetaile}/${this.id}`,
    }).then((rel) => {
      console.log(rel);
      if (rel.code == 0) {
      } else {
        this.$message(rel.msg);
      }
    });
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.page {
  padding: 20px;
  .page-main {
    background: #fff;
  }
  .block {
    padding: 25px 20px;
    border-bottom: 1px solid #e8ebee;
  }

  .instance-info {
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    h1 {
      font-size: 22px;
    }
    p {
      font-size: 14px;
      color: #108cee;
    }
  }
  .info {
    .tit {
      color: #333;
      font-size: 16px;
      border-left: solid 4px #108cee;
      padding-left: 14px;
      margin-bottom: 25px;
      i {
        font-weight: bold;
        color: #666;
        font-size: 18px;
      }
    }
    .con {
      .row {
        display: flex;
        align-items: center;
        .l {
          flex: 1;
          padding: 10px 0;
          display: flex;
          align-items: center;
          .label {
            width: 140px;
            color: #666;
            font-size: 14px;
          }
          .ipt {
            font-size: 14px;
            color: #000;
            span {
              display: inline-block;
              background: rgb(116, 181, 102);
              padding: 5px 10px;
              border-radius: 5px;
              color: #fff;
            }
          }
        }
      }
    }
  }
}
</style>
