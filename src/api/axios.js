import request from '@/utils/request'
import cookies from '@/utils/auth'
class axiosApi{
  //定义公共axios类 在main.js导入
  //表格模板文件  component/table
  //获取ip
  static getIp(){
    return request({
      url:'http://ip.taobao.com/service/getIpInfo.php?ip=myip',
      method:'get'
    })
  }

  //获取等级列表
  static getGrade(brandId) {
    return request({
      url: '/getGrade',
      method: 'post',
      data:{
        brandId:brandId
      },
    })
  }


  //查询优惠券信息
  static findCouponList(brandId,status,pageNum,pageSize) {
    return request({
      url: '/coupon/findCouponList',
      method: 'post',
      data:{
        'brandId':brandId,
        'status':status,
        'pageNum':pageNum,
        'pageSize':pageSize,
      },
    })
  }

  //新增优惠券
  static addCoupon(arriveLimit,discount,stock,expiration,dayRefresh,dayQuantity,amount,quota,quotaDay) {
    return request({
      url: '/coupon/addCoupon',
      method: 'post',
      data:{
        'arriveLimit':arriveLimit,
        'discount':discount,
        'stock':stock,
        'expiration':expiration,
        'dayRefresh':dayRefresh,
        'dayQuantity':dayQuantity,
        'amount':amount,
        'quota':quota,
        'quotaDay':quotaDay,
      },
    })
  }

//修改或关闭优惠券
  static updateCoupon(id,stock,expiration,dayRefresh,dayQuantity,amount,quota,quotaDay,status) {
    return request({
      url: '/coupon/updateCoupon',
      method: 'post',
      data:{
        'id':id,
        'stock':stock,
        'expiration':expiration,
        'dayRefresh':dayRefresh,
        'dayQuantity':dayQuantity,
        'amount':amount,
        'quota':quota,
        'quotaDay':quotaDay,
        'status':status,
      },
    })
  }

  //删除汇卡绑卡记录
  static deleteHk(bankCard) {
    return request({
      url: '/channel/deleteHk',
      method: 'post',
      data:{
        'bankCard':bankCard,
      },
    })
  }

  //优惠券购买记录
  static findCouponRecord(phone,brandId,pageNum,pageSize) {
    return request({
      url: '/coupon/findCouponRecord',
      method: 'post',
      data:{
        'phone':phone,
        'brandId':brandId,
        'pageNum':pageNum,
        'pageSize':pageSize,
      },
    })
  }

  //优惠券购买记录
  static findCoinRecord(phone,brandId,pageNum,pageSize) {
    return request({
      url: '/coupon/findCoinRecord',
      method: 'post',
      data:{
        'phone':phone,
        'brandId':brandId,
        'pageNum':pageNum,
        'pageSize':pageSize,
      },
    })
  }

  //查询TX通道支持银行列表
  static findChannelBack(channelId,pageNum,pageSize) {
    return request({
      url: '/channel/findChannelBack',
      method: 'post',
      data:{
        'channelId':channelId,
        'pageNum':pageNum,
        'pageSize':pageSize,
      },
    })
  }

  //新增TX通道支持银行
  static addChannelBack(channelId,swiftCode,singleMin,singleMax,limitDay) {
    return request({
      url: '/channel/addChannelBack',
      method: 'post',
      data:{
        'channelId':channelId,
        'swiftCode':swiftCode,
        'singleMin':singleMin,
        'singleMax':singleMax,
        'limitDay':limitDay,
      },
    })
  }

  //删除TX通道支持银行
  static updateChannelBack(bankId,status,swiftCode) {
    return request({
      url: '/channel/updateChannelBack',
      method: 'post',
      data:{
        'bankId':bankId,
        'status':status,
        'swiftCode':swiftCode,
      },
    })
  }

  //查询用户更多的上级
  static findLevel(userId) {
    return request({
      url: '/user/findLevel',
      method: 'post',
      data:{
        'userId':userId,
      },
    })
  }

  //批量修改交易时间
  static adjustmentPlan(planId,algorithm,time) {
    return request({
      url: '/adjustmentPlan',
      method: 'post',
      data:{
        'planId':planId,
        'algorithm':algorithm,
        'time':time,
      },
    })
  }
  //批量重启计划
  static restartBatchPlan(planIds) {
    return request({
      url: '/restartBatchPlan',
      method: 'post',
      data:{
        'planIds':planIds,
      },
    })
  }

  //添加绑卡TFT
  static addTFT(userId,bankCard) {
    return request({
      url: '/channel/addTFT',
      method: 'post',
      data:{
        'userId':userId,
        'bankCard':bankCard,
      },
    })
  }

