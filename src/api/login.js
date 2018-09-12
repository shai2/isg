import request from '@/utils/request'

export function loginByUsername(username, password) {
  return request({
    url: '/login',
    method: 'post',
    data:{
      username,
      password
    }
  })
}

export function logout() {
  return request({
    url: '/logout',
    method: 'get'
  })
}

export function getUserInfo(token) {
  return request({
    url: 'user/userInfo',
    method: 'get',
    params: { token }
  })
}

