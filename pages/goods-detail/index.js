// pages/goods-detail/index.js
import ddk from '../../third-apis/ddk/index.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsItem: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const eventChannel = this.getOpenerEventChannel()
    // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
    if (eventChannel.on) {
      eventChannel.on('acceptDataFromOpenerPage', (data) => {
        this.setData({
          goodsItem: data.goodsItem
        })
        this.getGoodsDetail({
          goods_id_list: `[${data.goodsItem.goods_id}]`
        })
      })
    } else {
      const goodsId = 115412233
      this.getGoodsDetail({
        goods_id_list: `[${goodsId}]`
      })
    }
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
  handleGoBackTap () {
    wx.navigateBack({
      complete: (res) => {},
    })
  },
  getGoodsDetail (params) {
    // 8815386316
    ddk.goods.goodsDetail(params).then(res => {
      const goodsDetails = res.goods_detail_response.goods_details
      console.log(goodsDetails)
      if (goodsDetails.length > 0) {
        this.setData({
          goodsItem: goodsDetails[0]
        })
      }
    })
  }
})