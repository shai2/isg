import request from '@/utils/request'

export function getEmployeeList(query) {
  return request({
    url: '/employee/getEmployeeList',
    method: 'get',
    params: query
  })
}

export function getEmployeeDetail(query) {
  return request({
    url: '/employee/getEmployeeDetail',
    method: 'get',
    params: query
  })
}

export function getEvents(query) {
  return request({
    url: '/employee/getEvents',
    method: 'get',
    params: query
  })
}
