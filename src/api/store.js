import request from '@/utils/request'
import axios from 'axios'

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

// export function exportEmployeeList(query) {
//   return request({
//     url: '/employee/list/export',
//     method: 'post',
//     responseType:'blob',
//     data: query
//   })
// }

export function exportStoreList(query) {
  return axios({
    url: '/store/list/export',
    method: 'post',
    responseType:'blob',
    data: query,
    baseURL: process.env.BASE_API, // api的base_url
    timeout: 5000, // request timeout
    withCredentials: true
    
  })
}