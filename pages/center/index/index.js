// pages/center/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    navigation: [{
      text: '我要开团', // 文字
      icon: '/static/images/all_orders.png', // 图标名称或图片链接
      dot: true, // 是否显示图标右上角小红点
      info: '99', // 图标右上角徽标的内容
      url: '/pages/home/order/order', // 点击后跳转的链接地址
      linkType: 'navigateTo' // 链接跳转类型，可选值为 redirectTo switchTab reLaunch
    }, {
      text: '待付款',
      icon: '/static/images/pending_payment.png',
      dot: false,
      info: '99',
      url: '/pages/home/order/order',
      linkType: 'navigateTo'
    }, {
      text: '待收货',
      icon: '/static/images/to_receipt.png',
      dot: false,
      info: '99',
      url: '/pages/home/order/order',
      linkType: 'navigateTo'
    }, {
      text: '我的参团',
      icon: '/static/images/my_jion.png',
      dot: false,
      info: '99',
      url: '/pages/home/join/join',
      linkType: 'navigateTo'
    }, {
      text: '我要开团',
      icon: '/static/images/to_application.png',
      dot: false,
      info: '99',
      url: '/pages/home/applyUpload/applyUpload',
      linkType: 'navigateTo'
    }],
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