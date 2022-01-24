<template>
  <div id="main">
    <div class="page">
      <div class="content-panel">
        <div class="success-tip">
          <div class="icon el-icon-success"></div>
          <h2>开通成功！</h2>
          <p style="color:#2c2828;font-size:14px;">
            您购买的服务将在20-30分钟内开通，请耐心等待。
          </p>
          <p>
            <a href="#">查看订单明细</a>
            <router-link to="/baas">管理控制台</router-link>
          </p>
        </div>
        <div class="additional-tips">
          <h3>温馨提示：</h3>
          <ol>
            <li>
              感谢开通百度智能云服务，如您后续的操作遇到困难，您可以点击导航栏的“工单”提交问题。
            </li>
          </ol>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.page {
  padding: 20px;
  .content-panel {
    background: #fff;
    padding: 20px;
    border: 1px solid #d0daf3;
    border-radius: 5px;
  }
  .success-tip {
    padding: 20px 0 0 90px;
    border-top: 1px solid #d0daf3;
    position: relative;
    .icon {
      position: absolute;
      left: 0;
      top: 28px;
      color: #2cb663;
      font-size: 70px;
    }
    h2 {
      font-size: 20px;
      color: #0786e9;
      line-height: 2em;
    }
    p {
      line-height: 2em;
      margin-bottom: 10px;
      a {
        font-size: 14px;
        color: #209bfd;
        margin-right: 20px;
      }
    }
  }
  .additional-tips {
    color: #999;
    line-height: 2em;
    padding: 0;
    ol {
      list-style: decimal;
      margin-left: 15px;
    }
  }
}
</style>
