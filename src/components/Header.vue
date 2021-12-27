<template>
  <div class="header">
    <router-link to="/" tag="div" class="logo">
      <img src="../assets/img/logo.png" alt="logo" />
    </router-link>
    <div class="content">
      <div class="menu">
        <div class="nav-item">
          <span class="nav-title">工单</span>
          <div class="nav-content">
            <div class="box">
              <a>新建工单</a>
              <a>待办工单(0)</a>
            </div>
          </div>
        </div>
        <div class="nav-item">
          <span class="nav-title">企业</span>
          <div class="nav-content">
            <div class="box">
              <a>企业组织</a>
              <a>资源管理</a>
              <a>标签管理</a>
              <a>资源回收站</a>
            </div>
          </div>
        </div>
      </div>
      <div class="user">
        <router-link to="/user">
          <div class="img">{{ userName }}</div>
          <div class="arrow">
            <i class="iconfont icon-arrow-down"></i>
          </div>
        </router-link>
        <div class="user-content">
          <div class="info">
            <div class="brief">
              <router-link to="/user" class="link">
                <div class="infoimg">
                  {{ userName }}
                </div>
                <div class="infoname">{{ userInfo.userName }}</div>
              </router-link>
              <div class="user-verify">
                <i class="el-icon-s-custom"></i>
                <span v-if="userInfo.authStatus == 0">未认证</span>
                <span v-else>已认证</span>
              </div>
            </div>
            <router-link to="/user" class="user-menu">
              <i class="el-icon-s-custom"></i>
              <span>用户中心</span>
            </router-link>
            <router-link to="/user/safe" class="user-menu">
              <i class="el-icon-s-custom"></i>
              <span>安全认证</span>
            </router-link>
            <router-link to="/user/control" class="user-menu">
              <i class="el-icon-s-custom"></i>
              <span>多用户访问控制</span>
            </router-link>
          </div>
          <div class="switch">
            <router-link to="/user/switch" class="role-switch"
              >切换身份</router-link
            >
            <router-link to="/logout" class="logout">
              <i class="el-icon-refresh-right"></i>
              <span>退出</span>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import infoApi from "../views/user/info/api";
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      userInfo: {}, //用户信息
      userName: "", //用户名
    };
  },
  created() {
    //获取用户信息
    this.getdata();
  },
  methods: {
    ...mapMutations(["setAuthStatus"]),
    getdata() {
      this.$http({
        url: infoApi.userInfo,
        method: "get",
      }).then((rel) => {
        if (rel.code == 0) {
          this.userInfo = rel.data;
          this.userName = rel.data.userName.substr(0, 1);
          this.setAuthStatus(this.userInfo.authStatus);
        } else {
          this.$message(rel.msg);
        }
      });
    },
  },
};
</script>

<style scoped lang="scss">
.header {
  position: fixed;
  top: 0;
  width: auto;
  left: 0;
  right: 0;
  height: 50px;
  background: #fff;
  color: #000;
  min-width: 960px;
  z-index: 999;
  box-shadow: 0 4px 6px 0 rgb(8 14 26 / 4%), 0 1px 10px 0 rgb(8 14 26 / 5%),
    0 2px 4px -1px rgb(8 14 26 / 6%);
  display: flex;
  align-items: center;
  padding: 0 0 0 20px;
  .logo {
    width: 104px;
    height: 100%;
    cursor: pointer;
    img {
      width: 100%;
      max-height: 100%;
    }
  }
  .content {
    flex: 1;
    align-items: center;
    height: 100%;
    justify-content: flex-end;
    display: flex;
    .menu {
      .nav-item {
        float: right;
        height: 50px;
        padding: 0 12px;
        line-height: 50px;
        position: relative;
        .nav-title {
          font-size: 12px;
          line-height: 20px;
          color: #000;
        }
        .nav-content {
          position: absolute;
          top: 100%;
          background-color: #fff;
          border-color: transparent;
          box-shadow: 0 6px 8px 0 rgb(0 0 0 / 4%);
          color: #000;
          max-height: 0;
          transition: all 0.15s ease;
          overflow: hidden;
          z-index: 999;
          zoom: 1;
          right: 0;
          min-width: 110px;
          box-sizing: border-box;
          .box {
            padding: 16px;
            a {
              line-height: 24px;
              font-size: 12px;
              white-space: nowrap;
              color: #333;
              cursor: pointer;
              display: block;
              margin: 6px 0 0;
            }
            a:hover {
              color: #108cee;
            }
          }
        }
      }
      .nav-item:hover {
        .nav-content {
          max-height: 500px;
          border: 1px solid #ebebeb;
        }
      }
    }
    .user {
      padding: 0 35px 0 15px;
      position: relative;
      height: 50px;
      display: flex;
      align-items: center;
      .img {
        width: 30px;
        height: 30px;
        background: #121a2c;
        color: #fff;
        border-radius: 50px;
        text-align: center;
        line-height: 30px;
      }
      .arrow {
        position: absolute;
        right: 15px;
        transform: translateY(-50%) scale(0.8);
        top: 50%;
        font-size: 12px;
        color: #999;
        i {
          transition: all 0.3s;
          display: block;
        }
      }
      .user-content {
        position: absolute;
        top: 100%;
        background-color: #fff;
        border-color: transparent;
        box-shadow: 0 6px 8px 0 rgb(0 0 0 / 4%);
        color: #000;
        max-height: 0;
        transition: all 0.15s ease;
        overflow: hidden;
        z-index: 999;
        zoom: 1;
        right: 0;
        min-width: 110px;
        box-sizing: border-box;
        width: 250px;
        .info {
          padding: 16px;
          .brief {
            margin-bottom: 10px;
            display: flex;
            align-items: center;
            .link {
              flex: 1;
              width: 0;
              display: flex;
              align-items: center;
              .infoimg {
                width: 30px;
                height: 30px;
                background: #2468f2;
                color: #fff;
                border-radius: 50px;
                text-align: center;
                line-height: 30px;
                margin-right: 8px;
              }
              .infoname {
                font-size: 12px;
                color: #333;
              }
            }
            .user-verify {
              width: 78px;
              height: 24px;
              background-color: rgba(123, 141, 204, 0.2);
              font-size: 12px;
              line-height: 24px;
              color: #7b8dcc;
              padding: 0 5px;
              box-sizing: border-box;
              span {
                margin-left: 5px;
              }
            }
          }
          .user-menu {
            display: block;
            height: 26px;
            line-height: 26px;
            font-size: 12px;
            color: #333;
            i {
              font-size: 14px;
              margin-right: 5px;
            }
            &:hover {
              color: #2468f2;
            }
          }
        }
        .switch {
          border-top: 1px solid #ebebeb;
          height: 32px;
          display: flex;
          align-items: center;
          a {
            flex: 1;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #333;
            &:hover {
              color: #2468f2;
            }
          }
          .logout {
            border-left: 1px solid #ebebeb;
            i {
              font-size: 16px;
              margin-right: 5px;
            }
          }
        }
      }
    }
    .user:hover {
      .img {
        background: #2468f2;
      }
      .arrow i {
        transform: rotate(180deg);
        color: #2468f2;
      }
      .user-content {
        max-height: 600px;
        border: 1px solid #ebebeb;
        box-shadow: 0 2px 3px rgb(25 35 60 / 10%);
      }
    }
  }
}
</style>