  static insideHKTx(instNo,bankName,bankCard,userName,amount,reg,verify,type,merNo,idcard,phone) {
    return request({
      url: '/channel/insideHKTx',
      method: 'post',
      data:{
        'instNo':instNo,
        'bankName':bankName,
        'bankCard':bankCard,
        'userName':userName,
        'amount':amount,
        'reg':reg,
        'verify':verify,
        'type':type,
        'merNo':merNo,
        'idcard':idcard,
        'phone':phone,
      },
    })
  }


  //商城管理

  //获取商品类别名称
  static findShopType() {
    return request({
      url: '/shop/findShopType',
      method: 'post',
      data:{
      },
    })
  }

  //商品类别列表
  static findShop(itemType,status,itemName,pageNum,pageSize) {
    return request({
      url: '/shop/findShop',
      method: 'post',
      data:{
        itemType:itemType,
        status:status,
        itemName:itemName,
        pageNum:pageNum,
        pageSize:pageSize,
      },
    })
  }

  //获取上传凭证
  static getAuth() {
    return request({
      url: 'https://www.hlxiaoxiong.com/getAuth',
      method: 'post',
      data:{
      },
    })
  }

  //添加商品
  static releaseShop(brandId,id,stockNum,itemPhoto,showAmount,resume,itemName,description,price,order,itemType,limits) {
    return request({
      url: '/shop/releaseShop',
      method: 'post',
      data:{
        brandId:brandId,
        id:id,
        stockNum:stockNum,
        itemPhoto:itemPhoto,
        showAmount:showAmount,
        resume:resume,
        itemName:itemName,
        description:description,
        price:price,
        order:order,
        itemType:itemType,
        limits:limits,
      },
    })
  }

  //商品列表
  static stopShop(id,status,isDelete) {
    return request({
      url: '/shop/stopShop',
      method: 'post',
      data:{
        id:id,
        status:status,
        delete:isDelete,
      },
    })
  }

  //GET /shop/itemDetail 商品详情
  static itemDetail(id) {
    return request({
      url: '/shop/itemDetail?id='+id,
      method: 'get',
      data:{
      },
    })
  }


  //商品订单列表
  static findShopOrder(orderNum,status,payStatus,expressStatus,itemName,phone,startTime,endTime,pageNum,pageSize) {
    return request({
      url: '/shop/findShopOrder',
      method: 'post',
      data:{
        orderNum:orderNum,
        status:status,
        payStatus:payStatus,
        expressStatus:expressStatus,
        itemName:itemName,
        phone:phone,
        startTime:startTime,
        endTime:endTime,
        pageNum:pageNum,
        pageSize:pageSize,
      },
    })
  }

  //取消订单
  static cancelOrder(orderNum) {
    return request({
      url: '/shop/cancelOrder',
      method: 'post',
      data:{
        orderNum:orderNum,
      },
    })
  }


  //发货
  static confirmShipment(orderId,expressNumber,expressName,type) {
    return request({
      url: '/shop/confirmShipment',
      method: 'post',
      data:{
        orderId:orderId,
        expressNumber:expressNumber,
        expressName:expressName,
        type:type,
      },
    })
  }



  //商户管理

  //商户列表
  static findShopAgentList(name,phone,prePhone,type,verifyStatus,pageNum,pageSize) {
    return request({
      url: '/shopAgent/findShopAgentList',
      method: 'post',
      data:{
        name:name,
        phone:phone,
        prePhone:prePhone,
        type:type,
        verifyStatus:verifyStatus,
        pageNum:pageNum,
        pageSize:pageSize,
      },
    })
  }

  //行业类型表
  static findShopAgentType() {
    return request({
      url: '/shopAgent/findShopAgentType',
      method: 'post',
      data:{
      },
    })
  }

  //商户详情表
  static findShopAgent(agentId) {
    return request({
      url: '/shopAgent/findShopAgent',
      method: 'post',
      data:{
        agentId:agentId
      },
    })
  }

  //商户结算表
  static findShopAgentSettle(agentId) {
    return request({
      url: '/shopAgent/findShopAgentSettle',
      method: 'post',
      data:{
        agentId:agentId
      },
    })
  }

  //商户费率表
  static findShopAgentDetail(agentId) {
    return request({
      url: '/shopAgent/findShopAgentDetail',
      method: 'post',
      data:{
        agentId:agentId
      },
    })
  }

  //查询商户交易订单
  static findShopAgentOrder(agentId,phone,name,orderNum,status,startTime,endTime,pageNum,pageSize) {
    return request({
      url: '/shopAgent/findShopAgentOrder',
      method: 'post',
      data:{
        agentId:agentId,
        phone:phone,
        name:name,
        orderNum:orderNum,
        status:status,
        startTime:startTime,
        endTime:endTime,
        pageNum:pageNum,
        pageSize:pageSize,
      },
    })
  }

