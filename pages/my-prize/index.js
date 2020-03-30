// pages/login/index.js

const app = getApp()

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
    login: false,
    userInfo: null,
    willUsePrizes: [],
    usedPrizes: [],
    expiredPrizes: [],
    code: null
  },
  /**    * 点击导航栏
   */
  onNavBarTap: function(event) {
    // 获取点击的navbar的index
    let navbarTapIndex = event.currentTarget.dataset.navbarIndex
    // 设置data属性中的navbarActiveIndex为当前点击的navbar
    if (navbarTapIndex !== this.data.navbarActiveIndex) {
      this.setData({
        navbarActiveIndex: navbarTapIndex
      })
      console.log('====' + navbarTapIndex)
      // 重新拉起信息
      if (app.getToken()) this.getMyPrizes(navbarTapIndex+1)
    }
    
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
    this.setData({
      login: app.getToken() !== null,
      userInfo: app.globalData.userInfo
    })
    app.registerCpt({ name: 'mask', instance: this.selectComponent('#mask') })
    app.registerCpt({ name: 'modal', instance: this.selectComponent('#modal') })
    
    // 用户登录，加载用户相关得快递金数据
    if (app.getToken()) {
      // 1 待使用 2 已使用 3 已失效
      this.getMyPrizes(1)
      this.getMyPrizes(2)
      this.getMyPrizes(3)
    }
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
  showCode: function(e) {
    console.log(e.detail.target.dataset.couponno)
    this.setData({
      showMask: true,
      showCode: true,
      code: e.detail.target.dataset.couponno
    })
  },
  closeCode: function (){
    this.setData({
      showMask: false,
      showCode: false
    })
    // 重新拉起待使用数据
    this.getMyPrizes(1)
  },
  getup: function () {
    wx.redirectTo({
      url: '../login/index',
    })
  },
  getout: function () {
    const self = this
    wx.showModal({
      title: '',
      content: '要这么残忍离开吗？',
      confirmText: '取消',
      confirmColor: '#FF2453',
      cancelText: '确认',
      cancelColor: '#999999',
      success: function (res) {
        if (res.cancel) {
          // 用户点击确定退出账号，清除账号信息，页面转到未登录状态
          app.clearLoginStatus()
          self.onShow()
          app.request.restoreDefault()
        } 
      }
    })
  },
  // 再等等
  handleWait () {
    app.mask.hide()
    app.modal.hide()
    // this.setData({
    //   showMask: false,
    //   showCode: false
    // })
  },
  getMyPrizes (status) {
    // status 1 待使用 2 已使用 3 已失效
    console.log('中奖状态'+status)
    app.request.post({
      url: 'api/express/gold/mini/luck/draw/order/get',
      data: {
        status
      }
    }).then(data => {
      console.log('==============', status, '===', data)
      if (data) {
        // 格式化日期
        data = data.map(item => {
          const startTime = item.startTime
          item.startTime = item.startTime.split(' ')[0].replace(/-/g, '/')
          item.endTime = item.endTime.split(' ')[0].replace(/-/g, '/')
          // item.startTime = item.startTime.replace(/-/g, '/')
          // item.endTime = item.endTime.replace(/-/g, '/')
          return item
        })
      }
      console.log(data)
      switch (status) {
        case 1:
          this.setData({
            willUsePrizes: data
          })
          break
        case 2:
          this.setData({
            usedPrizes: data
          })
          break
        case 3: 
          this.setData({
            expiredPrizes: data
          })
          break
      }
    }).catch(err => {
      wx.showToast({
        title: err.errMsg,
        icon: 'none'
      })
    })
  }
})