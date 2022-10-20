import {constantRouterMapdev, constantRouterMap, RouterMapdev} from '@/router'
//import store from '@/store'
/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}
console.log('RouterMapdev',RouterMapdev,constantRouterMapdev,constantRouterMap)
/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param routes asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(routes, roles) {

  let stair = []
  let secondLevel = []
  roles.forEach(x => {
    if (x.preId == null) {

      const i = routes.find(y => {
        return y.id == x.id
      })
      if (i) {
        i.meta.title = x.menuName
        stair[(x.order) - 1] = i
       
      }
    } else {
      secondLevel.push(x)
    }
  })
 
  stair = stair.filter(n=> {
    return n;
  })
  secondLevel = secondLevel.filter(n=> {
    return n;
  })
 
  stair.forEach(x => {
    if (x.children && x.children.length > 0) {
      let cList = []
      let cList2 = []
      x.children.forEach(y => {
        if (y.meta.id) {
          let c = secondLevel.find(i => {
            return i.id == y.meta.id
          })
          if (c) {
            y.meta.title = c.menuName
            cList[(c.order) - 1] = y
          }

        } else {
          cList2.push(y)
        }
      })
     
      
      x.children = cList.concat(cList2)
     
    }
  })

  //添加前端开发测试页面
  stair = stair.concat(RouterMapdev)
  console.log('RouterMapdev',RouterMapdev)

  stair.push(routes[routes.length - 1])
  stair[0].path = '/'
  console.log('stair',stair)
  return stair

}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = routers.concat(constantRouterMap)
    }
  },
  actions: {
    GenerateRoutes({commit}, data) {
      return new Promise(resolve => {
        const roles = data
        let accessedRouters
        accessedRouters = filterAsyncRouter(constantRouterMapdev, roles)
        commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    }
  }
}

export default permission
