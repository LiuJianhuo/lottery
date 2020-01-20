// pages/test-animate/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    menuList: [1, 2, 3, 4, 5, 6],
    scrollLeft: 0
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
    // this._animate()
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

  handleScroll (e) {
    console.log(e)
    const { scrollWidth, scrollLeft } = e.detail
    this._lastScrollLeft = scrollLeft
  },
  _animate () {
    wx.createSelectorQuery().select('#scroller').fields({
      // scrollOffset: true,
      // size: true,
    }, (res) => {
      this.animate('.avatar', [{
        borderRadius: '0',
        borderColor: 'red',
        transform: 'scale(1) translateY(-20px)',
        offset: 0,
      }, {
        borderRadius: '25%',
        borderColor: 'blue',
        transform: 'scale(.65) translateY(-20px)',
        offset: .5,
      }, {
        borderRadius: '50%',
        borderColor: 'blue',
        transform: `scale(.3) translateY(-20px)`,
        offset: 1
      }], 2000, {
        scrollSource: '#scroller',
        timeRange: 2000,
        startScrollOffset: 0,
        endScrollOffset: 85,
      })
    }).exec()
    wx.createSelectorQuery().select("#scrollMenu").fields({
      scrollOffset: true,
      size: true,
    }, (res) => {
      // 绑定滚动元素
      const scrollTimeline = {
        scrollSource: '#scrollMenu',
        orientation: 'horizontal',
        timeRange: 1000,
        startScrollOffset: (210 * 4 - res.width) + 20,
        endScrollOffset: res.scrollWidth - res.width,
      }
      this.animate('#transfrom', [{
        offset: 0,
        width: '0px',
      }, {
        offset: 1,
        width: '30px',
      }], 1000, scrollTimeline)
    }).exec()
  },
  handleTouchend () {
    console.log(this._lastScrollLeft)
    console.log( 210 * 4 - wx.getSystemInfoSync().windowWidth)
    if (this._lastScrollLeft > 210 * 4 - wx.getSystemInfoSync().windowWidth) {
      this.setData({
        scrollLeft: 210 * 4 - wx.getSystemInfoSync().windowWidth
      })
    }
  }
})