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
          <el-select clearable class="filter-item" v-model="listQuery.storeStatus" placeholder="门店状态">
            <el-option v-for="(e,i) in dict['store_status']" :key="i" :label="e.name" :value="e.value">
            </el-option>
          </el-select>
          <br/>
          <el-input @keyup.enter.native="handleFilter" class="filter-item w200" placeholder="门店名称" v-model="listQuery.storeName">
          </el-input>
          <el-input @keyup.enter.native="handleFilter" class="filter-item w200" placeholder="门店编号" v-model="listQuery.storeCode">
          </el-input>
          <el-input @keyup.enter.native="handleFilter" class="filter-item w200" placeholder="地址" v-model="listQuery.address">
          </el-input>
        </div>
      </div>
      <div class="flex-row-center align-top">
        <p class="select-label">客户范围：</p>
        <div class="flex">
          <el-select clearable class="filter-item" v-model="listQuery.brandName" placeholder="客户范围">
            <el-option v-for="(e,i) in dict['brand_name']" :key="i" :label="e.name" :value="e.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="flex-row-center align-top">
        <p class="select-label">人员范围：</p>
        <div class="flex">
          <el-input @keyup.enter.native="handleFilter" class="filter-item" placeholder="店内人数下限" v-model="listQuery.employee_num_min">
          </el-input>
          <el-input @keyup.enter.native="handleFilter" class="filter-item" placeholder="店内人数上限" v-model="listQuery.employee_num_max">
          </el-input>
        </div>
      </div>
      <div class="flex-row-center align-top">
        <p class="select-label">项目范围：</p>
        <div class="flex">
          <el-input @keyup.enter.native="handleFilter" class="filter-item" placeholder="项目数下限" v-model="listQuery.project_num_min">
          </el-input>
          <el-input @keyup.enter.native="handleFilter" class="filter-item" placeholder="项目数上限" v-model="listQuery.project_num_max">
          </el-input>
        </div>
      </div>
      <div class="flex-row-center align-top">
        <p class="select-label">品牌范围：</p>
        <div class="flex">
          <el-input @keyup.enter.native="handleFilter" class="filter-item" placeholder="品牌数下限" v-model="listQuery.brand_num_min">
          </el-input>
          <el-input @keyup.enter.native="handleFilter" class="filter-item" placeholder="品牌数上限" v-model="listQuery.brand_num_max">
          </el-input>
        </div>
      </div>
      <div class="flex-row-center align-top">
        <p class="select-label">任务范围：</p>
        <div class="flex">
          <el-input @keyup.enter.native="handleFilter" class="filter-item" placeholder="任务数下限" v-model="listQuery.task_num_min">
          </el-input>
          <el-input @keyup.enter.native="handleFilter" class="filter-item" placeholder="任务数上限" v-model="listQuery.task_num_max">
          </el-input>
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
      <el-table :key='tableKey' :data="list" v-loading="listLoading" border fit highlight-current-row>
        <el-table-column align="center" label="门店编号" width="80">
          <template slot-scope="scope">
            <span>{{scope.row.storeCode}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="门店名称">
          <template slot-scope="scope">
            <span style='color:red;cursor:pointer;' @click="handledetail(scope.row)">{{scope.row.storeName}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="省">
          <template slot-scope="scope">
            <span>{{scope.row.province}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="市">
          <template slot-scope="scope">
            <span>{{scope.row.city}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="区县">
          <template slot-scope="scope">
            <span>{{scope.row.area}}</span>
          </template>
        </el-table-column>
        <el-table-column label="地址">
          <template slot-scope="scope">
            <span>{{scope.row.address}}</span>
          </template>
        </el-table-column>
        <el-table-column class-name="status-col" label="门店类型">
          <template slot-scope="scope">
            <span>{{scope.row.storeType}}</span>
          </template>
        </el-table-column>
        <el-table-column class-name="status-col" label="人员数">
          <template slot-scope="scope">
            <span>{{scope.row.employeeNum}}</span>
          </template>
        </el-table-column>
        <el-table-column class-name="status-col" label="项目数">
          <template slot-scope="scope">
            <span>{{scope.row.projectNum}}</span>
          </template>
          </el-table-column>
        <el-table-column align="center" label="操作" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <el-button type="primary" size="100" @click="handledetail(scope.row)">详情</el-button>
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
import fileDownload from 'js-file-download'
import { getStoreList, exportStoreList } from 'api/store'
import { getDictionary } from 'api/dict'
import waves from 'directive/waves' // 水波纹指令
import areaSelect from 'components/areaSelect'
import { parseTime } from 'utils'
import { area, page, store } from 'utils/commonArgs'
export default {
  name: 'storeTable',
  data() {
    return {
      dict: '',
      tableKey: 0,
      list: null,
      total: null,
      listLoading: true,
      downloadLoading: false,
      listQuery: {
        storeStatus: '', // 门店状态
        brandCode: '', // 门店范围
        employeeNumMin: '', // 店内人数下限
        employeeNumMax: '', // 店内人数上限
        projectNumMin: '', // 项目数下限
        projectNumMax: '', // 项目数上限
        brandNumMin: '', // 品牌数下限
        brandNumMax: '', // 品牌数上限
        taskNumMin: '', // 任务数下限
        taskNumMax: '',// 任务数上限
        brandName:'',// 品牌名称
      },
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
    download(){
      this.downloadLoading = true
      exportStoreList(this.listQuery).then(res => {
        console.info(res)
        fileDownload(res.data, 'aaa.xls');
        // let _blob = new Blob([res.data], {type: "application/vnd.ms-excel"})
        // console.info(res.data)
        // // window.location.href =  URL.createObjectURL(_blob)
        // const _fileName = '测试表格123.xls'
        // if ('download' in document.createElement('a')) { // 非IE下载
        //   const elink = document.createElement('a')
        //   elink.download = _fileName
        //   elink.style.display = 'none'
        //   elink.href = URL.createObjectURL(_blob)
        //   document.body.appendChild(elink)
        //   elink.click()
        //   URL.revokeObjectURL(elink.href) // 释放URL 对象
        //   document.body.removeChild(elink)
        // } else { // IE10+下载
        //   navigator.msSaveBlob(blob, fileName)
        // }
        this.downloadLoading = false
      })
    },
    getDictionary() {
      getDictionary('store_type,brand_name,store_status').then(res => {
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
      getStoreList(this.listQuery).then(res => {
        this.list = res.data.data.list
        this.total = res.data.data.pages
        this.listLoading = false
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
    handledetail(row) {
      this.$router.push(`/table/storeDetail?storeCode=${row.storeCode}`)
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
