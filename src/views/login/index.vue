<template>
  <div class="login-container">
    <canvas-bar></canvas-bar>
    <el-form class="login-form"
             autoComplete="on"
             :model="loginForm"
             :rules="loginRules"
             ref="loginForm"
             label-position="left">
      <h3 class="title">跨境总台管理系统</h3>
      <el-form-item prop="username">
        <span class="svg-container svg-container_login">
          <svg-icon icon-class="user2" />
        </span>
        <el-input name="username"
                  type="text"
                  v-model="loginForm.username"
                  autoComplete="on"
                  placeholder="请输入用户名" />
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container svg-container_login">
          <svg-icon icon-class="password"></svg-icon>
        </span>
        <el-input name="password"
                  :type="pwdType"
                  @keyup.enter.native="handleLogin"
                  v-model="loginForm.password"
                  autoComplete="on"
                  placeholder="请输入密码"></el-input>
        <span class="show-pwd"
              @click="showPwd">
          <svg-icon icon-class="eye" />
        </span>
      </el-form-item>

      <el-form-item prop="verificationcode">
        <verification-code @child-event="parentEvent"
                           v-if="verificationshow"></verification-code>
      </el-form-item>
      <div class="RememberThePassword">
        <el-checkbox v-model="checked">记住密码</el-checkbox>
      </div>

      <el-form-item>
        <el-button type="primary"
                   style="width:100%;font-size: 1.125rem"
                   :loading="loading"
                   @click.native.prevent="handleLogin">
          登 录
        </el-button>
      </el-form-item>

    </el-form>
    <div>
      <div class="f_foot">
        <p>Copyright © 2018 版权所有 深圳市汇联金创科技有限公司</p>
        <!-- <p><a href="http://www.miibeian.gov.cn">粤ICP备17090630号-3</a></p> -->
      </div>
    </div>
    <div class="getPublicIP">
      ip: {{ip}}
    </div>
    <remote-js src="https://pv.sohu.com/cityjson?ie=utf-8"></remote-js>
  </div>
</template>

<script>
import CanvasBar from './canvas/canvasBar.vue'
import verificationCode from "@/components/VerificationCode"

import cookies from '@/utils/auth'// 验权


