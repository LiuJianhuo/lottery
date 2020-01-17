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
        amount: 1,
      },
      {
        id: 2,
        amount: 0,
      },
      {
        id: 3,
        amount: 2,
      },
      {
        id: 4,
        amount: 5,
      },
      {
        id: 5,
      },
      {
        id: 6,
        amount: 3,
      },
      {
        id: 7,
        amount: 0,
      },
      {
        id: 8,
        amount: 10,
      },
      {
        id: 9,
        amount: 0
      },
    ],
    tempPrize: [],
    isBgOne: true,
    timeId: null,
    activedIndex: -1,
    lastIndex: -1,
    lotteryEnd: true,
    lotteryTimes: 0,
    showWinModal: false, //显示得奖的模态框
    showNoWinModal: false, //显示未得奖的模态框,
    showMask: false,
    token: null, // 作为当前存活页时的token，只用户判断是否切换了用户
    hasGettedPrizes: false, // 是否已经加载了奖品信息
    winPrizeRecords: [], // 中奖记录
    shareShow: false,
    showShareMinipro: false,
    shareTabbarAnimationData: {},
    shareTabbarHasShow: false,
    interstitialAd: null,
    pageShowIsfromShare: false, // 从页面显示是从分享进入
    adTimeId: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 创建插屏广告 
    this.createAd()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    app.registerCpt({ name: 'mask', instance: this.selectComponent('#mask') })
    this.showAd() // 显示插屏
    this.setData({ pageShowIsfromShare: false })
    // 创建动画实例
    var shareTabbarAnimation = wx.createAnimation({
      duration: 200,
      timingFunction: 'linear',    
    })
    this.shareTabbarAnimation = shareTabbarAnimation
    

    // 判断是否登录
    const token = app.getToken()
    const timeId = setInterval(() => {
      this.setData({
        isBgOne: !this.data.isBgOne,
      });
    }, 200);
    this.data.timeId = timeId;

    this.getWinPrizeRecords()
    if (!token) {
      // 用户不存在得话，抽奖次数为零
      if (!app.getToken()) {
        this.setData({
          lotteryTimes: 0
        })
      }
      return 
    }
    
    // 获取抽奖次数
    this.getLotteryTimes()
    this.getPrizes()

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
    console.log(from)
    this.setData({ pageShowIsfromShare: true })
    // 通过右上方三点按钮点击的分享
    if (from === 'menu' || from === 'button') {
      app.request.post({
        url: '/api/mini/share',
        data: {}
      }).then(data => {
        console.log('成功分享了一次')
        // 分享成功 重新获取抽奖次数
        // setTimeout(() => {
        //   this.getLotteryTimes()
        // }, 1000) 
      }).catch(err => {
        console.log(err)
      })
      app.aldstat.sendEvent('用户分享转发', { openId: app.getOpenId()}) // 记录转发量
    }
    // 分享链接带用户信息
    return {
      // imageUrl: '../../image/index.jpg',
      path: `/pages/index/index?token=${app.getToken()}`
    }
  },
  prizeEnd (prizeItem) {
    console.log('=====中奖的条目是', prizeItem)
    // 抽奖结束，重新拉起数据
    // 抽奖结束
    const self = this
    const amount = prizeItem.amount
    if (amount - 0 === 0 || prizeItem.status === 0) {
      wx.showModal({
        showCancel: false,
        content: '你离中奖只有一步之遥了\r\n快邀请好友给你助力吧',
        confirmText: '好的',
        confirmColor: '#FF2453',
        success () {
          self.setData({
            lotteryEnd: true,
          })
          // 显示分享小程序
          self.showShareTabbar()
          self.getLotteryTimes()
          self.getPrizes()
          self.getWinPrizeRecords()
        }
      })
    } else {
      wx.showModal({
        content: `恭喜!\r\n获得${prizeItem.amount-0}元快递金`,
        confirmText: '去查看',
        confirmColor: '#FF2453',
        success(res) {
          self.setData({
            lotteryEnd: true
          })
          self.getLotteryTimes()
          self.getPrizes()
          self.getWinPrizeRecords()
          if (res.confirm) {
            
            wx.switchTab({
              url: '/pages/my-prize/index',
            })
          } 
        }
      })
    }
  },
  hello () {
    app.globalData.webSrc = "https://wqs.jd.com/pingou/tuan99v2.shtml?pps=floor.FO4O405%3AFO8O27OA4O12E53OA3O1%3AFOFO0F10417O23O29O99O16O10067A03DO2B3CO487C388A9BB360C6D919&PTAG=17053.57.1&share=1&_fromplatform=jxapp&ad_od=share&utm_source=androidpingouapp&utm_medium=pingouappshare&utm_campaign=t_335139774&utm_term=CopyURL"
    wx.navigateTo({
      url: '/pages/lottery/index',
    })
  },
  async prizeStartTap(e) {
    if (e.currentTarget.dataset.index !== undefined && e.currentTarget.dataset.index !== 4) {
      return
    }

    // 用户是否登录？
    const token = app.getToken()
    if (!token) {
      wx.showModal({
        content: '您还未登录，登录可抽奖',
        confirmText: '去登录',
        confirmColor: '#FF2453',
        cancelColor: '#666666',
        cancelText: '我再看看',
        success: function (res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/login/index',
            })
          }
        }
      })
      return
    }
    if (this.data.lotteryTimes < 1 || this.data.lotteryTimes === null || this.data.lotteryTimes === undefined) {
      let sumRemainCount = 0
      try {
        sumRemainCount = await this.getSumRemainCount()
        console.log('剩余次数====', sumRemainCount)
      } catch (err) {
        console.log(err)
      }
      wx.showModal({
        content: sumRemainCount > 0 ? '转发获得更多机会' : '运气用完了，明天再见吧',
        confirmText: '确定',
        confirmColor: '#FF2453',
        showCancel:false,
        success: (res) => {
          if (sumRemainCount > 0) {
            this.showShareTabbar()
          }
        }
      })
      return
    }
    app.aldstat.sendEvent('用户抽奖', { openId: app.getOpenId() }) // 记录用户抽奖
    // 抽奖开始， 不是抽奖按钮触发或者抽奖中还未结束则不跳出，不进行抽奖
    if (e.currentTarget.dataset.index !== 4) return;
    if (!this.data.lotteryEnd) return;
    
    const step = lotteryItemSteps;
    let startTime = Number(new Date())
    const timeLong = 6000;
    let timeId = null;
    let duration = 100;
    let self = this;
    let lotteryIndex = null //中奖索引
    try{
      const data = await app.request.post({
        url: 'api/express/gold/mini/luck/draw/lottery'
      })
      // 抽奖未结束,在进行中
      this.setData({
        lotteryEnd: false,
        lotteryTimes: this.data.lotteryTimes - 1
      })
      console.log('======中奖id', data)
      timeId = setInterval(run, duration);
      lotteryIndex = this.getPrizeItemIndexById(data)
    } catch(err) {
      wx.showToast({
        title: err.errMsg,
        icon: 'none'
      })
    }

    function run() {
      let timeLapse = Number(new Date()) - startTime
      let lastIndex = self.data.lastIndex;
      let currentIndex = lastIndex
      if (currentIndex === 7) {
        currentIndex = 0
      } else {
        ++currentIndex
      }
      self.data.lastIndex = currentIndex
      self.setData({
        activedIndex: step[currentIndex]
      })

      if (timeLapse > 4000) {
        if (lotteryIndex === step[currentIndex]) {
          clearInterval(timeId)
          // 抽奖结束
          self.setData({
            lotteryEnd: false,
            showWinModel: false
          })
          setTimeout(() => { self.prizeEnd(self.data.prizes[lotteryIndex]) }, 500)
        }
        
      } else if (timeLapse > 3200) {
        clearInterval(timeId)
        duration = 300;
        timeId = setInterval(run, duration)
      } else if (timeLapse > 3000) {
        clearInterval(timeId)
        duration = 220;
        timeId = setInterval(run, duration)
      } else if (timeLapse > 2800) {
        clearInterval(timeId)
        duration = 150;
        timeId = setInterval(run, duration)
      } else if (timeLapse > 2600) {
        clearInterval(timeId)
        duration = 80
        timeId = setInterval(run, duration)
      } else if (timeLapse > 1200) {
        clearInterval(timeId)
        duration = 50
        timeId = setInterval(run, duration)
      }
    }
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
  },
  getPrizeItemIndexById (id) {   
    const prizes = this.data.prizes
    let indexes = []
    if (prizes) {
      for (let i=0; i < prizes.length; i++) {
        if (prizes[i].id === id) {
          indexes.push(i)
        }
      }
    }
    // indexes = []
    if (indexes.length > 0) {
      return indexes[Math.floor(Math.random() * indexes.length)]
    }
    for (let i = 0; i < prizes.length; i++) {
      if (prizes[i].status === 0 && prizes[i].amount - 0 === 0) {
        indexes.push(i)
      }
    }
    if (indexes.length > 0) {
      const index = Math.random() * indexes.length
      return indexes[Math.floor(index)]
    }
    return -1
  },
  getLotteryTimes () { // 获取抽奖次数
    // 获取抽奖次数
    app.request.post({
      url: 'api/express/gold/mini/luck/draw/count/get',
      data: {},
    }).then(data => {
      this.setData({
        lotteryTimes: data || 0
      })
      console.log('====成功拉起抽奖次数', data)
    }).catch(err => {
      wx.showToast({
        title: err.errMsg,
        icon: 'none'
      })
    })
  },
  getPrizes() { // 获取抽奖信息
    app.request.post({
      url: '/api/express/gold/mini/luck/draw/set/get',
      data: {
      },
    }).then(data => {
      console.log('====成功拉起抽奖信息', data)
      // 不满8个奖项，补充谢谢参与奖项
      const addLen = 8 - data.length
      let id = -10000
      const item = {
        expressName: "谢谢惠顾",
        amount: "0",
        status: 0,
      }
      if (addLen > 0) {
        for (let i = 0; i < addLen; i++)
          data.push(Object.assign({ id: id++ }, item))
      }
      // 根据设计稿放置到指定位置
      const adjustedPrizes = this.adjustPrizesPosition(data)
      console.log('====调整后的奖金' + JSON.stringify(adjustedPrizes))
      // 已加载奖品信息
      this.setData({
        prizes: adjustedPrizes,
        hasGettedPrizes: true,
        token: app.getToken()
      })
    }).catch(err => {
      console.log(err)
    })
  },
  getSumRemainCount () {
    return app.request.post({
      url: 'api/express/gold/mini/luck/draw/surplus/count/get'
    })
  },
  getWinPrizeRecords () {
    app.request.post({
      url: 'api/express/gold/mini/luck/draw/win/get'
    }).then(data => {
      console.log('====成功拉起中奖记录', data)
      let tempData = []
      if (data) {
        tempData = data.map(item => {
          const userName = item.userName
          if (userName.length > 6) {
             item.userName = userName.substr(0, 3) + '*' + userName.substr(-3)
          }
          return item
        })
      }
      this.setData({
        winPrizeRecords: tempData
      })
    }).catch(err=>{
      wx.showToast({
        title: err.errMsg,
        icon: 'none'
      })
    })
  },
 
  adjustPrizesPosition (data) {
    const temp = new Array(9)
    temp[4] = {}
    const prizesPosition = {
      1: 0,
      2: 2,
      5: 3,
      3: 5,
      10: 7
    }
    const noSavedItems = [] //保存没有存入的项
    data.forEach(item => {
      const amount = item.amount - 0
      const position = prizesPosition[amount]
      // 有指定位置，且当前该数据条目没存入，
      if (position !== undefined && temp[position] === undefined) {
        temp[position] = item
      } else {
        noSavedItems.push(item)
      }
    })
    let j = 0;
    for(let i=0; i<temp.length; i++) {
      if (temp[i] === undefined) {
        temp[i] = noSavedItems[j]
        j++
      }
    }
    return temp
  },
  hideShare () {
    this.setData({
      shareShow: false,
      showShareMinipro: false
    })
    app.mask.hide()
  },
  showShare () {
    // 显示分享
    app.mask.show()
    this.setData({
      shareShow: true
    })
  },
  showShareMiniproPic () {
    app.mask.show() // 显示分享小程序图片
    this.setData({
      showShareMinipro: true
    })
  },
  closeShareMinipro () {
    console.log('close pr')
    this.setData({
      showShareMinipro: false
    })
    app.mask.hide()
  },
  showTabbar () {
    this.showShareTabbar()
  },
  showShareTabbar () {
    const self = this
    app.mask.show()
    self.shareTabbarAnimation.translateY('-100%').step();
    self.setData({
      shareTabbarAnimationData: self.shareTabbarAnimation.export()
    })
    // wx.hideTabBar({
    //   aniamtion: false,
    //   success () {
    //     app.mask.show()
    //     self.shareTabbarAnimation.translateY('-100%').step();
    //     self.setData({
    //       shareTabbarAnimationData: self.shareTabbarAnimation.export()
    //     })
    //   }
    // })
  },
  hideShareTabbar() { // 打开分享tabbar
    this.shareTabbarAnimation.translateY('100%').step();
    this.setData({
      shareTabbarAnimationData: this.shareTabbarAnimation.export(),
      showShareMinipro: false
    })
  },
  shareTabbarAnimEnd () {
    if (this.data.shareTabbarHasShow) {
      wx.showTabBar({aniamtion: false})
      app.mask.hide()
      this.setData({
        shareTabbarHasShow: false
      })
    } else {
      this.setData({
        shareTabbarHasShow: true,
        showShareMinipro: true
      })
    }
  },
  savePic () {
    console.log('保存图片')
    const self = this
    // 保存图片，查找canvas组件，将canvas转图片并保存到临时文件
    const cpt = this.selectComponent('#shareMinipro')
    wx.createSelectorQuery().in(cpt).select('#shareMinipro').boundingClientRect(rect => {
      const width = rect.width
      const height = rect.height
      // canvas转化为图片并保存到临时路径
      this.canvasToTempFilePath({ 
        cpt, 
        width, 
        height,
        canvasId: 'shareMinipro',
        destWidth: 829,
        destHeight: 1229
      }).then(res => {
        this.saveImageToPhotosAlbum(res.tempFilePath)
      }).catch(err => {
        wx.showToast({
          title: err.errMsg,
          icon: 'none'
        })
      })
    }).exec()
    
    
  },
  shareFriend () {
    // 分享好友
    console.log('分享好友')
  },
  closeMask () {
    console.log('close')
    console.log(this.data.shareTabbarHasShow)
    if (this.data.shareTabbarHasShow) {
      this.hideShareTabbar()
    }
  },
  saveImageToPhotosAlbum(tempFilePath) {
    app.authSetting({
      scope: 'scope.writePhotosAlbum', guideText: "请允许访问相册，不然存不了图哦"
    }).then(() => {
      wx.saveImageToPhotosAlbum({
        filePath: tempFilePath,
        success: function () {
          wx.showToast({
            title: '保存成功,快去发圈吧！',
            icon: 'none',
            duration: 2500
          })
        },
        fail(err) {
          console.log(err)
          let title = err.errMsg
          if (err.errMsg.indexOf('deny') > -1 || err.errMsg.indexOf('denied') > -1) {
            title = '已被您拒绝授权访问相册'
          }
          wx.showToast({
            title,
            icon: 'none'
          })
        }
      })
    }).catch(err => {
      let title = err.errMsg
      console.log(err)
      if (err.errMsg.indexOf('deny') > -1 || err.errMsg.indexOf('indied') > -1) {
        title = '已被您拒绝授权访问相册'
      }
      wx.showToast({
        title,
        icon: 'none'
      })
    })
  },
  open () {
    wx.navigateToMiniProgram({
      appId: 'wx553b058aec244b78',
      path: 'pages/web-view/index?url=https%3A%2F%2Fs.taopiaopiao.cn%2F3y2PCy',
      success(res) {
        console.log(res)
      },
      fail (err){
        console.log(err)
      }
    })
  },
  canvasToTempFilePath ({ cpt, canvasId, width, height, destWidth, destHeight }) {
    return new Promise((resolve, reject) => {
      wx.canvasToTempFilePath({
        x: 0,
        y: 0,
        width,
        height,
        destWidth,
        destHeight,
        canvasId,
        success(res) {
          resolve(res)
        },
        fail(err) {
          reject(err)
        }
      }, cpt)
    })
  },
  createAd () {
    let interstitialAd = null
    if (wx.createInterstitialAd) {
      interstitialAd = wx.createInterstitialAd({
        adUnitId: 'adunit-4faac9c1500e094c'
      })
      this.setData({
        interstitialAd: interstitialAd
      })
      interstitialAd.onLoad(() => { })
      interstitialAd.onError((err) => {
        this.setData({ pageShowIsfromShare: false })
      })
      interstitialAd.onClose(() => {
        // 广告关闭
        this.setData({pageShowIsfromShare:false})
       })
    }
  },
  showAd () {
    // 在适合的场景显示插屏广告 
    // 只有从不是页面分享进入就显示广告
    if (this.data.pageShowIsfromShare) {
      return
    }
    const interstitialAd = this.data.interstitialAd
    if (interstitialAd) { 
      clearTimeout(this.data.timeId)
      const timeId = setTimeout(() => {
        interstitialAd.show().catch((err) => { console.error(err) }) 
      }, 1000)
      this.setData({
        adTimeId: timeId
      })
    }
  }
})