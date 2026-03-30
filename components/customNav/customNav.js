const app = getApp()
Component({
  properties: {
    // 导航标题
    title: {
      type: String,
      value: ''
    },
    // 背景色
    bgColor: {
      type: String,
      value: '#ffffff'
    },
    // 标题文字颜色
    titleColor: {
      type: String,
      value: '#333333'
    },
    // 是否展示返回按钮
    showBack: {
      type: Boolean,
      value: true
    }
  },

  data: {
    statusBarHeight: app.globalData.statusBarHeight,
    navHeight: app.globalData.customNavHeight
  },

  methods: {
    // 返回上一页
    goBack() {
      const pages = getCurrentPages()
      if (pages.length <= 1) {
        // 首页返回主页
        wx.switchTab({ url: '/pages/index/index' })
      } else {
        wx.navigateBack()
      }
    }
  }
})