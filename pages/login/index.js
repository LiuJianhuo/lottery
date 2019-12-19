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

  },
  getPhoneNumber (e) {
    
    // 获取号码失败
    if (e.detail.errMsg.indexOf('ok') < 0) {
      wx.showToast({
        title: '登录失败',
        icon: 'none'
      })
      return
    }
    console.log(e.detail)
    console.log(e.detail.errMsg)
    console.log(e.detail.iv)
    console.log(e.detail.encryptedData)
    console.log(e.detail.errMsg.indexOf('ok') > -1)
    // app.request.get({
    //   url: 'mobile',
    //   data: {
    //     iv: e.detail.iv,
    //     encryptedData: e.detail.encryptedData
    //   }
    // })
    
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