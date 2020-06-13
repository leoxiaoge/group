// components/suggestions/index.js
const util = require('../../utils/util.js')
const api = require('../../config/api.js')

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    show: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    feedBackContext: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 处理冒泡事件，禁止滚动
    preventdefault () {
      console.log('冒泡事件')
    },

    // 冒泡事件
    catchTap () {
      console.log('冒泡事件')
    },

    // 弹窗显示隐藏
    showPupop () {
      var myEventDetail = {} // detail对象，提供给事件监听函数
      var myEventOption = {} // 触发事件的选项
      this.triggerEvent('myevent', myEventDetail, myEventOption)
    },

    // 文本内容
    feedBackInput: function (e) {
      let feedBackContext = e.detail.value
      this.setData({
        feedBackContext: feedBackContext
      })
    },

    // 提交按钮
    submitTap () {
      let FeedBackContext = this.data.feedBackContext
      if (!FeedBackContext) {
        util.showToast('请填写内容！')
        return
      }
      let data = {
        FeedBackContext: FeedBackContext
      }
      util.request(api.UserFeedBackCreate, data).then((res) => {
        console.log(res)
        util.showToast('提交成功！')
        this.showPupop()
      })
    }
  }
})
