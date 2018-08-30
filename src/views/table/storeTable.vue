<template>
  <div class="app-container">
    <div class="filter-container">
      门店范围:
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
      <el-select clearable style="width: 110px" class="filter-item" v-model="listQuery.storeStatus" :placeholder="$t('table.storeStatus')">
        <el-option v-for="item in storeStatusOptions" :key="item" :label="item" :value="item">
        </el-option>
      </el-select>
      <br/>
      客户范围:
      <el-select clearable style="width: 110px" class="filter-item" v-model="listQuery.customeRange" :placeholder="$t('table.customeRange')">
        <el-option v-for="item in customeRangeOptions" :key="item" :label="item" :value="item">
        </el-option>
      </el-select>
      <br/>
      人员范围:
      <el-select clearable style="width: 140px" class="filter-item" v-model="listQuery.storeEmployeeCountLowerLimit" :placeholder="$t('table.storeEmployeeCountLowerLimit')">
        <el-option v-for="item in storeEmployeeCountLowerLimitOptions" :key="item" :label="item" :value="item">
        </el-option>
      </el-select>
      <el-select clearable style="width: 140px" class="filter-item" v-model="listQuery.storeEmployeeCountUpperLimit" :placeholder="$t('table.storeEmployeeCountUpperLimit')">
        <el-option v-for="item in storeEmployeeCountUpperLimitOptions" :key="item" :label="item" :value="item">
        </el-option>
      </el-select>
      <br/>
      项目范围:
      <el-select clearable style="width: 140px" class="filter-item" v-model="listQuery.projectCountLowerLimit" :placeholder="$t('table.projectCountLowerLimit')">
        <el-option v-for="item in projectCountLowerLimitOptions" :key="item" :label="item" :value="item">
        </el-option>
      </el-select>
      <el-select clearable style="width: 140px" class="filter-item" v-model="listQuery.projectCountUpperLimit" :placeholder="$t('table.projectCountUpperLimit')">
        <el-option v-for="item in projectCountUpperLimitOptions" :key="item" :label="item" :value="item">
        </el-option>
      </el-select>
      <br/>
      品牌范围:
      <el-select clearable style="width: 140px" class="filter-item" v-model="listQuery.brandCountLowerLimit" :placeholder="$t('table.brandCountLowerLimit')">
        <el-option v-for="item in brandCountLowerLimitOptions" :key="item" :label="item" :value="item">
        </el-option>
      </el-select>
      <el-select clearable style="width: 140px" class="filter-item" v-model="listQuery.brandCountUpperLimit" :placeholder="$t('table.brandCountUpperLimit')">
        <el-option v-for="item in brandCountUpperLimitOptions" :key="item" :label="item" :value="item">
        </el-option>
      </el-select>
      <br/>
      任务范围:
      <el-select clearable style="width: 140px" class="filter-item" v-model="listQuery.taskCountLowerLimit" :placeholder="$t('table.taskCountLowerLimit')">
        <el-option v-for="item in taskCountLowerLimitOptions" :key="item" :label="item" :value="item">
        </el-option>
      </el-select>
      <el-select clearable style="width: 140px" class="filter-item" v-model="listQuery.taskCountUpperLimit" :placeholder="$t('table.taskCountUpperLimit')">
        <el-option v-for="item in taskCountUpperLimitOptions" :key="item" :label="item" :value="item">
        </el-option>
      </el-select>
      <br/>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">{{$t('table.search')}}</el-button>
      <br/>
      <br/>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <el-button class="filter-item" type="primary" :loading="downloadLoading" v-waves icon="el-icon-download" @click="handleDownload">{{$t('table.export')}}</el-button>
    </div>

    <el-table :key='tableKey' :data="list" v-loading="listLoading" border fit highlight-current-row
      style="width: 100%;min-height:1000px;">
      <el-table-column align="center" :label="$t('table.storeCode')" width="80">
        <template slot-scope="scope">
          <span>{{scope.row.storeCode}}</span>
        </template>
      </el-table-column>
      <el-table-column width="150px" align="center" :label="$t('table.storeName')">
        <template slot-scope="scope">
          <span>{{scope.row.storeName}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="80px" align="center" :label="$t('table.provice')">
        <template slot-scope="scope">
          <span>{{scope.row.provice}}</span>
        </template>
      </el-table-column>
      <el-table-column width="110px" align="center" :label="$t('table.city')">
        <template slot-scope="scope">
          <span>{{scope.row.city}}</span>
        </template>
      </el-table-column>
      <el-table-column width="110px" align="center" :label="$t('table.districtCountry')">
        <template slot-scope="scope">
          <span style='color:red;'>{{scope.row.districtCountry}}</span>
        </template>
      </el-table-column>
      <el-table-column width="80px" :label="$t('table.address')">
        <template slot-scope="scope">
          <span>{{scope.row.address}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('table.location')" width="180">
        <template slot-scope="scope">
          <span>{{scope.row.location}}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" :label="$t('table.storeType')" width="100">
        <template slot-scope="scope">
          <span>{{scope.row.storeType}}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" :label="$t('table.employeeCount')" width="100">
         <template slot-scope="scope">
           <span>{{scope.row.employeeCount}}</span>
         </template>
       </el-table-column>
       <el-table-column class-name="status-col" :label="$t('table.projectCount')" width="100">
         <template slot-scope="scope">
          <span>{{scope.row.projectCount}}</span>
         </template>
        </el-table-column>
      <el-table-column align="center" :label="$t('table.actions')" width="160" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="100" @click="handledetail(scope.row)">{{$t('table.detail')}}</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <el-dialog :visible.sync="dialogFormVisible">
      <el-form :rules="rules" ref="dataForm" :model="temp" label-position="left" label-width="70px" style='width: 400px; margin-left:50px;'>
        <el-form-item :label="$t('table.storeCode')" prop="storeCode">
          <el-input style="width: 200px;" v-model="temp.storeCode">
          </el-input>
        </el-form-item>
        <el-form-item :label="$t('table.storeName')" prop="storeName">
          <el-input style="width: 200px;" v-model="temp.storeName">
          </el-input>
        </el-form-item>
        <el-form-item :label="$t('table.provice')" prop="provice">
          <el-input style="width: 200px;" v-model="temp.provice">
          </el-input>
        </el-form-item>
        <el-form-item :label="$t('table.city')" prop="city">
          <el-input style="width: 200px;" v-model="temp.city">
          </el-input>
        </el-form-item>
        <el-form-item :label="$t('table.districtCountry')" prop="districtCountry">
          <el-input style="width: 200px;" v-model="temp.districtCountry">
          </el-input>
        </el-form-item>
        <el-form-item :label="$t('table.address')" prop="address">
          <el-input style="width: 200px;" v-model="temp.address">
          </el-input>
        </el-form-item>
        <el-form-item :label="$t('table.location')" prop="location">
          <el-input style="width: 200px;" v-model="temp.location">
          </el-input>
        </el-form-item>
        <el-form-item :label="$t('table.storeType')" prop="storeType">
          <el-input style="width: 200px;" v-model="temp.storeType">
          </el-input>
        </el-form-item>
        <el-form-item :label="$t('table.employeeCount')" prop="employeeCount">
          <el-input style="width: 200px;" v-model="temp.employeeCount">
          </el-input>
        </el-form-item>
        <el-form-item :label="$t('table.projectCount')" prop="projectCount">
          <el-input style="width: 200px;" v-model="temp.projectCount">
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
import { fetchList, fetchPv, createArticle, updateArticle } from '@/api/store'
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
  name: 'storeTable',
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
        title: undefined,
        type: undefined,
        sort: '+id'
      },
      importanceOptions: [1, 2, 3],
      proviceOptions: ['山东', '江苏'],
      cityOptions: ['北京', '上海'],
      districtCountryOptions: ['黄浦区', '长宁区'],
      storeTypeOptions: ['连锁', '品牌'],
      storeName: '',
      storeCode: '',
      address: '',
      storeStatusOptions: ['正常营业', '暂停营业'],
      customeRangeOptions: ['联合利华', '高露洁'],
      storeEmployeeCountLowerLimitOptions: [5, 10],
      storeEmployeeCountUpperLimitOptions: [50, 100],
      projectCountLowerLimitOptions: [5, 10],
      projectCountUpperLimitOptions: [50, 100],
      brandCountLowerLimitOptions: [5, 10],
      brandCountUpperLimitOptions: [50, 100],
      taskCountLowerLimitOptions: [50, 100],
      taskCountUpperLimitOptions: [500, 1000],
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
      fetchList(this.listQuery).then(response => {
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
          this.temp.author = 'vue-element-admin'
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
      this.$router.push({ path: '/table/store/detail' })
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
        const tHeader = ['门店编号', '门店名称', '省', '市', '区县', '地址', '定位', '门店类型', '人员数', '项目数']
        const filterVal = ['storeCode', 'storeName', 'province', 'city', 'districtCountry', 'address', 'location', 'storeType', 'employeeCount', 'projectCount']
        const data = this.formatJson(filterVal, this.list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: '门店列表'
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
