// pages/goods-pid/index.js
import ddk from '../../third-apis/ddk/index.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsPid: {},
    newGoodsPid: {},
    appInf: {},
    appInf1: {},
    weappUrl: '',
    themeList: [],
    themeAppInf: {},
    lotteryUrlAppInf: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  // 商品推广位生成
  handleGoodsPidGenerate () {
    console.group('生成推广位')
    ddk.goods.goodsPidGenerate({
      number: 1,
      p_id_name_list: `['红包1']`
    }).then(data => {
      console.log(data)
      console.log(data.p_id_generate_response.p_id_list[0])
      console.groupEnd()
    }).catch(err => {
      console.log(err)
      console.groupEnd()
    })
  },
  handleGoodsPidQuery () {
    console.group('推广位查询')
    ddk.goods.goodsPidQuery({}).then(data => {
      console.log(data.p_id_query_response)
      console.log(data.p_id_query_response.p_id_list[0])
      this.setData({
        goodsPid: data.p_id_query_response.p_id_list[0]
      })
      console.groupEnd()
    }).catch(err => {
      console.log(err)
      console.groupEnd()
    })
  },
  // 生成推广位链接
  handleGoodsPromotionUrlGenerater () {
    console.group('推广位链接生成')
    const pId = '8508873_126511066'
    const goodsIdList = `[75722547652]`
    ddk.goods.goodsPromotionUrlGenerater({
      p_id: pId,
      goods_id_list: goodsIdList,
      generate_we_app: true
    }).then(data => {
      console.log(data)
      console.log(data.goods_promotion_url_generate_response.goods_promotion_url_list[0])
      this.setData({
        appInf: data.goods_promotion_url_generate_response.goods_promotion_url_list[0].we_app_info
      })
      console.groupEnd()
    }).catch(err => {
      console.log(err)
      console.groupEnd()
    })
  },
  handleRpPromUrlGenerate () {
    console.group('营销推广链接')
    const temp = { 
      not_show_background: true
    }
    const goodsIdList = `["8508873_126511066"]`
    ddk.mix.rpPromUrlGenerate({
      channel_type: 0,
      p_id_list: goodsIdList,
      generate_we_app: true,
      diy_red_packet_param: JSON.stringify(temp)
    }).then(data => {
      console.log(data)
      console.log(data.rp_promotion_url_generate_response.url_list[0])
      this.setData({
        appInf1: data.rp_promotion_url_generate_response.url_list[0].we_app_info
      })
      console.groupEnd()
    }).catch(err => {
      console.log(err)
      console.groupEnd()
    })
  },
  // 打开小程序
  handleMiniProgram () {
    const appInf = this.data.appInf
    wx.navigateToMiniProgram({
      appId: appInf.app_id,
      path: appInf.page_path
    })
  },
  // 打开小程序
  handleMiniProgram1 () {
    const appInf = this.data.appInf1
    wx.navigateToMiniProgram({
      appId: appInf.app_id,
      path: appInf.page_path
    })
  },
  // 打开商品列表
  handleOpenGoodsList () {
    wx.navigateTo({
      url: '/pages/test-api/index',
    })
  },
  // 生成单品小程序二维码url
  handleWeappQrcodeUrlGen () {
    const params = {
      p_id: '8508873_126511066',
      goods_id_list: `[8815386316]`
    }
    console.group('生成单品小程序二维码url')
    ddk.mix.weappQrcodeUrlGen(params).then(res => {
      this.weappUrl = res.weapp_qrcode_generate_response.url
    }).catch(err => {
      console.log(err)
    })
  },
  // 打开二维码链接
  handleOpenWeappUrl () {
  },
  // CPA数据查询
  handleFinanceCpaQuery () {
    console.group('CPA数据查询')
    const params = {
      date_query: '2020-01-16', // 格式：yyyy-MM-dd
      pid: '8508873_126511066'
    }
    ddk.mix.financeCpaQuery(params).then(res => {
      const data = res.finance_cpa_query_response
      console.log(data)
      console.groupEnd()
    }).catch(err => {
      console.log(err)
      console.groupEnd()
    })
  },
  handleThemeListGet () {
    console.group('主题列表')
    const params = {
      
    }
    ddk.theme.themeListGet(params).then(res => {
      const data = res.theme_list_get_response
      console.log(data)
      console.groupEnd()
      this.setData({
        themeList: data.theme_list
      })

    }).catch(err => {
      console.log(err)
      console.groupEnd()
    })
  },
  // 生成主题推广位链接
  handleThemePromUrlGenerate () {
    const params = {
      pid: '8508873_126511066',
      theme_id_list: `[7594]`,
      generate_we_app: true
    }
    ddk.theme.themePromUrlGenerate(params).then(res => {
      console.group('生成主题推广位链接')
      console.log(res)
      this.setData({
        themeAppInf: res.theme_promotion_url_generate_response.url_list[0].we_app_info
      })
      console.groupEnd()
    }).catch(err => {

    })
  },
  handleThemeMiniProgram () {
    const appInf = this.data.themeAppInf
    wx.navigateToMiniProgram({
      appId: appInf.app_id,
      path: appInf.page_path
    })

  },
  // 生成商城-频道推广链接 cmsPromUrlGenerate
  handleCmsPromUrlGenerate () {
    const params = {
      p_id_list: `["8508873_126511066"]`,
      we_app_web_view_url: true,
      we_app_web_view_short_url: true,
      channel_type: 2
    }
    ddk.mix.cmsPromUrlGenerate(params).then(res => {
      console.group('生成商城-频道推广链接')
      console.log(res)
      // this.setData({
      //   themeAppInf: res.cms_promotion_url_generate_response.url_list[0].we_app_info
      // })
      console.groupEnd()
    }).catch(err => {
      console.log(err)
    })
  },
  // 生成转盘抽免单url
  handleLotteryUrlGen () {
    const params = {
      pid_list: `["8508873_126511066"]`,
      generate_we_app: true,
      multi_group: false
    }
    ddk.mix.lotteryUrlGen(params).then(res => {
      console.group('生成转盘抽免单url')
      console.log(res)
      console.groupEnd()
      this.setData({
        lotteryUrlAppInf: res.lottery_url_response.url_list[0].we_app_info
      })
    }).catch(err => {
      console.log(err)
    })
  },
  handleLotteryUrlMiniProgram () {
    const appInf = this.data.lotteryUrlAppInf
    wx.navigateToMiniProgram({
      appId: appInf.app_id,
      path: appInf.page_path
    })
  },
  // 推广订单查询
  handleOrderListRangeGet () {
    const params = {
      start_time: '2020-1-17',
      end_time: '2020-1-18'
    }
    ddk.order.orderListRangeGet(params).then(res =>{
      console.group('推广订单查询')
      console.log(res)
      console.groupEnd()
    }).catch(err => {
      console.log(err)
    })
  },
  // 查询订单详情
  handleOrderDetailGet () {
    const params = {
      order_sn: '200117-194475131991696'
    }
    ddk.order.orderDetailGet(params).then(res =>{
      console.group('查询订单详情')
      console.log(res)
      console.groupEnd()
    }).catch(err => {
      console.log(err)
    })
  },
  // 查看商品基本信息
  handleGoodsBasicInfoGet () {
    const params = {
      goods_id_list: `[8815386316]`
    }
    ddk.goods.goodsBasicInfoGet(params).then(res =>{
      console.group('查看商品基本信息')
      console.log(res)
      console.groupEnd()
    }).catch(err => {
      console.log(err)
    })
  },
  // 查询优惠券信息
  handleCouponInfoQuery () {
    const params = {
      coupon_ids: `["A0045VC-512002985431286749"]`
    }
    ddk.mix.couponInfoQuery(params).then(res =>{
      console.group('查询优惠券信息')
      console.log(res)
      console.groupEnd()
    }).catch(err => {
      console.log(err)
    })
  },
  // 运营频道商品查询 goodsRecommendGet
  handleGoodsRecommendGet () {
    const params = {
      // coupon_ids: `[363089145244]`
    }
    ddk.goods.goodsRecommendGet(params).then(res =>{
      console.group('运营频道商品查询')
      console.log(res)
      console.groupEnd()
    }).catch(err => {
      console.log(err)
    })
  },
  // 商品推广计划
  handleGoodsUnitQuery () {
    const params = {
      goods_id: 8815386316
    }
    ddk.goods.goodsUnitQuery(params).then(res =>{
      console.group('商品推广计划')
      console.log(res)
      console.groupEnd()
    }).catch(err => {
      console.log(err)
    })
  },
  // 转链接接口
  handleGoodsZsUnitUrlGen () {
    const params = {
      source_url: encodeURIComponent('https://mobile.yangkeduo.com/duo_coupon_landing.html?goods_id=8815386316&pid=8508873_126511066&cpsSign=CC_200118_8508873_126511066_b47518fcaf1416c18e276b15a0d15432&duoduo_type=2'),
      pid: '8508873_126511066'
    }
    ddk.goods.goodsZsUnitUrlGen(params).then(res =>{
      console.group('转链接接口')
      console.log(res)
      console.groupEnd()
    }).catch(err => {
      console.log(err)
    })
  },
  // 生成频道推广链接
  handleResourceUrlGen () {
    const params = {
      pid: '8508873_126511066'
    }
    ddk.mix.resourceUrlGen(params).then(res =>{
      console.group('生成频道推广链接')
      console.log(res)
      console.groupEnd()
    }).catch(err => {
      console.log(err)
    })
  },
  // 最后更新时间段增量同步推广订单信息
  handleOrderListIncrementGet () {
    const params = {
      start_update_time: Number(new Date('2020-1-18')) / 1000,
      end_update_time: Number(new Date('2020-01-18')) / 1000,
    }
    console.log(Number(new Date('2019-10-15')))
    ddk.order.orderListIncrementGet(params).then(res =>{
      console.group('最后更新时间段增量同步推广订单信息')
      console.log(res)
      console.groupEnd()
    }).catch(err => {
      console.log(err)
    })
  },
  // 店铺列表
  handleMerchantListGet () {
    const params = {

    }
    ddk.mall.merchantListGet(params).then(res =>{
      console.group('店铺列表')
      console.log(res)
      console.groupEnd()
    }).catch(err => {
      console.log(err)
    })
  },
  // 查询店铺商品
  handleMallGoodsListGet () {
    const params = {
      mall_id: 1165732,
      page_number: 1,
      page_size: 10
    }
    ddk.mall.mallGoodsListGet(params).then(res =>{
      console.group('店铺列表')
      console.log(res)
      console.groupEnd()
    }).catch(err => {
      console.log(err)
    })
  },
  // 店铺推广链接
  handleMallUrlGen () {
    const params = {
      mall_id: 1165732,
      pid: '8508873_126511066'
    }
    ddk.mall.mallUrlGen(params).then(res =>{
      console.group('店铺链接生成')
      console.log(res)
      console.groupEnd()
    }).catch(err => {
      console.log(err)
    })
  }
})