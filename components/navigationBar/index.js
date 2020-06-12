// components/navigationBar/index.js
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
    center: '/static/images/home.png',
    suggestionsText: '投诉与建议',
    suggestions: '/static/images/feedback.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 跳转到团长中心页面
    centerTap () {
      util.navigateTo('/pages/ucenter/index/index')
    },

    // 控制投诉与建议组件显示
    suggestionsTap () {
      let show = !this.data.show
      this.setData({
        show: show
      })
    }
  }
})