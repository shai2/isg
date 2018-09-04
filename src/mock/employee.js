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
  getList: config => {
    const { page = 1, limit = 10 } = param2Obj(config.url)
    let mockList = List

    const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
    return {
      total: mockList.length,
      items: pageList
    }
  },
}
