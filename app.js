//app.js
const {request} = require('./utils/util.js')

App({
  onLaunch: function () {
    // 注入request对象
    this.request = request
    const self = this
 
    // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
  

    // 登录
    wx.login({
      success: res => {
        console.log(res.code)
        wx.setStorageSync('code', res.code)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        request.post({
          url: '/api/user/wechat/mini/lack/draw/auth.do',
          data: {
            code: res.code
          }
        }).then(data => {
          const openId = data
          self.globalData.openId = openId
          wx.setStorageSync('openid', openId)
        }).catch(err => {
          console.log(err)
        })
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    console.log('app launch end ...')
  },
  globalData: {
    userInfo: null,
    token: null,
    openId: null,
    token: null
  }
})