// pages/goods-top-list/index.js
import ddk from '../../third-apis/ddk/index.js'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    sortType: ddk.data.sortType,
    activedNavItem: 1,
    isSortByUp: false,
    goodsList: [],
    searchForm: {
      offset: 0,
      limit: 15
    },
    total: -1,
    pageObj: {
      offset: 0,
      limit: 15
    },
    showNoMoreData: false,
    _navList: [{ value: 1, label: '实时热销榜' }, { value: 2, label: '实时收益榜'}]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('load')
  },
  // nav改变
  handleNavChange: function (e) {
    const currentActivedItem = e.currentTarget.dataset.id

    this.setData({
      activedNavItem: currentActivedItem
    })
    // 重新从首页开始
    console.log('===')
    console.log(typeof this.data.pageObj)
    console.log(this.data.pageObj)
    const searchForm = Object.assign(this.data.searchForm, this.data.pageObj, {
      sort_type: currentActivedItem
    })
    // 获取top商品
    this.getTopGoodsList(searchForm)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getTopGoodsList(this.data.searchForm)
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
    const searchForm = this.data.searchForm
    // 判断是否可有更多数据
    if (this.data.showNoMoreData) {
      this.setData({
        showNoMoreData: false
      })
    }
    // 去加载更多
    // searchForm.page = searchForm.page + 1
    searchForm.offset = searchForm.offset + searchForm.limit
    this.setData(
      searchForm
    )
    this.getTopGoodsList(searchForm)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

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
  },
  // 获取爆款排行商品
  getTopGoodsList (params) {
    ddk.goods.topGoodsListQuery(params).then(res => {
      console.group('搜索爆款商品')
      console.log(params)
      console.log(res)
      console.groupEnd()
      const { total, list } = res.top_goods_list_get_response
      // 若果请求的是不是第一页，则追加到列表中
      const goodsList = params.offset === 0 ? [] : this.data.goodsList
      goodsList.push(...list)
      this.setData({
        goodsList,
        total
      })
      // 若果已全部加载，在显示已到底
      if (params.page * params.page_size > total) {
        this.setData({
          showNoMoreData: true
        })
      }
      // 回到顶部，若果是第一页
      if (params.offset === 0) {
        wx.pageScrollTo({
          scrollTop: 0,
          duration: 0
        })
      }
    }).catch(err => {
      console.log(err)
      if (err.errCode === 10000) {
        // 参数错误，没有数据可在请求,已超过请求限制条数
        this.setData({
          showNoMoreData: true
        })
      } else {
        wx.showToast({
          title: err.errMsg,
          icon: 'none'
        })
      }
    })
  }
})