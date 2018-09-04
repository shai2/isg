<template>
  <div class="app-container">
    <div class="filter-container normal-border">
      <div class="flex-row-center align-top">
        <p class="select-label">门店范围：</p>
        <div class="flex">
          <areaSelect @areaChange="areaChange"></areaSelect>
          <el-select clearable style="width: 110px" class="filter-item" v-model="listQuery.storeType" :placeholder="门店类型">
            <el-option v-for="item in storeTypeOptions" :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
          <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" :placeholder="门店名称" v-model="listQuery.storeName">
          </el-input>
          <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" :placeholder="门店编号" v-model="listQuery.storeCode">
          </el-input>
          <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" :placeholder="地址" v-model="listQuery.address">
          </el-input>
        </div>
      </div>
      <div class="flex-row-center align-top">
        <p class="select-label">人员范围：</p>
        <div class="flex">
          <el-select clearable style="width: 90px" class="filter-item" v-model="listQuery.position" :placeholder="职位">
            <el-option v-for="item in positionOptions" :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
          <el-select clearable style="width: 110px" class="filter-item" v-model="listQuery.jobStatus" :placeholder="在职状态">
            <el-option v-for="item in jobStatusOptions" :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
          <el-select clearable style="width: 90px" class="filter-item" v-model="listQuery.name" :placeholder="姓名">
            <el-option v-for="item in nameOptions" :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
          <el-select clearable style="width: 110px" class="filter-item" v-model="listQuery.telephone" :placeholder="手机号">
            <el-option v-for="item in telephoneOptions" :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
          <el-select clearable style="width: 110px" class="filter-item" v-model="listQuery.industryTag" :placeholder="行业标签">
            <el-option v-for="item in industryTagOptions" :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
          <el-select clearable style="width: 110px" class="filter-item" v-model="listQuery.trainingTag" :placeholder="培训标签">
            <el-option v-for="item in trainingTagOptions" :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
          <br/>
          <el-select clearable style="width: 110px" class="filter-item" v-model="listQuery.jobType" :placeholder="工作类型">
            <el-option v-for="item in jobTypeOptions" :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
          <el-select clearable style="width: 90px" class="filter-item" v-model="listQuery.sex" :placeholder="$t('table.sex')">
            <el-option v-for="item in sexOptions" :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
          <el-select clearable style="width: 110px" class="filter-item" v-model="listQuery.workingYearsLowerLimit" :placeholder="$t('table.workingYearsLowerLimit')">
            <el-option v-for="item in workingYearsLowerLimitOptions" :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
          <el-select clearable style="width: 110px" class="filter-item" v-model="listQuery.workingYearsUpperLimit" :placeholder="$t('table.workingYearsUpperLimit')">
            <el-option v-for="item in workingYearsUpperLimitOptions" :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
          <el-input @keyup.enter.native="handleFilter" style="width: 110px;" class="filter-item" placeholder="任务完成数" v-model="listQuery.taskCompletionNumber">
          </el-input>
        </div>
      </div>
      <div class="flex-row-center align-top">
        <p class="select-label">排期范围：</p>
        <div class="flex">
          <el-date-picker v-model="listQuery.create_start_date" type="datetime" format="yyyy-MM-dd HH:mm" placeholder="开始时间">
          </el-date-picker>
          <el-date-picker v-model="listQuery.create_end_date" type="datetime" format="yyyy-MM-dd HH:mm" placeholder="结束时间">
          </el-date-picker>
          <el-select clearable style="width: 110px" class="filter-item" v-model="listQuery.workStatus" placeholder="工作状态">
            <el-option v-for="item in workStatusOptions" :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
          <div class="filter-container">
            <el-checkbox-group v-model="listQuery.checkboxVal">
              <el-checkbox label="周一">周一</el-checkbox>
              <el-checkbox label="周二">周二</el-checkbox>
              <el-checkbox label="周三">周三</el-checkbox>
              <el-checkbox label="周三">周三</el-checkbox>
              <el-checkbox label="周四">周四</el-checkbox>
              <el-checkbox label="周五">周五</el-checkbox>
              <el-checkbox label="周六">周六</el-checkbox>
              <el-checkbox label="周日">周日</el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
      </div>
      <div class="flex-row-center align-top">
        <p class="select-label">客户范围：</p>
        <div class="flex">
          <el-select clearable style="width: 110px" class="filter-item" v-model="listQuery.customeRange" placeholder="客户范围">
            <el-option v-for="item in customeRangeOptions" :key="item" :label="item" :value="item">
            </el-option>
          </el-select> 
        </div>
      </div>
      <div class="textalign-r">
        <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">查询</el-button>
      </div>
    </div>
    <!-- 表单部分 -->
    <div class="table-container normal-border">
      <div class="textalign-r mgbt10">
        <el-button class="filter-item" type="primary" :loading="downloadLoading" v-waves icon="el-icon-download" @click="handleDownload">导出</el-button>
      </div>
      <el-table :data="list" v-loading="listLoading" border fit highlight-current-row>  
        <el-table-column align="center" :label="$t('table.name')">
          <template slot-scope="scope">
            <span>{{scope.row.name}}</span>
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
            <span style='color:red;'>{{scope.row.position}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" :label="$t('table.workingYears')">
          <template slot-scope="scope">
            <span>{{scope.row.workingYears}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" :label="$t('table.industryTag')">
          <template slot-scope="scope">
            <span v-if="scope.row.industryTag" class="link-type">{{scope.row.industryTag}}</span>
          </template>
        </el-table-column>
        <el-table-column width="100" class-name="status-col" :label="$t('table.trainingTag')">
          <template slot-scope="scope">
            <el-tag>{{scope.row.trainingTag}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column class-name="status-col" :label="$t('table.taskCompletionNumber')">
          <template slot-scope="scope">
            <el-tag>{{scope.row.taskCompletionNumber}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column class-name="status-col" :label="$t('table.taskCompletionRate')">
          <template slot-scope="scope">
            <el-tag>{{scope.row.taskCompletionRate}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column class-name="status-col" align="center" :label="$t('table.actions')">
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
import { getEmployeeList } from '@/api/employee'
import waves from '@/directive/waves' // 水波纹指令
import { parseTime } from '@/utils'
import areaSelect from 'components/areaSelect'
export default {
  name: 'employeeTable',
  data() {
    return {
      list: null,
      total: null,
      listLoading: true,
      downloadLoading: false,
      listQuery: {
        province:'',
        city:'',
        area:'',
        store_type:'',//门店类型
        store_name:'',//门店名称
        store_code:'',//门店编号
        address:'',//地址
        position:'',//职位
        job_status:'',//在职状态
        name:'',//姓名
        telephone:'',//手机号
        industry:'',//行业标签
        train:'',//培训标签
        job_type:'',//工作类型
        sex:'',//性别
        age_min:'',//年龄下限
        age_max:'',//年龄下限
        work_year_min:'',//工龄下线
        work_year_min:'',//工龄上线
        complete_count:'',//任务完成数
        start_time:'',//排期开始时间
        end_time:'',//排期结束时间
        week_day:'',//排班星期几
        status:'',//排班状态
        brand_code:'',//客户范围
        pageNum:1,//需要展示的分页页数
        pageSize:10,//每一页显示个数
      },
      storeTypeOptions: ['连锁', '品牌'],
      positionOptions: ['促销员', '督导'],
      jobStatusOptions: ['在职', '离职'],
      nameOptions: ['张三', '李四'],
      telephoneOptions: ['12345678901', '12345678902'],
      industryTagOptions: ['3C', '商超'],
      trainingTagOptions: ['通用能力', '专业能力'],
      jobTypeOptions: ['全职', '兼职'],
      sexOptions: ['男', '女'],
      workingYearsUpperLimitOptions: ['3', '5'],
      workingYearsLowerLimitOptions: ['1', '2'],
      workStatusOptions: ['工作中', '休息'],
      customeRangeOptions: ['联合利华', '高露洁'],
    }
  },
  components:{
    areaSelect
  },
  directives: {
    waves
  },
  created() {
    this.getList()
  },
  methods: {
    areaChange(e){
      this.listQuery.province = e[0]
      this.listQuery.city = e[1]
      this.listQuery.area = e[2]
    },
    getList() {
      this.listLoading = true
      getEmployeeList(this.listQuery).then(response => {
        console.log(response.data.items)
        this.list = response.data.items
        this.total = response.data.total

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
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
      this.$router.push({ path: '/table/employeeDetail' })
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
