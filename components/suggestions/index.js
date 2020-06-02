// components/suggestions/index.js
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

  },

  /**
   * 组件的方法列表
   */
  methods: {
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

    // 提交按钮
    submitTap () {

    }
  }
})