export default {
  name: 'login',
  components: {
    verificationCode,
    CanvasBar,
    'remote-js': {
      render (createElement) {
        return createElement('script', { attrs: { type: 'text/javascript', src: this.src } });
      },
      props: {
        src: { type: String, required: true },
      },
    }
  },
  data () {

    const userName = /^[a-zA-Z0-9_]{6,12}$/
    const validateUsername = (rule, value, callback) => {
      console.log(value)
      if (!userName.test(value.trim()) || value.trim() == "") {
        callback(new Error('请输入正确的用户名!'))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码不能小于6位!'))
      } else {
        callback()
      }
    }
    const validatecode = (rule, value, callback) => {
      if (value) {
        callback()
      } else {
        callback(new Error('请滑动滑块完成验证!'))
      }
    }
    return {
      loginForm: {
        username: '',
        password: '',
        verificationcode: false
      },
      loginRules: {
        username: [{ required: true, validator: validateUsername, trigger: 'blur' }],
        password: [{ required: true, trigger: 'blur', validator: validatePass }],
        verificationcode: [{ required: true, trigger: 'blur', validator: validatecode }],
      },
      loading: false,
      pwdType: 'password',
      checked: false,
      verificationshow: true,
      ip: ''
    }
  },
  created () {

    const username = window.localStorage.getItem('username');
    const password = window.localStorage.getItem('password');
    //console.log(username, password)
    if (username != null && password != null) {
      this.loginForm.username = username;
      this.loginForm.password = password;
      this.checked = true;
    }
    this.addmeta()
    this.getIp()
    this.consoleFun()
  },
  destroyed () {
    this.removemeta()
  },
  methods: {
    consoleFun () {


    },
    getIp () {
      try {
        return this.ip = returnCitySN["cip"]
      } catch (err) {
        setTimeout(() => {
          this.getIp()
        }, 1000)
      }
    },
    addmeta () {
      if (typeof document.ontouchstart == 'object') {

        let meta = document.createElement('meta')
        meta.setAttribute('name', 'viewport')
        meta.setAttribute('id', 'viewportMeta')
        meta.setAttribute('content', 'width=device-width,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no')
        //   console.log(meta)
        document.head.appendChild(meta)
      }
    },
    removemeta () {
      let viewportMeta = document.getElementById('viewportMeta')
      if (viewportMeta) {
        document.head.removeChild(viewportMeta)
      }
    },
    parentEvent (data) {
      //   console.log(data)
      this.loginForm.verificationcode = data
    },
    showPwd () {
      if (this.pwdType === 'password') {
        this.pwdType = ''
      } else {
        this.pwdType = 'password'
      }
    },
    handleLogin () {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          if (this.loginForm.verificationcode) {
            this.loading = true;

            this.$itemApi.login(this.loginForm.username.trim(), this.loginForm.password).then(response => {
              console.log('login')
              console.log(response)

              cookies.setToken(response.data)
              this.$message({
                type: 'success',
                message: '登录成功！'
              })


              this.$store.dispatch('getphone', this.loginForm.username.trim())



              console.log(this.$store)

              window.localStorage.setItem('username', this.loginForm.username)
              if (this.checked) {
                window.localStorage.setItem('password', this.loginForm.password)
              } else {
                window.localStorage.removeItem('username')
                window.localStorage.removeItem('password')
              }
              /*    if (typeof document.ontouchstart == 'object') {
                    location.reload()
                  }*/
              let that = this

              setTimeout(() => {
                // that.$router.push('/')
                location.reload()
              }, 1000)
            }).catch(error => {

              this.verificationshow = false
              this.loginForm.verificationcode = false
              setTimeout(() => {
                this.verificationshow = true
              }, 5)
            })
            this.loading = false
            return
          } else {
            this.$message({
              type: 'warning',
              message: '请滑动验证码完成验证！'
            })
          }

        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
$bg: #2d3a4b;
$light_gray: #eee;

/* reset element-ui css */
.login-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: url("~@/assets/images/loginBGI.png") no-repeat;
  background-size: cover;
  background-position: 35% 50%;

  .getPublicIP {
    position: fixed;
    left: 0;
    bottom: 0;
    padding: 0.75rem;
    font-size: 1rem;
    color: #f4f4f4;
  }
  .el-form-item__content {
    line-height: 2.5rem;
    font-size: 0.875rem;
  }
  .el-input {
    display: inline-block;
    height: 3rem;
    width: 80%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 0.75rem 0.3rem 0.75rem 1rem;
      color: $light_gray;
      height: 3rem;
      line-height: 3rem;
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: #fff !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
  .f_foot {
    padding: 0.5rem 0;
    *background-color: #373d41;
    color: #f4f4f4;
    font-size: 0.8rem;
    text-align: center;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
  }
}
</style>

<style rel="stylesheet/scss" lang="scss">
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
.el-form-item {
  display: block;
}
.login-container {
  position: absolute;
  height: 100%;
  width: 100%;

  .login-form {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    width: 25.5rem;
    padding: 2.1875rem 2.1875rem 15px 2.1875rem;
    margin: 8% auto 0;
    z-index: 99999;
    .RememberThePassword {
      padding-bottom: 1rem;
      display: flex;
      .el-checkbox__inner {
        border: 1px solid $light_gray;
        background-color: transparent;
        &:after {
          border-color: #409eff;
          border-width: 2px;
        }
      }
      .el-checkbox {
        color: #cccccc;
      }
    }
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $light_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
    &_login {
      font-size: 16px;
    }
  }
  .title {
    width: 100%;
    font-size: 26px;
    font-weight: 400;
    color: #ffffff;
    margin: 0px 0 40px 0;
    text-align: center;
    font-weight: bold;
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $light_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
