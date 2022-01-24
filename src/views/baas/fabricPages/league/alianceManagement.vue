<template>
  <div class="container-wrapper" v-loading="loadingAlianceInfo">
    <el-row type="flex" class="row-base">
      <el-col :span="24">
        <h2 class="current-title">{{ alianceDetails.name }}</h2>
        <span v-if="alianceDetails.state === '失败'" class="league-state">
          <font-awesome-icon class="red-round" :icon="['fas', 'circle']" />{{ alianceDetails.state }}
        </span>
        <span v-else-if="alianceDetails.state === '部署中'">
          <font-awesome-icon class="in-progess-round" :icon="['fas', 'circle']" />{{ alianceDetails.state }}
        </span>
        <span v-else>
          <font-awesome-icon class="green-round" :icon="['fas', 'circle']" />{{ alianceDetails.state }}
        </span>
      </el-col>
    </el-row>
    <div class="page-item">      
      <el-row type="flex" class="item-row-base">
        <el-col :span="16">
          <div class="moudelTlt">基本信息</div>
        </el-col>
        <el-col :span="8">
          <el-button type="primary" size="small" @click="watchMonitor">查看监控</el-button>
        </el-col>
      </el-row>
      <el-row class="row-content-oneline" align="middle">
        <el-col :span="8">
          <label class="record-item">UUID:<span class="plain">{{ alianceDetails.uuid }}</span></label>          
        </el-col>
        <el-col :span="8">
          <label class="record-item">联盟名称:<span class="plain">{{ alianceDetails.name }}</span></label>
        </el-col>
        <el-col :span="8">
          <label class="record-item">英文名:<span class="plain">{{ alianceDetails.enName }}</span></label>
        </el-col>
      </el-row>
      <el-row class="row-content-oneline" align="middle">
        <el-col :span="8">
          <label class="record-item">底层架构:<span class="plain">{{ alianceDetails.bottomFrame }}</span></label>
        </el-col>
        <el-col :span="8">
          <label class="record-item">共识机制:<span class="plain">{{ alianceDetails.consensuses }}</span></label>
        </el-col>
        <el-col :span="8">
          <label class="record-item">数据类型:<span class="plain">{{ alianceDetails.databaseType }}</span></label>
        </el-col>
      </el-row>
      <el-row class="row-content-oneline" align="middle">
        <el-col :span="8" style="margin-top: 5px">
          <label class="record-item">联盟描述:<span class="plain">{{ alianceDetails.desc }}</span></label>
        </el-col>
        <el-col :span="8">
          <label class="record-item">证书管理:<el-button class="plain" type="primary" size="small" plain @click.stop="download(alianceDetails.fileObj)">{{ alianceDetails.downloadShowName }}</el-button></label>
        </el-col>
        <el-col :span="8" style="margin-top: 5px">
          <label class="record-item">IPv6网络:<span class="plain">{{ alianceDetails.ipv6Fg }}</span></label>
        </el-col>
      </el-row>
    </div>
    <!-- start 跳转监控的对话框 -->
    <el-dialog
      :visible.sync="tipWatchModal"
      :close-on-click-modal="false"
      :destroy-on-close="true"
      :show-close="false"
      center
      width="450px"
      :top="watchModalTop"
    >
      <template slot="title">
        <h3 style="text-align:left;">提示</h3>
        <x-icon size="16" class="close-ico" @click="tipWatchModal=false"></x-icon>
      </template>
      <div class="tip-info">
        <alert-circle-icon size="24" class="warning-ico"></alert-circle-icon>
        <p>
          跳转后需要输入密码，账户：fabric，密码：<br />
          新建联盟UUID;<br />
          通过验证即可正常浏览grafana监控页面，<br />
          grafana默认账户密码admin/admin,为了安全起见，<br />
          <em>请用户首次登录修改grafana默认密码</em>
        </p>
      </div>
      <template slot="footer">
        <el-button type="primary" size="small" @click="goWatch">确定</el-button>
        <el-button size="small" @click="tipWatchModal=false">取消</el-button>
      </template>
    </el-dialog>
    <!-- 跳转监控的对话框 end -->
  </div>
</template>

<script>
import { XIcon, AlertCircleIcon } from "vue-feather-icons";

export default {
  name: "LeagueInfo",
  components: {
    XIcon,
    AlertCircleIcon
  },
  data() {
    return {
      alianceDetails: {
        uuid: "74734-3df4-3dff-fsde3-34744dhd",
        name: "联盟1",
        state: "运行中",
        enName: "union01",
        bottomFrame: "Fabric",
        consensuses: "RAFT",
        databaseType: "CouchDB",
        desc: "我自己创建的第一个联盟！",
        downloadShowName: "下载sdk文件",
        fileObj: "1.pem",
        ipv6Fg: "否",
      },
      loadingAlianceInfo: false,
      tipWatchModal: false
    };
  },
  created() {
    this.$root.$emit("changeLeftMenu", "fabricLeagueMenus");
  },
  computed: {
    watchModalTop: function() {
      return "calc(50vh - 155px)";
    },
  },
  methods: {
    download(fileName) {
      alert("下载sdk文件");
    },
    watchMonitor() {
      this.tipWatchModal = true;
    },
    goWatch() {
      this.tipWatchModal = false;
      alert("准备跳往监控查看页面");
    }
  },
};
</script>

<style lang='scss' scoped>
.container-wrapper {
  .row-base {
    padding: 0 15px;
    border-bottom: 1px solid #E8EBEE;
    .current-title {
      display: inline-block;
      font-size: 16px;
      width: 90px;
      height: 50px;
      line-height: 50px;
    }
  }
  .page-item {
    padding-bottom: 15px;
    min-height: 400px;
    .item-row-base {
      padding: 20px 15px 15px;
      .moudelTlt {
        color: #333;
        font-size: 14px;
        border-left: solid 4px #108cee;
        padding-left: 14px;
        height: 32px;
        line-height: 32px;
      }
    }
    .row-content-oneline {      
      padding: 0 15px;
      height: 32px;
      line-height: 32px;
      .record-item {
        display: inline-flex;
        font-size: 12px;
        .plain {
          margin-left: 10px;
        }
      }
    }
  }
  ::v-deep .el-dialog--center {
    .el-dialog__header {
      padding: 10px 15px;
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      align-items: center;
      background-color: #f6f7fb;
      h3 {
        color: #333;
        font-weight: normal;
      }
      .close-ico {
        cursor: pointer;
        color: #333;
      }
    }
    .tip-info {
      display: flex;
      flex-flow: row nowrap;
      justify-content: flex-start;
      align-items: flex-start;
      padding: 5px 5px;
      height: 150px;
      .warning-ico {
        width: 24px;
        height: 30px;
        color: #F4B329;
      }
      p {
        padding-left: 26px;
        display: inline-block;
        height: 60px;
        line-height: 30px;
        font-size: 14px;
        color: #666;
      }
    }
    .el-dialog__footer {
      border-top: 1px solid #eceff8;
      padding: 12px 30px 12px 0;
      text-align: right;
    }
  }
  .alert-custom {
    width: 460px;
    padding: 10px 2px;
    margin-bottom: 20px;
    background-color: #FCF7F1;
    line-height: 20px;
    color: #F38900;
  }
  .explain {
    color: #999;
    padding-left: 100px;
    font-size: 12px;
    margin-top: -14px;
    margin-bottom: 14px;
  }
}

</style>