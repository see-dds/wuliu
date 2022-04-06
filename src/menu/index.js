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
    ...e.children ? {
      children: supplementPath(e.children)
    } : {}
  }))
}

export const menuAside = supplementPath([
  {
    path: '/index',
    title: '首页',
    icon: 'home'
  },
  {
    title: '用户管理',
    icon: 'users',
    children: [
      {
        path: '/user',
        icon: 'user',
        title: '用户管理'
      },
      {
        path: '/role',
        icon: 'user-secret',
        title: '角色管理'
      }
    ]
  }
])
