import request from '@/utils/request'
import axios from 'axios'

export function getEmployeeList(query) {
  return request({
    url: '/employee/list',
    method: 'post',
    data: query
  })
}

export function getEmployeeDetail(query) {
  return request({
    url: '/employee/detail/'+query,
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

export function exportEmployeeList(query) {
  return axios({
    url: '/employee/list/export',
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