  //修改商户详情信息
  static updateShopAgent(data) {
    return request({
      url: '/shopAgent/updateShopAgent',
      method: 'post',
      data:data,
    })
  }

  //修改结算卡信息
  static updateShopAgentSettle(data) {
    return request({
      url: '/shopAgent/updateShopAgentSettle',
      method: 'post',
      data:data,
    })
  }

  //修改或者新增商户费率
  static updateShopAgentDetail(data) {
    return request({
      url: '/shopAgent/updateShopAgentDetail',
      method: 'post',
      data:data,
    })
  }


  //查询商户会员分润比例
  static findShopGradeRatio(agentId) {
    return request({
      url: '/shopAgent/findShopGradeRatio',
      method: 'post',
      data:{
        agentId:agentId
      },
    })
  }

  //查询商户审核记录
  static findShopAgentVerify(agentId) {
    return request({
      url: '/shopAgent/findShopAgentVerify',
      method: 'post',
      data:{
        agentId:agentId
      },
    })
  }


  //修改或新增商户会员分润比例
  static updateShopGradeRatio(data) {
    return request({
      url: '/shopAgent/updateShopGradeRatio',
      method: 'post',
      data:data,
    })
  }


  //汇卡审核商户
  static verifyShopAgentHk(data) {
    return request({
      url: '/shopAgent/verifyShopAgentHk',
      method: 'post',
      data:data,
    })
  }

  //快付通审核商户
  static verifyShopAgentKft(data) {
    return request({
      url: '/shopAgent/verifyShopAgentKft',
      method: 'post',
      data:data,
    })
  }


  //停用商户
  static StopShopAgent(data) {
    return request({
      url: '/shopAgent/StopShopAgent',
      method: 'post',
      data:data,
    })
  }

  //用户评论列表
  static findShopComment(data) {
    return request({
      url: '/shopAgent/findShopComment',
      method: 'post',
      data:data,
    })
  }

  //用户评论审核POST
  static verifyShopComment(id,status) {
    return request({
      url: '/shopAgent/verifyShopComment',
      method: 'post',
      data:{
        id:id,
        status:status,
      },
    })
  }
  //POST /shopAgent/findShopPhoto查询商户提交照片
  static findShopPhoto(data) {
    return request({
      url: '/shopAgent/findShopPhoto',
      method: 'post',
      data:data,
    })
  }
  //商户相册审核POST
  static verifyShopPhoto(id,agentId,status) {
    return request({
      url: '/shopAgent/verifyShopPhoto',
      method: 'post',
      data:{
        id:id,
        agentId:agentId,
        status:status,
      },
    })
  }

  //goods/findShopGoods 查询商家套餐列表
  static findShopGoods(data) {
    return request({
      url: '/goods/findShopGoods',
      method: 'post',
      data:data,
    })
  }

  //goods/findGoodsDetails 商家套餐详情
  static findGoodsDetails(id) {
    return request({
      url: '/goods/findGoodsDetails',
      method: 'post',
      data:{
        id:id
      },
    })
  }

  //goods/updateShopGoods 审核套餐
  static updateShopGoods(data) {
    return request({
      url: '/goods/updateShopGoods',
      method: 'post',
      data:data,
    })
  }

  //video/findShopVideo 商家视频列表
  static findShopVideo(data) {
    return request({
      url: '/video/findShopVideo',
      method: 'post',
      data:data,
    })
  }

  // video/updateShopVideo 审核商家视频
  static updateShopVideo(data) {
    return request({
      url: '/video/updateShopVideo',
      method: 'post',
      data:data,
    })
  }

  // /shopAgent/generateQrCode 生成商户二维码

  static generateQrCode(data) {
    return request({
      url: '/shopAgent/generateQrCode',
      method: 'post',
      data:data,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }

  // /findExCode 推广码列表
  static findExCode(data) {
    return request({
      url: '/shopAgent/findExCode',
      method: 'post',
      data:data,
    })
  }

  // /user/getUserByPhone 获取用户id+名字
  static getUserByPhone(phone) {
    return request({
      url: '/user/getUserByPhone?phone='+phone,
      method: 'get',
      data:{},
    })
  }
  // /qrcodeDown 推广码下载
  static qrcodeDown(ids) {
    return request({
      url: '/shopAgent/qrcodeDown?ids='+ids,
      method: 'get',
      data:{},
    })
  }
}


export default  axiosApi
