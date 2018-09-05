import Mock from 'mockjs'
import { param2Obj } from '@/utils'

const List = []
const count = 100

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    name: '张三' + i,
    telephone: '1871111111' + i,
    age: '2' + i,
    sex: '男',
    title: '@title(5, 10)',
    position: '促销员',
    workingYears: i,
    industryTag: '3C',
    trainingTag: '行业培训',
    taskCompletionNumber: i,
    taskCompletionRate: i + '%'
  }))
}

export default {
  getEmployeeList(config) {
    const { page = 1, limit = 10 } = param2Obj(config.url)
    const mockList = List

    const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
    return {
      total: mockList.length,
      items: pageList
    }
  },
  getEmployeeDetail() {
    return {
      'code': '1',
      'message': 'success',
      'data': {
        'normal_info': {
          'photo': 'http://isg.mc.com/photo/23as78fsadfas98d6f.jpg',
          'employee_code': '11204391',
          'name': '刘娜',
          'telephone': '13922837492',
          'complete_count': '278',
          'complete_accuracy': '89%',
          'recent_brand': '联合利华',
          'advantage_industry': '日化',
          'employer_satisfaction': '98%'
        },
        'personal_info': {
          'identity_card_number': '321272198604278874',
          'sex': '女',
          'age': '32',
          'province_city': '湖南株洲',
          'education': '高中',
          'address': '上海市黄浦区延安东路700号'
        },
        'work_info': [{
          'work_resume_name': '联合利华4月长促',
          'start_time': '2018-04-01',
          'end_time': '2018-04-30',
          'position': '促销员',
          'status': '进行中'
        }, {
          'work_resume_name': '联合利华3月长促',
          'start_time': '2018-03-01',
          'end_time': '2018-03-31',
          'position': '促销员',
          'status': '已结束'
        }],
        'ability_evaluate': {
          'complete_count': '28',
          'complete_accuracy': '89.3%',
          'position_experience': '23',
          'industry_concentration': '84.7%',
          'industryAdvantage': '衣服',
          'latelyServiceBrand': '联合利华'
        },
        'income_detail': [{
        // 待定
        }],
        'train': [{
          'train_name': '促销员岗位基础培训',
          'finish_time': '2018-01-26'
        }, {
          'train_name': '促销员岗位基础培训',
          'finish_time': '2017-12-26'
        }],
        'schedule': [{
          'date': '2018-07-01',
          'morning': '空闲',
          'noon': '空闲',
          'afternoon': '空闲'
        }, {
          'date': '2018-07-02',
          'morning': '强生',
          'none': '空闲',
          'afternoon': '汉高'
        }]
      }
    }
  },
  getEvents() {
    return {
      data: [{
        'cssClass': ['free'],
        'start': '2018-09-01',
        'title': '空闲'
      }, {
        'cssClass': ['rest'],
        'start': '2018-09-02',
        'title': '休息'
      }, {
        'cssClass': ['work'],
        'data': '测试',
        'end': '2018-09-03',
        'start': '2018-09-03',
        'title': '排班'
      }, {
        'cssClass': ['work'],
        'start': '2018-09-04',
        'title': '排班'
      }, {
        'cssClass': ['work'],
        'data': '测试',
        'end': '2018-09-05',
        'start': '2018-09-05',
        'title': '排班'
      }, {
        'cssClass': ['free'],
        'start': '2018-09-06',
        'title': '空闲'
      }, {
        'cssClass': ['free'],
        'start': '2018-09-07',
        'title': '空闲'
      }, {
        'cssClass': ['free'],
        'start': '2018-09-08',
        'title': '空闲'
      }, {
        'cssClass': ['free'],
        'start': '2018-09-09',
        'title': '空闲'
      }, {
        'cssClass': ['free'],
        'start': '2018-09-10',
        'title': '空闲'
      }, {
        'cssClass': ['free'],
        'start': '2018-09-11',
        'title': '空闲'
      }, {
        'cssClass': ['free'],
        'start': '2018-09-12',
        'title': '空闲'
      }, {
        'cssClass': ['free'],
        'start': '2018-09-13',
        'title': '空闲'
      }, {
        'cssClass': ['free'],
        'start': '2018-09-14',
        'title': '空闲'
      }, {
        'cssClass': ['free'],
        'start': '2018-09-15',
        'title': '空闲'
      }, {
        'cssClass': ['free'],
        'start': '2018-09-16',
        'title': '空闲'
      }, {
        'cssClass': ['free'],
        'start': '2018-09-17',
        'title': '空闲'
      }, {
        'cssClass': ['free'],
        'start': '2018-09-18',
        'title': '空闲'
      }, {
        'cssClass': ['free'],
        'start': '2018-09-19',
        'title': '空闲'
      }, {
        'cssClass': ['free'],
        'start': '2018-09-20',
        'title': '空闲'
      }, {
        'cssClass': ['free'],
        'start': '2018-09-21',
        'title': '空闲'
      }, {
        'cssClass': ['free'],
        'start': '2018-09-22',
        'title': '空闲'
      }, {
        'cssClass': ['free'],
        'start': '2018-09-23',
        'title': '空闲'
      }, {
        'cssClass': ['free'],
        'start': '2018-09-24',
        'title': '空闲'
      }, {
        'cssClass': ['free'],
        'start': '2018-09-25',
        'title': '空闲'
      }, {
        'cssClass': ['free'],
        'start': '2018-09-26',
        'title': '空闲'
      }, {
        'cssClass': ['free'],
        'start': '2018-09-27',
        'title': '空闲'
      }, {
        'cssClass': ['free'],
        'start': '2018-09-28',
        'title': '空闲'
      }, {
        'cssClass': ['free'],
        'start': '2018-09-29',
        'title': '空闲'
      }, {
        'cssClass': ['free'],
        'start': '2018-09-30',
        'title': '空闲'
      }] }
  }
}
