// pages/center/index/index.js
const util = require('../../../utils/util.js')
const api = require('../../../config/api.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataSettingsTitle: '团队头像、名称、介绍',
    communityManagementTitle: '',
    leagueManagementTitle: '',
    inventorySettingsTitle: '',
    themeSettingsTitle: '',
    collectionCodeTitle: '',
    dataSettingsIcon: '/static/images/data_settings.png',
    communityManagementIcon: '/static/images/community_management.png',
    leagueManagementIcon: '/static/images/league_management.png',
    inventorySettingsIcon: '/static/images/inventory_settings.png',
    themeSettingsIcon: '/static/images/inventory_settings.png',
    collectionCodeIcon: '/static/images/collection_code.png',
    contactCenterIcon: '/static/images/contact_center.png',
    arrowIcon: '/static/images/arrow_icon.png',

    navigation: [{
      text: '我要开团', // 文字
      icon: '/static/images/open_group.png', // 图标名称或图片链接
      dot: false, // 是否显示图标右上角小红点
      info: 0, // 图标右上角徽标的内容
      url: '/pages/ucenter/openGroup/openGroup', // 点击后跳转的链接地址
      linkType: 'navigateTo' // 链接跳转类型，可选值为 redirectTo switchTab reLaunch
    }, {
      text: '订单中心',
      icon: '/static/images/order_center.png',
      dot: false,
      info: 0,
      url: '/pages/ucenter/orderCenter/orderCenter',
      linkType: 'navigateTo'
    }, {
      text: '我的团购',
      icon: '/static/images/my_group.png',
      dot: false,
      info: 0,
      url: '/pages/ucenter/myGroup/myGroup',
      linkType: 'navigateTo'
    }, {
      text: '商品库',
      icon: '/static/images/commodity_library.png',
      dot: false,
      info: 0,
      url: '/pages/ucenter/commodityLibrary/commodityLibrary',
      linkType: 'navigateTo'
    }, {
      text: '数据分析',
      icon: '/static/images/data_analysis.png',
      dot: false,
      info: 0,
      url: '/pages/ucenter/dataAnalysis/dataAnalysis',
      linkType: 'navigateTo'
    }],
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
    this.getTeam()
    this.getTeamParaList()
  },

  // 获取团长注册信息详情
  getTeam: function () {
    let data = {}
    util.request(api.TeamGet, data).then((res) => {
      console.log(res)
      let distInfo = res.DistInfo
      let teamUsers = res.TeamUsers
      let communityManagementTitle = `已选择${distInfo.length}个小区`
      let leagueManagementTitle = `共${teamUsers.length}人`
      this.setData({
        communityManagementTitle: communityManagementTitle,
        leagueManagementTitle: leagueManagementTitle
      })
    })
  },

  // 获取团长相关设置
  getTeamParaList: function () {
    let inventorySettingsTitle = this.data.inventorySettingsTitle
    let collectionCodeTitle = this.data.collectionCodeTitle
    let data = {}
    util.request(api.TeamParaListGet, data).then((res) => {
      console.log(res)
      let parament = res.Paraments
      parament.forEach(item => {
        console.log(item)
        if (item.ParaKey === 'SubStockOpt') {
          if (item.ParaValue === '0') {
            inventorySettingsTitle = '下单扣减库存'
          } else if (item.ParaValue === '1') {
            inventorySettingsTitle = '付款成功扣减库存'
          }
        }
        if (item.ParaKey === 'WXPayCodeUrl') {
          if (item.ParaValue) {
            collectionCodeTitle = '已上传'
          } else {
            collectionCodeTitle = '待上传'
          }
        }
      })
      this.setData({
        inventorySettingsTitle: inventorySettingsTitle,
        collectionCodeTitle: collectionCodeTitle
      })
    })
  },

  // 导航跳转
  navigationTap: function (e) {
    let url = e.currentTarget.dataset.url
    util.navigateTo(url)
  },

  // 资料设置
  dataSettingsTap: function () {
    util.navigateTo('/pages/ucenter/dataSettings/dataSettings')
  },

  // 小区管理
  communityManagementTap: function () {
    util.navigateTo('/pages/ucenter/communityManagement/communityManagement')
  },

  // 团员管理
  leagueManagementTap: function () {
    util.navigateTo('/pages/ucenter/leagueManagement/leagueManagement')
  },

  // 库存设置
  inventorySettingsTap: function () {
    util.navigateTo('/pages/ucenter/inventorySettings/inventorySettings')
  },

  // 主题设置
  themeSettingsTap: function () {
    util.navigateTo('/pages/ucenter/themeSettings/themeSettings')
  },

  // 我的收款码
  collectionCodeTap: function () {
    util.navigateTo('/pages/ucenter/collectionCode/collectionCode')
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
    this.getTeam()
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