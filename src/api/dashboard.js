import request from '@/utils/request'

class dashboardApi {
  //
  static getIndex() {
    return request({
      url: 'https://www.tzgkczp.com/admin/view/indexView',
      method: 'get',
      params: {

      },
    })
  }
}
export default dashboardApi
