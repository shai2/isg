<template>
  <div class="app-container">
    <div v-if="dict['store_type']" class="filter-container normal-border">
      <div class="flex-row-center align-top">
        <p class="select-label">门店范围：</p>
        <div class="flex">
          <areaSelect @areaChange="areaChange"></areaSelect>
          <el-select clearable class="filter-item" v-model="listQuery.storeType" placeholder="门店类型">
            <el-option v-for="(e,i) in dict['store_type']" :key="i" :label="e.name" :value="e.value">
            </el-option>
          </el-select>
          <el-input clearable @keyup.enter.native="handleFilter" class="filter-item w200" placeholder="门店名称" v-model="listQuery.storeName">
          </el-input>
          <el-input clearable @keyup.enter.native="handleFilter" class="filter-item w200" placeholder="门店编号" v-model="listQuery.storeCode">
          </el-input>
          <el-input clearable @keyup.enter.native="handleFilter" class="filter-item w200" placeholder="地址" v-model="listQuery.address">
          </el-input>
        </div>
      </div>
      <div class="flex-row-center align-top">
        <p class="select-label">人员范围：</p>
        <div class="flex">
          <el-select clearable class="filter-item" v-model="listQuery.position" filterable placeholder="职位">
            <el-option v-for="(e,i) in dict['position']" :key="i" :label="e.name" :value="e.name">
            </el-option>
          </el-select>
          <el-select clearable class="filter-item" v-model="listQuery.jobStatus" placeholder="在职状态">
            <el-option v-for="(e,i) in dict['job_status']" :key="i" :label="e.name" :value="e.value">
            </el-option>
          </el-select>
          <el-input clearable @keyup.enter.native="handleFilter" style="width: 120px;" class="filter-item" placeholder="姓名" v-model="listQuery.name">
          </el-input>
          <el-input clearable @keyup.enter.native="handleFilter" style="width: 120px;" class="filter-item" placeholder="手机号" v-model="listQuery.telephone">
          </el-input>
          <el-select clearable class="filter-item" v-model="listQuery.industry" placeholder="行业标签">
            <el-option v-for="(e,i) in dict['industry_type']" :key="i" :label="e.name" :value="e.name">
            </el-option>
          </el-select>
          <el-select clearable class="filter-item" v-model="listQuery.train" placeholder="培训标签">
            <el-option v-for="item in trainingOptions" :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
          <br/>
          <el-select clearable class="filter-item" v-model="listQuery.jobType" placeholder="工作类型">
            <el-option v-for="(e,i) in dict['job_type']" :key="i" :label="e.name" :value="e.value">
            </el-option>
          </el-select>
          <el-select clearable class="filter-item" v-model="listQuery.sex" placeholder="性别">
            <el-option v-for="(e,i) in dict['sex']" :key="i" :label="e.name" :value="e.value">
            </el-option>
          </el-select>
          <el-input clearable @keyup.enter.native="handleFilter"  class="filter-item" placeholder="工龄下限" v-model="listQuery.workAgeMin">
          </el-input>
          <el-input clearable @keyup.enter.native="handleFilter"  class="filter-item" placeholder="年龄上限" v-model="listQuery.ageMax">
          </el-input>
          <el-input clearable @keyup.enter.native="handleFilter"  class="filter-item" placeholder="任务完成数下限" v-model="listQuery.finishTask">
          </el-input>
        </div>
      </div>
      <div class="flex-row-center align-top">
        <p class="select-label">排期范围：</p>
        <div class="flex">
          <el-date-picker v-model="listQuery.startTime" type="datetime" format="yyyy-MM-dd HH:mm" :editable="false" placeholder="开始时间">
          </el-date-picker>
          <el-date-picker v-model="listQuery.endTime" type="datetime" format="yyyy-MM-dd HH:mm" :editable="false" placeholder="结束时间">
          </el-date-picker>
          <el-select clearable class="filter-item" v-model="listQuery.workStatus" placeholder="工作状态">
            <el-option v-for="(e,i) in dict['schedule_status']" :key="i" :label="e.name" :value="e.value">
            </el-option>
          </el-select> 
          <div class="filter-container">
            <el-checkbox-group v-model="listQuery.weekDayList">
              <el-checkbox v-for="(e,i) in dict['week']" :label="e.value" :key="i">{{e.name}}</el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
      </div>
      <div class="flex-row-center align-top">
        <p class="select-label">客户范围：</p>
        <div class="flex">
          <el-select clearable style="width: 110px" class="filter-item" v-model="listQuery.brandName" placeholder="客户范围">
            <el-option v-for="(e,i) in dict['brand_name']" :key="i" :label="e.name" :value="e.name">
            </el-option>
          </el-select> 
        </div>
      </div>
      <div class="textalign-r">
        <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">查询</el-button>
      </div>
    </div>
    <div v-else class="loading-blank" v-loading="!dict[0]"></div>
    <!-- 表单部分 -->
    <div class="table-container normal-border">
      <div class="textalign-r mgbt10">
        <el-button class="filter-item" type="primary" :loading="downloadLoading" v-waves icon="el-icon-download" @click="download">导出</el-button>
      </div>
      <el-table :data="list" v-loading="listLoading" border fit highlight-current-row>
        <el-table-column align="center" label="姓名">
          <template slot-scope="scope">
            <span style='color:red;cursor:pointer;' @click="handledetail(scope.row)">{{scope.row.name}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="手机号" width="110">
          <template slot-scope="scope">
            <span>{{scope.row.telephone}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="年龄">
          <template slot-scope="scope">
            <span>{{scope.row.age}}</span>
          </template>
        </el-table-column>
        <el-table-column  align="center" label="性别">
          <template slot-scope="scope">
            <span>{{scope.row.sex}}</span>
          </template>
        </el-table-column>
        <el-table-column  align="center" label="职位">
          <template slot-scope="scope">
            <span>{{scope.row.position}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="工龄">
          <template slot-scope="scope">
            <span>{{scope.row.workAge || 0}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="行业标签">
          <template slot-scope="scope">
            <el-tag>{{scope.row.industry || '暂无'}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column width="100" class-name="status-col" label="培训标签">
          <template slot-scope="scope">
            <el-tag>{{scope.row.training || '暂无'}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column class-name="status-col" label="任务完成数">
          <template slot-scope="scope">
            <el-tag>{{scope.row.finishTaskCount || 0}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column class-name="status-col" label="任务完成率">
          <template slot-scope="scope">
            <el-tag>{{scope.row.finishRate ? (scope.row.finishRate*100+'%') : '0%'}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column class-name="status-col" align="center" label="操作">
          <template slot-scope="scope">
            <el-button type="primary" @click="handledetail(scope.row)">{{$t('table.detail')}}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination-container">
        <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.pageNum" :page-sizes="[10,20,30, 50]" :page-size="listQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import fileDownload from 'js-file-download'
import { getEmployeeList, exportEmployeeList } from 'api/employee'
import { getDictionary } from 'api/dict'
import waves from 'directive/waves' // 水波纹指令
import areaSelect from 'components/areaSelect'
import { parseTime } from 'utils'
import { area, page, store } from 'utils/commonArgs'
export default {
  name: 'employeeTable',
  data() {
    return {
      list: null,
      total: null,
      listLoading: true,
      downloadLoading: false,
      listQuery: {
        storeType: '', // 门店类型
        position: '', // 职位
        jobStatus: '', // 在职状态
        name: '', // 姓名
        telephone: '', // 手机号
        industry: '', // 行业标签
        train: '', // 培训标签
        jobType: '', // 工作类型
        sex: '', // 性别
        workAgeMin: '', // 工龄下线
        ageMax: '', // 年龄上线
        finishTask: '', // 任务完成数
        startTime: '', // 排期开始时间
        endTime: '', // 排期结束时间
        weekDayList: [], // 排班星期几
        workStatus: '', // 工作状态
        brandCode: ''// 客户范围
      },
      dict: [],
      trainingOptions: [],//培训标签暂无 保留
    }
  },
  components: {
    areaSelect
  },
  directives: {
    waves
  },
  created() {
    this.getDictionary()
    Object.assign(this.listQuery, area, page, store)
    this.getList()
  },
  methods: {
    getDictItem(dict,type){
      return getDictItem(dict,type)
    },
    getDictionary() {
      getDictionary('store_type,place_type,job_status,job_type,sex,brand_name,industry_type,position,schedule_status,week').then(res => {
        this.dict = res.data.data
        // console.log(this.dict)
      })
    },
    areaChange(e) {
      this.listQuery.province = e[0]
      this.listQuery.city = e[1]
      this.listQuery.area = e[2]
    },
    getList() {
      if((this.listQuery.startTime&&this.listQuery.endTime)&&this.listQuery.startTime.getTime()>this.listQuery.endTime.getTime()){
        this.$message({
          message: '排期范围的起止时间不对',
          type: 'warning'
        });
        return
      }
      // if(this.listQuery.startTime)
      this.listLoading = true
      // console.log(this.listQuery)
      getEmployeeList(this.listQuery).then(res => {
        this.list = res.data.data.list
        this.total = res.data.data.total 
        this.listLoading = false
      })
    },
    download(){
      if(this.list.length===0) return
      this.downloadLoading = true
      exportEmployeeList(this.listQuery).then(res => {
        let _filename = decodeURIComponent(res.headers['content-disposition'].split('=')[1])
        fileDownload(res.data,_filename);
        this.downloadLoading = false
      })
    },
    handleFilter() {
      this.listQuery.pageNum = 1
      this.getList()
    },
    handleSizeChange(val) {
      this.listQuery.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.pageNum = val
      this.getList()
    },
    handledetail(row) {
      this.$router.push(`/table/employeeDetail?employeeCode=${row.employeeCode}`)
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    }
  }
}
</script>
