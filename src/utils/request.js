import axios from 'axios'
import qs from 'qs'
import {
  Message
} from 'element-ui'
import store from '../store'
import cookies from '@/utils/auth'

let loading //定义loading变量

function startLoading() { //使用Element loading-start 方法
  store.dispatch('SetLoading', true)
}

function endLoading() { //使用Element loading-close 方法
  store.dispatch('SetLoading', false)
}
//那么 showFullScreenLoading() tryHideFullScreenLoading() 要干的事儿就是将同一时刻的请求合并。
//声明一个变量 needLoadingRequestCount，每次调用showFullScreenLoading方法 needLoadingRequestCount + 1。
//调用tryHideFullScreenLoading()方法，needLoadingRequestCount - 1。needLoadingRequestCount为 0 时，结束 loading。
let needLoadingRequestCount = 0
export function showFullScreenLoading() {
  if (needLoadingRequestCount === 0) {
    startLoading()

  }
  needLoadingRequestCount++
}

export function tryHideFullScreenLoading() {
  if (needLoadingRequestCount <= 0) return
  needLoadingRequestCount--
  if (needLoadingRequestCount === 0) {
    endLoading()
  }
}

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 60000 // 请求超时时间
})

// request拦截器   请求之前
service.interceptors.request.use(config => {
  const headers = config.headers["Content-Type"]

  if (headers == undefined || headers.indexOf("application/x-www-form-urlencoded") != -1) {
    config.data = qs.stringify(config.data);
    // console.log('config.data',config.data)
  }


  if (config.url.indexOf("/login") == -1) {
    config.headers['token'] = cookies.getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    // fewconfig.headers['token'] ='4d4af46sa4f89e4af5d1s5a4g8reaffe54a4f89e'
  }
  showFullScreenLoading()
  return config
}, error => {
  return Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    /**
     * code为非20000是抛错 可结合自己业务进行修改
     */
    const res = response.data;
    tryHideFullScreenLoading()
    if (res.code == 200) {

      return response.data
    } else {
      if (res.code == 700) {
        console.log('超时')
        console.log(res)
        store.dispatch('FedLogOut').then(() => {
          Message({
            message: '登陆超时，请重新登陆！',
            type: 'error',
            duration: 5 * 1000
          })
          setTimeout(() => {
            location.reload()
          }, 2000)
        })
      } else {
        Message({
          message: res.message,
          type: 'error',
          duration: 5 * 1000
        })
      }
    }



    /*  if (res && res.code == 0) {
        console.log('超时')
        console.log(res)
        store.dispatch('FedLogOut').then(() => {
          Message({
            message: '登陆超时，请重新登陆！',
            type: 'error',
            duration: 5 * 1000
          })
          setTimeout(() => {
            //  location.reload()
          }, 2000)
        })
      } else if (res && res.code == 200) {
        return response.data
      } else {
        Message({
          message: res.message,
          type: 'error',
          duration: 5 * 1000
        })
      }*/
  },
  error => {
    const originalRequest = error.config;
    tryHideFullScreenLoading()
    if (error.request.status == '401') {
      console.log("登陆超时")
      console.log(error)
      store.dispatch('FedLogOut').then(() => {
        Message({
          message: '登陆超时，请重新登陆！',
          type: 'error',
          duration: 5 * 1000
        })
        setTimeout(() => {
          location.reload()
        }, 2000)
      })
    }
    if (error.code == 'ECONNABORTED' && error.message.indexOf('timeout') != -1 && !originalRequest._retry) {
      error.message = "请求超时！"
    }
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)
export default service
