import config from '../config/api.config.js'
import { pddParamsSign, jdParamsSign } from '../../utils/third-sign.js'
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
    console.log('params')
    console.log(params)
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

function formateDate (da) {
  const date = new Date()
  // 将时间格式保持俩位字符（例如5月，则显示为 05）
  const fillTwoChar = (val) => {
    return (val > 9 ? '' : '0') + val
  }
  const month = fillTwoChar(date.getMonth() + 1)
  const dateOfMonth = fillTwoChar(date.getDate())
  const hours = fillTwoChar(date.getHours())
  const minutes = fillTwoChar(date.getMinutes())
  const seconds = fillTwoChar(date.getSeconds())
  return `${date.getFullYear()}-${month}-${dateOfMonth} ${hours}:${minutes}:${seconds}`
}

// 京东params参数格式 只包含一个key和对应json格式的value
// 需要对value中的keys排序，在转换为json字符串
const JdRequest = ( { baseUrl, appKey, secret }) => {
  return function ({ method, data, apiMethod, v='1.0', params }) {
    const paramsKey = Object.keys(params)[0]
    const paramsValue = params[paramsKey]
    let paramsValueAferOrder = paramsValue
    if (typeof paramsValue === 'object') {
      // 对params中的paramsKey的值对象中的keys排序，在转换为json字符串
      paramsValueAferOrder = Object.keys(paramsValue).sort((a, b) => a.localeCompare(b)).reduce((result, item) => {
        result[item] = paramsValue[item]
        return result
      }, {})
    }
    const nowDate = new Date() 
    const realParams = {
      app_key: appKey,
      method: apiMethod,
      timestamp: formateDate(nowDate),
      format: 'json',
      v
    }
    console.log('ddd333order')
    console.log(paramsValueAferOrder)
    realParams['360buy_param_json'] = JSON.stringify({[paramsKey]: paramsValueAferOrder})
    // md5加密签名
    realParams.sign = jdParamsSign(realParams, secret)
    
    if (paramsValueAferOrder.couponUrl) {
      paramsValueAferOrder.couponUrl = encodeURIComponent(paramsValueAferOrder.couponUrl)
      console.log(paramsValueAferOrder)
      realParams['360buy_param_json'] = JSON.stringify({[paramsKey]: paramsValueAferOrder})
    }
    // 参数拼接
    console.log('ddd')
    const joinedParamsStr = joinedParams(realParams)
    console.log(joinedParamsStr)
    return new Promise((resolve, reject) => {
      wx.request({
        url: baseUrl + '?' + joinedParamsStr,
        method: method,
        data: data,
        success(res) {
          if (res.data.error_response) {
            reject({
              errMsg: res.data.error_response.zh_desc
            })
          } else {
            const dataKey = Object.keys(res.data)[0]
            const queryResult = JSON.parse(res.data[dataKey].queryResult)
            if (queryResult.code === 200) {
              resolve(queryResult)
              console.group('京东接口请求成功')
              console.log(queryResult)
              console.groupEnd()
            } else {
              reject({
                errMsg: queryResult.message
              })
            }
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
  ddk: PddRequest(config.ddk),
  jd: JdRequest(config.jd)
}

export {
  thirdRequest,
  joinedParams
}