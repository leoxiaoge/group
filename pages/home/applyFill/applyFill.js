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
    beginDate: '', // 开始时间
    endDate: '', // 结束时间
    mobile: '', // 手机号码
    teamTitle: '', // 团队名称
    realName: '', // 团长、创建人真实姓名
    email: '', // 团长电子邮箱地址
    idNumber: '', // 团长、创建人身份证号
    idNumberValidType: 0, // 身份证有效期类型
    idNumberValidTypeText: '',  // 身份证有效期文字
    distId: '', // 已选择小区id
    distList: [], // 已选择小区
    itemList: ['非长期有效', '长期有效'],

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
    let faceUrl = options.faceUrl
    let backUrl = options.backUrl
    if (options.cardInfo) {
      let cardInfo = JSON.parse(options.cardInfo)
      if (cardInfo.beginDate && cardInfo.endDate) {
        this.setData({
          idNumberValidType: 0
        })
        this.showActionSheetText()
      }
      if (cardInfo) {
        this.setData({
          cardInfo: cardInfo,
          realName: cardInfo.name,
          idNumber: cardInfo.IdNumber,
          beginDate: cardInfo.beginDate,
          endDate: cardInfo.endDate,
          faceUrl: faceUrl,
          backUrl: backUrl
        })
      }
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
    if (iv && encryptedData) {
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
    } else {
      util.showToast('请授权获取手机号！')
    }
  },

  // 团队名称输入
  getTeamTitle: function (e) {
    console.log(e)
    let teamTitle = e.detail.value
    this.setData({
      teamTitle: teamTitle
    })
  },

  // 创建人输入
  getRealName: function (e) {
    let realName = e.detail.value
    this.setData({
      realName: realName
    })
  },

  // 电子邮箱输入
  getEmail: function (e) {
    let email = e.detail.value
    this.setData({
      email: email
    })
  },

  // 身份证号输入
  getIDNumber: function (e) {
    let idNumber = e.detail.value
    this.setData({
      idNumber: idNumber
    })
  },

  // 选择有效期类型
  showActionSheet: function () {
    let itemList = this.data.itemList
    util.showActionSheet(itemList).then((res) => {
      console.log(res)
      console.log(res.tapIndex)
      let idNumberValidType = res.tapIndex
      this.setData({
        idNumberValidType: idNumberValidType
      })
      this.showActionSheetText()
    })
  },

  showActionSheetText: function () {
    let idNumberValidType = this.data.idNumberValidType
    let itemList = this.data.itemList
    itemList.forEach((item, i) => {
      if (idNumberValidType === i) {
        let idNumberValidTypeText = itemList[i]
        this.setData({
          idNumberValidTypeText: idNumberValidTypeText
        })
      }
    })
  },

  // 开始时间选择器
  bindStartDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      beginDate: e.detail.value
    })
  },

  // 结束时间选择器
  bindEndDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      endDate: e.detail.value
    })
  },

  // 选择小区
  selectTap: function () {
    let isCheckbox = true
    let isFrom = true
    let url =  `/pages/home/select/select?isCheckbox=${isCheckbox}&isFrom=${isFrom}`
    util.navigateTo(url)
  },

  // 提交信息
  submitTap: function () {
    let Mobile = this.data.mobile
    let TeamTitle = this.data.teamTitle
    let RealName = this.data.realName
    let Email = this.data.email
    let IDNumber = this.data.idNumber
    let IDNumberValidType = this.data.idNumberValidType
    let IDNumberRanges = `${this.data.beginDate},${this.data.endDate}`
    let IDNumberFace = this.data.faceUrl
    let IDNumberBack = this.data.backUrl
    let DistIDs = this.data.distId
    let data = {
      Mobile: Mobile,
      TeamTitle: TeamTitle,
      RealName: RealName,
      Email: Email,
      IDNumber: IDNumber,
      IDNumberValidType: IDNumberValidType,
      IDNumberRanges: IDNumberRanges,
      IDNumberFace: IDNumberFace,
      IDNumberBack: IDNumberBack,
      DistIDs: DistIDs
    }
    util.request(api.TeamAdd, data).then((res) => {
      console.log(res)
      util.showToast('提交成功，等待审核！')
      let isAutoAudit = res.IsAutoAudit
      let url = `/pages/home/applyAudit/applyAudit?isAutoAudit=${isAutoAudit}`
      util.navigateTo(url)
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
  onShareAppMessage: function (e) {
    return util.onShareAppMessage(e)
  }
})