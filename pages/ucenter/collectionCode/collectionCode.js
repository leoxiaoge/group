// pages/ucenter/collectionCode/collectionCode.js
const util = require('../../../utils/util.js')
const api = require('../../../config/api.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    payCode: '',
    remark: '设置收款码用于后付款类团购活动中，在活动收款发货页面，可以方便调出付款码，避免退出小程序显示收款码后再进入发货。',
    isContent: false,
    emptyIcon: '/static/images/league_no.png',
    emptyText: '暂无收款码',
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
    this.getTeamParaList()
  },

  // 获取团长相关设置
  getTeamParaList: function () {
    let payCode = this.data.payCode
    let data = {}
    util.request(api.TeamParaListGet, data).then((res) => {
      console.log(res)
      let parament = res.Paraments
      parament.forEach(item => {
        console.log(item)
        if (item.ParaKey === 'WXPayCodeUrl') {
          payCode = [item.ParaValue]
        }
      })
      if (!payCode) {
        this.setData({
          isContent: true
        })
      }
      this.setData({
        payCode: payCode
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
          let tempFilePathsValue = data.UploadFiles[0].Value
          console.log(data)
          console.log(tempFilePathsValue)
          this.setData({
            payCode: tempFilePaths,
            payCodeValue: tempFilePathsValue
          })
          this.changeTap()
        })
      }
    })
  },

  // 修改收款码
  changeTap: async function () {
    let ParaKey = 'WXPayCodeUrl'
    let ParaValue = this.data.payCodeValue
    let data = {
      ParaKey: ParaKey,
      ParaValue: ParaValue
    }
    util.request(api.TeamParaSet, data).then((res) => {
      console.log(res)
      util.showToast('修改成功！')
    })
  },

  // 预览图片
  previewImage: function (e) {
    let current = e.currentTarget.dataset.item
    let urls = this.data.payCode
    console.log(current)
    console.log(urls)
    wx.previewImage({
      current: current, // 当前显示图片的http链接
      urls: urls // 需要预览的图片http链接列表
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