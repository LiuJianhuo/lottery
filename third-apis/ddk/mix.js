// 混合项接口api
import { thirdRequest } from '../utils/request.js'
const ddkRequest = thirdRequest.ddk

// 营销推广链接
// pdd.ddk.rp.prom.url.generate（生成营销工具推广链接）
const rpPromUrlGenerate = (params) => {
  return ddkRequest({
    method: 'post',
    params: {
      type: 'pdd.ddk.rp.prom.url.generate',
      ...params
    }
  })
}

// 生成单品推广小程序二维码url
// pdd.ddk.weapp.qrcode.url.gen（多多客生成单品推广小程序二维码url）
const weappQrcodeUrlGen = (params) => {
  return ddkRequest({
    method: 'post',
    params: {
      type: 'pdd.ddk.weapp.qrcode.url.gen',
      ...params
    }
  })
}

// cpa数据查询
// pdd.ddk.finance.cpa.query（查询CPA数据）
const financeCpaQuery = (params) => {
  return ddkRequest({
    method: 'post',
    params: {
      type: 'pdd.ddk.finance.cpa.query',
      ...params
    }
  })
}

// 生成商城-频道推广链接
// pdd.ddk.cms.prom.url.generate（生成商城-频道推广链接）
const cmsPromUrlGenerate = (params) => {
  return ddkRequest({
    method: 'post',
    params: {
      type: 'pdd.ddk.cms.prom.url.generate',
      ...params
    }
  })
}

// 生成转盘抽免单url
// pdd.ddk.lottery.url.gen（多多客生成转盘抽免单url）
const lotteryUrlGen = (params) => {
  return ddkRequest({
    method: 'post',
    params: {
      type: 'pdd.ddk.lottery.url.gen',
      ...params
    }
  })
}

// 查询优惠券信息
// pdd.ddk.coupon.info.query（查询优惠券信息）
const couponInfoQuery = (params) => {
  return ddkRequest({
    method: 'post',
    params: {
      type: 'pdd.ddk.coupon.info.query',
      ...params
    }
  })
}

// 生成频道推广链接
// pdd.ddk.resource.url.gen（生成多多进宝频道推广）
const resourceUrlGen = (params) => {
  return ddkRequest({
    method: 'post',
    params: {
      type: 'pdd.ddk.resource.url.gen',
      ...params
    }
  })
}

export default {
  rpPromUrlGenerate,
  weappQrcodeUrlGen,
  financeCpaQuery,
  cmsPromUrlGenerate,
  lotteryUrlGen,
  couponInfoQuery,
  resourceUrlGen
}