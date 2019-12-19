const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const checkMobile = val => {
  return /^(\d{11})$/.test(val)
}


// 本封装请求类只针对请求本项目后端服务
class Request {
  constructor(config={}) {
    this.baseUrl = config.baseUrl
    this.debug = config.debug
    this.postHeader = {
      // 'Content-Type': 'application/x-www-form-urlencoded'
    }
  }

  get({ url, data }) {
    return this.request({method: 'GET', url, data})
  }
  post({ url, data }) {
    return this.request({method: 'POST', url, data, header: this.postHeader})
  }
  request({ method, url, data, header={} }) {
    console.log('----------', method, '--------', header)
    const record = ({ url, method, data, result}) => {
      if (this.debug) {
        console.group()
        console.log(method, ' --- ', url)
        console.log('data:', data ? data : null)
        console.log('res:', result)
        console.groupEnd()
      }
    }
    const self = this
    let requestTask = null
    const promise = new Promise(function (resolve, reject) {
      url = self.baseUrl + (url.indexOf('/') === 0 ? url : '/' + url)
      requestTask = wx.request({
        url,
        data,
        method,
        header,
        success(res) {
          // 跟踪记录
          record({ data, method, url, result:res})
          if (res.data.code === undefined || res.data.code === 200) {
            resolve(res.data.content)
          } else {
            resolve(new Error(res.data.message))
          }
        },
        fail(err) {
          record({ data, method, url, result:err })
          reject(err)
        }
      })
    })
    promise.requestTask = requestTask 
    return promise
  }

  setPostHeader(header) {
    if (header && typeof header === 'object') {
      this.postHeader = Object.assign(this.postHeader, header)
    }
  }
}
const reqConfig = require('../apis/api.config.js')
const request = new Request(reqConfig)


module.exports = {
  formatTime: formatTime,
  checkMobile: checkMobile,
  request
}
