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
    url: '/employee/detail/ASG00000001',
    method: 'get',
    params: query
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

export function getDictionary(query) {
  return request({
    url: '/common/v1/dict?store_type,place_type,job_status,sex,brand_name,industry_type',
    method: 'get',
    params: query
  })
}
