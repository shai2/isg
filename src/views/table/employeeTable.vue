<template>
  <div class="app-container">
    <div class="filter-container normal-border">
      <div class="flex-row-center align-top">
        <p class="select-label">门店范围：</p>
        <div class="flex">
          <el-select clearable style="width: 90px" class="filter-item" v-model="listQuery.provice" :placeholder="$t('table.provice')">
            <el-option v-for="item in proviceOptions" :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
          <el-select clearable style="width: 90px" class="filter-item" v-model="listQuery.city" :placeholder="$t('table.city')">
            <el-option v-for="item in cityOptions" :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
          <el-select clearable style="width: 90px" class="filter-item" v-model="listQuery.districtCountry" :placeholder="$t('table.districtCountry')">
            <el-option v-for="item in districtCountryOptions" :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
          <el-select clearable style="width: 110px" class="filter-item" v-model="listQuery.storeType" :placeholder="$t('table.storeType')">
            <el-option v-for="item in storeTypeOptions" :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
          <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" :placeholder="$t('table.storeName')" v-model="listQuery.storeName">
          </el-input>
          <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" :placeholder="$t('table.storeCode')" v-model="listQuery.storeCode">
          </el-input>
          <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" :placeholder="$t('table.address')" v-model="listQuery.address">
          </el-input>
        </div>
      </div>
      <div class="flex-row-center align-top">
        <p class="select-label">人员范围：</p>
        <div class="flex">
          <el-select clearable style="width: 90px" class="filter-item" v-model="listQuery.position" :placeholder="$t('table.position')">
            <el-option v-for="item in positionOptions" :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
          <el-select clearable style="width: 110px" class="filter-item" v-model="listQuery.jobStatus" :placeholder="$t('table.jobStatus')">
            <el-option v-for="item in jobStatusOptions" :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
          <el-select clearable style="width: 90px" class="filter-item" v-model="listQuery.name" :placeholder="$t('table.name')">
            <el-option v-for="item in nameOptions" :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
          <el-select clearable style="width: 110px" class="filter-item" v-model="listQuery.telephone" :placeholder="$t('table.telephone')">
            <el-option v-for="item in telephoneOptions" :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
          <el-select clearable style="width: 110px" class="filter-item" v-model="listQuery.industryTag" :placeholder="$t('table.industryTag')">
            <el-option v-for="item in industryTagOptions" :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
          <el-select clearable style="width: 110px" class="filter-item" v-model="listQuery.trainingTag" :placeholder="$t('table.trainingTag')">
            <el-option v-for="item in trainingTagOptions" :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
          <br/>
          <el-select clearable style="width: 110px" class="filter-item" v-model="listQuery.jobType" :placeholder="$t('table.jobType')">
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
      <el-table class="w100" :key='tableKey' :data="list" v-loading="listLoading" border fit highlight-current-row>
        <el-table-column align="center" :label="$t('table.name')" width="65">
          <template slot-scope="scope">
            <span>{{scope.row.name}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" :label="$t('table.telephone')">
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
        <el-table-column align="center" :label="$t('table.industryTag')" width="95">
          <template slot-scope="scope">
            <span v-if="scope.row.industryTag" class="link-type" @click='handleFetchPv(scope.row.industryTag)'>{{scope.row.industryTag}}</span>
            <span v-else>0</span>
          </template>
        </el-table-column>
        <el-table-column class-name="status-col" :label="$t('table.trainingTag')">
          <template slot-scope="scope">
            <el-tag :type="scope.row.trainingTag | statusFilter">{{scope.row.trainingTag}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column class-name="status-col" :label="$t('table.taskCompletionNumber')">
          <template slot-scope="scope">
            <el-tag :type="scope.row.taskCompletionNumber | statusFilter">{{scope.row.taskCompletionNumber}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column class-name="status-col" :label="$t('table.taskCompletionRate')">
          <template slot-scope="scope">
            <el-tag>{{scope.row.taskCompletionRate}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column class-name="status-col" align="center" :label="$t('table.actions')" width="160">
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

    <el-dialog :visible.sync="dialogFormVisible">
      <el-form :rules="rules" ref="dataForm" :model="temp" label-position="left" label-width="70px" style='width: 400px; margin-left:50px;'>
        <el-form-item :label="$t('table.name')" prop="name">
          <el-input style="width: 200px;" v-model="temp.name">
          </el-input>
        </el-form-item>
        <el-form-item :label="$t('table.telephone')" prop="telephone">
          <el-input style="width: 200px;" v-model="temp.telephone">
          </el-input>
        </el-form-item>
        <el-form-item :label="$t('table.age')" prop="age">
          <el-input style="width: 200px;" v-model="temp.age">
          </el-input>
        </el-form-item>
        <el-form-item :label="$t('table.sex')" prop="sex">
          <el-input style="width: 200px;" v-model="temp.sex">
          </el-input>
        </el-form-item>
        <el-form-item :label="$t('table.position')" prop="position">
          <el-input style="width: 200px;" v-model="temp.position">
          </el-input>
        </el-form-item>
        <el-form-item :label="$t('table.workingYears')" prop="workingYears">
          <el-input style="width: 200px;" v-model="temp.workingYears">
          </el-input>
        </el-form-item>
        <el-form-item :label="$t('table.industryTag')" prop="industryTag">
          <el-input style="width: 200px;" v-model="temp.industryTag">
          </el-input>
        </el-form-item>
        <el-form-item :label="$t('table.trainingTag')" prop="trainingTag">
          <el-input style="width: 200px;" v-model="temp.trainingTag">
          </el-input>
        </el-form-item>
        <el-form-item :label="$t('table.taskCompletionNumber')" prop="taskCompletionNumber">
          <el-input style="width: 200px;" v-model="temp.taskCompletionNumber">
          </el-input>
        </el-form-item>
        <el-form-item :label="$t('table.taskCompletionRate')" prop="taskCompletionRate">
          <el-input style="width: 200px;" v-model="temp.taskCompletionRate">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{$t('table.close')}}</el-button>
      </div>
    </el-dialog>

    <el-dialog title="Reading statistics" :visible.sync="dialogPvVisible">
      <el-table :data="pvData" border fit highlight-current-row style="width: 100%">
        <el-table-column prop="key" label="Channel"> </el-table-column>
        <el-table-column prop="pv" label="Pv"> </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogPvVisible = false">{{$t('table.confirm')}}</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import { fetchEmployeeList, fetchPv, createArticle, updateArticle } from '@/api/employee'
import waves from '@/directive/waves' // 水波纹指令
import { parseTime } from '@/utils'

const calendarTypeOptions = [
  { key: 'CN', display_name: 'China' },
  { key: 'US', display_name: 'USA' },
  { key: 'JP', display_name: 'Japan' },
  { key: 'EU', display_name: 'Eurozone' }
]

// arr to obj ,such as { CN : "China", US : "USA" }
const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

export default {
  name: 'employeeTable',
  directives: {
    waves
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        checkboxVal: ['周一', '周二'],
        title: undefined,
        type: undefined,
        sort: '+id',
        create_start_date: undefined,
        create_end_date: undefined
      },
      importanceOptions: [1, 2, 3],
      proviceOptions: ['山东', '江苏'],
      cityOptions: ['北京', '上海'],
      districtCountryOptions: ['黄浦区', '长宁区'],
      storeTypeOptions: ['连锁', '品牌'],
      storeName: '',
      storeCode: '',
      address: '',
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
      calendarTypeOptions,
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      statusOptions: ['published', 'draft', 'deleted'],
      showReviewer: false,
      temp: {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        type: '',
        status: 'published'
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      },
      downloadLoading: false
    }
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    },
    typeFilter(type) {
      return calendarTypeKeyValue[type]
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchEmployeeList(this.listQuery).then(response => {
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
      this.listQuery.page = 1
      this.getList()
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: '操作成功',
        type: 'success'
      })
      row.status = status
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        status: 'published',
        type: ''
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
          this.temp.author = 'isg'
          createArticle(this.temp).then(() => {
            this.list.unshift(this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handledetail(row) {
      this.$router.push({ path: '/table/employee/detail' })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          updateArticle(tempData).then(() => {
            for (const v of this.list) {
              if (v.id === this.temp.id) {
                const index = this.list.indexOf(v)
                this.list.splice(index, 1, this.temp)
                break
              }
            }
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleDelete(row) {
      this.$notify({
        title: '成功',
        message: '删除成功',
        type: 'success',
        duration: 2000
      })
      const index = this.list.indexOf(row)
      this.list.splice(index, 1)
    },
    handleFetchPv(pv) {
      fetchPv(pv).then(response => {
        this.pvData = response.data.pvData
        this.dialogPvVisible = true
      })
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
