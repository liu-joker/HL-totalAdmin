export function formatDate(time) {
  var dateee = new Date(time).toJSON()
  var date = new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
  return date
}

export function formatMoney(x) {
  const s = (x / 100).toFixed(2)
  if (s == 'NaN') {
    return x
  } else {
    return s
  }
}

export function imgUrl(x, type, BaseUrl) {
  if (type) {
    if (type == 1 && x) {
      // 获取图片名称
      var start = x.indexOf(BaseUrl) // 获得字符串的开始位置
      var result = x.substring(start + BaseUrl.length) // 截取字符串
      return result
    } else {
      return null
    }
  }
  if (x) {
    if (x.indexOf('http') > -1) {
      return x
    } else {
      const baseUrl = 'https://img.cdn.hljcxiaoxiong.com/'
      return baseUrl + x
    }
  } else {
    return ''
  }
}

export function grade(value, list) {
  // 0普通会员，1VIP，9代理商，10合伙人
  const item = list.find(v => {
    return v.grade == value
  })

  if (item) {
    return item.gradeName
  } else {
    return value
  }
}
