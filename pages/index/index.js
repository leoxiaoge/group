//index.js
//获取应用实例
const app = getApp()
const user = require('../../utils/user.js');
const util = require('../../utils/util.js');
const api = require('../../config/api.js');

Page({
  data: {
    locateIcon: '/static/images/locate_icon.png',
    dropDownIcon: '/static/images/drop_down.png',
    empty: '/static/images/empty_home.png',
    share: '/static/images/share.png',
    autoplay: true,
    indicatorDots: false,
    circular: true,
    isOpen: true, // 红包组件是否显示
    isShare: false, // 分享组件是否显示
    navigation: [{
      text: '全部订单', // 文字
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

    list: [{
      name: '吃货小达人',
      avatar: '/static/images/logo.png',
      status: '距结束',
      time: '3天12小时37分',
      images: ['/static/images/logo.png', '/static/images/logo.png', '/static/images/logo.png'],
      label: ['新鲜', '多汁', '做法简单', '送货上门'],
      title: '澳洲进口牛尾巴 入口即化 1500g/份',
      subtitle: '牛排，或称牛扒，是块状的牛肉，是西餐中最常见的食物之一。是西餐中最常见的食物之一。',
      number: 128,
      participants: ['/static/images/my_jion.png', '/static/images/logo.png', '/static/images/logo.png']
    }],
    nearbyList: [{
      avatar: '/static/images/logo.png',
      name: '大大大大大大大大大',
      status: 0,
      number: 8
    }, {
      avatar: '/static/images/logo.png',
      name: '大大大大大大大大大',
      status: 0,
      number: 8
    }, {
      avatar: '/static/images/logo.png',
      name: '大大大大大大大大大',
      status: 0,
      number: 8
    }]
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    let data = {}
    util.request(api.UserHomePageGet, data).then((res) => {
      console.log(res)
    })
  },

  onShow: function () {

  },

  // 获取用户信息
  getuserinfo: async function (e) {
    console.log('getUserInfo', e)
    app.userInfo = e.detail.userInfo
    await user.loginByWeixin(app.userInfo)
  },

  // 选择小区
  selectTap: function () {
    util.navigateTo('/pages/home/select/select')
  },

  // 菜单导航
  navigationTap: function (e) {
    console.log(e)
    let url = e.currentTarget.dataset.url
    util.navigateTo(url)
  },

  // 分享事件
  shareTap: function () {
    this.setData({
      isShare: true
    })
  },

  // 申请团长
  applyTap: function () {
    let userInfo = app.userInfo
    if (userInfo) {
      util.navigateTo('/pages/home/applyFill/applyFill')
    }
  },

  // 用户的团购
  userTap: function () {
    util.navigateTo('/pages/home/myJoin/myJoin')
  }
})