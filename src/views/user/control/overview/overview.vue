<template>
  <div class="list-content">
    <h2>概览</h2>
    <div class="create-main">
      <div class="detail-quota-wrap">
        <div class="detail-quota-card">
          <div>
            <span class="detail-quota-count"> 3</span>
          </div>
          <div class="detail-quota-label">用户数</div>
        </div>
        <div class="detail-quota-card">
          <div>
            <span class="detail-quota-count"> 0</span>
          </div>
          <div class="detail-quota-label">用户组</div>
        </div>
        <div class="detail-quota-card">
          <div>
            <span class="detail-quota-count"> 1</span>
          </div>
          <div class="detail-quota-label">自定义权限策略</div>
        </div>
        <div class="detail-quota-card">
          <div>
            <span class="detail-quota-count"> 3</span>
          </div>
          <div class="detail-quota-label">角色数</div>
        </div>
      </div>
      <div class="bottom-main-wrap">
        <div class="bottom-left-main-wrap">
          <div class="detail-info-card">
            <div class="title">子用户登录</div>
            <div class="app-row">
              <div class="app-cell">
                <label class="app-cell-label">登录链接：</label>
                http://7711046e462348c2b7541bba0884e3d8.login.bce.baidu.com
              </div>
            </div>
            <div class="app-row">
              <div class="app-cell">
                <label class="app-cell-label">账户别名：</label>
                7711046e462348c2b7541bba0884e3d8
              </div>
            </div>
          </div>
          <div class="detail-info-card">
            <div class="title" style="margin-bottom: 10px">操作引导</div>
            <el-collapse accordion>
              <el-collapse-item>
                <template slot="title">
                  一致性 Consistency<i class="header-icon el-icon-info"></i>
                </template>
                <div>
                  与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；
                </div>
                <div>
                  在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。
                </div>
              </el-collapse-item>
              <el-collapse-item title="反馈 Feedback">
                <div>
                  控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；
                </div>
                <div>
                  页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。
                </div>
              </el-collapse-item>
              <el-collapse-item title="效率 Efficiency">
                <div>简化流程：设计简洁直观的操作流程；</div>
                <div>
                  清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；
                </div>
                <div>
                  帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。
                </div>
              </el-collapse-item>
              <el-collapse-item title="可控 Controllability">
                <div>
                  用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；
                </div>
                <div>
                  结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。
                </div>
              </el-collapse-item>
            </el-collapse>
          </div>
        </div>
        <div class="bottom-right-main-wrap">
          <div class="detail-info-card quick-entry-wrap">
            <div class="title" style="margin-bottom: 10px">快捷访问入口</div>
            <div class="app-row" style="margin-bottom: 10px">
              <el-button size="small" plain>新建子用户</el-button>
              <el-button size="small" plain>新建消息接收人</el-button>
            </div>
            <div class="app-row">
              <el-button size="small" plain>新建角色</el-button>
              <el-button size="small" plain>新建用户组</el-button>
              <el-button size="small" plain>新建用户组</el-button>
            </div>
          </div>
          <div class="detail-info-card">
            <div class="title">上次登录</div>
            <div class="app-row">
              <div class="app-cell">
                <label class="app-cell-label">上次登录时间：</label>
                2021-11-24 15:06:34
              </div>
            </div>
            <div class="app-row">
              <div class="app-cell">
                <label class="app-cell-label">上次登录IP：</label>
                1.203.65.201
              </div>
            </div>
          </div>
          <div class="detail-info-card">
            <div class="title">安全报告下载</div>
            <div style="margin-bottom: 8px">
              下载您所有子用户的状态和密钥使用情况，您可以每四小时创建一次报告。
            </div>
            <div class="app-row">
              <el-button size="small" plain>下载报告</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>
<style lang="scss" scoped>
.list-content {
  background: #fff;
  padding: 0 20px;
  h2 {
    font-weight: normal;
    line-height: 55px;
    border-bottom: 1px solid #e8ebee;
    margin: 0 -20px 0 -20px;
    padding-left: 20px;
  }
  .create-main {
    position: relative;
    .detail-quota-wrap {
      overflow: hidden;
      background: #f5f5f5;
      margin: 20px 0;
      .detail-quota-card {
        padding: 32px 0 32px 20px;
        float: left;
        margin-right: 20px;
        width: 20%;
        position: relative;
        .detail-quota-count {
          font-size: 20px;
          color: #000000;
          line-height: 30px;
          cursor: pointer;
        }
        .detail-quota-label {
          margin-top: 10px;
        }
        &::after {
          content: " ";
          background: #ffffff;
          width: 1px;
          height: 60px;
          display: block;
          position: absolute;
          right: 0;
          top: 30px;
        }
        &:last-child::after {
          display: none;
        }
      }
    }
    .bottom-main-wrap {
      display: flex;
      justify-content: space-between;
      .bottom-left-main-wrap {
        width: 65%;
        margin-right: 20px;
        .detail-info-card {
          border: 1px solid #ebebeb;
          padding: 10px 0 20px 20px;
          margin: 0 0 20px 0;
          .title {
            font-size: 14px;
            color: #333333;
            line-height: 24px;
            margin-bottom: 20px;
          }
          .app-row {
            margin-bottom: 20px;
            .app-cell-label {
              min-width: 80px;
            }
          }
        }
      }
      .bottom-right-main-wrap {
        min-width: 320px;
        .detail-info-card {
          border: 1px solid #ebebeb;
          padding: 10px 0 20px 20px;
          margin: 0 0 20px 0;
          .title {
            font-size: 14px;
            color: #333333;
            line-height: 24px;
            margin-bottom: 20px;
          }
          .app-row {
            margin-bottom: 20px;
            button {
              color: #333;
            }
          }
        }
      }
    }
  }
}
</style>
