import axios from 'axios'
let baseApi = process.env.BI_BASE_API
let query = {openId:'weixingzh123456'}

// 概览数据
export function getOverViewData() {
  return axios({
    url: baseApi + '/mobile/wxgzh/getOverViewData.action',
    method: 'post',
    data: query,
  })
}

// 新增用户情况列表
export function getAddUserList() {
  return axios({
    url: baseApi + '/mobile/wxgzh/getAddUserList.action',
    method: 'post',
    data: query,
  })
}

// 短促提现统计
export function getCashList() {
  return axios({
    url: baseApi + '/mobile/wxgzh/getCashList.action',
    method: 'post',
    data: query,
  })
}

// 薪资发放金额、提现金额一周情况表
export function getSalaryCashWeekList() {
  return axios({
    url: baseApi + '/mobile/wxgzh/getSalaryCashWeekList.action',
    method: 'post',
    data: query,
  })
}