// components/popup-picker/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    show: {
      type: Boolean,
      value: false
    },
    cancel: {
      type: String,
      value: '取消'
    },
    confirm: {
      type: String,
      value: '确定'
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
    // 取消事件
    cancelTap () {
      var myEventDetail = {} // detail对象，提供给事件监听函数
      var myEventOption = {} // 触发事件的选项
      this.triggerEvent('cancel', myEventDetail, myEventOption)
      let show = !this.data.show
      this.setData({
        show: show
      })
    },
    // 确定事件
    confirmTap () {
      var myEventDetail = {} // detail对象，提供给事件监听函数
      var myEventOption = {} // 触发事件的选项
      this.triggerEvent('confirm', myEventDetail, myEventOption)
      let show = !this.data.show
      this.setData({
        show: show
      })
    }
  }
})
