<template>
  <div v-if="storeData.store_address_info" class="app-container flex-row-between align-stretch">
    <div class="left flex-column-center normal-border">
        <div id="allmap" style="width: 100%;height:500px;border: 1px solid gray;overflow:hidden;">
        </div>
        <div class="store-describe w100">
          <p>缺少编号</p>
          <p>{{storeData.store_address_info.store_name}}</p>
          <p>{{storeData.store_address_info.address}}</p>
        </div>
    </div>
    <div class="right flex w0">
      <div class="right-top normal-border">
        <el-table :data="store_statistics" border fit>
          <el-table-column property="work_num" label="当班人员"></el-table-column>
          <el-table-column property="break_num" label="休息人员"></el-table-column>
          <el-table-column property="share_num" label="共享人员"></el-table-column>
          <el-table-column property="project_ongoing_num" label="进行中项目"></el-table-column>
          <el-table-column property="task_all_num" label="发布中任务"></el-table-column>
          <el-table-column property="task_ongoing_num" label="执行中任务"></el-table-column>
          <el-table-column property="brand_num" label="品牌客户"></el-table-column>
        </el-table>
      </div>
      <div class="right-bottom normal-border flex">
        <el-tabs class="flex" v-model="activeName" type="border-card">
          <el-tab-pane class="info info-detail" label="基础信息" name="0">
            <div class="flex mglt10">
              <p>{{storeData.store_base_info.store_type}}（{{storeData.store_base_info.store_status}}）</p>
              <p>联系人：{{storeData.store_base_info.contact_name}}</p>
              <p>联系电话：{{storeData.store_base_info.contact_telephone}}</p>
            </div>
            <img class="store-img" :src="storeData.store_base_info.store_photo">
          </el-tab-pane>
          <el-tab-pane label="人员信息" name="1" class="item-container overflow-s h100">
            <div v-for="(e,i) in storeData.employee_info" :key="i" class="item flex-row-center">
              <div class="people-left">
                <img :src="e.没有头像">
              </div>
              <div class="people-right flex-column-center flex">
                <div class="item-info">
                  <p class="people-name">{{e.name}}</p>
                  <span>{{e.position}}</span>
                </div>
                <div class="item-info">
                  <span>{{e.telephone}}</span>
                  <span>{{e.work_age}}</span>
                  <span>{{e.schedule_status}}</span>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="项目信息" name="2" class="item-container">
            <div v-for="(e,i) in storeData.project_info" :key="i" class="item flex-row-center">
              <div class="event-left">
                <img :src="e.brand_photo">
              </div>
              <div class="event-right flex-column-center flex">
                <div class="item-info">
                  <p class="event-name">{{e.project_name}}</p>
                </div>
                <div class="item-info">
                  <span>{{e.start_time}}</span>
                  <span>~</span>
                  <span>{{e.end_time}}</span>
                </div>
                <div class="item-info">
                  <span>负责人：{{e.owner}}</span>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="任务信息" name="3" class="item-container">
            <div v-for="(e,i) in storeData.task_info" :key="i" class="item flex-row-center">
              <div class="task-left">
                <img :src="e.a">
              </div>
              <div class="task-right flex-column-center flex">
                <div class="item-info">
                  <p class="task-name">[{{e.project_type}}]{{e.name}}</p>
                </div>
                <div class="item-info">
                  <span>{{e.start_time}}</span>
                  <span>~</span>
                  <span>{{e.end_time}}</span>
                </div>
                <div class="item-info">
                  <span>{{e.status}}</span>
                  <span>{{e.employee_name}}</span>
                </div>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import { getStoreDetail } from 'api/store'

export default {
  data() {
    return {
      store_code: '', // 门店编号
      store_statistics: [], // obj转数组
      storeData: {},
      activeName: '0'
    }
  },
  created() {
    this.getDetail()
  },
  watch: {
    '$route'(to, from) {
      this.getDetail()
    }
  },
  methods: {
    getDetail() {
      getStoreDetail(this.store_code).then(res => {
        this.storeData = res.data.data
        this.store_statistics.push(this.storeData.store_statistics)
        this.$nextTick(() => {
          this.mapInit(
            this.storeData.store_address_info.longitude, this.storeData.store_address_info.latitude
          )
        })
      })
    },
    mapInit(longitude, latitude) {
      const map = new BMap.Map('allmap')
      const _point = new BMap.Point(longitude, latitude)
      map.centerAndZoom(_point, 14)
      map.addControl(new BMap.MapTypeControl())
      map.enableScrollWheelZoom(true)
      map.enableDoubleClickZoom(true)
      const _marker = new BMap.Marker(_point)
      map.addOverlay(_marker)
    }
  }
}
</script>

<style scoped lang="stylus">
.left
  width 300px
.right
  margin-left 10px
.right-bottom
  height 540px
  margin-top 10px
.store-describe
  margin-top 20px
  p
    padding 8px 3px
    border-bottom 1px solid #eee
    font-size 14px
    line-height 1
.info-detail
  p
    padding 8px 3px
    font-size 14px
    border-bottom 1px solid #eee
.store-img
  border 1px solid #eee
  margin-top 10px
  width 100%
.item-container
  display flex
  flex-wrap wrap
.item
  width calc((100% - 10px)/2)
  border 1px solid #eee
  margin-bottom 10px
  padding 10px
  &:nth-child(2n)
    margin-left 10px
  img 
    width 80px
    height 80px
    box-shadow 0 0 5px rgba(0,0,0,0.3)
    border-radius 100px
  span
    font-size 12px
    margin-right 10px
.item-info
  text-align left
  width 100%
  padding-left 25px


// 人员部分
.people-name
  font-weight bold
  display inline-block
  margin-right 15px
  margin-bottom 10px

// 项目部分
.event-name
  font-weight bold
  margin-bottom 5px

// 任务部分
.task-name
  font-weight bold
  margin-bottom 5px
</style>
