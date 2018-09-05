<template>
  <div v-if="employeeData.normal_info" class="app-container flex-row-between align-stretch">
    <div class="left flex-column-center normal-border">
      <div class="info flex-row-center">
        <img src="http://img3.duitang.com/uploads/item/201604/24/20160424144634_Sirh8.jpeg">
        <div class="flex">
          <p>{{employeeData.normal_info.employee_code}}</p>
          <p>{{employeeData.normal_info.name}}</p>
          <p>{{employeeData.normal_info.telephone}}</p>
        </div>
      </div>
      <el-tabs class="flex" v-model="activeName" type="border-card">
        <el-tab-pane class="info info-detail" label="基础信息" name="0">
          <p>{{employeeData.personal_info.identity_card_number}}
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
          <p>{{employeeData.personal_info.sex}}</p>
          <p>{{employeeData.personal_info.age}}</p>
          <p>{{employeeData.personal_info.province_city}}</p>
          <p>{{employeeData.personal_info.education}}</p>
        </el-tab-pane>
        <el-tab-pane label="工作履历" name="1">
          <div v-for="(e,i) in employeeData.work_info" :key="i" class="work-item flex-row-center">
            <div class="work-item-left flex">
              <p>{{e.work_resume_name}}</p>
              <p>{{e.start_time}} ~ {{e.end_time}}</p>
              <p>{{e.position}}</p>
            </div>
            <div :class="{'border-green':e.status=='进行中'}" class="work-item-right flex-column-center">
              <p>{{e.status}}</p>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="能力评估" name="2">
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
          <div v-for="(e,i) in employeeData.train" :key="i" class="learn-item">
            <p>{{e.train_name}}</p>
            <p>完成时间：{{e.finish_time}}</p>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div> 
    <div class="right flex w0">
      <div class="right-top normal-border">
        <el-table :data="abilityEvaluate" border fit>
          <el-table-column property="complete_count" label="任务完成数"></el-table-column>
          <el-table-column property="complete_accuracy" label="完成率"></el-table-column>
          <el-table-column property="latelyServiceBrand" label="最近服务品牌"></el-table-column>
          <el-table-column property="industryAdvantage" label="优势行业"></el-table-column>
          <el-table-column property="industry_concentration" label="雇主满意度"></el-table-column>
        </el-table>
      </div>
      <div class="right-bottom normal-border">
        <div v-show="!showDetailChart">
          <el-button @click.native="showEvents('all')" size="small" plain>显示所有</el-button>
          <el-button @click.native="showEvents('work')" type="primary" size="small" plain>显示排班</el-button>
          <el-button @click.native="showEvents('rest')" type="success" size="small" plain>显示休息</el-button>
          <el-button @click.native="showEvents('free')" type="info" size="small" plain>显示空闲</el-button>
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
          <LineChart ref="lineChart"></LineChart>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RaddarChart from './charts/RaddarChart'
import fullCalendar from 'vue-fullcalendar'
import LineChart from './charts/lineChart'
import { getEmployeeDetail, getEvents } from 'api/employee'
import { parseTime } from 'utils'

export default {
  components: { RaddarChart, fullCalendar, LineChart },
  data() {
    return {
      employee_code: '', // 人员编号
      tabMapOptions: ['基础信息', '工作履历', '能力评估', '出入金明细', '学习培训'],
      activeName: '0',
      employeeData: {}, // 人员数据
      moneyData: [
        { id: '2018032093', num: 1100, remark: '薪资' },
        { id: '2018032093', num: -200, remark: '培训' },
        { id: '2018032093', num: 900, remark: '薪资' }
      ],
      abilityEvaluate: [], // obj转存数组
      showDetailChart: false, // 显示详情图
      allEvents: [], // 存所有
      fcEvents: [], // 显示的events
      showEventsType: ''// 显示events类型
    }
  },
  created() {
    this.getDetail()
    this.getEvents()
  },
  watch: {
    '$route'(to, from) {
      this.getDetail()
      this.getEvents()
    }
  },
  computed: {
    restEvents() {
      return this.allEvents.filter((e, i) => {
        return e.title === '休息'
      })
    },
    freeEvents() {
      return this.allEvents.filter((e, i) => {
        return e.title === '空闲'
      })
    },
    workEvents() {
      return this.allEvents.filter((e, i) => {
        return e.title === '排班'
      })
    }
  },
  methods: {
    changeMonth(start, end, current) {
      console.log('出发改变月份，需要的时间是 ' + current)
    },
    dayClick(day, jsEvent) {
      this.showDetailChart = true
      this.$refs.lineChart.__resizeHanlder()
      console.log(parseTime(day, '{y}-{d}'))// 请求当天数据传参
    },
    getDetail() {
      getEmployeeDetail(this.employee_code).then(res => {
        this.employeeData = res.data.data
        this.abilityEvaluate.push(this.employeeData.ability_evaluate)
      })
    },
    showEvents(type) {
      this.showEventsType = type
      this.chooseEventsShow()
      console.log(this.restEvents)
    },
    getEvents() {
      getEvents().then(res => {
        this.allEvents = res.data.data
        this.chooseEventsShow()
      })
    },
    chooseEventsShow() {
      switch (this.showEventsType) {
        case 'work':
          this.fcEvents = this.workEvents
          break
        case 'rest':
          this.fcEvents = this.restEvents
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
