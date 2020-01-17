// pages/test-api/index.js
import { pddParamsSign } from '../../utils/third-sign.js'
import ddk from '../../third-apis/ddk/index.js'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    sortType: ddk.data.sortType,
    tabs: ["销量", "价格", "佣金"],
    activedNavItem: 0,
    isSortByUp: false,
    goodsList: [],
    searchForm: {
      page: 1,
      page_size: 15,
      sort_type: 0, // 默认排序
      with_coupon: true,
      keyword: '零食'
    },
    total: -1,
    pageObj: {
      page: 1,
      page_size: 15
    },
    showNoMoreData: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('load')
  },
  // nav改变
  handleNavChange: function (e) {
    const currentActivedItem = parseInt(e.currentTarget.id)
    let isSortByUp = false
    const lastActivedItem = this.data.activedNavItem // 上次激活的项
    let sortTypeVal = currentActivedItem // 排序值
    // 0 默认排序
    // nav分排序和不排序， 对于排序nav项，默认降序,
    // 对于排序nav项，每次点击改变排序状态 isSortByUp
    
    // 0 不排序, 其他排序
    if (currentActivedItem === 0) {
      isSortByUp = false
    } else {
      if (lastActivedItem === currentActivedItem) {
        isSortByUp = !this.data.isSortByUp
        sortTypeVal = isSortByUp ? (sortTypeVal - 1) : sortTypeVal // 升序再原来基础上减一
      }
    }
    this.setData({
      activedNavItem: currentActivedItem,
      isSortByUp: isSortByUp
    })
    // 重新从首页开始
    console.log('===')
    console.log(typeof this.data.pageObj)
    console.log(this.data.pageObj)
    const searchForm = Object.assign(this.data.searchForm, this.data.pageObj, {
      sort_type: sortTypeVal
    })
    // 搜索商品
    this.searchGoods(searchForm)
  },
  // 商品查询
  searchGoods (params={}) {
    console.log(params)
    ddk.goods.goodsSearch(params).then(res => {
      const data = res.goods_search_response
      console.log(res)
      const goodsList = params.page === 1 ? [] : this.data.goodsList
      goodsList.push(...data.goods_list)
      this.setData({
        goodsList: goodsList,
        total: data.total_count
      })
      // 若果已全部加载，在显示已到底
      if (params.page * params.page_size > data.total_count) {
        this.setData({
          showNoMoreData: true
        })
      }
      // 回到顶部，若果是第一页
      if (params.page === 1) {
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
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.searchGoods(this.data.searchForm)
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
    searchForm.page = searchForm.page + 1
    this.setData(
      searchForm
    )
    this.searchGoods(searchForm)
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
  }
})