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

export const menuHeader = supplementPath([

])

export const menuAside = supplementPath([
  { path: '/index', title: '首页', icon: 'home' },
  {
    title: '用户管理',
    icon: 'music',
    path: '/user'
  }
  // {
  //   title: '分类管理',
  //   icon: 'home',
  //   path: '/collectionType'
  // },
  // {
  //   title: '歌手管理',
  //   icon: 'home',
  //   path: '/singer'
  // },
  // {
  //   title: '专辑管理',
  //   icon: 'home',
  //   path: '/album'
  // },
  // {
  //   title: '歌单管理',
  //   icon: 'home',
  //   path: '/collection'
  // }
])
