// components/will-used/modal/index.js
const QR = require('../../../utils/qrcode.js')
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    show: {
      type: Boolean,
      value: true
    },
    code: String
  },
  ready () {
    const query = wx.createSelectorQuery().in(this)
    query.select('#qrcode').boundingClientRect(rect => {
      const url = `zkscan://delivery/coupon?couponNo=${this.data.code}`
      QR.api.draw(url, 'qrcode', rect.width, rect.height, this);
    }).exec() 
  },
  observers: {
    code (val) {
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
      
  },

  /**
   * 组件的方法列表
   */
  methods: {
    closeCode: function (e) {
      this.triggerEvent('close', e)
    },
    createQrCode: function (content, canvasId, cavW, cavH) {
      //调用插件中的draw方法，绘制二维码图片
     
      QR.api.draw(content, canvasId, cavW, cavH);
      this.canvasToTempImage(canvasId);
    },

    //获取临时缓存图片路径，存入data中
    canvasToTempImage: function (canvasId) {
      console.log(canvasId)
      let that = this;
      wx.canvasToTempFilePath({
        canvasId,   // 这里canvasId即之前创建的canvas-id
        success: function (res) {
          console.log('success')
          let tempFilePath = res.tempFilePath;
          console.log(tempFilePath);
          that.setData({       // 如果采用mpvue,即 this.imagePath = tempFilePath
            imagePath: tempFilePath,
          });
        },
        fail: function (res) {
          console.log('fail')
          console.log(res);
        }
      });
    }
  },
})
