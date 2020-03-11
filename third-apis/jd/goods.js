// 商品api
import { thirdRequest } from '../utils/request.js'
const jdRequest = thirdRequest.jd

// jd.union.open.goods.bigfield.query(商品详情查询接口【申请】)
const unionOpenGoodsBigfieldQuery = (params) => {
  return jdRequest({
    method: 'post',
    apiMethod: 'jd.union.open.goods.bigfield.query',
    params: {
      goodsReq: params
    }
  })
}

// jd.union.open.goods.jingfen.query(京粉精选商品查询接口)
const unionOpenGoodsJingfenQuery = (params) => {
  return jdRequest({
    method: 'post',
    apiMethod: 'jd.union.open.goods.jingfen.query',
    params: {
      goodsReq: params
    }
  })
}

// jingdong.search.ware(商品搜索)
const jingdongSearchWare = (params) => {
  return jdRequest({
    method: 'post',
    apiMethod: 'jingdong.search.ware',
    v: '2.0',
    params: {
      goodsReq: params
    }
  })
}

export default {
  unionOpenGoodsBigfieldQuery,
  unionOpenGoodsJingfenQuery
}