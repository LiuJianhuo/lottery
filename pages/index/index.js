//index.js
//获取应用实例
const app = getApp()
const lotteryItemSteps = [0, 1, 2, 5, 8, 7, 6, 3] // 抽奖项跳转步骤

Page({

  /**
   * 页面的初始数据
   */
  data: {
    prizes: [{
        id: 1,
        title: '1元快递金',
        amount: 1,
        img: '../../image/yiyuan.png'
      },
      {
        id: 2,
        amount: 0,
        title: '谢谢参与'
      },
      {
        id: 3,
        amount: 2,
        title: '2元快递金',
        img: '../../image/eryuan.png'
      },
      {
        id: 4,
        title: '5元快递金',
        amount: 5,
        img: '../../image/wuyuan.png'
      },
      {
        id: 5,
        title: '次数：'
      },
      {
        id: 6,
        title: '3元快递金',
        amount: 3,
        img: '../../image/sanyuan.png'
      },
      {
        id: 7,
        amount: 0,
        title: '谢谢参与'
      },
      {
        id: 8,
        title: '10元快递金',
        amount: 10,
        img: '../../image/shiyuan.png'
      },
      {
        id: 9,
        amount: 0,
        title: '谢谢参与'
      },
    ],
    isBgOne: true,
    timeId: null,
    activedIndex: -1,
    lastIndex: -1,
    lotteryEnd: true,
    lotteryTimes: 0,
    showWinModal: false, //显示得奖的模态框
    showNoWinModal: false, //显示未得奖的模态框,
    showMask: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    const timeId = setInterval(() => {
      this.setData({
        isBgOne: !this.data.isBgOne,
      });
    }, 200);
    this.data.timeId = timeId;
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    if (this.data.timeId) {
      clearInterval(this.data.timeId)
    }
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function({from}) {
    // 通过按钮点击的分享
    if (from === 'menu') {
      console.log('分享成ee功')
    }
  },
  prizeEnd (prizeItem) {
    // 抽奖结束
    const self = this
    const amount = prizeItem.amount
    if (amount === 0) {
      wx.showModal({
        showCancel: false,
        content: '很遗憾～\r\n你离中奖只有一步之遥\r\n发送给朋友可获取更多抽奖机会',
        confirmText: '好的',
        confirmColor: '#FF2453',
        success () {
        //   console.log('ee')
          self.setData({
            lotteryEnd: true
          })
        }
      })
    } else {
      wx.showModal({
        showCancel: false,
        content: '恭喜!\r\n获得' + prizeItem.title,
        confirmText: '去领取',
        confirmColor: '#FF2453',
        success() {
          self.setData({
            lotteryEnd: true
          })
        }
      })
    }
  },
  prizeStartTap(e) {
    // 抽奖开始， 不是抽奖按钮触发或者抽奖中还未结束则不跳出，不进行抽奖
    if (e.currentTarget.dataset.index !== 4) return;
    if (!this.data.lotteryEnd) return;
  
    const step = lotteryItemSteps;
    let startTime = Number(new Date())
    const timeLong = 6000;
    let timeId = null;
    let duration = 100;
    let self = this;

    // 抽奖未结束,在进行中
    this.setData({
      lotteryEnd: false
    })

    function run() {
      let timeLapse = Number(new Date()) - startTime
      let lastIndex = self.data.lastIndex;
      let currentIndex = lastIndex
      if (currentIndex === 7) {
        currentIndex = 0
      } else {
        ++currentIndex
      }
    //   console.log(currentIndex)
      self.data.lastIndex = currentIndex
      self.setData({
        activedIndex: step[currentIndex]
      })

      if (timeLapse > 6000) {
        clearInterval(timeId)
        
        // 抽奖结束
        self.setData({
          lotteryEnd: false,
          showWinModel: false
        })
        setTimeout(() => { self.prizeEnd(self.data.prizes[step[currentIndex]])}, 500)
      } else if (timeLapse > 5700) {
        clearInterval(timeId)
        duration = 300;
        timeId = setInterval(run, duration)
      } else if (timeLapse > 5000) {
        clearInterval(timeId)
        duration = 260;
        timeId = setInterval(run, duration)
      } else if (timeLapse > 4500) {
        clearInterval(timeId)
        duration = 200;
        timeId = setInterval(run, duration)
      } else if (timeLapse > 4000) {
        clearInterval(timeId)
        duration = 80
        timeId = setInterval(run, duration)
      } else if (timeLapse > 2000) {
        clearInterval(timeId)
        duration = 50
        timeId = setInterval(run, duration)
      }
    }
    timeId = setInterval(run, duration);
  },
  // 去领取 领取快递金
  getCoupon() {
    console.log('领取了')
  },
  showWinLotteryModel() { // 显示中奖模态框
    this.setData({
      showWinModel: true,
      showMask: true
    })
  },
  hideWinLotteryModel () { // 隐藏中奖模态框
    this.setData({
      showWinModel: false,
      showMask: false
    })
  },
  showNoWinLotteryModel() { // 显示未中奖模态框
    this.setData({
      showNoWinModel: true,
      showMask: true
    })
  },
  hideNoWinLotteryModel() { // 隐藏未中奖模态框
    this.setData({
      showWinModel: false,
      showMask: false
    })
  },
  closeNoWinModal () { // 关闭未中奖的模态框
    this.hideNoWinLotteryModel()
  }
})