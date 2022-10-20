import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/OEM-index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n
import './utils/templateCreated.js' // 配置rem
import '@/styles/index.scss' // global css
import * as filters from './filters'
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
import App from './App'
import router from './router'
import store from './store'
import echarts from 'echarts'

import axiosApi from '@/api/axios'
Vue.prototype.$axiosApi = axiosApi
import itemApi from '@/api/itemapi'
Vue.prototype.$itemApi = itemApi
Vue.directive('drag', function (el, binding) {
  const oDiv = el // 当前元素
  oDiv.onmousedown = function (e) {
    e.preventDefault()
    const bw = document.body.clientWidth
    const bh = document.body.clientHeight
    // 鼠标按下，计算当前元素距离可视区的距离
    const disX = e.clientX - oDiv.offsetLeft
    const disY = e.clientY - oDiv.offsetTop
    // 计算两边坐标
    document.onmousemove = function (e) {
      let l = 0
      let t = 0
      // 拖动边界
      if (e.clientX >= bw) {
        l = bw - disX
      } else if (e.clientX <= 0) {
        l = 0 - disX
      } else {
        l = e.clientX - disX
      }
      if (e.clientY >= bh) {
        t = bh - disY
      } else if (e.clientY <= 0) {
        t = 0 - disY
      } else {
        t = e.clientY - disY
      }
      // 移动当前元素
      oDiv.style.left = l + 'px'
      oDiv.style.top = t + 'px'
      console.log('oDiv.style.left', oDiv.style.left)
    }
    // 鼠标停止移动时，事件移除
    document.onmouseup = function (e) {
      document.onmousemove = null
      document.onmouseup = null
    }
  }
})

import fs from 'fs'
Vue.use(fs)
import Cookie from '@/utils/auth'
Vue.prototype.$Cookie = Cookie

Vue.directive('title', {
  inserted: function (el, binding) {
    document.title = el.dataset.title
  }
})
/* import VueAMap from 'vue-amap';
Vue.use(VueAMap);

VueAMap.initAMapApiLoader({
  key: '1e5396e933d4edb8d3bc96bba497911b',
  plugin: ['AMap.Autocomplete'],
  // 默认高德 sdk 版本为 1.4.4
  v: '1.4.4'
});*/

import AMap from 'vue-amap'
Vue.use(AMap)

// 初始化vue-amap
AMap.initAMapApiLoader({
  // 高德key
  key: '1e5396e933d4edb8d3bc96bba497911b',
  // 插件集合 （插件按需引入）
  plugin: ['AMap.Geolocation', 'Geocoder']
})

import axios from 'axios'

Vue.prototype.axios = axios
Vue.prototype.$echarts = echarts
import '@/icons' // icon

import '@/permission' // permission control

Vue.use(ElementUI, {
  locale
})

Vue.config.productionTip = false

import VideoPlayer from 'vue-video-player'
import 'video.js/dist/video-js.css'
import 'vue-video-player/src/custom-theme.css'
// import vueVideoPlayer from 'vue-video-player'
Vue.use(VideoPlayer)

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
