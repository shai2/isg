<template>
  <div class="app-container flex-row-between align-stretch">
    <div class="left flex-column-center normal-border">
        <div id="allmap" style="width: 100%;height:500px;border: 1px solid gray;overflow:hidden;">
        </div>
        <div class="store-describe w100">
          <p>00001</p>
          <p>上海人民广场店</p>
          <p>上海黄浦区延安东路700号</p>
        </div>
    </div>
    <div class="right flex w0">
      <div class="right-top normal-border">
        <el-table :data="gradeData" border fit>
          <el-table-column property="a" label="当班人员"></el-table-column>
          <el-table-column property="b" label="休息人员"></el-table-column>
          <el-table-column property="c" label="共享人员"></el-table-column>
          <el-table-column property="d" label="进行中项目"></el-table-column>
          <el-table-column property="e" label="发布中任务"></el-table-column>
          <el-table-column property="f" label="执行中任务"></el-table-column>
          <el-table-column property="g" label="品牌客户"></el-table-column>
        </el-table>
      </div>
      <div class="right-bottom normal-border flex">
        <el-tabs class="flex" v-model="activeName" type="border-card">
          <el-tab-pane class="info info-detail" label="基础信息" name="0">
            <div class="flex mglt10">
              <p>小超市（正常营业）</p>
              <p>联系人：李明</p>
              <p>联系电话：13111111111</p>
            </div>
            <img class="store-img" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1535953897871&di=fcedf6db09bd29b2694351ecb8c28eb7&imgtype=0&src=http%3A%2F%2Fimg1.qunarzz.com%2Ftravel%2Fpoi%2F1504%2Fa1%2F9dbf00ac7dc66c.jpg_r_1024x683x95_5df5fb2e.jpg">
          </el-tab-pane>
          <el-tab-pane label="人员信息" name="1" class="item-container overflow-s h100">
            <div v-for="(e,i) in people" :key="i" class="item flex-row-center">
              <div class="people-left">
                <img :src="e.a">
              </div>
              <div class="people-right flex-column-center flex">
                <div class="item-info">
                  <p class="people-name">{{e.b}}</p>
                  <span>{{e.c}}</span>
                </div>
                <div class="item-info">
                  <span>{{e.d}}</span>
                  <span>{{e.e}}</span>
                  <span>{{e.f}}</span>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="项目信息" name="2" class="item-container">
            <div v-for="(e,i) in event" :key="i" class="item flex-row-center">
              <div class="event-left">
                <img :src="e.a">
              </div>
              <div class="event-right flex-column-center flex">
                <div class="item-info">
                  <p class="event-name">{{e.b}}</p>
                </div>
                <div class="item-info">
                  <span>{{e.c}}</span>
                  <span>~</span>
                  <span>{{e.d}}</span>
                </div>
                <div class="item-info">
                  <span>负责人：{{e.e}}</span>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="任务信息" name="3" class="item-container">
            <div v-for="(e,i) in task" :key="i" class="item flex-row-center">
              <div class="task-left">
                <img :src="e.a">
              </div>
              <div class="task-right flex-column-center flex">
                <div class="item-info">
                  <p class="task-name">[{{e.b}}]{{e.c}}</p>
                </div>
                <div class="item-info">
                  <span>{{e.d}}</span>
                  <span>~</span>
                  <span>{{e.e}}</span>
                </div>
                <div class="item-info">
                  <span>{{e.f}}</span>
                  <span>{{e.g}}</span>
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
export default {
  components: { },
  data() {
    return {
      gradeData:[{a:'4',b:'3',c:'1',d:'9',e:'21',f:'4',g:'6'}],
      point:[121.50109, 31.23691],
      people:(()=>{
        let _arr = []
        for(let i=0;i<17;i++){
          _arr.push({a:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3198678185,878755003&fm=27&gp=0.jpg',b:'马玉军',c:'促销员',d:'1311111111',e:'11年工龄',f:'今日当班'})
        }
        return _arr
      })(),
      event:(()=>{
        let _arr = []
        for(let i=0;i<3;i++){
          _arr.push({a:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3198678185,878755003&fm=27&gp=0.jpg',b:'联合利华3月长促',c:'07/01',d:'09/01',e:'孙荣'})
        }
        return _arr
      })(),
      task:(()=>{
        let _arr = []
        for(let i=0;i<3;i++){
          _arr.push({a:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3198678185,878755003&fm=27&gp=0.jpg',b:'速冻米面',c:'产品分销检查',d:'07/01 12:00',e:'07/01 15:00',f:'已被领取',g:'刘娜'})
        }
        return _arr
      })(),
      activeName: '0',
    }
  },
  mounted() {
    this.mapInit()
  },
  methods: {
    mapInit() {
      let map = new BMap.Map('allmap')
      let _point = new BMap.Point(this.point[0],this.point[1])
      map.centerAndZoom(_point, 14)
      map.addControl(new BMap.MapTypeControl())
      map.enableScrollWheelZoom(true)
      map.enableDoubleClickZoom(true)
      let _marker = new BMap.Marker(_point)
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
