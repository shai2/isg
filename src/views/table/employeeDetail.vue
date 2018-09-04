<template>
  <div class="app-container flex-row-between align-stretch">
    <div class="left flex-column-center normal-border">
      <div class="info flex-row-center">
        <img src="http://img3.duitang.com/uploads/item/201604/24/20160424144634_Sirh8.jpeg">
        <div class="flex">
          <p>CCCC29874294</p>
          <p>刘娜</p>
          <p>13123234565</p>
        </div>
      </div>
      <el-tabs class="flex" v-model="activeName" type="border-card">
        <el-tab-pane class="info info-detail" label="基础信息" name="0">
          <p>320311198402142529
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
          <p>女</p>
          <p>33</p>
          <p>湖南</p>
          <p>高中</p>
          <p>上海市</p>
        </el-tab-pane>
        <el-tab-pane label="工作履历" name="1">
          <div v-for="(e,i) in workExp" :key="i" class="work-item flex-row-center">
            <div class="work-item-left flex">
              <p>{{e.name}}</p>
              <p>{{e.time}}</p>
              <p>{{e.pos}}</p>
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
          <div v-for="(e,i) in learnExp" :key="i" class="learn-item">
            <p>{{e.name}}</p>
            <p>完成时间：{{e.time}}</p>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div> 
    <div class="right flex w0">
      <div class="right-top normal-border">
        <el-table :data="gradeData" border fit>
          <el-table-column property="a" label="任务完成数"></el-table-column>
          <el-table-column property="b" label="完成率"></el-table-column>
          <el-table-column property="c" label="最近服务品牌"></el-table-column>
          <el-table-column property="d" label="优势行业"></el-table-column>
          <el-table-column property="e" label="雇主满意度"></el-table-column>
        </el-table>
      </div>
      <div class="right-bottom normal-border">
        <el-button type="primary">上午空闲</el-button>
          <el-button type="success">下午空闲</el-button>
          <el-button type="info">全天空闲</el-button>
          <fullCalendar
            :events = "fcEvents"
            @changeMonth = "changeMonth"
            @eventClick = "eventClick"
            lang="zh">
          </fullCalendar>
      </div>
    </div>
  </div>
</template>

<script>
import RaddarChart from './charts/RaddarChart'
import fullCalendar from 'vue-fullcalendar'

export default {
  components: { RaddarChart, fullCalendar },
  data() {
    return {
      tabMapOptions: ['基础信息', '工作履历', '能力评估', '出入金明细', '学习培训'],
      activeName: '0',
      workExp: [
        {
          name: '联合利华4月长促',
          time: '2018-04-01~2018-04-03',
          pos: '促销员',
          status: '进行中'
        },
        {
          name: '联合利华3月长促',
          time: '2018-04-01~2018-04-03',
          pos: '促销员',
          status: '已结束'
        },
        {
          name: '联合利华2月长促',
          time: '2018-04-01~2018-04-03',
          pos: '促销员',
          status: '已结束'
        }
      ],
      learnExp: [
        {
          name: '促销岗位基础培训1',
          time: '2018-04-01'
        },
        {
          name: '促销岗位基础培训2',
          time: '2018-04-01'
        }
      ],
      moneyData: [
        { id: '2018032093', num: 1100, remark: '薪资' },
        { id: '2018032093', num: -200, remark: '培训' },
        { id: '2018032093', num: 900, remark: '薪资' }
      ],
      gradeData: [{ a: 179, b: '80%', c: '联合利华', d: '日化', e: '80%' }],
      fcEvents: [
        {
          title: '强生 早班',
          start: '2018-09-09',
          end: '2018-09-13',
          cssClass: 'career'
        },
        {
          title: '强生 晚班',
          start: '2018-09-14',
          end: '2018-09-20',
          cssClass: ['family', 'career']
        }
      ]
    }
  },
  methods: {
    changeMonth(start, end, current){
      console.log('需要的时间是 '+current)
    },
    eventClick(event, jsEvent, pos){
      console.log('要扩展的内容是 '+event.title)
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
