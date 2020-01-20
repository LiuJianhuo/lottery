// pages/goods-theme/index.js
import ddk from '../../third-apis/ddk/index.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    total: -1,
    themeList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getThemeList()
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
  getThemeList (params = {}) {
    console.group('主题列表')
    console.log(params)
    ddk.theme.themeListGet(params).then(res => {
      const data = res.theme_list_get_response
      console.log(data)
      console.groupEnd()
      this.setData({
        themeList: data.theme_list
      })

    }).catch(err => {
      console.log(err)
      console.groupEnd()
    })
  },
  // 处理主题项点击
  handleThemeItemTap (e) {
    wx.navigateTo({
      url: '/pages/goods-theme-detail/index',
      success: function(res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPage', { theme: e.currentTarget.dataset.theme })
      }
    })
  }
})