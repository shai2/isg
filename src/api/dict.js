import request from '@/utils/request'

export function getDictionary(types){
  return request({
    url: '/common/v1/dict',
    method: 'get',
    params: {
      types
    }
  })
}