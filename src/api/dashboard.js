import request from '@/utils/request'

export function getOverViewData(query) {
  return request({
    url: '/mobile/wxgzh/getOverViewData.action',
    method: 'post',
    data: query
  })
}