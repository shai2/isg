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

export function exportStoreList(query) {
  return axios({
    url: '/store/list/export',
    method: 'post',
    responseType:'blob',
    data: query,
    headers:{
      'Content-Type': 'application/json; application/octet-stream'
    },
    baseURL: process.env.BASE_API,
    timeout: 10000,
    withCredentials: true
  })
}