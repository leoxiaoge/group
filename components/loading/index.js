// components/loading/index.js
import { addUnit } from '../common/utils'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    color: String,
    vertical: Boolean,
    type: {
      type: String,
      value: 'circular',
    },
    size: {
      type: String,
      observer: 'setSizeWithUnit',
    },
    textSize: {
      type: String,
      observer: 'setTextSizeWithUnit',
    },
  },

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {
    setSizeWithUnit (size) {
      this.setData({
        sizeWithUnit: addUnit(size),
      });
    },
    setTextSizeWithUnit (size) {
      this.setData({
        textSizeWithUnit: addUnit(size),
      });
    }
  },
});
