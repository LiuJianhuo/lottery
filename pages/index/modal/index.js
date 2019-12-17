// pages/index/modal/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    content: {
      type: String,
      value: ''
    },
    btnName: {
      type: String,
      value: '确定'
    },
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
  lifeTimes: {
    attached: function () {
      console.log(this + 'ee')
    }
  },
  ready: function () { 
    console.log(this)
  },
  pageLifetimes: {
    show: function () {
      console.log(this + 'ee')
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    okTap (e) {
      console.log('tap')
      this.triggerEvent('okTap', e)
    }
  }
})

