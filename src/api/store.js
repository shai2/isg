import request from '@/utils/request'

export function getStoreList(query) {
  return request({
    url: '/store/list',
    method: 'post',
    data: query
  })
}

export function getBaseInfo(storeCode, query) {
  return request({
    url: '/store/getBaseInfo/' + storeCode,
    method: 'get',
    data: query
  })
}

export function getStatistics(storeCode, query) {
  return request({
    url: '/store/getStatistics/' + storeCode,
    method: 'get',
    params: query
  })
}

export function getEmployeeProject(storeCode, query) {
  return request({
    url: '/store/getEmployeeProject/' + storeCode,
    method: 'get',
    params: query
  })
}
