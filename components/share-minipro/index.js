// components/share-miniproject/index.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    show: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },
  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show: function () { 
     
     },
    hide: function () { console.log('page hide') },
    resize: function () { console.log('page resize') },
  },
  ready () {
    const ctx = wx.createCanvasContext('shareMinipro', this)
    wx.createSelectorQuery().in(this).select('#shareMinipro').boundingClientRect(rect =>{
      const width = rect.width
      const height = rect.height
      const ctx = wx.createCanvasContext('shareMinipro', this)
      ctx.drawImage('../../image/share-pic.jpg', 0, 0, width, height)
      ctx.stroke()
      ctx.draw(true)
    }).exec()
  },
  /**
   * 组件的方法列表
   */
  methods: {
    close (e) {
      this.triggerEvent('close', e)
    }
  }
})
