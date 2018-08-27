<template>
  <div class="components-container">
    <split-pane v-on:resize="resize" split="vertical">
      <template slot="paneL">
        <div>
          <el-tabs style='margin-top:15px;' v-model="activeName" type="border-card">
            <el-tab-pane v-for="item in tabMapOptions" :label="item.label" :key='item.key' :name="item.key">
              <keep-alive>
                <tab-pane v-if='activeName==item.key' :type='item.key' @create='showCreatedTimes'></tab-pane>
              </keep-alive>
              <div style="height:500px;">
                身份证号: 212345678900987654321
                <br><br><br>
                性别:男
                <br><br><br>
                年龄:33
                <br><br><br>
                学历:高中
                <br><br><br>
                住址:上海黄浦区
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </template>
      <template slot="paneR">
        <split-pane split="horizontal">
          <template slot="paneL">
            <div class="top-container">
              <el-row class="panel-group" :gutter="40">
                <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
                  <div class="card-panel-description">
                    <div class="card-panel-text">完成任务数</div>
                    <div style="height:20px">
                    </div>
                    <count-to class="card-panel-num" :startVal="0" :endVal="102400" :duration="2600">10000</count-to>
                  </div>
                </el-col>
                <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
                  <div class="card-panel-description">
                    <div class="card-panel-text">完成率</div>
                    <div style="height:20px">
                    </div>
                    <count-to class="card-panel-num" :startVal="0" :endVal="81212" :duration="3000">90%</count-to>
                  </div>
                </el-col>
                <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
                  <div class="card-panel-description">
                    <div class="card-panel-text">最近服务品牌</div>
                    <div style="height:20px">
                    </div>
                    <count-to class="card-panel-num" :startVal="0" :endVal="9280" :duration="3200">联合利华</count-to>
                  </div>
                </el-col>
                <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
                  <div class="card-panel-description">
                    <div class="card-panel-text">优势行业</div>
                    <div style="height:20px">
                    </div>
                    <count-to class="card-panel-num" :startVal="0" :endVal="13600" :duration="3600">日化</count-to>
                  </div>
                </el-col>
                <div style="height:80px">
                </div>
                <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
                    <div class="card-panel-description">
                      <div class="card-panel-text">雇主满意度</div>
                      <div style="height:20px">
                      </div>
                      <count-to class="card-panel-num" :startVal="0" :endVal="13600" :duration="3600">99%</count-to>
                    </div>
                </el-col>
              </el-row>
            </div>
          </template>
          <template slot="paneR">
            <div style="height:30px">
            </div>
            <div class="bottom-container" style="border:1px solid #666666">
              <el-button type="primary">上午空闲</el-button>
              <el-button type="success">下午空闲</el-button>
              <el-button type="info">全天空闲</el-button>
              <full-calendar :events="fcEvents" locale="en"></full-calendar>
            </div>
          </template>
        </split-pane>
      </template>
    </split-pane>
  </div>
</template>

<script>
import splitPane from 'vue-splitpane'
import 'vue-event-calendar/dist/style.css'

export default {
  name: 'tab',
  components: { splitPane, 'full-calendar': require('vue-fullcalendar') },
  data() {
    return {
      tabMapOptions: [
        { label: '基础信息', key: 'CN' },
        { label: '工作履历', key: 'US' },
        { label: '能力评估', key: 'JP' },
        { label: '出入金明细', key: 'EU' },
        { label: '学习培训', key: 'EU' }
      ],
      activeName: 'CN',
      createdTimes: 0,
      fcEvents: [
        {
          title: '强生 早班',
          start: '2018-08-09',
          end: '2018-08-13',
          cssClass: 'family'
        },
        {
          title: '强生 晚班',
          start: '2018-08-14',
          end: '2018-08-20',
          cssClass: ['family', 'career']
        }
      ]
    }
  },
  methods: {
    showCreatedTimes() {
      this.createdTimes = this.createdTimes + 1
    }
  }
}
</script>

<style scoped>
  .tab-container{
    margin: 30px;
  }
  .components-container {
    position: relative;
    height: 45vh;
  }

  .left-container {
    background-color: #F38181;
    height: 100%;
  }

  .right-container {
    background-color: #FCE38A;
    height: 200px;
  }

  .top-container {
    background-color: #FCE38A;
    width: 100%;
    height: 100%;
  }

  .bottom-container {
    width: 100%;
    background-color: #95E1D3;
    height: 100%;
  }
  .panel-group {
    margin-top: 18px;
    .card-panel-col{
      margin-bottom: 32px;
    }
    .card-panel {
      height: 108px;
      cursor: pointer;
      font-size: 12px;
      position: relative;
      overflow: hidden;
      color: #666;
      background: #fff;
      box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
      border-color: rgba(0, 0, 0, .05);
      &:hover {
        .card-panel-icon-wrapper {
          color: #fff;
        }
        .icon-people {
           background: #40c9c6;
        }
        .icon-message {
          background: #36a3f7;
        }
        .icon-money {
          background: #f4516c;
        }
        .icon-shoppingCard {
          background: #34bfa3
        }
      }
      .icon-people {
        color: #40c9c6;
      }
      .icon-message {
        color: #36a3f7;
      }
      .icon-money {
        color: #f4516c;
      }
      .icon-shoppingCard {
        color: #34bfa3
      }
      .card-panel-icon-wrapper {
        float: left;
        margin: 14px 0 0 14px;
        padding: 16px;
        transition: all 0.38s ease-out;
        border-radius: 6px;
      }
      .card-panel-icon {
        float: left;
        font-size: 48px;
      }
      .card-panel-description {
        float: right;
        font-weight: bold;
        margin: 26px;
        margin-left: 0px;
        .card-panel-text {
          line-height: 18px;
          color: rgba(0, 0, 0, 0.45);
          font-size: 16px;
          margin-bottom: 12px;
        }
        .card-panel-num {
          font-size: 20px;
        }
      }
    }
  }
</style>
