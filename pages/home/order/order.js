// pages/home/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showType: 0,
    switchTab: [{
      title: '全部订单',
      info: 99
    }, {
      title: '待付款',
      info: 99
    }, {
      title: '待收货',
      info: 9
    }, {
      title: '已完成',
      info: 990
    }],

    order: [{
      title: 'orderorderorderorder',
      deliveryDate: '5.20(周三)',
      status: '待付款',
      list: [{
        img: '/static/images/logo.png',
        title: '12312313123123',
        price: 29.9,
        specification: '规格',
        number: 2,
        orderNum: '47899231321312344545'
      }],
      orderDate: '2020.5.12 13:57:42',
      total: 4,
      price: '136.2'
    }, {
      title: 'orderorderorderorder',
      deliveryDate: '5.20(周三)',
      status: '待付款',
      list: [{
        img: '/static/images/logo.png',
        title: '12312313123123',
        price: 29.9,
        specification: '规格',
        number: 2,
        orderNum: '47899231321312344545'
      }],
      orderDate: '2020.5.12 13:57:42',
      total: 4,
      price: '136.2'
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