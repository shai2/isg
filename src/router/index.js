import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
import Layout from '@/views/layout/Layout'

/**
* hidden: true                   是否显示在侧边栏
* alwaysShow: true               始终显示根菜单 false只有子元素才显示
* redirect: noredirect           noredirect不会重定向
* name:'router-name'             必须！used by <keep-alive>
* meta : {
    roles: ['admin','editor']    页面角色 可以多个
    title: 'title'               显示在子菜单和面包屑中的名称(推荐设置)
    icon: 'svg-name'             侧栏icon
    noCache: true                页面不会被缓存(默认false)
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/authredirect', component: () => import('@/views/login/authredirect'), hidden: true },
  { path: '/404', component: () => import('@/views/errorPage/404'), hidden: true },
  { path: '/401', component: () => import('@/views/errorPage/401'), hidden: true },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      name: 'dashboard',
      meta: { title: 'dashboard', icon: 'dashboard', noCache: true }
    }]
  }
]

export default new Router({
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/table',
    component: Layout,
    redirect: '/table/employeeTable',
    name: 'table',
    meta: {
      title: 'Table',
      icon: 'table'
    },
    children: [
      { path: 'employeeTable', component: () => import('@/views/table/employeeTable'), name: 'employeeTable', meta: { title: 'employeeTable' }},
      { path: 'employeeDetail', component: () => import('@/views/table/employeeDetail'), hidden: true },
      { path: 'storeTable', component: () => import('@/views/table/storeTable'), name: 'storeTable', meta: { title: 'storeTable' }},
      { path: 'storeDetail', component: () => import('@/views/table/storeDetail'), hidden: true }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]
