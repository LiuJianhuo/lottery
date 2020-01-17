// pages/login-mobile/index.js
const util = require('../../utils/util.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    time: 60,
    countdown: false,
    showClearBtn: false,
    formData: {
      mobile: '',
      verifyCode: ''
    },
    activedBtn: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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
  formSubmit (e) {
    wx.redirectTo({
      url: '/pages/index/index',
    })
    const {mobile, verifyCode} = e.detail.value
    if (!util.checkMobile(mobile)) {
      wx.showToast({
        title: '请先填写正确的手机号',
        icon: 'none'
      })
      return
    }
    if (!verifyCode) {
      wx.showToast({
        title: '验证码不能为空',
        icon: 'none'
      })
      return
    }
    wx.showLoading({
      title: '',
      mask: true
    })
    // 手机登录验证
    app.request.post({
      url: '/api/user/wechat/mini/lack/draw/login',
      data: {
        verifyCode,
        mobile
      }
    }).then(data => {
      app.globalData.userInfo = data
      wx.setStorageSync('userInfo', data)
      app.request.setPostHeader({token: data.token}) // 设置post请求携带得token
      wx.switchTab({
        url: '/pages/index/index'
      })
    }).catch(err => {
      wx.hideLoading()
      wx.showToast({
        title: err.errMsg,
        icon: 'none',
        duration: 1800,
        mask: true
      })
    })
  },
  getVerifyCodeTap () { // 获取验证码
    const mobile = this.data.formData.mobile
    console.log(mobile)
    if (!util.checkMobile(mobile)) {
      wx.showToast({
        title: '请先填写正确的手机号',
        icon: 'none'
      })
      return
    }

    this.setData({
      countdown: true
    })

    // 再次获取验证码的倒计时
    const timeId = setInterval(() => {
      if (this.data.time === 0) {
        clearInterval(timeId)
        this.setData({
          time: 60,
          countdown: false
        })
        return
      }
      this.setData({
       time: this.data.time - 1
      })
    }, 1000)

    // 请求获取验证码
    app.request.post({
      url: '/api/user/send/verifycode',
      data: {
        mobile,
        verifyType: 5
      }
    }).then(data => {
      console.log(data)
      wx.showToast({
        title: data,
        icon: 'none',
        duration: 1600
      })
    }).catch(err => {
      wx.showToast({
        title: err.errMsg,
        icon: 'none',
        duration: 2000,
        mask: true
      })
      clearInterval(timeId)
      this.setData({
        countdown: false
      })
    })
  },
  // 清空手机输入框的值
  clearMobileInputTap () {
    console.log(this.data.formData)
    if (!this.data.formData.mobile) {
      return
    }
    this.setData({
      formData: Object.assign({}, this.data.formData, { mobile: '' }),
      showClearBtn: false,
      activedBtn: false
    })
    console.log(this.data.formData)
  },
  // 手机号输入事件
  mobileInput (e) { 
    console.log(e.detail.value)
    const val = e.detail.value
    this.setData({
      showClearBtn: val !== '',
      formData: Object.assign({}, this.data.formData, { mobile: val })
    })

    this.setData({
      activedBtn: val != '' && this.data.formData.verifyCode != ''
    })
  },
  verifyCodeInput (e) {
    const val = e.detail.value
    this.setData({
      formData: Object.assign({}, this.data.formData, { verifyCode: val })
    })
    this.setData({
      activedBtn: val != '' && this.data.formData.mobile != ''
    })
  }
})