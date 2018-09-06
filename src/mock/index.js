import Mock from 'mockjs'
import loginAPI from './login'
import articleAPI from './article'

import remoteSearchAPI from './remoteSearch'
import transactionAPI from './transaction'
// 改名
// import employeeMock from './employee'
import storeMock from './store'

Mock.setup({
  timeout: '350-1000'
})

// 登录相关
// Mock.mock(/\/login\/login/, 'post', loginAPI.loginByUsername)
// Mock.mock(/\/login\/logout/, 'post', loginAPI.logout)
Mock.mock(/\/user\/info\.*/, 'get', loginAPI.getUserInfo)

// 人员管理
// Mock.mock(/.*getEmployeeList/, 'get', employeeMock.getEmployeeList)
// Mock.mock(/.*getEmployeeDetail/, 'get', employeeMock.getEmployeeDetail)
// Mock.mock(/.*getSchedule/, 'get', employeeMock.getSchedule)

// 门店管理
Mock.mock(/.*getStoreList/, 'get', storeMock.getStoreList)
Mock.mock(/.*getStoreDetail/, 'get', storeMock.getStoreDetail)

// 文章相关
Mock.mock(/\/article\/list/, 'get', articleAPI.getList)
Mock.mock(/\/article\/detail/, 'get', articleAPI.getArticle)
Mock.mock(/\/article\/pv/, 'get', articleAPI.getPv)
Mock.mock(/\/article\/create/, 'post', articleAPI.createArticle)
Mock.mock(/\/article\/update/, 'post', articleAPI.updateArticle)

// 搜索相关
Mock.mock(/\/search\/user/, 'get', remoteSearchAPI.searchUser)

// 账单相关
Mock.mock(/\/transaction\/list/, 'get', transactionAPI.getList)

export default Mock
