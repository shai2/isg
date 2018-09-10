import request from '@/utils/request'

export function getEmployeeList(query) {
  return request({
    url: '/employee/list',
    method: 'post',
    data: query
  })
}

export function getEmployeeDetail(query) {
  return request({
    url: '/employee/detail/query',
    method: 'get',
    params: {}
  })
}

export function getSchedule(query) {
  return request({
    url: '/employee/detail/schedule',
    method: 'get',
    params: query
  })
}

export function getScheduleDaily(query) {
  return request({
    url: '/employee/detail/schedule/daily',
    method: 'get',
    params: query
  })
}
