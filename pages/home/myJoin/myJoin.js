// pages/home/myJoin/myJoin.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '我是小小宝',
    successIcon: '/static/images/success_icon.png',
    searchIcon: '/static/images/search_icon.png',
    share: '/static/images/share.png',

    list: [{
      status: '距结束',
      time: '3天12小时37分',
      images: ['/static/images/logo.png', '/static/images/logo.png', '/static/images/logo.png'],
      label: ['新鲜', '多汁', '做法简单', '送货上门'],
      title: '澳洲进口牛尾巴 入口即化 1500g/份',
      subtitle: '牛排，或称牛扒，是块状的牛肉，是西餐中最常见的食物之一。是西餐中最常见的食物之一。',
      number: 128,
      participants: ['/static/images/logo.png', '/static/images/logo.png', '/static/images/logo.png']
    }]
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

  },

  // 分享事件
  shareTap: function () {
    this.setData({
      isShare: true
    })
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