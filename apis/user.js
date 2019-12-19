
const {request} = require('../utils/util.js')

const reqUserMobile = function () {
  request.get('login').then((res) => {
    console.log(res)
  }).catch((err) => {
    console.log(err)
  })
}

module.exports = {
  reqUserMobile
}