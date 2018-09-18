<template>
  <div class="dashboard-editor-container">

    <panel-group v-if="viewData" :chartData="viewData"></panel-group>
    
    <el-row :gutter="10">
      <el-col :xs="24" :sm="24" :lg="14">
        <div class="chart-wrapper">
          <bar-chart :chartData="userList"></bar-chart>
          <div style="padding-bottom:10px;">
            <el-button @click.native="userList = barChartData.day_list" size="small" plain>昨日</el-button>
            <el-button @click.native="userList = barChartData.month_list" size="small" plain>近30日</el-button>
            <el-button @click.native="userList = barChartData.year_list" size="small" plain>近12月</el-button>
          </div>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="10">
        <div class="chart-wrapper">
          <pie-chart></pie-chart>
          <div style="padding-bottom:10px;">
            <el-button size="small" plain>日活跃</el-button>
            <el-button size="small" plain>月活跃</el-button>
          </div>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="10">
      <el-col :xs="24" :sm="24" :lg="12">
        <div style="background:#fff;padding:20px;">
          <p style="margin-bottom:10px;">短促提现统计</p>
          <el-table :data="cashList" border fit :show-header="false">
            <el-table-column property="event" label="短促提现统计"></el-table-column>
            <el-table-column property="value"></el-table-column>
          </el-table>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="12">
        <div class="chart-wrapper">
          <line-chart :chart-data="lineChartData"></line-chart>
        </div>
      </el-col>
    </el-row>

  </div>
</template>


<script>
import GithubCorner from '@/components/GithubCorner'
import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'
import RaddarChart from './components/RaddarChart'
import PieChart from './components/PieChart'
import BarChart from './components/BarChart'
import TransactionTable from './components/TransactionTable'
import TodoList from './components/TodoList'
import { getOverViewData, getAddUserList, getCashList, getSalaryCashWeekList} from 'api/dashboard'

export default {
  name: 'dashboard-admin',
  components: {
    GithubCorner,
    PanelGroup,
    LineChart,
    RaddarChart,
    PieChart,
    BarChart,
    TransactionTable,
    TodoList,
    // BoxCard
  },
  data() {
    return {
      viewData: {},
      userList: [],
      barChartData: {},
      cashListData: {},
      cashWeekList: {},
      lineChartData: {},
    }
  },
  computed:{
    cashList(){
      let _arr = []
      for(let e in this.cashListData){
        let _obj = {}
        _obj.event = e
        _obj.value = this.cashListData[e]
        _arr.push(_obj)
      }
      console.log(_arr)
      return _arr
    }
  },
  created(){
    this.getOverViewData()
    this.getAddUserList()
    this.getCashList()
  },
  methods: {
    getOverViewData(){
      getOverViewData().then((res)=>{
        this.viewData = res.data.data
      })
    },
    getAddUserList(){
      getAddUserList().then((res)=>{
        this.barChartData = res.data.data
        this.userList = this.barChartData.month_list
      })
    },
    getCashList(){
      getCashList().then((res)=>{
        console.log(res.data.data)
        this.cashListData = res.data.data
      })
    },
    getSalaryCashWeekList(){
      getSalaryCashWeekList().then((res)=>{
        // console.log(res.data.data)
        this.cashWeekList = res.data.data
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard-editor-container {
  padding: 20px;
  background-color: rgb(240, 242, 245);
  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 10px;
  }
}
</style>
