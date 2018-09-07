import request from '@/utils/request'

export function getStoreList(query) {
  return request({
    url: '/store/list',
    method: 'post',
    data: query
  })
}

export function getStoreDetail(query) {
  return request({
    url: '/store/getBaseInfo',
    method: 'get',
    params: query
  })
}

export function getStatistics(query) {
  return request({
    url: '/store/getStatistics',
    method: 'get',
    params: query
  })
}

export function getEmployeeProject(query) {
  return request({
    url: '/store/getEmployeeProject',
    method: 'get',
    params: query
  })
}
