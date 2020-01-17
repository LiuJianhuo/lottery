// 推广生成工具
import { thirdRequest } from '../utils/request.js'
const ddkRequest = thirdRequest.ddk

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

export default {
  rpPromUrlGenerate
}