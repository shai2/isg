<template>
  <div class="components-container">
    <split-pane v-on:resize="resize" split="vertical">
      <template slot="paneL">
        <div>
          <b-map-component></b-map-component>
          <div id="allmap" style="width: 100%;height:600px;border: 1px solid gray;overflow:hidden;">
          </div>
          <br>
          门店编号: 00001
          <br>
          <br>
          门店名称:上海人民广场店
        </div>
      </template>
      <template slot="paneR">
        <split-pane split="horizontal">
          <template slot="paneL">
            <div class="top-container">
              <el-row class="panel-group" :gutter="40">
                <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
                  <div class="card-panel-description">
                    <div class="card-panel-text">当班人员</div>
                    <div style="height:20px">
                    </div>
                    <count-to class="card-panel-num" :startVal="0" :endVal="102400" :duration="2600">10000</count-to>
                  </div>
                </el-col>
                <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
                  <div class="card-panel-description">
                    <div class="card-panel-text">休息人员</div>
                    <div style="height:20px">
                    </div>
                    <count-to class="card-panel-num" :startVal="0" :endVal="81212" :duration="3000">90</count-to>
                  </div>
                </el-col>
                <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
                  <div class="card-panel-description">
                    <div class="card-panel-text">共享人员</div>
                    <div style="height:20px">
                    </div>
                    <count-to class="card-panel-num" :startVal="0" :endVal="9280" :duration="3200">200</count-to>
                  </div>
                </el-col>
                <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
                  <div class="card-panel-description">
                    <div class="card-panel-text">进行中项目</div>
                    <div style="height:20px">
                    </div>
                    <count-to class="card-panel-num" :startVal="0" :endVal="13600" :duration="3600">联合利华</count-to>
                  </div>
                </el-col>
                <div style="height:80px">
                </div>
                <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
                    <div class="card-panel-description">
                      <div class="card-panel-text">发布总任务</div>
                      <div style="height:20px">
                      </div>
                      <count-to class="card-panel-num" :startVal="0" :endVal="13600" :duration="3600">999</count-to>
                    </div>
                </el-col>
                <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
                    <div class="card-panel-description">
                      <div class="card-panel-text">执行中任务</div>
                      <div style="height:20px">
                      </div>
                      <count-to class="card-panel-num" :startVal="0" :endVal="13600" :duration="3600">998</count-to>
                    </div>
                </el-col>
                <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
                    <div class="card-panel-description">
                      <div class="card-panel-text">品牌客户</div>
                      <div style="height:20px">
                      </div>
                      <count-to class="card-panel-num" :startVal="0" :endVal="13600" :duration="3600">联合利华</count-to>
                    </div>
                </el-col>
              </el-row>
            </div>
          </template>
          <template slot="paneR">
            <div style="height:30px">
            </div>
            <el-tabs style='margin-top:15px;' v-model="activeName" type="border-card">
            <el-tab-pane v-for="item in tabMapOptions" :label="item.label" :key='item.key' :name="item.key">
              <keep-alive>
                <tab-pane v-if='activeName==item.key' :type='item.key' @create='showCreatedTimes'></tab-pane>
              </keep-alive>
              <div style="height:500px;">
                <br><br>
                小超市（正常营业）
                <br><br><br>
                联系人:黎明
                <br><br><br>
                联系电话:13111111111
              </div>
            </el-tab-pane>
          </el-tabs>
          </template>
        </split-pane>
      </template>
    </split-pane>
  </div>
</template>

<script>
import splitPane from 'vue-splitpane'
import 'vue-event-calendar/dist/style.css'
import BMap from 'BMap'

export default {
  name: 'tab',
  components: { splitPane, 'full-calendar': require('vue-fullcalendar') },
  data() {
    return {
      tabMapOptions: [
        { label: '基础信息', key: 'CN' },
        { label: '人员信息', key: 'US' },
        { label: '项目信息', key: 'JP' },
        { label: '任务信息', key: 'EU' }
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
  mounted() {
    this.ready()
  },
  methods: {
    showCreatedTimes() {
      this.createdTimes = this.createdTimes + 1
    },
    loadMap: function() {
      console.log(this.$route.params.name)
      console.log(this.$route.params.addr)
      console.log(this.$route.params.phone)
      // setTimeout(this.ready, 0)
    },
    ready: function() {
      var map = new BMap.Map('allmap')
      var point = new BMap.Point(121.50109, 31.23691)
      map.centerAndZoom(point, 14)
      map.addControl(new BMap.MapTypeControl())
      map.enableScrollWheelZoom(true)
      map.enableDoubleClickZoom(true)
      var marker = new BMap.Marker(point)
      map.addOverlay(marker)
    }
  }
}
</script>

<style scoped>
  .anchorBL {
    display:none
  }
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
