// components/model/index.js
const app = getApp()

Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },
  options: {
    multipleSlots: true
  },
  /**
   * 组件的初始数据
   */
  data: {
    show: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    show () {
      if (app.mask) {
        app.mask.show()
      }
      this.setData({
        show: true
      })
    },
    hide () {
      if (app.mask) {
        app.mask.hide()
      }
      this.setData({
        show: false
      })
    },
    ok(e) {
      this.triggerEvent('ok', e)
      this.hide()
    },
    cancel(e) {
      this.triggerEvent('cancel', e)
      this.hide()
    }
  }
})
