App({
  globalData: {
    statusBarHeight: 0,
    customNavHeight: 0
  },

  onLaunch() {
    this.calcNavInfo()
  },

  calcNavInfo() {
    try {
      let statusBarHeight = 0;
      const deviceInfo = wx.getDeviceInfo()

      // 优先使用新API（无警告）
      if (wx.getWindowInfo) {
        const windowInfo = wx.getWindowInfo()
        console.log(windowInfo)
        // console.log(deviceInfo.system)
        statusBarHeight = windowInfo.statusBarHeight
      }
      // 兼容低版本（不会触发红色报错，只会忽略）
      else {
        const systemInfo = wx.getSystemInfoSync()
        statusBarHeight = systemInfo.statusBarHeight
      }

      // 胶囊按钮
      const menuRect = wx.getMenuButtonBoundingClientRect()
      const navContentH = (menuRect.top - statusBarHeight) * 2 + menuRect.height
      const customNavHeight = statusBarHeight + navContentH

      // 适配 IOS 顶部导航栏
      if (deviceInfo.system.indexOf('iOS') !== -1){
        this.globalData.statusBarHeight = statusBarHeight / 2.2
        console.log(this.globalData.statusBarHeight)
        this.globalData.customNavHeight = customNavHeight / 1.1
        console.log(this.globalData.customNavHeight)
      }else{
        this.globalData.statusBarHeight = statusBarHeight / 2
        console.log(this.globalData.statusBarHeight)
        this.globalData.customNavHeight = customNavHeight / 1.1
        console.log(this.globalData.customNavHeight)
      }

    } catch (err) {
      // 兜底
      this.globalData.statusBarHeight = 20
      this.globalData.customNavHeight = 64
    }
  }
})