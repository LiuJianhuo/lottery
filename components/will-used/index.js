// components/will-used/index.js
const app = getApp()
Component({
	/**
	 * 组件的属性列表
	 */
	properties: {
    login: {
      type: Boolean,
      value: false
    },
    prizes: {
      type: Array,
      value: []
    }
	},

	/**
	 * 组件的初始数据
	 */
	data: {
    lists: [{
      expressName: "测试7",
      amount: "2.00",
      couponNo: "658625871984332800",
      startTime: "2019-12-23 11:04:03",
      endTime: "2019-12-28 11:04:03"
    },
    {
      expressName: "测试7",
      amount: "2.00",
      couponNo: "658625871984332800",
      startTime: "2019-12-23 11:04:03",
      endTime: "2019-12-28 11:04:03"
      },
      {
        expressName: "测试7",
        amount: "2.00",
        couponNo: "658625871984332800",
        startTime: "2019-12-23 11:04:03",
        endTime: "2019-12-28 11:04:03"
      },
      {
        expressName: "测试7",
        amount: "2.00",
        couponNo: "658625871984332800",
        startTime: "2019-12-23 11:04:03",
        endTime: "2019-12-28 11:04:03"
      }
    ],
    showCode: false
	},
  ready() {
  },
 
	/**
	 * 组件的方法列表
	 */
	methods: {
    code: function (e) {
      // 使用快递金，第一次可以直接使用，不是第一次徐到app中使用
      app.isFirstUsePrize().then(firstUse => {
        console.log(firstUse)
        if (firstUse === true) { 
          this.setData({
            showCode: true
          })
          this.triggerEvent('showCode', e)
        } else {
          // wx.navigateTo({
          //   url: 'https://a.app.qq.com/o/simple.jsp?pkgname=com.zhongbai.wengweng',
          // })
          app.modal.show()
          // wx.showModal({
          //   title: '',
          //   content: '再次使用快递金需要前往蜜蜂嗡嗡\r\napp使用哦',
          //   confirmColor: '#FF2453',
          //   confirmText: '前往下载',
          //   cancelColor: '#999999',
          //   cancelText: '再等等',
          //   success (res) {
          //     if (res.confirm) {
          //       wx.navigateTo({
          //         url: 'https://a.app.qq.com/o/simple.jsp?pkgname=com.zhongbai.wengweng',
          //       })
          //     }
          //   }
          // })
        }
      }).catch(err => {
        console.log(err)
      })
      
    },
  
    closeCode: function () {
      console.log('close')
      this.setData({
        showCode: false
      })
    }
    
	}
})
