<template>
  <div class="control">
    <div id="main">
      <div class="page">
        <div class="instance-info">
          <h1>概述</h1>
          <div class="btn">
            <i class="el-icon-refresh-right"></i>
          </div>
        </div>
        <div class="platform block-wrap">
          <div class="title">Baas平台用户指南</div>
          <div class="step-wrap first-step">
            <span class="arrowRight">Step 1：选择恰当的区块链框架</span>
            <div class="step-content">
              <div class="links">
                <a href="https://www.baidu.com">企业级联盟链 Fabric</a>
                <router-link to="/baas/quorum/consortium"
                  >企业级金融联盟链 Quorum</router-link
                >
              </div>
              <div class="links">
                <a href="https://www.baidu.com">百度超级链 XuperChain</a
                ><a href="https://www.baidu.com">私有链以太坊 Ethereum</a>
              </div>
            </div>
          </div>
          <div class="step-wrap">
            <span class="arrowRight">Step 2：选择恰当的区块链框架</span>
            <div class="step-content">
              <p>
                当您确定适合您业务场景的区块链框架后，您可以创建/加入一个联盟，进行后续的联盟管理，智能合约管理等操作
              </p>
              <div>
                <a href="https://www.baidu.com" target="_blank">帮助文档</a>
              </div>
            </div>
          </div>
          <div class="step-wrap">
            <span class="arrowRight">Step 3：选择恰当的区块链框架</span>
            <div class="step-content">
              <p>
                如果您还对业务与区块链的结合没有明确的方向，您可以查看百度区块链产品手册，或者直接与我们联系
              </p>
              <div>
                <a href="https://www.baidu.com" target="_blank">帮助文档</a>
                <a
                  href="https://www.baidu.com"
                  style="margin-left: 20px"
                  target="_blank"
                  >立即咨询</a
                >
              </div>
            </div>
          </div>
        </div>
        <div class="info">
          <div class="block-wrap frame">
            <div class="title">区块链框架介绍</div>
            <section class="card">
              <header class="head">
                <h2>Fabric</h2>
                <a
                  target="_blank"
                  class="link"
                  href="https://cloud.baidu.com/doc/BBE/s/wk35ndpz7"
                  >更多&gt;</a
                >
              </header>
              <p class="content">
                Fabric企业级、开源、可插拔的通用区块链网络结构
              </p>
            </section>
            <section class="card">
              <header class="head">
                <h2>Quorum</h2>
                <a
                  target="_blank"
                  class="link"
                  href="https://cloud.baidu.com/doc/BBE/s/lk36zvtrq"
                  >更多&gt;</a
                >
              </header>
              <p class="content">企业级金融联盟链网络</p>
            </section>
            <section class="card">
              <header class="head">
                <h2>Ethereum</h2>
                <a
                  target="_blank"
                  class="link"
                  href="https://cloud.baidu.com/doc/BBE/s/hjxwtxi9q"
                  >更多&gt;</a
                >
              </header>
              <p class="content">
                Ethereum(以太坊)是一个平台和一种编程语言。使开发人员能够建立和发布下一代分布式应用
              </p>
            </section>
            <section class="card">
              <header class="head">
                <h2>XuperChain</h2>
                <a
                  target="_blank"
                  class="link"
                  href="https://cloud.baidu.com/doc/BBE/s/zkedwdrcy"
                  >更多&gt;</a
                >
              </header>
              <p class="content">
                百度自研的吞吐能力强、支持高并发的有效性验证能力和可扩展存储能力的区块链3.0解决方案
              </p>
            </section>
          </div>
          <div class="block-wrap news">
            <h2 class="title">
              新功能发布
              <a
                target="_blank"
                href="https://cloud.baidu.com/doc/BBE/s/Kk0do0nk8"
                class="more"
                >更多&gt;</a
              >
            </h2>
            <ul class="list">
              <li class="list-item">
                <span class="msg">区块链应用市场：IPFS和存证平台上线</span>
                <span class="date">07-02</span>
              </li>
              <li class="list-item">
                <span class="msg">区块链应用市场上线</span>
                <span class="date">06-30</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="block-wrap application">
          <h2 class="title">应用市场</h2>
          <section class="app-card">
            <div class="app-card-left">
              <div class="img">
                <img
                  src="https://cms-store.bj.bcebos.com/bba6a822bf7d8dd0.png"
                  width="48"
                  height="48"
                />
                <p>存证平台</p>
              </div>
              <p class="use">研发组件</p>
            </div>
            <div class="app-card-right">
              <p class="desc">多种存证模型，提供通用存证能力。</p>
              <div class="support-wrap">
                <div class="desc">
                  <span>支持框架：</span>
                </div>
                <div class="tag-wrap">
                  <span class="tag"> Ethereum </span>
                  <span class="tag"> Fabric </span>
                  <span class="tag"> Quorum </span>
                  <span class="tag disable"> XuperChain </span>
                </div>
              </div>
              <div class="version-wrap">
                <span class="version">当前版本：v1.0.0</span>
                <a class="more" href="/bbe/#/bbe/scheme/evidence"
                  >进入应用&gt;</a
                >
              </div>
            </div>
          </section>
          <section class="app-card">
            <div class="app-card-left">
              <div class="img">
                <img
                  src="https://cms-store.bj.bcebos.com/e40e81a82102cc95.png"
                  width="48"
                  height="48"
                />
                <p>IPFS</p>
              </div>
              <p class="use">研发组件</p>
            </div>
            <div class="app-card-right">
              <p class="desc">
                在区块链上存储大文件是非常困难的，通过IPFS，你可以在区块链节点间安全的存储和分享大文件。
              </p>
              <div class="support-wrap">
                <div class="desc">
                  <span>支持框架：</span>
                </div>
                <div class="tag-wrap">
                  <span class="tag"> Ethereum </span>
                  <span class="tag"> Fabric </span>
                  <span class="tag"> Quorum </span>
                  <span class="tag disable"> XuperChain </span>
                </div>
              </div>
              <div class="version-wrap">
                <span class="version">当前版本：v1.0.0</span>
                <a class="more" href="/bbe/#/bbe/scheme/ipfs">进入应用&gt;</a>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created() {},
};
</script>

