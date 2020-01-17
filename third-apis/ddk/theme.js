// 主题api
import { thirdRequest } from '../utils/request.js'
const ddkRequest = thirdRequest.ddk

// 主题列表查询
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

export default {
  themeListGet
}