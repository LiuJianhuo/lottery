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
    // this.handleUnionOpenGoodsQuery()
    jdUnion.goods.unionOpenGoodsPromotiongoodsinfoQuery('63103303306').then(data => {
      console.log('商品查询成功')
      console.log(data)
    }).catch(err => {
      console.log('商品查询失败')
    })
  },
  handleUnionOpenGoodsQuery () {
    jdUnion.goods.unionOpenGoodsQuery({
      keyword: '零食'
      // isCoupon: 1
    }).then(data => {
      console.log('商品查询成功')
      console.log(data)
    }).catch(err => {
      console.log('商品查询失败')
    })
  }
})