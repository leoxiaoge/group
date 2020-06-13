// pages/home/applyFill/applyFill.js
const util = require('../../../utils/util.js')
const api = require('../../../config/api.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    cardInfo: '', // 身份证识别信息
    faceUrl: '', // 身份证人像面
    backUrl: '', // 身份证国徽面
    active: 2, // 步骤数
    arrowIcon: '/static/images/arrow_icon.png',
    dateIcon: '/static/images/date_icon.png',
    locateIcon: '/static/images/locate_icon.png',
    startDate: '', // 开始时间
    endDate: '', // 结束时间
    mobile: '', // 手机号码
    TeamTitle: '', // 团队名称
    RealName: '', // 团长、创建人真实姓名
    Email: '', // 团长电子邮箱地址
    IDNumber: '', // 团长、创建人身份证号
    IDNumberValidType: 0, // 身份证有效期类型

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
    console.log(options)
    let cardInfo = options.cardInfo
    let faceUrl = options.faceUrl
    let backUrl = options.backUrl
    if (cardInfo) {
      this.setData({
        cardInfo: cardInfo,
        faceUrl: faceUrl,
        backUrl: backUrl
      })
    }
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

  // 微信获取手机号
  handleGetPhoneNumber (e) {
    console.log(e.detail.errMsg)
    console.log(e.detail.iv)
    console.log(e.detail.encryptedData)
    let iv =  e.detail.iv
    let encryptedData = e.detail.encryptedData
    let data = {
      iv: iv,
      encryptedData: encryptedData
    }
    util.request(api.WxPhoneNumberGet, data).then((res) => {
      console.log(res)
      let mobile = res.MobileInfo.phoneNumber
      this.setData({
        mobile: mobile
      })
    })
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

  // 提交信息
  submitTap: function () {
    let Mobile = this.data.mobile
    let TeamTitle = this.data.teamTitle
    let RealName = this.data.realName
    let Email = this.data.email
    let IDNumber = this.data.cardInfo.IDNumber
    let IDNumberValidType = this.data.cardInfo.IDNumberValidType
    let IDNumberRanges = this.data.cardInfo.IDNumberRanges
    let IDNumberFace = this.data.faceUrl
    let IDNumberBack = this.data.backUrl
    let data = {
      Mobile: Mobile,
      TeamTitle: TeamTitle,
      RealName: RealName,
      Email: Email,
      IDNumber: IDNumber,
      IDNumberValidType: IDNumberValidType,
      IDNumberRanges: IDNumberRanges,
      IDNumberFace: IDNumberFace,
      IDNumberBack: IDNumberBack
    }
    util.request(api.IDCardImageUpload, data).then((res) => {
      console.log(res)
      util.navigateTo('/pages/home/applyAudit/applyAudit')
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