// components/red-packet/red-packet.js
const audio = wx.createInnerAudioContext()
audio.src = '/static/audio/rc-upload.mp3'

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
    open: false,
    closeIcon: '/static/images/close_packet_icon.png',
    redPacketOpen: '/static/images/red-packet-open.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 处理冒泡事件
    catchPacket () {
      console.log(this.data.open)
    },

    // 打开红包事件
    handleOpen () {
      audio.play()
      this.setData({ 
        open: true 
      })
    },

    // 关闭
    closeTap () {
      let show = !this.data.show
      this.setData({ 
        show: show
      })
    }
  }
})
