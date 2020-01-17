
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item: {
      type: Object,
      value: {}
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
    handleGoodsItemTap (e) {
      this.triggerEvent('itemTap', e.currentTarget.dataset.item)
      console.log(e.currentTarget.dataset.item)
    }
  }
})
