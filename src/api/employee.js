import request from '@/utils/request'

export function getEmployeeList(query) {
  return request({
    url: '/employee/list',
    method: 'get',
    params: query
  })
}
