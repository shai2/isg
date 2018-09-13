<template>
  <div v-if="employeeInfo" class="app-container flex-row-between align-stretch">
    <div style="min-width:400px;" class="left flex-column-center normal-border">
      <div class="info flex-row-center">
        <img :src="employeeInfo.sex === '男' ? manImg : womanImg">
        <div class="flex">
          <p>{{employeeInfo.employeeCode}}</p>
          <p>{{employeeInfo.name}}</p>
          <p>{{employeeInfo.telephone}}</p>
        </div>
      </div>
      <el-tabs class="flex w100" v-model="activeName" type="border-card">
        <el-tab-pane class="info info-detail" label="基础信息" name="0">
          <p>{{employeeInfo.idCardNumber || '身份证号暂无'}}
            <svg-icon style="color:#ddd" class="pointer" v-popover:popover icon-class="tab" />
            <el-popover
              ref="popover"
              placement="right"
              title="身份证"
              width="400"
              trigger="click">
              <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1535710906058&di=d9f051e8b246d622361e988716deed82&imgtype=0&src=http%3A%2F%2Fwww.shac-nj.com%3A90%2FContent%2Fimages%2Fshenfenzheng.jpg">
            </el-popover>
          </p>
          <p>{{employeeInfo.sex}}</p>
          <p>{{employeeInfo.age}}</p>
          <p>{{employeeInfo.address}}</p>
          <p>{{employeeInfo.education || '学历暂无'}}</p>
        </el-tab-pane>
        <el-tab-pane label="工作履历" name="1">
          <div v-for="(e,i) in workResumeList" :key="i" class="work-item flex-row-center">
            <div class="work-item-left flex">
              <p>{{e.workResumeName}}</p>
              <p>{{parseTime(e.startTime)}} ~ {{parseTime(e.endTime)}}</p>
              <p>{{e.position}}</p>
            </div>
            <!-- <div :class="{'border-green':e.status=='进行中'}" class="work-item-right flex-column-center">
              <p>{{e.status}}</p>
            </div> -->
          </div>
        </el-tab-pane>
        <!-- <el-tab-pane label="能力评估" name="2">
          <div class="chart-wrapper">
            <raddar-chart></raddar-chart>
          </div>
        </el-tab-pane>
        <el-tab-pane label="出入金明细" name="3">
          <el-table :data="moneyData">
            <el-table-column width="120" property="id" label="流水号"></el-table-column>
            <el-table-column width="100" label="资金">
              <template slot-scope="scope">
                <p :class="scope.row.num*1<0?'green':'red'">{{scope.row.num}}</p>
              </template>
            </el-table-column>
            <el-table-column property="remark" label="备注"></el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="学习培训" name="4">
          <div v-for="(e,i) in employeeInfo.train" :key="i" class="learn-item">
            <p>{{e.train_name}}</p>
            <p>完成时间：{{e.finish_time}}</p>
          </div>
        </el-tab-pane> -->
      </el-tabs>
    </div> 
    <div class="right flex w0">
      <div class="right-top normal-border">
        <el-table :data="statistics" border fit>
          <el-table-column property="finishTaskCount" label="任务完成数"></el-table-column>
          <el-table-column label="完成率">
            <template slot-scope="scope">
              {{scope.row.finishRate ? (scope.row.finishRate*100+'%') : '0%'}}
            </template>
          </el-table-column>
          <el-table-column property="latelyServiceBrand" label="最近服务品牌"></el-table-column>
          <el-table-column property="industryAdvantage" label="优势行业"></el-table-column>
          <el-table-column property="satisficing" label="雇主满意度"></el-table-column>
        </el-table>
      </div>
      <div class="right-bottom normal-border">
        <div v-show="!showDetailChart">
          <el-button @click.native="showEvents('all')" size="small" plain>全部</el-button>
          <el-button @click.native="showEvents('forenoon')" type="primary" size="small" plain>上午空闲</el-button>
          <el-button @click.native="showEvents('afternoon')" type="success" size="small" plain>下午空闲</el-button>
          <el-button @click.native="showEvents('free')" type="info" size="small" plain>全天空闲</el-button>
          <fullCalendar
            :events = "fcEvents"
            @changeMonth = "changeMonth"
            @dayClick = "dayClick"
            lang="zh">
          </fullCalendar>
        </div>
        <!-- 详情图表 -->
        <div class="w100" v-show="showDetailChart">
          <el-button @click.native="showDetailChart = false" size="small" plain>返回</el-button>
          <BarChart :chartData="chartData" :chartTime="chartTime" style="margin-top:10px;" ref="barChart"></BarChart>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RaddarChart from './charts/RaddarChart'
import fullCalendar from 'vue-fullcalendar'
import BarChart from './charts/BarChart'
import { getEmployeeDetail, getSchedule, getScheduleDaily } from 'api/employee'
import { parseTime } from 'utils'

