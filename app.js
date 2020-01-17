//app.js
const {request} = require('./utils/util.js')
const ald = require('./utils/ald-stat.js') // 引入阿拉丁
App({
  onLaunch: function () {
    const self = this
    const userInfo = wx.getStorageSync('userInfo')
    const openId = wx.getStorageSync('openId')
    this.globalData.userInfo = userInfo
    this.globalData.openId = openId
    if (openId) {
      wx.aldstat.sendOpenid(openId) // 阿拉丁注入openid
    }
    // 注入request对象
    this.request = request
    if (userInfo && userInfo.token) request.setPostHeader({token : userInfo.token})

    this.activeLoginStatus(true)
  },
  globalData: {
    userInfo: null,
    openId: null,
    wxUserInfo: null,
    firstUsePrize: null,
    webSrc: ''
  },
  getToken () { // 获取token
    const userInfo = this.globalData.userInfo ? this.globalData.userInfo : wx.getStorageSync('userInfo')
    return userInfo ? userInfo.token : null
  },
  getOpenId () { // 获取openId
    return this.globalData.openId ? this.globalData.openId : wx.getStorageSync('openId')
  },
  clearLoginStatus() { // 清空登录状态
    this.globalData.userInfo = null
    this.globalData.openId = null
    wx.setStorageSync('userInfo', null)
    wx.setStorageSync('openId', null)
  },
  activeLoginStatus (force=false) { // 激活登录态, 并激活成功后保存openId信息
    let openId = this.globalData.openId ? this.globalData.openId : wx.getStorageSync('openId')
    const self = this
    // 激活登录态
    function wxlogin() {
      return new Promise((resolve, reject) => {
        wx.login({
          success: res => {
            // 发送 res.code 到后台换取 openId
            request.post({
              url: '/api/user/wechat/mini/lack/draw/auth.do',
              data: {
                code: res.code
              }
            }).then(data => {
              wx.aldstat.sendOpenid(data) // 阿拉丁注入openid
              openId = data
              self.globalData.openId = openId
              wx.setStorageSync('openId', openId)
              resolve(openId)
            }).catch(err => {
              console.log('wx.login失败', err.errMsg)
              reject(err)
            })
          }
        })
      })
    }
    // openId不存在或登录态失效，需激活登录态
    if (!openId || force) {
      console.log('openid不存在，激活登录态')
      return wxlogin()
    } else {
      return new Promise((resolve, reject) => {
        wx.checkSession({
          success () {
            console.log('session success')
            resolve(openId)
          },
          fail() {
            console.log('session error')
            console.log('openid存在但session_key已失效，激活登录态')
            wxlogin().then(openId => resolve(openId)).catch(err => reject(err))
          }
        })
      })
    }
  },
  isFirstUsePrize() { // 第一次使用
    const self = this
    return new Promise((resolve, reject) => {
      if (!this.getToken()) {
        reject({errMsg: '请先登录'})
      } else if (this.globalData.firstUsePrize !== null) {
        resolve(this.globalData.firstUsePrize)
      } else {
        this.request.post({
          url: 'api/express/gold/mini/luck/draw/check/first/use'
        }).then(data => {
          resolve(data)
          this.globalData.firstUsePrize = data
        }).catch(err => reject(err))
      }
    })
  },
  registerCpt({name, instance}) {
    // 注册组件
    this[name] = instance
  },
  authSetting({ scope, guideText }) { // 提示用户授权或引导用户授权
    return new Promise((resolve, reject) => {
      // 验证权限
      wx.getSetting({
        success(res) {
          // 1.从未授权过可直接调用
          // 2.曾同意授权可直接调用
          // 3.曾拒绝过授权，引导授权
          if (res.authSetting[scope] === undefined) {
            resolve()
          } else if (res.authSetting[scope]) {
            resolve()
          } else {
            wx.showModal({
              title: '温馨提示',
              content: guideText,
              confirmColor: '#FF2453',
              success(res) {
                if (res.confirm) {
                  wx.openSetting({
                    scope,
                    success() {
                      resolve()
                    },
                    fail() {
                      reject({ errMsg: 'deny' })
                    }
                  })
                } else {
                  reject({ errMsg: 'deny' })
                }
              }
            })
          }
        },
        fail(err) {
          reject(err)
        }
      })
    })

  }
})