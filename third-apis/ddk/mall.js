// 主题api
import { thirdRequest } from '../utils/request.js'
const ddkRequest = thirdRequest.ddk

// 查询店铺商品
// pdd.ddk.mall.goods.list.get（查询店铺商品）
const mallGoodsListGet = (params) => {
  return ddkRequest({
    method: 'post',
    params: {
      type: 'pdd.ddk.mall.goods.list.get',
      ...params
    }
  })
}

// 生成店铺推广链接
// pdd.ddk.mall.url.gen（多多客生成店铺推广链接API）
const mallUrlGen = (params) => {
  return ddkRequest({
    method: 'post',
    params: {
      type: 'pdd.ddk.mall.url.gen',
      ...params
    }
  })
}


// 查店铺列表接口
// pdd.ddk.merchant.list.get（多多客查店铺列表接口）
const merchantListGet = (params) => {
  return ddkRequest({
    method: 'post',
    params: {
      type: 'pdd.ddk.merchant.list.get',
      ...params
    }
  })
}

export default {
  mallGoodsListGet,
  mallUrlGen,
  merchantListGet
}