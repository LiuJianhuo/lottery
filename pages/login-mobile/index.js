// pages/login-mobile/index.js
const util = require('../../utils/util.js')

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
    }
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  formSubmit (e) {
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
  },
  // 清空手机输入框的值
  clearMobileInputTap () {
    console.log(this.data.formData)
    if (!this.data.formData.mobile) {
      return
    }
    this.setData({
      formData: Object.assign({}, this.data.formData, { mobile: '' }),
      showClearBtn: false
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
  }
})