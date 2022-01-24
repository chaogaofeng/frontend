<template>
  <div>
    <div class="page" style="margin-top:50px;">
      <div class="header">
        <div class="back" @click="back">
          <i class="el-icon-arrow-left"></i>
          <span>返回节点列表</span>
        </div>
        <h2>磁盘扩容</h2>
      </div>
      <div class="main-content">
        <div class="change-setting">
          <el-row type="flex" class="item-row-base" style="padding-top:20px;padding-bottom:0;">
            <el-col :span="16">
              <div class="moudelTlt">变更配置</div>
            </el-col>
          </el-row>
          <el-row :gutter="20" class="item-row-base">
            <el-col :span="2">
              <div class="label-desc">CDS云磁盘：</div>
            </el-col>
            <el-col :span="16">
              <ul class="group-list">
                <li class="one-item-1">
                  <el-select v-model="diskProd" disabled size="small" class="small-select">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                  <div class="slider-wrapper">
                    <el-slider
                      v-model="disk.current"
                      :min="disk.min"
                      :max="disk.max"
                      :step="disk.step"
                      :marks="disk.marks"
                      input-size="small"
                      show-input>
                    </el-slider>
                    <span class="disk-unit">GB</span>
                  </div>
                </li>
                <li class="one-item-2">
                  <span class="tip-info">峰值性能：随机IO</span>
                </li>
                <li class="one-item-2">
                  <span class="tip-desc">每个节点扩容：50GB</span>
                </li>
              </ul>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="content-3">
        <el-button type="primary" size="small" @click="confirmChange">确认变更</el-button>
        <div class="configuratio-cost">
          <span class="label-txt">配置费用：</span>
          <span class="cost-red">¥ 200/天</span>
        </div>
        <div class="configuratio-details">
          <span class="label-txt">已选配置：</span>
          <el-tooltip class="look-blue" effect="dark" :content="'您选的CDS云磁盘：' + disk.current + ' GB'" placement="top-start">
            <span>查看详情</span>
          </el-tooltip>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddDisk",
  data() {
    
    return {
      diskProd: '通用型SSD',
      options: [
        {
          label: '通用型SSD',
          value: '通用型SSD'
        }
      ],
      disk: {
        min: 50,
        step: 50,
        current: 50,
        max: 500,
        marks: {
          50: '50GB',
          225: '225GB',
          500: '500GB',
        }
      },
    };
  },
  created() {
    
  },
  methods: {
    submitForm() {
      
    },
    back() {
      this.$router.go(-1);
    },
    confirmChange() {
      alert("扩容盘");
    }
  },
};
</script>

<style lang="scss" scoped>
.page {
  padding: 0 20px;
  .header {
    height: 50px;
    background: #fff;
    color: #666;
    line-height: 50px;
    margin-bottom: 0;
    position: relative;
    text-align: center;
    border-bottom: 1px solid #f1f1f1;
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
  .main-content {
    background: #fff;
    min-height: 300px;
    margin: 0;
    overflow: hidden;
    .change-setting {
      width: calc(100% - 200px);
      height: 200px;
      margin: 60px auto;
      box-sizing: border-box;
      border: 1px solid #F1F1F1;
    }

    .item-row-base {
      padding: 10px 15px 15px;
      .moudelTlt {
        color: #333;
        font-size: 14px;
        border-left: solid 4px #108cee;
        padding-left: 14px;
        height: 24px;
        line-height: 24px;
      }
      .label-desc {
        height: 32px;
        line-height: 32px;
      }
      .group-list {
        display: flex;
        flex-flow: column nowrap;
        .one-item-1 {
          height: 32px;
          line-height: 32px;
          display: inline-flex;
          flex-flow: row nowrap;
          justify-self: start;
          align-items: flex-start;
          margin-bottom: 20px;
          .small-select {
            display: inline-block;
            width: 120px;
            margin-right: 20px;
          }
          .slider-wrapper {
            width: 560px;
            display: inline-flex;
            ::v-deep .el-slider {
              width: 520px;
            }
            .disk-unit {
              display: inline-block;
              height: 30px;
              line-height: 40px;
              margin-left: 2px;
            }
          }
          
        }
        .one-item-2 {
          height: 28px;
          line-height: 28px;
          display: inline-flex;
          flex-flow: row nowrap;
          justify-self: start;
          align-items: flex-start;
          .tip-info {
            color: #999;
          }
        }
      }
    }  
   
    
  }
}
.footer {
  position: fixed;
  bottom: 0;
  height: 50px;
  margin: 0 20px;  
  width: calc(100% - 40px);
  background-color: #fff;
  .content-3 {
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    width: 300px;
    height: 50px;
    margin: 0 auto;
  }
  .configuratio-cost {
    display: inline-flex;
    flex-flow: column wrap;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 50px;
    .label-txt {
      color: #999;
    }
    .cost-red {
      color: #EC4949;
      font-size: 14px;
      font-weight: bold;
    }
  }
  .configuratio-details {
    display: inline-flex;
    flex-flow: column wrap;
    justify-content: center;
    align-items: flex-start;
    height: 50px;
    .label-txt {
      color: #999;
    }
    .look-blue {
      cursor: pointer;
      color: #1A73E8;
      font-size: 14px;
    }
  }
}
</style>
