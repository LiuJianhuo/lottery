// pages/login/index.js
const app = getApp()
const { request } = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('login page on load ...')
    app.activeLoginStatus(true)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    app.userInfoReadyCallback = res => {
      console.log('login get user info r')
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  },
  getPhoneNumber (e) {
    
    // 获取号码失败
    if (e.detail.errMsg.indexOf('ok') < 0) {
      wx.showToast({
        title: '手机授权失败',
        icon: 'none'
      })
      return
    }

    wx.showLoading({
      title: '授权中',
      mask: true
    })
    let openId = app.getOpenId()
    if (openId) {
      authByWxMobile()
    } else {
      // 激活登录态
      app.activeLoginStatus().then(data => {
        openId = data
        authByWxMobile()
      }).catch(err => {
        wx.hideLoading()
        wx.showToast({
          title: err.errMsg,
          icon: 'none'
        })
      })
    }

    // 微信手机授权
    function authByWxMobile() {
      app.request.post({
        url: 'api/user/wechat/mini/lack/draw/mobile.do',
        data: {
          iv: e.detail.iv,
          encryptedData: e.detail.encryptedData,
          openId
        }
      }).then(data => {
        const { displayName, mobile, openId, step, tbGrant, token, nickName, headUrl } = data
        app.request.setPostHeader({ token: data.token }) // 设置post请求携带得token
        app.globalData.userInfo = data
        wx.setStorageSync('userInfo', data)
        wx.hideLoading()
        wx.switchTab({
          url: '/pages/index/index',
        })
      }).catch(err => {
        wx.hideLoading()
        wx.showToast({
          title: err.errMsg,
          icon: 'none'
        })
        // 重新授权
        app.activeLoginStatus(true)
      })
    }
  }
})