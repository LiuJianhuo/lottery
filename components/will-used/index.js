// components/will-used/index.js
Component({
	/**
	 * 组件的属性列表
	 */
	properties: {
    login: {
      type: Boolean,
      value: false
    }
	},

	/**
	 * 组件的初始数据
	 */
	data: {
    lists: [{
      id: 1,
      img: '../../image/wil.png',
      amount: '2.20',
      title: '中通快递抵用金',
      date: '2020/01/01'
    },
    {
      id: 11,
      img: '../../image/wil.png',
      amount: '9.90',
      title: '中通快递抵用金',
      date: '2020/01/01'
      },
      {
        id: 2,
        img: '../../image/wil.png',
        amount: '9.90',
        title: '中通快递抵用金',
        date: '2020/01/01'
      },
      {
        id: 3,
        img: '../../image/wil.png',
        amount: '9.90',
        title: '中通快递抵用金',
        date: '2020/01/01'
      },
      {
        id: 4,
        img: '../../image/wil.png',
        amount: '9.90',
        title: '中通快递抵用金',
        date: '2020/01/01'
      },
      {
        id: 5,
        img: '../../image/wil.png',
        amount: '9.90',
        title: '中通快递抵用金',
        date: '2020/01/01'
      },
      {
        id: 6,
        img: '../../image/wil.png',
        amount: '9.90',
        title: '中通快递抵用金',
        date: '2020/01/01'
      },
      {
        id: 7,
        img: '../../image/wil.png',
        amount: '9.90',
        title: '中通快递抵用金',
        date: '2020/01/01'
      },
      {
        id: 8,
        img: '../../image/wil.png',
        amount: '9.90',
        title: '中通快递抵用金',
        date: '2020/01/01'
      },
      {
        id: 9,
        img: '../../image/wil.png',
        amount: '9.90',
        title: '中通快递抵用金',
        date: '2020/01/01'
      },
      {
        id: 10 ,
        img: '../../image/wil.png',
        amount: '9.90',
        title: '中通快递抵用金',
        date: '2020/01/01'
      }
    ],
    showCode: false
	},

	/**
	 * 组件的方法列表
	 */
	methods: {
    code: function (e) {
      this.setData({
        showCode: true
      })
      this.triggerEvent('showCode', e)
    },
    closeCode: function () {
      console.log('close')
      this.setData({
        showCode: false
      })
    }
    
	}
})
