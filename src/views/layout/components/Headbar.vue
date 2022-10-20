<template>
  <div class="header_top">
    <template>
      <div class="navbar">
        <div class="logo_img">
          <!--汇联金创后台管理系统-->
          <!--  <p>{{name}}后台管理系统</p>-->
        </div>
        <div class="logo">
          <div class="tongji">

            <p>{{name?name:'跨境总'}}后台管理系统</p>

          </div>
          <!--   <div style="width: 100px;height: 50px;float: right">

            <div class="musicsvg">

            </div>

          </div>-->
        </div>

        <div class="avatar-container">
          <div>
            <div class="userPhone">
              {{phone}}
            </div>

            <!--换肤组件-->

            <!-- <theme-picker class="theme-switch right-menu-item"/>-->
          </div>
          <el-dropdown trigger="hover">

            <div class="avatar-wrapper">
              <img :src="user_img"
                   class="user-avatar">
            </div>
            <el-dropdown-menu class="user-dropdown"
                              slot="dropdown">

              <router-link class="inlineBlock"
                           to="/"
                           style="text-align: center">
                <el-dropdown-item>
                  首页
                </el-dropdown-item>
              </router-link>
              <el-dropdown-item divided>
                <span @click="dialogFormVisiblePassword=true" style="display:block;">修改密码</span>
              </el-dropdown-item>
              <!--<el-dropdown-item divided v-if="roleId2">-->
              <!--<span  style="display:block;text-align: center" @click="dropdown">-->
              <!--最新消息-->
              <!--</span>-->
              <!--</el-dropdown-item>-->
              <!-- <el-dropdown-item divided>
                <span @click="addUserBtn" style="display:block;">添加用户</span>
              </el-dropdown-item> -->
              <el-dropdown-item divided>
                <span @click="logout"
                      style="display:block;">退出登录</span>
              </el-dropdown-item>
            </el-dropdown-menu>
            <div style="position: absolute;left: -100px;top: 0;color: #ffffff">
              {{user}}
            </div>
          </el-dropdown>
        </div>

        <template>
          <transition :name="transitionName">
            <div class="back-to-ceiling"
                 @click="backToTop"
                 v-show="visible"
                 :style="customStyle"
                 title="回到顶部">
              <svg width="16"
                   height="16"
                   viewBox="0 0 17 17"
                   xmlns="http://www.w3.org/2000/svg"
                   class="Icon Icon--backToTopArrow"
                   aria-hidden="true"
                   style="height: 16px; width: 16px;">
                <title>回到顶部</title>
                <g>
                  <path d="M12.036 15.59c0 .55-.453.995-.997.995H5.032c-.55 0-.997-.445-.997-.996V8.584H1.03c-1.1 0-1.36-.633-.578-1.416L7.33.29c.39-.39 1.026-.385 1.412 0l6.878 6.88c.782.78.523 1.415-.58 1.415h-3.004v7.004z"
                        fill-rule="evenodd"></path>
                </g>
              </svg>
            </div>
          </transition>
        </template>

        <template>
          <el-dialog title="修改密码"
                     :visible.sync="dialogFormVisiblePassword"
                     append-to-body
                     width="30%">
            <el-form :model="passwordForm"
                     :rules="rules"
                     ref="passwordForm">
              <el-form-item label="原密码:"
                            :label-width="formLabelWidth"
                            prop="password1">
                <el-input v-model="passwordForm.password1"
                          placeholder="请输入密码"
                          auto-complete="off"
                          clearable
                          class="input_220"></el-input>
              </el-form-item>
              <el-form-item label="新密码:"
                            :label-width="formLabelWidth"
                            prop="password2">
                <el-input v-model="passwordForm.password2"
                          placeholder="请输入新密码"
                          auto-complete="off"
                          clearable
                          class="input_220"></el-input>
              </el-form-item>
              <el-form-item label="再次输入新密码:"
                            :label-width="formLabelWidth"
                            prop="password3">
                <el-input v-model="passwordForm.password3"
                          placeholder="请再次输入新密码"
                          auto-complete="off"
                          clearable
                          class="input_220"></el-input>
              </el-form-item>
            </el-form>

            <div slot="footer"
                 class="dialog-footer">
              <el-button @click="dialogFormVisiblePassword = false">取 消</el-button>
              <el-button type="primary"
                         @click="ChangeThePassword">确 定</el-button>
            </div>
          </el-dialog>
        </template>

        <template>
          <el-dialog title="添加用户"
                     :visible.sync="dialogFormVisibleAddUser"
                     append-to-body
                     width="30%">
            <el-form :model="userForm"
                     :rules="rules"
                     ref="passwordForm">
              <el-form-item label="手机号码:"
                            :label-width="formLabelWidth">
                <el-input v-model="userForm.phone"
                          placeholder="请输入手机号"
                          auto-complete="off"
                          clearable
                          class="input_220"></el-input>
              </el-form-item>
              <el-form-item label="活动主体:"
                            :label-width="formLabelWidth"
                            prop="password2">
                <el-select v-model="userForm.brandId"
                           clearable
                           placeholder="活动主办方"
                           size="small"
                           style="width: 200px">
                  <el-option v-for="item in options3"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value"></el-option>
                </el-select>
              </el-form-item>

            </el-form>

            <div slot="footer"
                 class="dialog-footer">
              <el-button @click="dialogFormVisibleAddUser = false">取 消</el-button>
              <el-button type="primary"
                         @click="addUser">确 定</el-button>
            </div>
          </el-dialog>
        </template>
      </div>

    </template>

  </div>
