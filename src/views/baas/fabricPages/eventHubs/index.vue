<template>
  <div class="content-container">
    <div class="top-header">
      <div class="link">
        <i class="el-icon-warning-outline"></i>
        <a target="_blank" href="https://cloud.baidu.com/doc/BBE/s/Gk35z9chs">产品文档</a>
      </div>
      <el-tabs v-model="activeEventName" @tab-click="handleClick">
        <el-tab-pane label="联盟事件" name="leagueEvent">
          <div class="event-types">
            <label>
              <span>事件类型：</span>
              <el-radio-group v-model="activeLeagueTab" size="small">
                <el-radio-button label="待办" ></el-radio-button>
                <el-radio-button label="已完成"></el-radio-button>
                <el-radio-button label="通道通知"></el-radio-button>
              </el-radio-group>
            </label>
            <div class="btn-wrapper">
              <el-button type="primary" icon="el-icon-refresh-right" plain @click="reloadPage" />
            </div>
          </div>
          <EventLeagueTodo  v-if="mapToLeagueSubEventLists[activeLeagueTab] === 'todoListLeague'" />
          <EventLeagueCompleted v-else-if="mapToLeagueSubEventLists[activeLeagueTab] === 'completedLeague'" /> 
          <EventLeagueNotice v-else-if="mapToLeagueSubEventLists[activeLeagueTab] === 'unionNoticeLeague'" />
        </el-tab-pane>
        <el-tab-pane label="通道事件" name="channelEvent">
          <div class="event-types">
            <label>
              <span>事件类型：</span>
              <el-radio-group v-model="activeChannelTab" size="small">
                <el-radio-button label="待办" ></el-radio-button>
                <el-radio-button label="已完成"></el-radio-button>
                <el-radio-button label="通道通知"></el-radio-button>
              </el-radio-group>
            </label>
            <div class="btn-wrapper">
              <el-button type="primary" icon="el-icon-refresh-right" plain @click="reloadPage" />
            </div>
          </div>
          <EventChanelTodo  v-if="mapToChannelSubEventLists[activeChannelTab] === 'todoListChannel'" />
          <EventChannelCompleted v-else-if="mapToChannelSubEventLists[activeChannelTab] === 'completedChannel'" /> 
          <EventChannelNotice2 v-else-if="mapToChannelSubEventLists[activeChannelTab] === 'unionNoticeChannel'" />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>  
</template>

<script>
  import EventLeagueTodo from '@/views/baas/fabricPages/eventHubs/league/leagueTodo2Tables';
  import EventLeagueCompleted from '@/views/baas/fabricPages/eventHubs/league/leagueCompleted2Tables';
  import EventLeagueNotice from '@/views/baas/fabricPages/eventHubs/league/leagueNotice2Tables';
  import EventChanelTodo from '@/views/baas/fabricPages/eventHubs/channel/channelTodo2Tables';
  import EventChannelCompleted from '@/views/baas/fabricPages/eventHubs/channel/channelCompleted2Tables';
  import EventChannelNotice2 from '@/views/baas/fabricPages/eventHubs/channel/channelNotice2Tables';
  export default {
    name: 'EventAll',
    components: {
      EventLeagueTodo,
      EventLeagueCompleted,
      EventLeagueNotice,
      EventChanelTodo,
      EventChannelCompleted,
      EventChannelNotice2
    },
    data() {
      return {
        activeEventName: 'leagueEvent',
        activeLeagueTab: '待办',
        activeChannelTab: '待办',
        mapToLeagueSubEventLists: {
          "待办": "todoListLeague",
          "已完成": "completedLeague",
          "通道通知": "unionNoticeLeague"
        },
        mapToChannelSubEventLists: {
          "待办": "todoListChannel",
          "已完成": "completedChannel",
          "通道通知": "unionNoticeChannel"
        },
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
      reloadPage() {
        alert("刷新当前页的链码页面！");
      },
      
      
    }
  };
</script>

<style lang='scss' scoped>
.content-container {
  .top-header {
    position: relative;
    padding: 10px 20px;
    .link {
      position: absolute;
      top: 16px;
      right: 25px;
      ::v-deep .el-icon-warning-outline {
        font-size: 18px;
        color: #108cee;
      }
      a {
        margin-left: 5px;
      }
    }
    .event-types {
      display: inline-flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      .btn-wrapper {
        display: inline-block;
        width: 40px;
        text-align: right;
        padding-right: 5px;
        ::v-deep .el-button {
          font-size: 20px;
          padding: 5px 8px;
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
    }
    
    
  }
}
</style>
