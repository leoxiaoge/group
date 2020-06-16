//index.js
const app = getApp()
const user = require('../../utils/user.js')
const util = require('../../utils/util.js')
const api = require('../../config/api.js')

Page({
  data: {
    distName: '选择小区', // 小区名称
    waitPayOrders: '', // 待付款的订单笔数
    waitRecviveGoodsOrders: '', // 待收货订单笔数，需要在按钮右上角做角标
    myBuyings: '', // 用户已参与，但尚未完成的团购活动数量（即我的团购右上角徽章显示的数字），指用户有参与，但订单尚未完成的团购活动数量
    teams: [], // 附近的团长列表，用于指定和当前用户所在小区关联的团长的列表
    buyings: [], // 附近的团购列表，用于指定和当前用户所在小区关联的、正在进行中、和已结束的团购活动列表，API已排好序，进行中的排在前面，结束的排后面
    userInfo: '', // 用户信息
    distInfo: '', // 用户所在的小区信息
    isTeam: false, // 是否团长、或者某个团队的成员
    hasLogin: false, // 是否登录
    userLocation: false, // 是否开启定位
    locateIcon: '/static/images/locate_icon.png',
    dropDownIcon: '/static/images/drop_down.png',
    empty: '/static/images/empty_home.png',
    share: '/static/images/share.png',
    autoplay: true, // 是否自动切换
    indicatorDots: false, // 是否显示面板指示点
    circular: true, // 是否采用衔接滑动
    isOpen: true, // 是否显示红包组件
    isShare: false, // 是否显示分享组件
    navigation: [{
      text: '全部订单', // 文字
      icon: '/static/images/all_orders.png', // 图标名称或图片链接
      dot: false, // 是否显示图标右上角小红点
      info: 0, // 图标右上角徽标的内容
      url: '/pages/home/order/order', // 点击后跳转的链接地址
      linkType: 'navigateTo' // 链接跳转类型，可选值为 redirectTo switchTab reLaunch
    }, {
      text: '待付款',
      icon: '/static/images/pending_payment.png',
      dot: false,
      info: 0,
      url: '/pages/home/order/order',
      linkType: 'navigateTo'
    }, {
      text: '待收货',
      icon: '/static/images/to_receipt.png',
      dot: false,
      info: 0,
      url: '/pages/home/order/order',
      linkType: 'navigateTo'
    }, {
      text: '我的参团',
      icon: '/static/images/my_jion.png',
      dot: false,
      info: 0,
      url: '/pages/home/join/join',
      linkType: 'navigateTo'
    }, {
      text: '我要开团',
      icon: '/static/images/to_application.png',
      dot: false,
      info: 0,
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.location()
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
    if (!app.globalData.hasLogin) {
      this.setData({
        hasLogin: false
      })
    } else {
      this.getUser()
      this.getTeam()
      this.getUserHomePage()
    }
    this.getSetting()
  },

  // 获取当前用户信息
  getUser: function () {
    let data = {}
    util.request(api.UserGet, data).then((res) => {
      console.log(res)
      let userInfo = res.UserInfo
      let distInfo = res.DistInfo
      wx.setStorageSync('userInfo', userInfo)
      wx.setStorageSync('distInfo', distInfo)
      let isTeam = res.IsTeam
      let distName = res.DistInfo.DistName
      if (distInfo) {
        this.setData({
          distInfo: distInfo,
          distName: distName
        })
      }
      this.setData({
        userInfo: userInfo,
        isTeam: isTeam,
        hasLogin: app.globalData.hasLogin
      })
    })
  },

  // 获取团长注册信息详情
  getTeam: function () {
    let navigation = this.data.navigation
    let data = {}
    util.request(api.TeamGet, data).then((res) => {
      console.log(res)
      let auditStatus = res.TeamInfo.AuditStatus
      if (auditStatus) {
        navigation.forEach((item, i) => {
          if (i === 4) {
            let url = `/pages/home/applyAudit/applyAudit?auditStatus=${auditStatus}`
            if (auditStatus == 1) {
              url = '/pages/ucenter/openGroup/openGroup'
            }
            item.url = url
          }
        })
        this.setData({
          navigation: navigation
        })
      }
      this.setData({
        auditStatus: auditStatus
      })
    })
  },

  // 获取首页相关信息
  getUserHomePage: function () {
    let data = {}
    util.request(api.UserHomePageGet, data).then((res) => {
      console.log(res)
      let waitPayOrders = res.WaitPayOrders
      let waitRecviveGoodsOrders = res.WaitRecviveGoodsOrders
      let myBuyings = res.MyBuyings
      let teams = res.Teams
      let buyings = res.Buyings
      let navigation = this.data.navigation
      navigation.forEach((item, i) => {
        if (i === 0) {
          item.info = myBuyings
          if (myBuyings > 0) {
            item.dot = true
          }
        }
        if (i === 1) {
          item.info = waitPayOrders
          if (waitPayOrders > 0) {
            item.dot = true
          }
        }
        if (i === 2) {
          item.info = waitRecviveGoodsOrders
          if (waitRecviveGoodsOrders > 0) {
            item.dot = true
          }
        }
      })
      this.setData({
        waitPayOrders: waitPayOrders,
        waitRecviveGoodsOrders: waitRecviveGoodsOrders,
        myBuyings: myBuyings,
        teams: teams,
        buyings: buyings,
        navigation: navigation
      })
    }).catch((err) => {
      console.log(err)
      this.setData({
        show: false
      })
    })
  },

  // 获取定位
  location: async function () {
    wx.showLoading({
      title: '定位中...',
    })
    await util.location().then((res) => {
      console.log(res)
      wx.hideLoading()
      this.setData({
        userLocation: false
      })
    }).catch((err) => {
      console.log(err)
      util.showToast('更好的体验，请授权设置！')
      this.setData({
        userLocation: true
      })
    })
  },

  // 获取系统设置
  getSetting: function () {
    wx.getSetting({
      success: res => {
        console.log(res)
        if (res.authSetting['scope.userLocation']) {
          this.setData({
            userLocation: false
          })
        }
        if (!res.authSetting['scope.userLocation']) {
          this.setData({
            userLocation: true
          })
        }
      }
    })
  },

  // 系统设置
  openSettingTap: function () {
    wx.openSetting({
      success (res) {
        console.log(res.authSetting)
      }
    })
  },

  // 登录获取用户信息
  getuserinfo: async function (e) {
    let userInfo = e.detail.userInfo
    if (userInfo) {
      await user.loginByWeixin(userInfo)
      this.getUser()
      this.getUserHomePage()
    } else {
      app.globalData.hasLogin = false
      util.showToast('更好的体验，请授权登录！')
    }
  },

  // 暂不登录
  notgetuserinfo: function (e) {
    console.log(e)
    app.globalData.hasLogin = false
    util.showToast('更好的体验，请进行授权登录！')
  },

  // 选择小区
  selectTap: async function (e) {
    let userInfo = e.detail.userInfo
    if (userInfo) {
      if (!app.globalData.hasLogin) {
        await user.loginByWeixin(userInfo)
      }
      util.navigateTo('/pages/home/select/select')
    } else {
      app.globalData.hasLogin = false
      util.showToast('更好的体验，请授权登录！')
    }
  },

  // 菜单导航
  navigationTap: async function (e) {
    console.log(e)
    let userInfo = e.detail.userInfo
    if (userInfo) {
      if (!app.globalData.hasLogin) {
        await user.loginByWeixin(userInfo)
        await this.getTeam()
      }
      let url = e.currentTarget.dataset.url
      util.navigateTo(url)
    } else {
      app.globalData.hasLogin = false
      util.showToast('更好的体验，请授权登录！')
    }
  },

  // 分享事件
  shareTap: function () {
    this.setData({
      isShare: true
    })
  },

  // 申请团长
  applyTap: async function (e) {
    let userInfo = e.detail.userInfo
    if (userInfo) {
      if (!app.globalData.hasLogin) {
        await user.loginByWeixin(userInfo)
        await this.getTeam()
      }
      let auditStatus = this.data.auditStatus
      if (auditStatus) {
        let url = `/pages/home/applyAudit/applyAudit?auditStatus=${auditStatus}`
        util.navigateTo(url)
      } else {
        util.navigateTo('/pages/home/applyFill/applyFill')
      }
    } else {
      app.globalData.hasLogin = false
      util.showToast('更好的体验，请授权登录！')
    }
  },

  // 用户的团购
  userTap: function () {
    util.navigateTo('/pages/home/myJoin/myJoin')
  },

  // 详情页
  detailTap: function () {
    util.navigateTo('/pages/home/detail/detail')
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
    this.getUserHomePage()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (e) {
    return util.onShareAppMessage(e)
  }
})