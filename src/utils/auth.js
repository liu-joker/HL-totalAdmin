import Cookies from 'js-cookie'

/*
let token=''
let stoken = sessionStorage.getItem('stoken')
if (stoken) {
  token=stoken
} else {
  let t = (Math.random() * Math.random() * 100000).toFixed(0)
  sessionStorage.setItem('stoken', t)
  token=t
}*/


const TokenKey = 'VoteAdmin_Token'
//console.log(TokenKey)

class cookies {
  static getToken() {
    return Cookies.get(TokenKey)
  }

  static setToken(token) {
    return Cookies.set(TokenKey, token)
  }

  static removeToken() {
    return Cookies.remove(TokenKey)
  }

}

export default cookies
