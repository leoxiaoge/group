// components/popup-picker/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
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

  }
})
