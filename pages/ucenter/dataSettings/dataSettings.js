// pages/ucenter/dataSettings/dataSettings.js
const util = require('../../../utils/util.js')
const api = require('../../../config/api.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showPopup: false, // 弹窗
    avatar: '', // 头像
    teamFaceUrl: '', // 图队头像地址
    teamTitle: '', // 团队的名称
    aboutText: '', // 团队的文字描述
    arrowIcon: '/static/images/arrow_icon.png',
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
    this.getTeam()
  },

  // 获取团长注册信息详情
  getTeam: function () {
    let data = {}
    util.request(api.TeamGet, data).then((res) => {
      console.log(res)
      let teamInfo = res.TeamInfo
      let teamTitle = teamInfo.TeamTitle
      let avatar = teamInfo.TeamIconUrl
      let aboutText = teamInfo.AboutText
      this.setData({
        avatar: avatar,
        teamTitle: teamTitle,
        aboutText: aboutText
      })
    })
  },

  // 上传图片
  chooseFaceImage: function () {
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: (res) => {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        let tempFilePaths = res.tempFilePaths
        console.log('tempFilePaths', tempFilePaths)
        let data = {}
        let path = tempFilePaths[0]
        util.uploadFile(api.ImageVideoUpload, data, path).then((res) => {
          console.log(res)
          let data = JSON.parse(res)
          let teamFaceUrl = data.UploadFiles[0].Value
          console.log(data)
          console.log(teamFaceUrl)
          this.setData({
            avatar: tempFilePaths,
            teamFaceUrl: teamFaceUrl
          })
        })
      }
    })
  },

  // 团队名称弹窗显示
  popupTap: function () {
    let showPopup = !this.data.showPopup
    this.setData({
      showPopup: showPopup
    })
  },

  // 团队名称输入
  catchInput: function (e) {
    console.log(e)
    let teamTitle = e.detail.value
    this.setData({
      teamTitle: teamTitle
    })
  },

  // 文本输入
  textareaInput: function (e) {
    console.log(e)
    let aboutText = e.detail.value
    this.setData({
      aboutText: aboutText
    })
  },

  // 提交信息
  submitTap: function () {
    let TeamFaceUrl = this.data.teamFaceUrl
    let TeamTitle = this.data.teamTitle
    let AboutText = this.data.aboutText
    let data = {
      TeamFaceUrl: TeamFaceUrl,
      TeamTitle: TeamTitle,
      AboutText: AboutText
    }
    util.request(api.TeamAboutSet, data).then((res) => {
      console.log(res)
      util.showToast('提交成功！')
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