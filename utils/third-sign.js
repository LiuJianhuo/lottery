// 拼多多请求参数签名
// 参数按首字母排序，再参数值参数名拼接，前后加上secret
const md5 = require('js-md5')
const pddParamsSign = (params, secret) => {
  if (typeof params !== 'object') {
    return
  }
  // 升序排序
  const ascOrederedKey = Object.keys(params).sort((a, b) => a.localeCompare(b))
  const temp = [secret]
  console.log(ascOrederedKey)
  for (let key of ascOrederedKey) {
    temp.push(key)
    temp.push(params[key])
  }
  temp.push(secret)
  // 拼接，使用MD5签名
  return md5(temp.join('')).toUpperCase()
}

export {
  pddParamsSign
}