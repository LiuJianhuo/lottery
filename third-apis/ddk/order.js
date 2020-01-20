// 主题api
import { thirdRequest } from '../utils/request.js'
const ddkRequest = thirdRequest.ddk

// 查询推广订单接口
// pdd.ddk.order.list.range.get（用时间段查询推广订单接口）
const orderListRangeGet = (params) => {
  return ddkRequest({
    method: 'post',
    params: {
      type: 'pdd.ddk.order.list.range.get',
      ...params
    }
  })
}

// 查询订单详情
// pdd.ddk.order.detail.get（查询订单详情）
const orderDetailGet = (params) => {
  return ddkRequest({
    method: 'post',
    params: {
      type: 'pdd.ddk.order.detail.get',
      ...params
    }
  })
}

// 增量推广信息
// pdd.ddk.order.list.increment.get（最后更新时间段增量同步推广订单信息）
const orderListIncrementGet = params => {
  return ddkRequest({
    method: 'post',
    params: {
      type: 'pdd.ddk.order.list.increment.get',
      ...params
    }
  })
}

export default {
  orderListRangeGet,
  orderDetailGet,
  orderListIncrementGet
}