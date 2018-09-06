<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import { debounce, parseTime } from '@/utils'

export default {
  props: {
    chartTime: {
      type: String
    },
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '250px'
    },
    autoResize: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      chart: null,
      chartData: []
    }
  },
  computed: {
    brandArr() {
      return this.arrInit('brand')
    },
    planStratArr() {
      return this.arrInit('planStratTime')
    },
    planEndArr() {
      return this.arrInit('planEndTIme')
    },
    actualStratArr() {
      return this.arrInit('actualStratTime')
    },
    actualEndArr() {
      return this.arrInit('actualEndTime')
    }
  },
  mounted() {
    this.initChart()
    if (this.autoResize) {
      this.__resizeHanlder = debounce(() => {
        if (this.chart) {
          this.chart.resize()
        }
      }, 100)
      window.addEventListener('resize', this.__resizeHanlder)
    }

    // 监听侧边栏的变化
    const sidebarElm = document.getElementsByClassName('sidebar-container')[0]
    sidebarElm.addEventListener('transitionend', this.__resizeHanlder)
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    if (this.autoResize) {
      window.removeEventListener('resize', this.__resizeHanlder)
    }

    const sidebarElm = document.getElementsByClassName('sidebar-container')[0]
    sidebarElm.removeEventListener('transitionend', this.__resizeHanlder)

    this.chart.dispose()
    this.chart = null
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      }
    },
    chartTime() {
      this.chartData = [{
        brand: '牌子1',
        planStratTime: '2016-12-18 6:30:00',
        planEndTIme: '2016-12-18 9:30:00',
        actualStratTime: '2016-12-18 6:00:00',
        actualEndTime: '2016-12-18 9:00:00'
      }, {
        brand: '牌子2',
        planStratTime: '2016-12-18 12:30:00',
        planEndTIme: '2016-12-18 15:30:00',
        actualStratTime: '2016-12-18 13:30:00',
        actualEndTime: '2016-12-18 17:30:00'
      }]
      // 请求 成功后
      console.log('需要日期' + this.chartTime)
      this.setOptions()
    }
  },
  methods: {
    arrInit(item) {
      const _arr = []
      for (const e of this.chartData) {
        _arr.push(e[item])
      }
      return _arr
    },
    setOptions({ expectedData, actualData } = {}) {
      this.chart.setOption({
        title: {
          text: this.chartTime,
          x: 'center'
        },
        grid: {
          left: 50,
          right: 40
        },
        legend: {
          data: ['计划工作', '实际工作'],
          x: 'left',
          y: 'bottom',
          padding: [0, 40]
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          formatter(value) {
            return value[0].axisValueLabel
          }
        },
        xAxis: {
          type: 'time',
          name: '时间',
          axisTick: {
            show: true
          },
          axisLabel: {
            formatter(value) {
              return parseTime(value, '{h}:{i}')
            }
          }
        },
        yAxis: {
          type: 'category',
          inverse: true,
          data: this.brandArr,
          splitArea: {
            show: true
          }
        },
        series: [
          {
            name: '辅助计划工作',
            type: 'bar',
            barGap: 0,
            stack: 'plan',
            data: this.planStratArr, // 计划开始时间
            tooltip: {
              show: false // 字段不显示在hover层
            },
            itemStyle: {
              normal: {
                opacity: 0 // 不绘制
              }
            }
          },
          {
            name: '计划工作',
            type: 'bar',
            stack: 'plan',
            data: this.planEndArr// 计划结束时间
          },
          {
            name: '辅助实际工作',
            type: 'bar',
            stack: 'actual',
            data: this.actualStratArr, // 实际开始时间
            tooltip: {
              show: false // 字段不显示在hover层
            },
            itemStyle: {
              normal: {
                opacity: 0 // 不绘制
              }
            }
          },
          {
            name: '实际工作',
            type: 'bar',
            stack: 'actual',
            data: this.actualEndArr// 实际结束时间
          },
          {
            name: '撑起时间轴',
            type: 'bar',
            stack: 'actual',
            data: ['2016-12-18 00:00:00', '2016-12-18 24:00:00'],
            tooltip: {
              show: false
            },
            itemStyle: {
              normal: {
                opacity: 0
              }
            }
          }
        ]
      })
    },
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      this.setOptions(this.chartData)
    }
  }
}
</script>