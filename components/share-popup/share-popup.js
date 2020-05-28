// components/share-popup/share-popup.js
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
    wechat: '/static/images/logo.png',
    poster: '/static/images/logo.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 显示或者隐藏事件
    popupTap () {
      let show = !this.data.show
      this.setData({
        show: show
      })
    },
    // 保存海报事件
    posterTap () {

    }
  }
})
