// pages/home/applyFill/applyFill.js
const util = require('../../../utils/util.js')
const api = require('../../../config/api.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 2,
    arrowIcon: '/static/images/arrow_icon.png',
    dateIcon: '/static/images/date_icon.png',
    locateIcon: '/static/images/locate_icon.png',
    startDate: '',
    endDate: '',

    list: [{
      name: '万科鲸鱼小区',
      locate: '深圳市龙华区小点声001号'
    }, {
      name: '万科鲸鱼小区',
      locate: '深圳市龙华区小点声001号'
    }, {
      name: '万科鲸鱼小区',
      locate: '深圳市龙华区小点声001号'
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  },

  // 选择有效期类型
  showActionSheet: function () {
    let itemList = ['非长期有效', '长期有效']
    util.showActionSheet(itemList).then((res) => {
      console.log(res)
      console.log(res.tapIndex)
    })
  },

  // 开始时间选择器
  bindStartDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      startDate: e.detail.value
    })
  },

  // 结束时间选择器
  bindEndDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      endDate: e.detail.value
    })
  },

  // 下一步
  submitTap: function () {
    util.navigateTo('/pages/home/applyAudit/applyAudit')
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