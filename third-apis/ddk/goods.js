// 商品api
import { thirdRequest } from '../utils/request.js'
const ddkRequest = thirdRequest.ddk

// 多多进宝商品查询 	pdd.ddk.goods.search
const goodsSearch = (params) => {
  return ddkRequest({
    method: 'post',
    params: {
      type: 'pdd.ddk.goods.search',
      ...params
    }
  })
}

// 商品详情
const goodsDetail = params => {
  return ddkRequest({
    method: 'post',
    params: {
      type: 'pdd.ddk.goods.detail',
      ...params
    }
  })
}

// 商品推广位生成
// pdd.ddk.goods.pid.generate（创建多多进宝推广位）
const goodsPidGenerate = params => {
  return ddkRequest({
    method: 'post',
    params: {
      type: 'pdd.ddk.goods.pid.generate',
      ...params
    }
  })
}

// 商品推广位查询
// pdd.ddk.goods.pid.query（查询已经生成的推广位信息）
const goodsPidQuery = params => {
  return ddkRequest({
    method: 'post',
    params: {
      type: 'pdd.ddk.goods.pid.query',
      ...params
    }
  })
}

// 商品推广链接生成
// pdd.ddk.goods.promotion.url.generate（多多进宝推广链接生成）
const goodsPromotionUrlGenerater = params => {
  return ddkRequest({
    method: 'post',
    params: {
      type: 'pdd.ddk.goods.promotion.url.generate',
      ...params
    }
  })
}

// 爆款商品
// pdd.ddk.top.goods.list.query（多多客获取爆款排行商品接口）
const topGoodsListQuery = params => {
  return ddkRequest({
    method: 'post',
    params: {
      type: 'pdd.ddk.top.goods.list.query',
      ...params
    }
  })
}

export default {
  goodsSearch,
  goodsDetail,
  goodsPidGenerate,
  goodsPidQuery,
  goodsPromotionUrlGenerater,
  topGoodsListQuery
}