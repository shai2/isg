import Mock from 'mockjs'
import { param2Obj } from '@/utils'

const List = []
const count = 100

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    storeCode: '000' + i,
    storeName: '门店' + i,
    provice: '上海',
    city: '上海',
    districtCountry: '黄浦区',
    address: '港泰广场',
    location: '港泰广场办公区',
    storeType: '小超市',
    employeeCount: i,
    projectCount: i
  }))
}

export default {
  getStoreList(config) {
    const { importance, type, title, page = 1, limit = 10 } = param2Obj(config.url)

    const mockList = List.filter(item => {
      if (importance && item.importance !== +importance) return false
      if (type && item.type !== type) return false
      if (title && item.title.indexOf(title) < 0) return false
      return true
    })

    const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

    return {
      total: mockList.length,
      items: pageList
    }
  },
  getStoreDetail() {
    return {
      'code': '1',
      'message': 'success',
      'data': {
        'store_address_info': {
          'longitude': '116.331398',
          'latitude': '39.897445',
          'store_name': '好又多高德店',
          'address': '湖南省株洲市太平区孙家湾路12号'
        },
        'store_statistics': {
          'work_num': '3',
          'break_num': '2',
          'share_num': '2',
          'project_ongoing_num': '2',
          'task_all_num': '227',
          'task_ongoing_num': '5',
          'brand_num': '6'
        },
        'store_base_info': {
          'store_photo': 'https://gss0.bdstatic.com/7Ls0a8Sm1A5BphGlnYG/sys/portrait/item/5852c7dac0cdb5c4c0cfbfcba252.jpg',
          'store_type': '小超市',
          'store_status': '正常营业',
          'contact_name': '李明',
          'contact_telephone': '13988732112'
        },
        'employee_info': [{
          'name': '马玉军',
          'position': '促销员',
          'telephone': '电话',
          'work_age': '11',
          'schedule_status': '今日当班'
        }],
        'project_info': [{
          'brand_photo': 'https://gss0.bdstatic.com/7Ls0a8Sm1A5BphGlnYG/sys/portrait/item/5852c7dac0cdb5c4c0cfbfcba252.jpg',
          'project_name': '联合利华3季度长促',
          'start_time': '07/01',
          'end_time': '09/30',
          'owner': '孙荣'
        }],
        'task_info': [{
          'task_name': '产品分销检查',
          'project_type': '市调',
          'start_time': '06/05 06:00',
          'end_time': '06/22 23:00',
          'status': '已被领取',
          'employee_name': '刘娜'
        }]
      }
    }
  }
}
