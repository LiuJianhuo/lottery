// 商品api
import { thirdRequest } from '../../utils/request.js'
const jdRequest = thirdRequest.jd

// jd.union.open.goods.query(关键词商品查询接口【申请】)
const unionOpenGoodsQuery = (params) => {
  return jdRequest({
    method: 'post',
    apiMethod: 'jd.union.open.goods.query',
    params: {
      goodsReqDTO: params
    }
  })
}

// jd.union.open.goods.promotiongoodsinfo.query(获取推广商品信息接口)
const unionOpenGoodsPromotiongoodsinfoQuery = (skuIds) => {
  return jdRequest({
    method: 'post',
    apiMethod: 'jd.union.open.goods.promotiongoodsinfo.query',
    params: {
      skuIds: skuIds
    }
  })
}

export default {
  unionOpenGoodsQuery,
  unionOpenGoodsPromotiongoodsinfoQuery
}