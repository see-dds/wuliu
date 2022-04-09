import { uniqueId } from 'lodash'

/**
 * @description 给菜单数据补充上 path 字段
 * @description https://github.com/d2-projects/d2-admin/issues/209
 * @param {Array} menu 原始的菜单数据
 */
function supplementPath (menu) {
  return menu.map(e => ({
    ...e,
    path: e.path || uniqueId('d2-menu-empty-'),
    ...(e.children
      ? {
        children: supplementPath(e.children)
      }
      : {})
  }))
}

export const menuHeader = supplementPath([])

export const menuAside = supplementPath([
  { path: '/index', title: '首页', icon: 'home' },
  {
    title: '订单',
    icon: 'database',
    children: [
      { path: '/page1', title: '订单列表', icon: 'list' },
      { path: '/page2', title: '新增订单', icon: 'plus' },
      { path: '/page3', title: '订单调度', icon: 'hand-lizard-o' },
      { path: '/page4', title: '单量管理', icon: 'arrows-h' }
    ]
  },
  {
    title: '司机管理',
    icon: 'blind',
    children: [
      { path: '/driverUser', title: '司机管理', icon: 'users' },
      { path: '/driverCar', title: '车辆管理', icon: 'truck' },
      { path: '/location', title: '运输追踪', icon: 'map-marker' }
    ]
  },
  {
    title: '公告',
    icon: 'bell',
    children: [
      { path: '/sendNotice', title: '发送公告', icon: 'circle' },
      { path: '/noticeManage', title: '公告管理', icon: 'circle' }
    ]
  },
  {
    title: '客服',
    icon: 'user',
    children: [
      { path: '/query', title: '快件查询', icon: 'telegram' },
      { path: '/serviceCover', title: '服务范围', icon: 'industry' },
      { path: '/problemSolve', title: '问题处理', icon: 'question' }],
    title: '用户管理',
    icon: 'users',
    children: [
      { path: '/user', icon: 'user', title: '用户管理' },
      { path: '/role', icon: 'user-secret', title: '角色管理' }
    ]
  }, {
    title: '财务管理',
    icon: 'credit-card-alt ',
    children: [
      { path: '/detailed', title: '财务报表汇总', icon: 'list-alt' }
    ]
  },
  {
    title: '客户管理',
    icon: 'user-circle-o',
    children: [
      { path: '/maintain', title: '客户维护', icon: 'hotel' }
    ]
  }
])
