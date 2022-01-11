<template>
  <!-- 计划创建Fabric流程操作步骤进度条 -->
  <el-container>
    <el-header class="list-page-title">
      <h2>联盟</h2>
      <div class="list-page-helps">
        <a target="_blank" href="https://cn.hyperledger.org/projects/fabric">
          <font-awesome-icon :icon="['far', 'comment-dots']" />
          <span>&nbsp;Fabric开源社区</span>
        </a>
        <a target="_blank" href="https://cloud.baidu.com/doc/BBE/index.html">
          <info-icon size="14" class="custom-class"></info-icon>
          <span>&nbsp;产品文档</span>
        </a>
      </div>
    </el-header>
    <el-main class="fabric-list">
      <div class="module-container">
        <div class="step step1">
          <div class="arrow-right"></div>
        </div>
        <div class="module module2">
          <div class="operation">
            <div class="icon-fabric"><globe-icon size="1.25x" class="custom-class"></globe-icon></div>
            <div>创建联盟</div>
            <div class="create">
              <el-button type="primary" icon="el-icon-plus" @click="triggerCreateLeague">创建</el-button>
            </div>
          </div>
          <div>
            <span>创建组织部署Fabric网络</span>
          </div>
        </div>
        <div class="step step2">
          <div class="arrow-right"></div>
        </div>
        <div class="module module3">
          <div class="operation">
            <div class="icon-fabric"><sliders-icon size="1.25x" class="custom-class"></sliders-icon></div>
            <div>邀请组织</div>
            <div class="link">
              <i class="el-icon-link"></i>
              <a target="_blank" href="https://cloud.baidu.com/doc/BBE/s/uk35z2pq5#邀请加入联盟">查看文档</a>
            </div>
          </div>
          <div>
            <span>邀请组织加入联盟网络</span>
          </div>
        </div>
        <div class="step step3">
          <div class="arrow-right"></div>
        </div>
        <div class="module module3">
          <div class="operation">
            <div class="icon-fabric"><life-buoy-icon size="1.25x" class="custom-class"></life-buoy-icon></div>
            <div>通道管理</div>
            <div class="link">
              <i class="el-icon-link"></i>
              <a target="_blank" href="https://cloud.baidu.com/doc/BBE/s/Djxwuhkkg">查看文档</a>
            </div>
          </div>
          <div>
            <span>创建／加入联盟通道</span>
          </div>
        </div>
        <div class="step step4">
          <div class="arrow-right"></div>
        </div>
        <div class="module module4">
          <div class="operation">
            <div class="icon-fabric"><git-branch-icon size="1.25x" class="custom-class"></git-branch-icon></div>
            <div>配置ChainCode</div>
            <div class="link">
              <i class="el-icon-link"></i>
              <a target="_blank" href="https://cloud.baidu.com/doc/BBE/s/Yk35z579x">查看文档</a>
            </div>
          </div>
          <div>
            <span>部署区块链智能合约</span>
          </div>
        </div>
        <div class="module module5">
          <div class="operation">
            <div class="icon-fabric"><settings-icon size="1.25x" class="custom-class"></settings-icon></div>
            <div>配置Dapp参数</div>
            <div class="link">
              <i class="el-icon-link"></i>
              <a target="_blank" href="https://cloud.baidu.com/doc/BBE/s/njwvxwpu4">查看文档</a>
            </div>
          </div>
          <div>
            <span>创建分布式部署应用</span>
          </div>
        </div>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import { InfoIcon, GlobeIcon, SlidersIcon, LifeBuoyIcon, GitBranchIcon, SettingsIcon } from "vue-feather-icons";
export default {
  name: "FabricWorkflow",
  components: {
    InfoIcon,
    GlobeIcon,
    SlidersIcon,
    LifeBuoyIcon,
    GitBranchIcon,
    SettingsIcon
  },
  data() {
    return {};
  },
  created() {},
  methods: {
    triggerCreateLeague() {
      this.$parent.createLeagueShowModal();
    }
  },
};
</script>

<style scoped lang="scss">
.list-page-title {
  box-sizing: border-box;
  height: 55px !important;
  line-height: 55px;
  font-weight: normal;
  border-bottom: 1px solid #e8ebee;
  margin: 0;
  padding-left: 20px;
  h2 {
    display: inline-block;
    font-size: 16px;
  }
  .list-page-helps {
    float: right;
    font-size: 14px;
    a {
      margin-left: 20px;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      height: 16px;
      span {
        display: inline-block;
      }
    }
  }
}

.fabric-list {
  font-size: 12px;
  .module-container {
    position: relative;
    height: 216px;
    margin-bottom: 10px;
    .step {
      position: absolute;
      width: 40px;
      top: 50%;
      transform: translateY(-50%);
      border-left: 1px solid #118DEE;
      .arrow-right {
        height: 1px;
        background-color: #118DEE;
        &::after {
          content: '';
          position: absolute;
          width: 0;
          height: 0;
          left: 90%;
          top: -4px;
          border-top: 5px solid transparent;
          border-left: 8px solid #118DEE;
          border-bottom: 5px solid transparent;
        }
      }
    }
    .step1 {
      margin-left: calc(20% - 35px);
    }
    .module {
      width: calc(20% - 65px);
      height: 176px;
      background-color: #F6F7FB;
      margin-right: 25px;
      padding: 20px 20px;
      float: left;
      .operation {
        width: 100%;
        height: 86px;
        background-color: #E2E5EC;
        position: relative;
        padding: 20px 0;
        margin-bottom: 20px;
        color: #333;
        text-align: center;
        .icon-fabric {
          margin-bottom: 5px;
          display: inline-block;
          color: #118DEE;
        }
        .create {
          margin-top: 10px;
          ::v-deep .el-button {
            padding: 8px 10px;
            [class^=el-icon-] {
              font-family: element-icons!important;
              font-style: normal;
              font-weight: bold;
              font-variant: normal;
              text-transform: none;
              line-height: 1;
              vertical-align: baseline;
              display: inline-block;
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
            }
          }
        }
        .link {
          margin-top: 12px;
          .el-icon-link {
            font-size: 18px;
          }
        }
      }
    }
    .module2 {
      text-align: center;
    }
    .step2 {
      margin-left: calc(40% - 35px);
    }
    .module3 {
      text-align: center;
    }
    .step3 {
      margin-left: calc(60% - 35px);
    }
    .module4 {
      text-align: center;
    }
    .step4 {
      margin-left: calc(80% - 35px);
    }
    .module5 {
      text-align: center;
    }
  }
}
</style>