<style scoped lang="scss">
.page {
  width: auto;
  margin: 0 0 0 160px;
  background: #fff;
  padding: 20px 20px 40px;
  .instance-info {
    height: 45px;
    padding: 5px 20px;
    border-bottom: 1px solid #e8ebee;
    display: flex;
    align-items: center;
    justify-content: space-between;
    h1 {
      font-size: 16px;
    }
    .btn {
      height: 28px;
      line-height: 28px;
      border: 1px solid #ccc;
      width: 28px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.5s;
      cursor: pointer;
      i {
        font-size: 17px;
        font-weight: bold;
        color: #666;
        transition: all 0.5s;
      }
      &:hover {
        border-color: #409eff;
        i {
          color: #409eff;
        }
      }
    }
  }
  .block-wrap {
    border: 1px solid #ebebeb;
    padding: 0 10px;
    width: 100%;
    box-sizing: border-box;
    margin-top: 15px;
    vertical-align: text-top;
    .title {
      font-size: 14px;
      color: #333;
      line-height: 24px;
      margin: 10px 0;
    }
  }
  .platform {
    .step-wrap {
      display: inline-block;
      vertical-align: top;
      width: 32%;
      min-height: 150px;
      .arrowRight {
        padding-left: 40px;
        font-size: 18px;
        display: inline-block;
        position: relative;
        width: 87%;
        background: #f4f4f4;
        margin-left: 10px;
        font-size: 14px;
        color: #333;
        line-height: 34px;
        &::after,
        &::before {
          content: "";
          border-color: transparent;
          border-style: solid;
          position: absolute;
        }
        &::after {
          border-left-color: #f4f4f4;
          border-width: 18px;
          right: -36px;
          top: 0;
          z-index: 11;
        }
        &::before {
          border-left-color: #fff;
          border-width: 18px;
          top: 0;
          left: 0;
          z-index: 10;
        }
      }
      .step-content {
        display: inline-block;
        margin-top: 20px;
        font-size: 14px;
        color: #aaaaaa;
        line-height: 24px;
        width: 100%;
        padding-left: 46px;
        padding-right: 15px;
        box-sizing: border-box;
        a {
          margin: 10px 0;
          display: inline-block;
        }
        .links {
          display: inline-block;
          vertical-align: top;
          margin-right: 8px;
          a {
            display: block;
            margin: 10px 0;
          }
        }
      }
    }
    .first-step {
      .arrowRight {
        width: 98%;
        padding-left: 10px;
        margin-left: 0;
        &::before {
          z-index: -1;
        }
      }
      .step-content {
        padding-left: 10px;
      }
    }
  }
  .info {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    .frame {
      width: 68%;
      height: 310px;
      .card {
        width: 29.5%;
        background-color: #f5f5f5;
        margin: 0 1% 1% 0;
        padding: 0 10px;
        display: inline-block;
        vertical-align: top;
        min-height: 120px;
        overflow: hidden;
        .head {
          display: inline-block;
          width: 100%;
          padding: 10px 0;
          h2 {
            display: inline-block;
            font-size: 16px;
            color: #000000;
            line-height: 30px;
          }
          a {
            float: right;
            font-size: 12px;
            color: #999;
            line-height: 30px;
          }
        }
        .content {
          font-size: 12px;
          color: #999;
          line-height: 20px;
          margin-bottom: 8px;
        }
      }
    }
    .news {
      width: 31%;
      height: 310px;
      .title {
        font-size: 14px;
        color: #333;
        line-height: 24px;
        margin: 10px 0;
        .more {
          float: right;
          font-size: 12px;
          color: #999;
          text-align: right;
          line-height: 20px;
        }
      }
      .list {
        list-style: disc;
        list-style-position: inside;
        overflow: auto;
        height: 230px;
        color: #333;
        .list-item {
          padding-left: 20px;
          margin-bottom: 10px;
          .msg {
            font-size: 12px;
            line-height: 20px;
          }
          .date {
            float: right;
            font-size: 12px;
          }
        }
      }
    }
  }
  .application {
    .app-card {
      width: 50%;
      min-width: 500px;
      display: inline-block;
      margin-bottom: 30px;
      .app-card-left {
        width: 150px;
        height: 140px;
        position: relative;
        display: inline-block;
        vertical-align: top;
        .img {
          width: 100%;
          font-size: 24px;
          background-color: #f5f5f5;
          color: #aaaaaa;
          height: 104px;
          text-align: center;
          padding-top: 36px;
          p {
            padding-top: 10px;
            line-height: 20px;
            font-size: 12px;
            color: #333333;
            font-weight: 400;
          }
        }
        .use {
          position: absolute;
          bottom: 0;
          background: #000;
          color: #fff;
          line-height: 30px;
          left: 0;
          right: 0;
          text-align: center;
          display: none;
        }
      }
      .app-card-right {
        display: inline-block;
        vertical-align: top;
        margin-left: 10px;
        width: calc(90% - 150px);
        height: 140px;
        position: relative;
        .desc {
          font-size: 12px;
          color: #333;
          line-height: 20px;
          margin: 0;
        }
        .support-wrap {
          color: #aaa;
          position: absolute;
          top: 50%;
          transform: translate(0, -20%);
          width: 100%;
          .desc {
            display: inline-block;
            vertical-align: top;
            width: 60px;
            font-size: 12px;
            color: #999;
            line-height: 20px;
            margin: 0;
          }
          .tag-wrap {
            display: inline-block;
            width: 78%;
            vertical-align: top;
            .tag {
              display: inline-block;
              background: #69b154;
              color: #fff;
              padding: 0 5px;
              border-radius: 10px;
              margin-bottom: 5px;
              margin-right: 5px;
              &.disable {
                background: #dbdbdb;
              }
            }
          }
        }
        .version-wrap {
          font-size: 12px;
          color: #999;
          line-height: 20px;
          position: absolute;
          bottom: 0;
          width: 100%;
          .more {
            color: #999;
            float: right;
          }
        }
      }
    }
  }
}
</style>
