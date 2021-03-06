// Vue
import Vue from 'vue'
import VueAMap from 'vue-amap'
import AMapJS from 'amap-js'
// import VueAMap from 'vue-amap'
import i18n from './i18n'
import App from './App'
// 核心插件
import d2Admin from '@/plugin/d2admin'
import Avue from '@smallwei/avue'
import '@smallwei/avue/lib/index.css'
import axios from 'axios'

// store
import store from '@/store/index'

// 菜单和路由设置
import router from './router'
import { menuHeader, menuAside } from '@/menu'
import { frameInRoutes } from '@/router/routes'

import $api from '@/apis/index'
import dayjs from 'dayjs'
Vue.prototype.api = $api
// 核心插件
Vue.use(d2Admin)
Vue.use(Avue, { axios })
Vue.use(VueAMap)
Vue.use(AMapJS)
window._AMapSecurityConfig = {
  securityJsCode: '2bf841e0f4a09f201a51c3e2dfa90297'
}
VueAMap.initAMapApiLoader({
  key: '2bf841e0f4a09f201a51c3e2dfa90297',
  plugin: [
    'AMap.Autocomplete', // 输入提示插件
    'AMap.PlaceSearch', // POI搜索插件
    'AMap.Scale', // 右下角缩略图插件 比例尺
    'AMap.OverView', // 地图鹰眼插件
    'AMap.ToolBar', // 地图工具条
    'AMap.MapType', // 类别切换控件，实现默认图层与卫星图、实施交通图层之间切换的控制
    'AMap.PolyEditor', // 编辑 折线多，边形
    'AMap.CircleEditor', // 圆形编辑器插件
    'AMap.Geolocation' // 定位控件，用来获取和展示用户主机所在的经纬度位置
  ],
  v: '1.4.15',
  uiVersion: '1.1.1'
})
Vue.mixin({
  data () {
    return {
      uploadUrl: 'http://127.0.0.1:3000/api/v1/upload'
    }
  }
})

Vue.filter('format', (val, formatTxt) => {
  return dayjs(val).format(formatTxt)
})

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
  created () {
    // 处理路由 得到每一级的路由设置
    this.$store.commit('d2admin/page/init', frameInRoutes)
    // 设置顶栏菜单
    this.$store.commit('d2admin/menu/headerSet', menuHeader)
    // 设置侧边栏菜单
    this.$store.commit('d2admin/menu/asideSet', menuAside)
    // 初始化菜单搜索功能
    this.$store.commit('d2admin/search/init', menuHeader)
  },
  mounted () {
    // 展示系统信息
    this.$store.commit('d2admin/releases/versionShow')
    // 用户登录后从数据库加载一系列的设置
    this.$store.dispatch('d2admin/account/load')
    // 获取并记录用户 UA
    this.$store.commit('d2admin/ua/get')
    // 初始化全屏监听
    this.$store.dispatch('d2admin/fullscreen/listen')
  }
}).$mount('#app')
