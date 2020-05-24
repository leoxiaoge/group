// components/navigationBar/navigationBar.js
const util = require('../../utils/util.js');

Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    show: false,
    centerText: '团长助理',
    center: '/static/images/logo.png',
    suggestionsText: '投诉与建议',
    suggestions: 'http://idlefish-autoui.oss-cn-hangzhou.aliyuncs.com/aliyun_k8s%2Fai_image%2F3ee94c0b62fb6619e86f6173f1b70d70.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 跳转到团长中心页面
    centerTa() {
      util.navigateTo('/pages/center/index/index')
    },
    // 控制投诉与建议组件显示
    suggestionsTap() {
      let show = !this.data.show
      this.setData({
        show: show
      })
    }
  }
})