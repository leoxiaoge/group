//index.js
//获取应用实例
const app = getApp()
const util = require('../../utils/util.js');
const api = require('../../config/api.js');

Page({
  data: {
    mapIcon: 'http://idlefish-autoui.oss-cn-hangzhou.aliyuncs.com/aliyun_k8s%2Fai_image%2F1fb93fe7c2d0552f7bca6ab8714ceb61.png',
    mapDown: 'http://idlefish-autoui.oss-cn-hangzhou.aliyuncs.com/aliyun_k8s%2Fai_image%2F71d1634fc5081d28020952fa8e128a4e.png',
    empty: 'http://idlefish-autoui.oss-cn-hangzhou.aliyuncs.com/aliyun_k8s%2Fai_image%2F9470827dd4e20a500f85d02789a9633d.png',
    share: '/static/images/logo.png',
    autoplay: true,
    indicatorDots: false,
    circular: true,
    navigation: [{
      text: '全部订单', // 文字
      icon: 'http://idlefish-autoui.oss-cn-hangzhou.aliyuncs.com/aliyun_k8s%2Fai_image%2F3575651de53b0b56a8780e7354e4ec26.png', // 图标名称或图片链接
      dot: true, // 是否显示图标右上角小红点
      info: '99', // 图标右上角徽标的内容
      url: '', // 点击后跳转的链接地址
      linkType: 'navigateTo' // 链接跳转类型，可选值为 redirectTo switchTab reLaunch
    }, {
      text: '待付款',
      icon: '/static/images/logo.png',
      dot: false,
      info: '99',
      url: '',
      linkType: 'navigateTo'
    }, {
      text: '待收货',
      icon: '/static/images/logo.png',
      dot: false,
      info: '99',
      url: '',
      linkType: 'navigateTo'
    }, {
      text: '我的参团',
      icon: '/static/images/logo.png',
      dot: false,
      info: '99',
      url: '',
      linkType: 'navigateTo'
    }, {
      text: '我要开团',
      icon: '/static/images/logo.png',
      dot: false,
      info: '99',
      url: '',
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
      participants: ['/static/images/logo.png', '/static/images/logo.png', '/static/images/logo.png']
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

  },
  selectTap: function () {
    util.navigateTo('../home/select/select')
  }
})