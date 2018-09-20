<template>
  <div v-if="storeData" class="app-container flex-row-between align-stretch">
    <div class="left flex-column-center normal-border" style="min-width:430px;">
        <div id="allmap" style="width: 100%;height:500px;border: 1px solid gray;overflow:hidden;">
        </div>
        <div class="store-describe w100">
          <p>门店编号：{{$route.query.storeCode}}</p>
          <p>门店名称：{{storeData.storeName}}</p>
          <p>门店地址：{{storeData.address}}</p>
        </div>
    </div>
    <div class="right flex w0">
      <div class="right-top normal-border">
        <el-table :data="storeStatistics" border fit>
          <el-table-column align="center" property="workNum" label="当班人员"></el-table-column>
          <el-table-column align="center" property="breakNum" label="休息人员"></el-table-column>
          <el-table-column align="center" property="shareNum" label="共享人员"></el-table-column>
          <el-table-column align="center" property="projectOnGoingNum" label="进行中项目"></el-table-column>
          <el-table-column align="center" property="taskAllNum" label="发布总任务"></el-table-column>
          <el-table-column align="center" property="taskOngoingNum" label="执行中任务"></el-table-column>
          <el-table-column align="center" property="brandNum" label="品牌客户"></el-table-column>
        </el-table>
      </div>
      <div class="right-bottom normal-border flex">
        <el-tabs class="flex" v-model="activeName" type="border-card">
          <el-tab-pane class="info info-detail" label="基础信息" name="0">
            <div class="flex mglt10">
              <p v-if="storeData.placeType"><span>所在地</span>{{storeData.placeType}}（{{storeData.storeStatus}}）</p>
              <p><span>联系人</span>{{storeData.contactName}}</p>
              <p><span>联系电话</span>{{storeData.contactTelephone}}</p>
            </div>
            <!-- <img class="store-img" :src="storeData.store_base_info.store_photo"> -->
          </el-tab-pane>
          <el-tab-pane label="人员信息" name="1" class="item-container overflow-s h100">
            <div v-for="(e,i) in storeEmployeeProject.storeEmployeeInfo" :key="i" class="item flex-row-center">
              <div class="people-left">
                <img :src="e.sex === 0 ? manImg : womanImg">
              </div>
              <div class="people-right flex-column-center flex">
                <div class="item-info">
                  <p class="people-name">{{e.name}}</p>
                  <span>{{e.position}}</span>
                </div>
                <div class="item-info">
                  <span>{{e.telephone}}</span>
                  <span>{{e.workAge}}年</span>
                  <span class="block" style="margin-top:5px;">{{e.scheduleStatus}}</span>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="项目信息" name="2" class="item-container">
            <div v-for="(e,i) in storeEmployeeProject.storeProjectInfo" :key="i" class="item flex-row-center">
              <div class="event-left">
                <img :src="eventImg">
                <!-- <img :src="e.brandPhoto"> -->
              </div>
              <div class="event-right flex-column-center flex">
                <div class="item-info">
                  <p class="event-name">{{e.projectName}}</p>
                </div>
                <div class="item-info">
                  <span>{{e.startTime}}</span>
                  <span>~</span>
                  <span>{{e.endTime}}</span>
                </div>
                <div class="item-info">
                  <span>负责人：{{e.owner}}</span>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="任务信息" name="3" class="item-container">
            <div v-for="(e,i) in storeEmployeeProject.storeTaskInfo" :key="i" class="item flex-row-center">
              <div class="task-left">
                <img :src="eventImg">
              </div>
              <div class="task-right flex-column-center flex">
                <div class="item-info">
                  <p class="task-name">[{{e.projectType}}]{{e.name}}</p>
                </div>
                <div class="item-info">
                  <span>{{e.startTime.slice(0,-3)}}</span>
                  <span>~</span>
                  <span>{{e.endTime.slice(0,-3)}}</span>
                </div>
                <div class="item-info">
                  <span>{{e.status}}</span>
                  <span>{{e.employeeName}}</span>
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
import { getBaseInfo, getStatistics, getEmployeeProject } from 'api/store'

export default {
  data() {
    return {
      storeData: {}, // 左边
      storeStatistics: [], // 右上 obj转数组
      storeEmployeeProject: {}, // 右下
      activeName: '0',
      manImg:require('assets/img/man.jpg'),
      womanImg:require('assets/img/woman.jpg'),
      eventImg:require('assets/img/event.png'),
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
      this.getBaseInfo()
      this.getStatistics()
      this.getEmployeeProject()
    },
    getBaseInfo() {
      getBaseInfo(this.$route.query.storeCode).then(res => {
        this.storeData = res.data.data
        this.$nextTick(() => {
          this.mapInit(
            this.storeData.longitude,
            this.storeData.latitude
          )
        })
      })
    },
    getStatistics() {
      getStatistics(this.$route.query.storeCode).then(res => {
        this.storeStatistics.push(res.data.data)
      })
    },
    getEmployeeProject() {
      getEmployeeProject(this.$route.query.storeCode).then(res => {
        this.storeEmployeeProject = res.data.data
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
    margin-top 8px
    line-height 30px
    color #999
    span
      color #000
      width 90px
      display inline-block
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