export default {
  components: { RaddarChart, fullCalendar, BarChart },
  data() {
    return {
      tabMapOptions: ['基础信息', '工作履历', '能力评估', '出入金明细', '学习培训'],
      activeName: '0',
      employeeInfo: {}, // 人员数据
      statistics: [], // obj转存数组
      workResumeList: [], // 工作履历
      moneyData: [
        { id: '2018032093', num: 1100, remark: '薪资' },
        { id: '2018032093', num: -200, remark: '培训' },
        { id: '2018032093', num: 900, remark: '薪资' }
      ],
      showDetailChart: false, // 显示详情图
      allEvents: [], // 存所有
      fcEvents: [], // 显示的events
      showEventsType: '', // 显示events类型
      chartTime: '',// 日期
      chartData: [],//传到图详情里的数据
      manImg:require('assets/img/man.jpg'),
      womanImg:require('assets/img/woman.jpg')
    }
  },
  created() {
    this.getDetail()
  },
  watch: {
    '$route'(to, from) {
      this.getDetail()
    }
  },
  computed: {
    forenoonEvents() {
      return this.allEvents.filter((e, i) => {
        return e.cssClass.includes('forenoon')
      })
    },
    afternoonEvents() {
      return this.allEvents.filter((e, i) => {
        return e.cssClass.includes('afternoon')
      })
    },
    freeEvents() {
      return this.allEvents.filter((e, i) => {
        return e.cssClass.includes('free')
      })
    },
  },
  methods: {
    parseTime(time){
      return parseTime(new Date(time),'{y}-{m}-{d}')
    },
    getInfo(){
      this.getDetail()
      this.getSchedule()
    },
    changeMonth(start, end, current) {
      console.log('出发改变月份，需要的时间是 ' + current)
      this.chartTime = current
      this.getSchedule()
    },
    dayClick(day, jsEvent) {
      this.showDetailChart = true
      this.$refs.barChart.__resizeHanlder()
      this.chartTime = parseTime(day, '{y}-{m}-{d}')// 请求当天数据传参
      this.getScheduleDaily()
    },
    getDetail() {
      getEmployeeDetail(this.$route.query.employeeCode).then(res => {
        console.log(res.data.data)
        this.employeeInfo = res.data.data.employeeInfo
        this.workResumeList = res.data.data.workResumeList
        this.statistics.push(res.data.data.statistics)
        console.log(this.statistics)
      })
    },
    showEvents(type) {
      this.showEventsType = type
      this.chooseEventsShow()
    },
    getSchedule() {
      getSchedule({
        employeeCode: this.$route.query.employeeCode,
        date: this.chartTime.slice(0, -3)
      }).then(res => {
        this.allEvents = res.data.data
        this.chooseEventsShow()
      })
    },
    getScheduleDaily() {
      getScheduleDaily({
        employeeCode: this.$route.query.employeeCode,
        date: this.chartTime
      }).then(res => {
        this.chartData = res.data.data
        // this.chartData = [{
        //   brandName: '牌子111',
        //   planStartTime: '2016-12-18 6:30:00',
        //   planEndTime: '2016-12-18 9:30:00',
        //   actualStartTime: '2016-12-18 6:00:00',
        //   actualEndTime: '2016-12-18 9:00:00'
        // }, {
        //   brandName: '牌子222',
        //   planStartTime: '2016-12-18 12:30:00',
        //   planEndTime: '2016-12-18 15:30:00',
        //   actualStartTime: '2016-12-18 13:30:00',
        //   actualEndTime: '2016-12-18 17:30:00'
        // }]
      })
    },
    chooseEventsShow() {
      switch (this.showEventsType) {
        case 'forenoon':
          this.fcEvents = this.forenoonEvents
          break
        case 'afternoon':
          this.fcEvents = this.afternoonEvents
          break
        case 'free':
          this.fcEvents = this.freeEvents
          break
        default:
          this.fcEvents = this.allEvents
      }
    }
  }
}
</script>

<style scoped lang="stylus">
.chart-wrapper
  margin-top 40px
.right
  margin-left 10px
.right-top
  margin-bottom 10px
.info
  margin-bottom 20px
  width 100%
  img 
    width 95px
    height 95px
    border-radius 100px
    margin-right 40px
    box-shadow 0 0 5px rgba(0,0,0,0.3)
  p
    border-bottom 1px solid #eee
    padding 8px 5px
    font-size 14px
.info-detail
  p
    margin-top 8px
.work-item
  border 1px solid #eee
  padding 15px
  margin-bottom 10px
  .work-item-left
    p
      padding 8px 3px
      border-bottom 1px solid #eee
      &:nth-child(n+2)
        font-size 14px
  .work-item-right
    margin-left 30px
    border-radius 100px
    width 85px
    height 85px
    border 1px solid #eee
    font-size 14px
.learn-item
  border 1px solid #eee
  padding 15px
  margin-bottom 10px
  p
    padding 8px 3px
    &:nth-child(n+2)
      font-size 14px
.grade-item
  p
    &:nth-child(n+2)
      margin-top 10px
</style>
