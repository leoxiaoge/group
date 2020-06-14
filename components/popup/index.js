// components/popup/index.js
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
   * 启用插槽
   */
  options: {
    multipleSlots: true
  },

  /**
   * 组件的初始数据
   */
  data: {
    closeIcon: '/static/images/hide_icon.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 处理冒泡事件，禁止滚动
    preventdefault () {
      console.log('冒泡事件')
    },
    // 显示或者隐藏事件
    popupTap () {
      let show = !this.data.show
      this.setData({
        show: show
      })
    },
  }
})
