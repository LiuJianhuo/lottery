import config from '../config/api.config.js'
import { pddParamsSign } from '../../utils/third-sign.js'
console.log(config.pdd)
// 参数拼接
const joinedParams = paramsObj => {
  const keys = Object.keys(paramsObj)
  let joinedParams = ''
  if (keys.length > 0) {
    joinedParams = `${keys[0]}=${paramsObj[keys[0]]}`
  }
  for (let i = 1; i < keys.length; i++) {
    joinedParams += `&${keys[i]}=${paramsObj[keys[i]]}`
  }
  return joinedParams
}

// 拼多多请求对象
const PddRequest = ({ baseUrl, cid, secret }) => {
  return function request({ method, data={}, params={} }) {
    // 排序加密
    const timestamp = parseInt(Date.now() / 1000)
    const mustParams = {
      client_id: cid,
      data_type: 'JSON',
      timestamp
    }
    params = Object.assign({}, mustParams, params)
    // md5加密签名
    params.sign = pddParamsSign(params, secret)
    // 参数拼接
    const joinedParamsStr = joinedParams(params)
    console.log(joinedParamsStr)
    return new Promise((resolve, reject) => {
      wx.request({
        url: baseUrl + '?' + joinedParamsStr,
        method: method,
        data: data,
        success(res) {
          if (res.data.error_response) {
            // console.log(res.data.error_response.error_code)
            console.log(res.data.error_response)
            reject({ errMsg: res.data.error_response.error_msg, errCode: res.data.error_response.error_code })
          } else {
            resolve(res.data)
          }
        },
        fail(err) {
          reject(err.errMsg)
        }
      })
    })
  }
}

// 发起第三请求对象 pdd:拼多多 ddb: 多多宝
const thirdRequest = {
  pdd: PddRequest(config.pdd),
  ddk: PddRequest(config.ddk)
}

export {
  thirdRequest,
  joinedParams
}