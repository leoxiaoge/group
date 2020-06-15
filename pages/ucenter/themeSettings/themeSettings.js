// pages/ucenter/themeSettings/themeSettings.js
const util = require('../../../utils/util.js')
const api = require('../../../config/api.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    rgb: 'rgb(255,92,39)',
    pick: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getTeamParaList()
  },

  // 获取团长相关设置
  getTeamParaList: function () {
    let rgb = this.data.rgb
    let data = {}
    util.request(api.TeamParaListGet, data).then((res) => {
      let parament = res.Paraments
      parament.forEach(item => {
        if (item.ParaKey === 'SubStockOpt') {
          rgb = item.ParaValue
        }
      })
      this.setData({
        rgb: rgb
      })
    })
  },

  // 弹窗显示
  toPick: function () {
    this.setData({
      pick: true
    })
  },

  // 颜色
  pickColor: function (e) {
    let rgb = e.detail.color
    this.setData({
      rgb
    })
    // 以下为rgb转hex的实例
    let hex = this.rgb2hex(rgb)
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: hex,
      animation: {
        duration: 400,
        timingFunc: 'easeIn'
      }
    })
  },

  // rgb转hex
  rgb2hex: function (color) {
    let rgb = color.split(',')
    let r = parseInt(rgb[0].split('(')[1])
    let g = parseInt(rgb[1])
    let b = parseInt(rgb[2].split(')')[0])
    let hex = '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
    return hex
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})