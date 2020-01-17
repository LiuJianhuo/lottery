// components/raffle-ticket/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    ticket: {
      type: Object,
      value: {
        id: 555,
        amount: "3.3",
        status: 0,
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    bgColorClass: 'bg-color-one'
  },

  /**
   * 组件的方法列表
   */
  methods: {

  },
  ready () {
    const bgColorClasses = ['bg-color-one', 'bg-color-two', 'bg-color-three', 'bg-color-four']
    const amount = this.data.ticket.amount
    const model = amount % 5
    this.setData({
      bgColorClass: bgColorClasses[model]
    })
  }
})
