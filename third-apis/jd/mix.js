// 混合项接口api
import { thirdRequest } from '../utils/request.js'
const jdRequest = thirdRequest.jd

// 营销推广链接
// jd.union.open.position.create(创建推广位【申请】)
const unionOpenPositionCreate = (params) => {
  return jdRequest({
    method: 'post',
    jdReqMethod: '',
    params: {
      positionReq: params
    }
  })
}
// jd.union.open.promotion.bysubunionid.get ( 社交媒体获取推广链接接口【申请】 )
const unionOpenPromotionBysubunionidGet = (params) => {
  return jdRequest({
    method: 'post',
    apiMethod: 'jd.union.open.promotion.bysubunionid.get',
    params: {
      promotionCodeReq: params
    }
  })
}


export default {
  unionOpenPositionCreate,
  unionOpenPromotionBysubunionidGet
}