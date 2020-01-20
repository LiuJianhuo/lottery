// pages/goods-theme-detail/index.js
import ddk from '../../third-apis/ddk/index.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    const eventChannel = this.getOpenerEventChannel()
    // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
    eventChannel.on('acceptDataFromOpenerPage', data => {
      console.group('主题详情')
      console.log(data)
      console.groupEnd()
      this.getGoodsThemeDetail({
        theme_id: data.theme.id
      })
    })
    
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
  getGoodsThemeDetail (params) {
    ddk.theme.themeGoodsSearch(params).then(res => {
      const data = res.theme_list_get_response
      console.log(data)
      this.setData({
        goodsList: data.goods_list
      })
    }).catch(err => { 
      wx.showToast({
        title: err.errMsg,
        icon: 'none'
      })
    })
  },
  // 商品点击
  handleGoodsItemTap (e) {
    const item = e.detail
    wx.navigateTo({
      url: '/pages/goods-detail/index',
      success: res => {
        // 向被打开的页面传递数据
        res.eventChannel.emit('acceptDataFromOpenerPage', { goodsItem: item })
      }
    })
  }
})