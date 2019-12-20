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
    console.log('分享')
    return {
      title: '抽奖',
      path: '/pages/index/index?token=1111'
    }
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
    console.log(app.globalData.openId)
    wx.showLoading({
      title: '授权中',
      mask: true
    })
    app.request.post({
      url: 'api/user/wechat/mini/lack/draw/mobile.do',
      data: {
        iv: e.detail.iv,
        encryptedData: e.detail.encryptedData,
        openId: app.globalData.openId
      }
    }).then(data => {
      const {displayName, mobile, openId, step, tbGrant, token} = data
      console.log(token)
      wx.setStorageSync('token', token)
      app.globalData.token = token
      wx.hideLoading()
    }).catch(err => {
      wx.showToast({
        title: err.errMsg,
        icon: 'none'
      })
    })
    
  },
  getUserInfo (info) {
    wx.login({
      success (res) {
        console.log('login success')
        console.log(res.code)
      },
      fail () {
        console.log('login fail')
      }
    })  
    console.log(info)
  },
  testTap () {
    request.get('login').then(res => {
      console.log(res.data)
    }).catch(err => {
      console.log(err)
    })
  }
})