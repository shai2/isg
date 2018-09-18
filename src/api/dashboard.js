import axios from 'axios'
let baseApi = process.env.BI_BASE_API

export function getOverViewData(query) {
  return axios({
    url: baseApi + '/mobile/wxgzh/getOverViewData.action',
    method: 'post',
    data: query,
  })
}