// pages/home/applyUpload/applyUpload.js
const util = require('../../../utils/util.js')
const api = require('../../../config/api.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    faceImage: '', // 人像面身份证图片
    backImage: '', // 国徽面身份证照片
    active: 1, // 步骤数
    positiveCard: '/static/images/positive_card.png',
    reverseCard: '/static/images/reverse_card.png',
    cameraIcon: '/static/images/camera_icon.png'
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

  },

  // 上传头像面
  chooseFaceImage: function () {
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: (res) => {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        let tempFilePaths = res.tempFilePaths
        let data = {
          file: tempFilePaths[0]
        }
        util.uploadFile(api.IDCardImageUpload, data).then((res) => {
          console.log(res)
          this.setData({
            backImage: tempFilePaths
          })
        })
      }
    })
  },

  // 上传国徽面
  chooseBackImage: function () {
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: (res) => {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        let tempFilePaths = res.tempFilePaths
        let data = {
          file: tempFilePaths[0]
        }
        util.uploadFile(api.IDCardImageUpload, data).then((res) => {
          console.log(res)
          this.setData({
            backImage: tempFilePaths
          })
        })
      }
    })
  },

  // 提交信息
  submitTap: function () {
    let FaceImage = this.data.faceImage
    let BackImage = this.data.backImage
    let data = {
      FaceImage: FaceImage,
      BackImage: BackImage
    }
    util.request(api.IDCardImageUpload, data).then((res) => {
      console.log(res)
      let cardInfo = res.IDCardInfo // 身份证识别信息
      let faceUrl = res.FaceUrl // 身份证人像面上传后的URL地址
      let backUrl = res.BackUrl // 身份证国徽面图片上传后的URL地址
      // 关闭当前页面，跳转到应用内的某个页面
      let url = `/pages/home/applyFill/applyFill?cardInfo=${cardInfo}&faceUrl=${faceUrl}&backUrl=${backUrl}`
      util.redirectTo(url)
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