</template>


<style>
.page-component-up {
  background-color: #fff;
  position: fixed;
  right: 10px;
  bottom: 150px;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  cursor: pointer;
  transition: 0.3s;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.12);
  z-index: 800;
}

.page-component-up i {
  color: #409eff;
  display: block;
  line-height: 40px;
  text-align: center;
  font-size: 18px;
}

.back-to-ceiling {
  position: fixed;
  display: inline-block;
  text-align: center;
  cursor: pointer;
}

.back-to-ceiling:hover {
  background: #d5dbe7;
}

/*
    .fade-enter-active,
    .fade-leave-active {
      transition: opacity .5s;
    }

    .fade-enter,
    .fade-leave-to {
      opacity: 0
    }*/

.back-to-ceiling .Icon {
  fill: #9aaabf;
  background: none;
}

.musicsvg {
  color: #ffffff;
  font-size: 26px;
  cursor: pointer;
  user-select: none;
  transition: color 0.3s;
}

.musicsvg:hover {
  color: #168fd8;
}
</style>

<script>
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import user_img from '@/assets/images/3.png'
import ThemePicker from '@/components/ThemePicker'
import cookies from '@/utils/auth'
import loginApi from '@/api/login'

export default {
  name: 'Headbar',
  props: {
    visibilityHeight: {
      type: Number,
      default: 400
    },
    backPosition: {
      type: Number,
      default: 0
    },
    customStyle: {
      type: Object,
      default: () => {
        return {
          right: '5px',
          bottom: '120px',
          width: '40px',
          height: '40px',
          'border-radius': '4px',
          'line-height': '45px',
          background: '#e7eaf1',
        }
      }
    },
    transitionName: {
      type: String,
      default: 'fade'
    }
  },
  data () {
    var password3 = (rule, value, callback) => {
      let password2 = this.passwordForm.password2
      if (password2 && password2 == value) {
        /*this.$message({
          type: 'warning',
          message: '起止时间不能大于结束时间！'
        })*/
        callback()
      } else {
        return callback(new Error('两次密码不一致！'));
      }
    };
    let password2 = (rule, value, callback) => {
      if (value.trim() == '' && value.length < 6) {
        return callback(new Error('密码不能小于6位数！'));
      } else {
        callback()
      }
    }
    return {
      tableData5: '',
      username: '',
      user_img,
      value1: 100,
      phone: "",
      retop: false,
      visible: false,
      interval: null,
      user: '',
      aplayer: '',
      musicsvg: true,
      audiolist: [],
      dialogFormVisiblePassword: false,
      dialogFormVisibleAddUser: false,
      formLabelWidth: '35%',
      name: this.$store.getters.oemName,
      companyname: this.$store.getters.companyname,
      passwordForm: {
        password1: '',
        password2: '',
        password3: '',
      },
      rules: {
        password1: [{ required: true, message: '请输入原密码', trigger: 'blur' }],
        password2: [{ required: true, validator: password2, trigger: 'blur' }],
        password3: [{ required: true, validator: password3, trigger: 'blur' }],
      },
      phone2: window.localStorage.getItem("username"),
      userForm: { phone: '', brandId: '' },
      options3: []
    }
  },
  components: {
    Breadcrumb,
    Hamburger,
    ThemePicker
  },
  computed: {
    roleId2 () {
      if (this.$store.getters.roleId >= 3) {
        return false
      } else
        return true
    },
  },
  created () {
    //this.getPhone()
    //  this.getBrand()


  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.handleScroll)
    if (this.interval) {
      clearInterval(this.interval)
    }
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll)
    this.getPhone()
  },
  methods: {
    addUserBtn () {
      this.dialogFormVisibleAddUser = true

    },
    getBrand () {
      this.$voteApi.getBrand().then(res => {
        if (res.code == 200) {

          let options = res.data.map(v => {
            v.label = v.name
            v.value = v.id
            return v
          })
          this.options3 = options
          console.log('brand', res.data, options)
        }
      })
    },
    message2 () {
      console.log(999)
    },
    dropdown () {
      let message1 = '<p>1.OEM账户管理修改为系统管理</p>' + '<p>2.系统管理新添黑名单管理、通道管理</p>'
      //  let close = '<p class="Iknow"><a>我知道了</a></p>'
      let message = message1

      this.$notify.info({
        title: '最新消息！',
        dangerouslyUseHTMLString: true,
        duration: 5000,
        message: message
      });

    },
    getPhone () {
      let phone = this.$store.getters.phone
      //let phone = window.localStorage.getItem("username")
      // var myphone = phone.substr(3, 4);
      // this.phone = phone.replace(myphone, "****");
      this.phone = phone

    },
    addUser () {
      let phone = this.userForm.phone
      let brandId = this.userForm.brandId
      if (this.$store.brandId) {
        if (!brandId) {
          this.$message({
            type: 'success',
            message: '请输入主体'
          })
          return
        }

      }
      console.log('this.userForm', this.userForm)
      this.$voteApi.addUserAdmin(phone, brandId).then(res => {
        if (res.code == 200) {
          this.dialogFormVisibleAddUser = false
          this.$message({
            type: 'success',
            message: '添加用户成功'
          })
        } else {
          this.$message({
            type: 'warning',
            message: res.message
          })
          this.dialogFormVisibleAddUser = false
        }
      })
    },

    ChangeThePassword () {
      //修改密码
      console.log('修改密码')
      this.$refs.passwordForm.validate(valid => {
        if (valid) {
          let oldPassword = this.passwordForm.password1
          let newPassword = this.passwordForm.password3
          this.$itemApi.updPsw(oldPassword, newPassword).then(response => {
        
            if (response.code = 200) {
              this.dialogFormVisiblePassword = false
              this.$refs.passwordForm.resetFields()
              this.$message({
                type: 'success',
                message: '您的密码已修改成功，请重新登录'
              })
              setTimeout(() => {
                this.$store.dispatch('FedLogOut').then(() => {
                  location.reload()
                })
              }, 2000)
            } else {
              this.$message({
                type: 'warning',
                message: response.message
              })
            }
          })
        }
      })


    },
    handleScroll () {
      //反回顶部
      this.visible = window.pageYOffset > this.visibilityHeight
    },
    backToTop () {
      const start = window.pageYOffset
      let i = 0
      this.interval = setInterval(() => {
        const next = Math.floor(this.easeInOutQuad(10 * i, start, -start, 500))
        if (next <= this.backPosition) {
          window.scrollTo(0, this.backPosition)
          clearInterval(this.interval)
        } else {
          window.scrollTo(0, next)
        }
        i++
      }, 16.7)
    },
    easeInOutQuad (t, b, c, d) {
      if ((t /= d / 2) < 1) return c / 2 * t * t + b
      return -c / 2 * (--t * (t - 2) - 1) + b
    },
    logout () {
      //退出登录
      setTimeout(function () {
        this.$store.dispatch('FedLogOut').then(() => {
          location.reload()
        })
      }.bind(this), 800)

    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.header_top {
  width: 100%;
  height: 50px;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #999999;
  z-index: 1003;
}

.el-menu--horizontal {
  border-bottom: none;
}

.navbar {
  height: 50px;
  background-color: #1c2438;
  line-height: 50px;
  border-radius: 0 !important;
  position: relative;
  .logo_img {
    height: 50px;
    position: absolute;
    left: 0;
    top: 0;
    padding-left: 1rem;
    img {
      border: none;
    }
    p {
      padding: 0;
      margin: 0;
      text-align: center;
      font-size: 1rem;
      color: #ffffff;
      cursor: default;
    }
  }
  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }
  .avatar-container {
    height: 50px;
    display: flex;
    justify-content: center;
    position: absolute;
    right: 50px;
    top: 0;
    .userPhone {
      color: #ffffff;
      margin-right: 1rem;
    }
    .managername {
      font-size: 16px;
      position: absolute;
      left: -100px;
      top: 0;
      color: #ffffff;
      max-width: 100px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      cursor: default;
    }
    .avatar-wrapper {
      float: right;
      cursor: pointer;
      margin-top: 5px;
      position: relative;
      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }
      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
      }
    }
  }
  .logo {
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: center;
    .tongji {
      color: #ffffff;
      p {
        padding: 0;
        margin: 0;
        text-align: center;
        font-size: 1.125rem;
        color: #ffffff;
        cursor: default;
      }
    }
  }
}
</style>

