// components/navigationBar/index.js
const app = getApp()
const util = require('../../utils/util.js')
const user = require('../../utils/user.js')

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    hasLogin: { // 是否已登录
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    show: false,
    centerText: '团长助理',
    center: '/static/images/home.png',
    suggestionsText: '投诉与建议',
    suggestions: '/static/images/feedback.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 跳转到团长中心页面
    async centerTap (e) {
      let userInfo = e.detail.userInfo
      if (userInfo) {
        if (!app.globalData.hasLogin) {
          await user.loginByWeixin(userInfo)
        }
        util.navigateTo('/pages/ucenter/index/index')
      } else {
        util.showToast('更好的体验，请授权登录！')
      }
    },

    // 控制投诉与建议组件显示
    async suggestionsTap (e) {
      let userInfo = e.detail.userInfo
      if (userInfo) {
        if (!app.globalData.hasLogin) {
          await user.loginByWeixin(userInfo)
        }
        let show = !this.data.show
        this.setData({
          show: show
        })
      } else {
        util.showToast('更好的体验，请授权登录！')
      }
    },

    // 子组件事件
    myeventTap () {
      let show = !this.data.show
      this.setData({
        show: show
      })
    }
  }
})