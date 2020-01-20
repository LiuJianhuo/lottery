// 主题api
import { thirdRequest } from '../utils/request.js'
const ddkRequest = thirdRequest.ddk

// 主题列表获取
// pdd.ddk.theme.list.get（多多进宝主题列表查询）
const themeListGet = (params) => {
  return ddkRequest({
    method: 'post',
    params: {
      type: 'pdd.ddk.theme.list.get',
      ...params
    }
  })
}

// 主题类别查询
// pdd.ddk.theme.goods.search（多多进宝主题商品查询）
const themeGoodsSearch = (params) => {
  return ddkRequest({
    method: 'post',
    params: {
      type: 'pdd.ddk.theme.goods.search',
      ...params
    }
  })
}

// 主题推广链接
// pdd.ddk.theme.prom.url.generate（多多进宝主题推广链接生成）
const themePromUrlGenerate = (params) => {
  return ddkRequest({
    method: 'post',
    params: {
      type: 'pdd.ddk.theme.prom.url.generate',
      ...params
    }
  })
}

export default {
  themeListGet,
  themeGoodsSearch,
  themePromUrlGenerate
}