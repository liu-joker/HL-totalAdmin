import request from '@/utils/request'

class itemApi {
  // 登陆
  static login(account, pwd) {
    return request({
      url: '/admin/login',
      method: 'post',
      data: {
        'account': account,
        'pwd': pwd
      }
      //   headers: {
      //     'Content-Type': 'application/x-www-form-urlencoded'
      //   },

    })
  }

  // 订单列表
  static getOrderList(account, orderNo, orderNum, startTime, endTime, status, pageNum, pageSize) {
    return request({
      url: '/admin/orderList',
      method: 'post',
      data: {
        account: account,
        orderNo: orderNo,
        orderNum: orderNum,
        startTime: startTime,
        endTime: endTime,
        status: status,
        pageNum: pageNum,
        pageSize: pageSize
      }
    })
  }

  // 账户记录
  static getRecord(orderNo, startTime, endTime, currency, pageNum, pageSize) {
    return request({
      url: '/admin/accountRecordList',
      method: 'post',
      data: {
        orderNo: orderNo,
        startTime: startTime,
        endTime: endTime,
        currency: currency,
        pageNum: pageNum,
        pageSize: pageSize
      }
    })
  }

  // 网站列表
  static webList(status, pageNum, pageSize) {
    return request({
      url: '/admin/webList?status=' + status + '&pageNum=' + pageNum + '&pageSize=' + pageSize,
      method: 'get',
      data: {

      }
    })
  }

  // 添加啊网站
  static addWeb(webName, webUrl) {
    return request({
      url: '/admin/addWeb',
      method: 'post',
      data: {
        webName: webName,
        webUrl: webUrl
      }
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

  // 退款
  static agtRefund(orderNo) {
    return request({
      url: '/admin/agentRefund',
      method: 'post',
      data: {
        'orderNo': orderNo

      }
    })
  }
  // 通道管理
  static channelList(status, name, pageNum, pageSize) {
    return request({
      url: '/admin/channelList?status=' + status + '&name=' + name + '&pageNum=' + pageNum + '&pageSize=' + pageSize,
      method: 'get',
      data: {

      }
    })
  }
  // 代理商列表
  static agentList(status, name, pageNum, pageSize) {
    return request({
      url: '/admin/agentList?status=' + status + '&name=' + name + '&pageNum=' + pageNum + '&pageSize=' + pageSize,
      method: 'get',
      data: {

      }
    })
  }
  // 代理商详情
  static agentChannelDetail(agentId) {
    return request({
      url: '/admin/agentChannelDetail',
      method: 'post',
      data: {
        'agentId': agentId
      }
    })
  }
  // 代理商状态更新
  static updateAgent(status, account) {
    return request({
      url: '/admin/updateAgent',
      method: 'post',
      data: {
        'status': status,
        'account': account
      }
    })
  }
  // 导出
  static exportOrder(orderNo, orderNum, startTime, endTime, status) {
    return request({
      url: '/admin/exportOrder?orderNo=' + orderNo + '&orderNum' + orderNum + '&startTime' + startTime + '&endTime' + endTime + '&status' + status,
      method: 'get',
      data: {

      }
    })
  }
  // 查询key值
  static channelByKey(key) {
    return request({
      url: '/admin/channelByKey?key=' + key,
      method: 'get',
      data: {

      }
    })
  }
  // 添加通道
  static addAgentChannel(agentId, channelId, id, rate, extraFee, extraRate, fee, status, cardType, tradeFee, thirdFee, refundFee, refuseFee, marginRate, riskFee) {
    return request({
      url: '/admin/addAgentChannel',
      method: 'post',
      data: {
        'agentId': agentId,
        'channelId': channelId,
        'id': id,
        'rate': rate,
        'extraFee': extraFee,
        'extraRate': extraRate,
        'fee': fee,
        'status': status,
        'cardType': cardType,
        'tradeFee': tradeFee,
        'thirdFee': thirdFee,
        'refundFee': refundFee,
        'refuseFee': refuseFee,
        'marginRate': marginRate,
        'riskFee': riskFee,
      }
    })
  }
  // 申請退款列表
  static refundOrderList(status, account, orderNo, startTime, endTime, pageNum, pageSize) {
    return request({
      url: '/admin/refundOrderList',
      method: 'post',
      data: {
        'status': status,
        'account': account,
        'orderNo': orderNo,
        'startTime': startTime,
        'endTime': endTime,
        'pageNum': pageNum,
        'pageSize': pageSize,
      }
    })
  }
  // 申請退款列表
  static refundOrder(refundId, orderNo, agentId) {
    return request({
      url: '/admin/refundOrder',
      method: 'post',
      data: {
        'refundId': refundId,
        'orderNo': orderNo,
        'agentId': agentId,
      }
    })
  }
  // 修改密码
  static updPsw(oldPwd, newPwd) {
    return request({
      url: '/admin/updPsw',
      method: 'post',
      data: {
        "oldPwd": oldPwd,
        "newPwd": newPwd

      }
    })
  }
  // 汇率列表
  static exchangeList(pageNum, pageSize) {
    return request({
      url: '/admin/exchangeList',
      method: 'post',
      data: {
        "pageNum": pageNum,
        "pageSize": pageSize

      }
    })
  }
  // 新增商户
  static addAgent(name, account, password, md5Str) {
    return request({
      url: '/admin/addAgent',
      method: 'post',
      data: {
        "name": name,
        "account": account,
        "password": password,
        "md5Str": md5Str
      }
    })
  }

  // 限额
  static agentLimit(agentId) {
    return request({
      url: '/admin/agentLimit',
      method: 'post',
      data: {
        "agentId": agentId,
      }
    })
  }

  // 更新限额
  static updAgentLimit(agentId, dayLimit, singleLimit) {
    return request({
      url: '/admin/updAgentLimit',
      method: 'post',
      data: {
        "agentId": agentId,
        "dayLimit": dayLimit,
        "singleLimit": singleLimit
      }
    })
  }

  // 交易黑名单
  static blackRule(rule, status) {
    return request({
      url: '/admin/blackRule',
      method: 'post',
      data: {
        "rule": rule,
        "status": status
      }
    })
  }

  // 更新黑名单
  static updblackRule(id, rule, status) {
    return request({
      url: '/admin/updblackRule',
      method: 'post',
      data: {
        "id": id,
        "rule": rule,
        "status": status
      }
    })
  }


  // 通道详情
  static channelDetail(id) {
    return request({
      url: '/channel/channelDetail?channelId=' + id,
      method: 'get',
      data: {

      }
    })
  }
  // 通道详情修改
  static updateChannel(id, channelDay, channelFee, channelName, channelRate, channelTag, key1, key2, key3, key4, marginRate, notifyUrl, refundFee, refuseFee, returnUrl, riskFee, status, thirdFee, tradeFee, ) {
    return request({
      url: '/channel/updateChannel',
      method: 'post',
      data: {
        id,
        channelDay,
        channelFee,
        channelName,
        channelRate,
        channelTag,
        key1,
        key2,
        key3,
        key4,
        marginRate,
        notifyUrl,
        refundFee,
        refuseFee,
        returnUrl,
        riskFee,
        status,
        thirdFee,
        tradeFee,
      }
    })
  }

  // 上传拒付订单
  static uploadRefuseOrder(file) {
    return request({
      url: '/order/uploadRefuseOrder',
      method: 'post',
      data: {
        file,
      }
    })
  }
}
export default itemApi
