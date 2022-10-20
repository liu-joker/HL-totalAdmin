import request from '@/utils/request'

class loginApi {
  //
  static login(phone, password) {
    return request({
      url: '/login',
      method: 'post',
      data: {
        'phone': phone,
        'password': password
      }
    })
  }
  // 获取菜单
  static getMenu() {
    return request({
      url: '/getMenu',
      method: 'get',
      data: {}
    })
  }

  // 获取oem下拉框
  static findOem() {
    return request({
      url: '/findOem',
      method: 'post',
      data: {}
    })
  }

  // 获取等级列表
  static getGrade() {
    return request({
      url: '/getGrade',
      method: 'post',
      data: {}
    })
  }

  // 获取通道列表
  static findChannel() {
    return request({
      url: '/findChannel',
      method: 'post',
      data: {}
    })
  }

  // 修改密码
  static updatepwd(oldPassword, newPassword) {
    return request({
      url: '/admin/updatepwd',
      method: 'post',
      data: {
        'oldPassword': oldPassword,
        'newPassword': newPassword
      }
    })
  }
}
export default loginApi
