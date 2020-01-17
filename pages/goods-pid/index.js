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
    themeList: []
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
      p_id_name_list: `['红包']`
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
    const goodsIdList = `[8815386316]`
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
  }
})