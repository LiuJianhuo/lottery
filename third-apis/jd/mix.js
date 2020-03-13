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


export default {
  unionOpenPositionCreate
}