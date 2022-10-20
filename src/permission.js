import router from './router'
// import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css' // Progress 进度条样式
// import {
//   Message
// } from 'element-ui'
import cookies from './utils/auth'

// import { newrouter } from './router'
console.log(router, 'router')
const whiteList = ['/login'] // 不重定向白名单
router.beforeEach((to, from, next) => {
  NProgress.start()
  // console.log('getToken', cookies.getToken())
  if (cookies.getToken()) {
    if (to.path === '/login') {
      next({
        path: '/'
      })
      NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    } else {
      // if (store.getters.roles.length === 0) {
      //   store.dispatch('getMenu').then(response => {
      //     const routerList = response.data.menuByids
      //     // const routerList= router.constantRouterMapdev
      //     console.log(routerList,'routerList')
      //     let userPhone = window.localStorage.getItem('username');
      //     store.dispatch('getphone',userPhone)
      //     store.dispatch('GenerateRoutes', routerList).then(() => {
      //       router.addRoutes(store.getters.addRouters)
      //       next({...to, replace: true})
      //     })

      //   }).catch(error => {

      //     /*if(error.request.status == '401'){
      //       console.log("登陆超时")
      //       store.dispatch('FedLogOut').then(() => {
      //         Message.error( '登陆超时！')
      //         next({ path: '/' })
      //       })
      //     }*/
      //   })
      //   store.dispatch('getShopType').then(response => {

      //   })
      //   store.dispatch('getGrade').then(response => {

      //   })

      // } else {
      //   next()

      // }

      next()
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      // console.log('111',cookies.getToken())
      next()
    } else {
      // console.log('222',cookies.getToken())
      next('/login')
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
