// pages/home/applyAudit/applyAudit.js
const util = require('../../../utils/util.js')
const api = require('../../../config/api.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 3, // 步骤数
    auditText: '', // 审核提示
    passedIcon: '/static/images/passed_icon.png'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let isAutoAudit = options.isAutoAudit // 是否通过认证
    let auditStatus = options.auditStatus // 认证状态
    if (isAutoAudit) {
      this.setData({
        isAutoAudit: isAutoAudit
      })
    }
    if (auditStatus) {
      this.setData({
        auditStatus: auditStatus
      })
      this.statusSwitch()
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

  // 获取团长注册信息详情
  getTeam: function () {
    let data = {}
    util.request(api.TeamGet, data).then((res) => {
      console.log(res)
      let auditStatus = res.TeamInfo.AuditStatus
      this.setData({
        auditStatus: auditStatus
      })
      this.statusSwitch()
    })
  },

  statusSwitch: function () {
    let auditStatus = this.data.auditStatus
    console.log(auditStatus)
    // 认证状态，0表示等待审核，1表示审核通过，2表示审核失败，3表示违规封号
    switch (auditStatus) {
    case '0':
      this.setData({
        isAutoAudit: false,
        auditText: '资料已提交审核中'
      })
      break
    case '1':
      this.setData({
        isAutoAudit: true,
        auditText: '审核通过'
      })
      break
    case '2':
      this.setData({
        isAutoAudit: false,
        auditText: '审核失败'
      })
      break
    case '3':
      this.setData({
        isAutoAudit: false,
        auditText: '违规封号'
      })
      break
    }
  },

  // 进入团长中心
  centerTap: function () {
    util.redirectTo('/pages/ucenter/index/index')
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