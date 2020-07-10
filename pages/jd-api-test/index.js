// pages/jd-api-test/index.js.js
import jd from '../../third-apis/jd/index.js'
const jdUnion = jd.union // 京东联盟
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const temp = [63103303306]
    jdUnion.goods.unionOpenGoodsQuery({
      skuIds: temp
      // isCoupon: 1
    }).then(data => {
      console.log('商品查询成功')
      console.log(data)
    }).catch(err => {
      console.log('商品查询失败')
    })
    // this.handleUnionOpenGoodsQuery()
    // unionOpenPromotionBysubunionidGet
    console.log(jd.mix)
    const a = 'https://coupon.m.jd.com/coupons/show.action?linkKey=AAROH_xIpeffAs_-naABEFoembXyDkyJJbAJR65iaFU4tfrRQOmSFneN7pZ6ZqbuzhNL9gqLYaN9LAvyHK7HOHi-6s0gzw&to=item.jd.com/63103303306.html'
    console.log(a)
    jd.mix.unionOpenPromotionBysubunionidGet({
      materialId: 'https://wqitem.jd.com/item/view?sku=63103303306',
      couponUrl: a
    }).then(data => {
      console.log(data)
    }).catch(err => {
      console.log(err)
    })
    // jd.goods.unionOpenGoodsBigfieldQuery({
    //   skuIds: '63103303306'
    // }).then(data => {
    //   console.log('商品查询成功')
    //   console.log(data)
    // }).catch(err => {
    //   console.log('商品查询失败')
    // })
    // jdUnion.goods.unionOpenGoodsPromotiongoodsinfoQuery('63103303306,68188442551').then(data => {
    //   console.log('商品查询成功')
    //   console.log(data)
    // }).catch(err => {
    //   console.log('商品查询失败')
    // })
  },
  handleUnionOpenGoodsQuery () {
    jdUnion.goods.unionOpenGoodsQuery({
      skuIds: "68188442551"
      // isCoupon: 1
    }).then(data => {
      console.log('商品查询成功')
      console.log(data)
    }).catch(err => {
      console.log('商品查询失败')
    })
  }
})