
const loaderMoreBehavior = Behavior({
  data: {
    loaderMoreBeh: false
  },
  methods: {
    // 显示加载更多图标
    showLoaderMoreBeh () {
      this.setLoaderMoreStatus(true)
    },
    hidenLoaderMoreBeh () {
      this.setLoaderMoreStatus(false)
    },
    setLoaderMoreStatus () {
      this.setData({
        loaderMoreBeh: status
      })
    }
  }
})

export default {
  loaderMoreBehavior
}