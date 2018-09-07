<template>
  <div class="app-container">
    <div v-if="dict[0]" class="filter-container normal-border">
      <div class="flex-row-center align-top">
        <p class="select-label">门店范围：</p>
        <div class="flex">
          <areaSelect style="width: 200px" @areaChange="areaChange"></areaSelect>
          <el-select clearable style="width: 120px" class="filter-item" v-model="listQuery.store_type" placeholder="门店类型">
            <el-option v-for="(e,i) in dict[5].data" :key="i" :label="e.name" :value="e.value">
            </el-option>
          </el-select>
          <el-input clearable @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="门店名称" v-model="listQuery.store_name">
          </el-input>
          <el-input clearable @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="门店编号" v-model="listQuery.store_code">
          </el-input>
          <el-input clearable @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="地址" v-model="listQuery.address">
          </el-input>
        </div>
      </div>
      <div class="flex-row-center align-top">
        <p class="select-label">人员范围：</p>
        <div class="flex">
          <el-select clearable style="width: 90px" class="filter-item" v-model="listQuery.position" placeholder="职位">
            <el-option v-for="item in positionOptions" :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
          <el-select clearable style="width: 110px" class="filter-item" v-model="listQuery.job_status" placeholder="在职状态">
            <el-option v-for="(e,i) in dict[0].data" :key="i" :label="e.name" :value="e.value">
            </el-option>
          </el-select>
          <el-input clearable @keyup.enter.native="handleFilter" style="width: 100px;" class="filter-item" placeholder="姓名" v-model="listQuery.name">
          </el-input>
          <el-input clearable @keyup.enter.native="handleFilter" style="width: 100px;" class="filter-item" placeholder="手机号" v-model="listQuery.telephoneOptions">
          </el-input>
          <el-select clearable style="width: 110px" class="filter-item" v-model="listQuery.industry" placeholder="行业标签">
            <el-option v-for="(e,i) in dict[4].data" :key="i" :label="e.name" :value="e.value">
            </el-option>
          </el-select>
          <el-select clearable style="width: 110px" class="filter-item" v-model="listQuery.train" placeholder="培训标签">
            <el-option v-for="item in trainingTagOptions" :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
          <br/>
          <el-select clearable style="width: 110px" class="filter-item" v-model="listQuery.job_type" placeholder="工作类型">
            <el-option v-for="item in jobTypeOptions" :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
          <el-select clearable style="width: 90px" class="filter-item" v-model="listQuery.sex" placeholder="性别">
            <el-option v-for="(e,i) in dict[1].data" :key="i" :label="e.name" :value="e.value">
            </el-option>
          </el-select>
          <el-input clearable type="number" @keyup.enter.native="handleFilter" style="width: 110px;" class="filter-item" placeholder="工龄下限" v-model="listQuery.work_year_min">
          </el-input>
          <el-input clearable type="number" @keyup.enter.native="handleFilter" style="width: 110px;" class="filter-item" placeholder="工龄上限" v-model="listQuery.work_year_max">
          </el-input>
          <el-input clearable type="number" @keyup.enter.native="handleFilter" style="width: 110px;" class="filter-item" placeholder="任务完成数" v-model="listQuery.complete_count">
          </el-input>
        </div>
      </div>
      <div class="flex-row-center align-top">
        <p class="select-label">排期范围：</p>
        <div class="flex">
          <el-date-picker v-model="listQuery.start_time" type="datetime" format="yyyy-MM-dd HH:mm" placeholder="开始时间">
          </el-date-picker>
          <el-date-picker v-model="listQuery.end_time" type="datetime" format="yyyy-MM-dd HH:mm" placeholder="结束时间">
          </el-date-picker>
          <el-select clearable style="width: 110px" class="filter-item" v-model="listQuery.workStatus" placeholder="工作状态">
            <el-option v-for="item in workStatusOptions" :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
          <div class="filter-container">
            <el-checkbox-group v-model="listQuery.week_day">
              <el-checkbox v-for="(e,i) in weekDayOptions" :label="e.value" :key="i">{{e.label}}</el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
      </div>
      <div class="flex-row-center align-top">
        <p class="select-label">客户范围：</p>
        <div class="flex">
          <el-select clearable style="width: 110px" class="filter-item" v-model="listQuery.brand_code" placeholder="客户范围">
            <el-option v-for="(e,i) in dict[3].data" :key="i" :label="e.name" :value="e.value">
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
        <el-button class="filter-item" type="primary" :loading="downloadLoading" v-waves icon="el-icon-download" @click="handleDownload">导出</el-button>
      </div>
      <el-table :data="list" v-loading="listLoading" border fit highlight-current-row>
        <el-table-column align="center" :label="$t('table.name')">
          <template slot-scope="scope">
            <span style='color:red;cursor:pointer;' @click="handledetail(scope.row)">{{scope.row.name}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" :label="$t('table.telephone')" width="110">
          <template slot-scope="scope">
            <span>{{scope.row.telephone}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" :label="$t('table.age')">
          <template slot-scope="scope">
            <span>{{scope.row.age}}</span>
          </template>
        </el-table-column>
        <el-table-column  align="center" :label="$t('table.sex')">
          <template slot-scope="scope">
            <span>{{scope.row.sex}}</span>
          </template>
        </el-table-column>
        <el-table-column  align="center" :label="$t('table.position')">
          <template slot-scope="scope">
            <span>{{scope.row.position}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" :label="$t('table.workingYears')">
          <template slot-scope="scope">
            <span>{{scope.row.workingYears || 0}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" :label="$t('table.industryTag')">
          <template slot-scope="scope">
            <el-tag>{{scope.row.industryTag || '暂无'}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column width="100" class-name="status-col" :label="$t('table.trainingTag')">
          <template slot-scope="scope">
            <el-tag>{{scope.row.trainingTag || '暂无'}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column class-name="status-col" :label="$t('table.taskCompletionNumber')">
          <template slot-scope="scope">
            <el-tag>{{scope.row.taskCompletionNumber || 0}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column class-name="status-col" :label="$t('table.taskCompletionRate')">
          <template slot-scope="scope">
            <el-tag>{{scope.row.taskCompletionRate || '0%'}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column class-name="status-col" align="center" label="操作">
          <template slot-scope="scope">
            <el-button type="primary" @click="handledetail(scope.row)">{{$t('table.detail')}}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination-container">
        <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { getEmployeeList, getDictionary } from 'api/employee'
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
        store_type: '', // 门店类型
        position: '', // 职位
        job_status: '', // 在职状态
        name: '', // 姓名
        telephone: '', // 手机号
        industry: '', // 行业标签
        train: '', // 培训标签
        job_type: '', // 工作类型
        sex: '', // 性别
        age_min: '', // 年龄下限
        age_max: '', // 年龄下限
        work_year_min: '', // 工龄下线
        work_year_max: '', // 工龄上线
        complete_count: '', // 任务完成数
        start_time: '', // 排期开始时间
        end_time: '', // 排期结束时间
        week_day: [], // 排班星期几
        status: '', // 排班状态
        brand_code: ''// 客户范围
      },
      dict: [],
      weekDayOptions: [
        { label: '周日', value: 0 },
        { label: '周一', value: 1 },
        { label: '周二', value: 2 },
        { label: '周三', value: 3 },
        { label: '周四', value: 4 },
        { label: '周五', value: 5 },
        { label: '周六', value: 6 }
      ],
      positionOptions: ['促销员', '督导'],
      trainingTagOptions: ['通用能力', '专业能力'],
      jobTypeOptions: ['全职', '兼职'],
      workStatusOptions: ['工作中', '休息']
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
    getDictionary() {
      getDictionary({
        types: 'store_type,place_type,job_status,sex,brand_name,industry_type'
      }).then(res => {
        this.dict = res.data.data
      })
    },
    areaChange(e) {
      this.listQuery.province = e[0]
      this.listQuery.city = e[1]
      this.listQuery.area = e[2]
    },
    getList() {
      this.listLoading = true
      getEmployeeList(this.listQuery).then(res => {
        this.list = res.data.data.list
        this.total = res.data.data.total
        this.listLoading = false
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
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['姓名', '手机号', '年龄', '性别', '职位', '工龄', '行业标签', '培训标签', '完成任务数', '任务完成率']
        const filterVal = ['name', 'telephone', 'age', 'sex', 'position', 'workingYears', 'industryTag', 'trainingTag', 'taskCompletionNumber', 'taskCompletionRate']
        const data = this.formatJson(filterVal, this.list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: '人员列表'
        })
        this.downloadLoading = false
      })
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
