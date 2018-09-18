<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import { debounce } from '@/utils'

const animationDuration = 1500

export default {
  props: {
    chartData: {
      type: Array,
      default(){
        return []
      }
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
      default: '340px'
    }
  },
  data() {
    return {
      chart: null
    }
  },
  computed:{
    xAxis(){
      let _arr = []
      for(let e of this.chartData){
        if(this.chartData.length===12){
          _arr.push(e.date.slice(5)+'月')
        }else if(this.chartData.length===24){
          _arr.push(e.date.slice(11)+'点')
        }else{
          _arr.push(e.date.slice(5))
        }
      }
      return _arr
    },
    num(){
      let _arr = []
      for(let e of this.chartData){
        _arr.push(e.num)
      }
      return _arr
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions()
      }
    }
  },
  mounted() {
    this.initChart()
    this.__resizeHanlder = debounce(() => {
      if (this.chart) {
        this.chart.resize()
      }
    }, 100)
    window.addEventListener('resize', this.__resizeHanlder)
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    window.removeEventListener('resize', this.__resizeHanlder)
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    setOptions(){
      this.chart.setOption({
        title: {
          text:'新增用户情况',
          textAlign:'left',
          x:"center"
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          top: 45,
          left: '2%',
          right: '2%',
          bottom: '4%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          data: this.xAxis,
          axisTick: {
            alignWithLabel: true
          }
        }],
        yAxis: [{
          type: 'value',
          axisTick: {
            show: false
          }
        }],
        series: [{
          name: '新增用户数量',
          type: 'bar',
          barWidth: '70%',
          data: this.num,
          animationDuration
        }]
      })
    },
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      this.setOptions(this.chartData)
    }
  }
}
</script>
