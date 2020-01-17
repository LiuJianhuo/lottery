// components/Used/index.js
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
    login: false,
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
	},

	/**
	 * 组件的方法列表
	 */
	methods: {

	}
})
