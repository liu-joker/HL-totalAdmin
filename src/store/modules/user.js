//import { login, logout, getInfo } from '@/api/login'

import loginApi from '@/api/login'
import axiosApi from '@/api/axios'
import cookies from '@/utils/auth'

//后台类型白名单 brandId
const typeList = ['dc244cacf322438f8b8cff6b47865020','0d1cfa7396634feb8f5357199387a0d6']
const user = {
  state: {
    token: cookies.getToken(),
    oemName: '',
    companyname: '',
    name: '',
    roleId: '',
    roleObj: {},
    avatar: '',
    managementTool: '1', //后台类型：1总后台 2商城商家
    roles: [],
    grade: [],
    OEMlist: [],
    TRXchannellist: [],
    brandId: '',
    phone: '',
    ShopType:[]
  },
//brandId
  mutations: {
    SET_MANAGEMENTTOOL:
      (state, type) => {
        state.managementTool = type
      },
    SET_ROLEOBJ:
      (state, roleObj) => {
        state.roleObj = roleObj
      },
    SET_DFPHONE:
      (state, dfPhone) => {
        state.dfPhone = dfPhone
      },
    SET_BRANDID:
      (state, brandId) => {
        state.brandId = brandId
      },
    SET_OEMLIST:
      (state, oemlist) => {
        state.OEMlist = oemlist
      },
    SET_TRXCHANNELLIST:
      (state, TRXchannellist) => {
        state.TRXchannellist = TRXchannellist
      },
    SET_OEMNAME:
      (state, oemName) => {
        state.oemName = oemName
      },
    SET_COMPANYNAME:
      (state, companyname) => {
        state.companyname = companyname
      },
    SET_GRADE:
      (state, grade) => {
        state.grade = grade
      },
    SET_ROLEID:
      (state, roleId) => {
        state.roleId = roleId
      },
    SET_TOKEN:
      (state, token) => {
        state.token = token
      },
    SET_NAME:
      (state, name) => {
        state.name = name
      },
    SET_AVATAR:
      (state, avatar) => {
        state.avatar = avatar
      },
    SET_ROLES:
      (state, roles) => {
        state.roles = roles
      },
    SET_USERPHONE:
      (state, phone) => {
        state.phone = phone
      },
    SET_SHOPTYPE:
      (state, ShopType) => {
      state.ShopType = ShopType
    },
  },

  actions: {
    // 登录

//获取菜单路由
    getMenu({commit, dispatch}) {
      return new Promise((resolve, reject) => {
        loginApi.getMenu().then(response => {
          const data = response.data;
          if (data.menuByids && data.menuByids.length > 0) { // 验证返回的roles是否是一个非空数组
            commit('SET_ROLEID', data.roleId);
            //按钮级别权限判断
            var roleObj = {};
            roleObj.R1 = data.roleId<=2;  //总后台权限
            roleObj.R2 = data.roleId<=3;  //OEM权限 总后台
            roleObj.R3 = data.roleId==3;  //OEM权限
            roleObj.R4 = data.roleId<=4;  //vip以上
            roleObj.R5 = data.roleId==4;  //vip权限
            commit('SET_ROLEOBJ', roleObj);
            commit('SET_OEMNAME', data.name);
            commit('SET_COMPANYNAME', data.companyname);
            commit('SET_BRANDID', data.brandId);
            commit('SET_DFPHONE', data.phone);


            //商家类型判断

            if(data.brandId){
              let item = typeList.find(n=>{
                return n == data.brandId
              })
              if(item){
                commit('SET_MANAGEMENTTOOL', 2);
              }
            }


            if (data.roleId < 3) {
              //获取OEM列表
              loginApi.findOem().then(res => {
                commit('SET_OEMLIST', res.data)
              })

              loginApi.findChannel().then(res2 => {
                let List = res2.data
                let TRX = /代还/
                //let num = /\d{2,}/g
                let TRXList = List.filter(x => {
                  return x.channelName.search(TRX) >= 0
                })

                //rank
                let getNum = function (str) {
                  var num = str.replace(/[^0-9]/ig, "");
                  return num ? num : null
                }
                let asc = TRXList.map(x => {
                  let rank = getNum(x.channelName)
                  x.rank = rank
                  return x
                })

                function compare(pro) {
                  return function (obj1, obj2) {
                    var val1 = obj1[pro];
                    var val2 = obj2[pro];
                    if (val1 > val2) { //正序
                      return 1;
                    } else if (val1 < val2) {
                      return -1;
                    } else {
                      return 0;
                    }
                  }
                }

                let TRXlist2 = asc.sort(compare("rank"))
                commit('SET_TRXCHANNELLIST', TRXlist2)
              })
            }
          } else {
            reject('路由表为空！')
          }
          dispatch('GenerateRoutes', data.menuByids)
          commit('SET_ROLES', data.menuByids)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
    ,

    getGrade({commit}) {
      //获取等级列表
      return new Promise((resolve, reject) => {
        loginApi.getGrade().then(response => {
          //console.log(response)
          let grade = response.data.map(v => {
            let x = {}
            x.grade = v.grade
            x.gradeName = v.gradeName
            if (v.id) {
              x.id = v.id
            }
            return x
          })
          commit('SET_GRADE', grade)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
    ,


    getphone({commit}, phone) {
      //console.log('记住号码')
      commit('SET_USERPHONE', phone)
      /*return new Promise(resolve => {

        resolve()
      })*/
    }
    ,

    getShopType({commit}) {
      //获取商品类别名称
      return new Promise((resolve, reject) => {
        axiosApi.findShopType().then(response => {
        let list = response.data.filter(v=>{
          if( v.isDelete == 0){
            return v
          }
        })
          commit('SET_SHOPTYPE',list)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
    ,


    /*


        Login({ commit }, userInfo) {
          const username = userInfo.username.trim()
          return new Promise((resolve, reject) => {
            login(username, userInfo.password).then(response => {
              const data = response.data
              setToken(data.token)
              commit('SET_TOKEN', data.token)
              resolve()
            }).catch(error => {
              reject(error)
            })
          })
        },

        // 获取用户信息
        GetInfo({ commit, state }) {
          return new Promise((resolve, reject) => {
            getInfo(state.token).then(response => {
              const data = response.data
              if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
                commit('SET_ROLES', data.roles)
              } else {
                reject('getInfo: roles must be a non-null array !')
              }
              commit('SET_NAME', data.name)
              commit('SET_AVATAR', data.avatar)
              resolve(response)
            }).catch(error => {
              reject(error)
            })
          })
        },

        // 登出
        LogOut({ commit, state }) {
          return new Promise((resolve, reject) => {
            logout(state.token).then(() => {
              commit('SET_TOKEN', '')
              commit('SET_ROLES', [])
              removeToken()
              resolve()
            }).catch(error => {
              reject(error)
            })
          })
        },
  */
    // 前端 登出
    FedLogOut({commit}) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        cookies.removeToken()
        resolve()
      })
    }
  }
}

export default user
