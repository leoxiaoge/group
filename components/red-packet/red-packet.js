// components/red-packet/red-packet.js
const audio = wx.createInnerAudioContext()
audio.src = '/static/audio/rc-upload.mp3'

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
    open: false,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleOpen() {
      audio.play()
      this.setData({ 
        open: true 
      })
    }
  }
})
