import layoutHeaderAside from '@/layout/header-aside'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

/**
 * 在主框架内显示
 */
const frameIn = [
  {
    path: '/',
    redirect: { name: 'index' },
    component: layoutHeaderAside,
    children: [
      // 首页
      {
        path: 'index',
        name: 'index',
        meta: {
          auth: true
        },
        component: _import('system/index')
      },
      // 演示页面
      {
        path: 'user',
        name: 'user',
        meta: {
          title: '用户管理',
          auth: true
        },
        component: _import('user/user')
      },
      // 角色管理页面
      {
        path: 'role',
        name: 'role',
        meta: {
          title: '角色管理',
          auth: true
        },
        component: _import('user/role')
      },
      // 订单页面
      {
        path: 'page1',
        name: 'page1',
        meta: {
          title: '订单列表',
          auth: true
        },
        component: _import('order/page1')
      },
      {
        path: 'page2',
        name: 'page2',
        meta: {
          title: '新增订单',
          auth: true
        },
        component: _import('order/page2')
      },
      {
        path: 'page3',
        name: 'page3',
        meta: {
          title: '订单调度',
          auth: true
        },
        component: _import('order/page3')
      },
      {
        path: 'page4',
        name: 'page4',
        meta: {
          title: '单量管理',
          auth: true
        },
        component: _import('order/page4')
      },
      {
        path: 'notice',
        name: 'notice',
        meta: {
          title: '公告',
          auth: true
        },
        component: _import('notice/notice')
      },
      // 发送公告
      {
        path: 'sendNotice',
        name: 'sendNotice',
        meta: {
          title: '发送公告',
          auth: true
        },
        component: _import('notice/sendNotice')
      },
      // 公告管理
      {
        path: 'noticeManage',
        name: 'noticeManage',
        meta: {
          title: '公告管理',
          auth: true
        },
        component: _import('notice/noticeManage.vue')
      },
      {
        // 司机管理
        path: 'driverUser',
        name: 'driverUser',
        meta: {
          title: '司机管理',
          auth: true
        },
        component: _import('driver/driver.vue')
      },
      {
        // 车辆管理
        path: 'driverCar',
        name: 'driverCar',
        meta: {
          title: '车辆管理',
          auth: true
        },
        component: _import('driver/car.vue')
      },
      {
        // 运输追踪
        path: 'location',
        name: 'mapMarker',
        meta: {
          title: '运输追踪',
          auth: true
        },
        component: _import('driver/mapMarker.vue')
      },
      // 系统 前端日志
      {
        path: 'log',
        name: 'log',
        meta: {
          title: '前端日志',
          auth: true
        },
        component: _import('system/log')
      },
      // 刷新页面 必须保留
      {
        path: 'refresh',
        name: 'refresh',
        hidden: true,
        component: _import('system/function/refresh')
      },
      // 页面重定向 必须保留
      {
        path: 'redirect/:route*',
        name: 'redirect',
        hidden: true,
        component: _import('system/function/redirect')
      }
    ]
  }
]

/**
 * 在主框架之外显示
 */
const frameOut = [
  // 登录
  {
    path: '/login',
    name: 'login',
    component: _import('system/login')
  }
]

/**
 * 错误页面
 */
const errorPage = [
  {
    path: '*',
    name: '404',
    component: _import('system/error/404')
  }
]

// 导出需要显示菜单的
export const frameInRoutes = frameIn

// 重新组织后导出
export default [...frameIn, ...frameOut, ...errorPage]
