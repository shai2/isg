import request from '@/utils/request'

export function getStoreList(query) {
  return request({
    url: '/getStoreList',
    method: 'get',
    params: query
  })
}

export function getStoreDetail(query) {
  return request({
    url: '/getStoreDetail',
    method: 'get',
    params: query
  })
}
