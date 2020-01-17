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

export default {
  rpPromUrlGenerate,
  weappQrcodeUrlGen,
  financeCpaQuery
}