// pages/login/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbarActiveIndex: 0,
    navbarTitle: [
      "待使用",
      "已使用",
      "已失效",
    ],
    showPopup: false,
    showMask: false,
    showCode: false,
    login: false
  },
  attached() {
    // const token = wx.setStorageSync(key, data)
    const token = wx.getStorageSync('token')
    if (token) {
      this.setData({
        login: true
      })
    }
  },

  /**    * 点击导航栏
   */
  onNavBarTap: function(event) {
    // 获取点击的navbar的index
    let navbarTapIndex = event.currentTarget.dataset.navbarIndex
    // 设置data属性中的navbarActiveIndex为当前点击的navbar
    this.setData({
      navbarActiveIndex: navbarTapIndex

    })

  },

  /**
   * 
   */
  onBindAnimationFinish: function({
    detail
  }) {
    // 设置data属性中的navbarActiveIndex为当前点击的navbar
    this.setData({
      navbarActiveIndex: detail.current
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  popup: function() {
    this.setData({
      showPopup: true,
      showMask: true
    })
  },
  closePopup: function() {
    console.log('close')
    this.setData({
      showPopup: false,
      showMask: false
    })
  },
  showCode: function() {
    this.setData({
      showMask: true,
      showCode: true
    })
  },
  closeCode: function (){
    this.setData({
      showMask: false,
      showCode: false
    })
  },
  getup: function () {
    wx.showModal({
      title: '警告',
      content: '您确定要退出登录么？',
      confirmText: '退出',
      cancelText: '我再看看',
      success: function (res) {
        if (res.confirm) {
          // 用户点击确定退出账号，清除账号信息，页面转到未登录状态

        } else {
        }
      }
    })
  },
  getout: function () {
    wx.redirectTo({
      url: '../login/index',
    })
  }
})