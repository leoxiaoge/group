//app.js
const user = require('./utils/user.js')
const util = require('./utils/util.js')
const api = require('./config/api.js')

App({
  onLaunch: function () {
    const updateManager = wx.getUpdateManager()
    wx.getUpdateManager().onUpdateReady(() => {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success: res => {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        }
      })
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
              user.loginByWeixin(res.userInfo) // 调用登录，保持长连接
            }
          })
        }
      }
    })
  },
  onShow: function () {
    let sessionKey = wx.getStorageSync('SessionKey')
    if (sessionKey) {
      this.globalData.hasLogin = true
    } else {
      this.globalData.hasLogin = false
    }
  },
  globalData: {
    hasLogin: false,
    userInfo: null,
    distInfo: null
  }
})