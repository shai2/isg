<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import { debounce } from '@/utils'

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
    // xAxis(){
    //   let _arr = []
    //   for(let e of this.chartData){
    //     if(this.chartData.length===12){
    //       _arr.push(e.date.slice(5)+'月')
    //     }else if(this.chartData.length===24){
    //       _arr.push(e.date.slice(11)+'点')
    //     }else{
    //       _arr.push(e.date.slice(5))
    //     }
    //   }
    //   return _arr
    // },
    // num(){
    //   let _arr = []
    //   for(let e of this.chartData){
    //     _arr.push(e.num)
    //   }
    //   return _arr
    // }
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
          text:'用户活跃度情况',
          textAlign:'left',
          x:"center"
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          left: 'center',
          bottom: '10',
          data: ['活跃', '其他']
        },
        calculable: true,
        series: [
          {
            name: 'WEEKLY WRITE ARTICLES',
            type: 'pie',
            roseType: 'radius',
            radius: ['25%', '70%'],
            center: ['50%', '50%'],
            data: [
              { value: 320, name: '活跃' },
              { value: 240, name: '其他' }
            ],
            animationEasing: 'cubicInOut',
            animationDuration: 1500
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
