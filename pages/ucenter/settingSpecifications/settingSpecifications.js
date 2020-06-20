// pages/ucenter/settingSpecifications/settingSpecifications.js
const util = require('../../../utils/util.js')
const api = require('../../../config/api.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    priceChecked: false, // 所有商品统一价格
    stockChecked: false, // 所有商品统一库存
    addIcon: '/static/images/add_icon.png',
    cameraIcon: '/static/images/add_camera_icon.png',
    items: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let value = options.value
    // 多规格SKU转换
    let data = {
      SkuNameValues: value
    }
    util.request(api.SkusListGet, data).then((res) => {
      console.log(res)
      let items = res.Skus
      this.setData({
        items: items
      })
    })
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

  // 所有商品统一价格操作
  switchPriceChange: function (e) {
    console.log(e)
    let value = e.detail.value
    console.log(value)
  },

  // 所有商品统一库存操作
  switchStockChange: function (e) {
    console.log(e)
    let value = e.detail.value
    console.log(value)
  },

  // 团购价输入
  priceInput: function (e) {
    let value = e.detail.value
    let index = e.currentTarget.dataset.index
    let items = this.data.items
    items.forEach((item, i) => {
      console.log(item)
      if (index === i) {
        item.SellerPrice = value
      }
    })
    this.setData({
      items: items
    })
  },

  // 库存输入
  stockInput: function (e) {
    let value = e.detail.value
    let index = e.currentTarget.dataset.index
    let items = this.data.items
    items.forEach((item, i) => {
      console.log(item)
      if (index === i) {
        item.StockNum = value
      }
    })
    this.setData({
      items: items
    })
  },

  // 上传图片
  chooseFaceImage: function (e) {
    let index = e.currentTarget.dataset.index
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: (res) => {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        let tempFilePaths = res.tempFilePaths
        console.log('tempFilePaths', tempFilePaths)
        this.uploadFile(tempFilePaths, index)
      }
    })
  },

  // 上传图片到服务器
  uploadFile: function (tempFilePaths, index) {
    let items = this.data.items
    let data = {}
    let imageUrl = []
    let value = ''
    tempFilePaths.forEach(item => {
      console.log(item)
      let path = item
      util.uploadFile(api.ImageVideoUpload, data, path).then((res) => {
        console.log(res)
        let data = JSON.parse(res)
        imageUrl.push(data.UploadFiles[0].Value)
        value = data.UploadFiles[0].Value
        console.log('ImageUrls', imageUrl)
        this.setData({
          imageUrl: imageUrl
        })
      })
    })
    items.forEach((item, i) => {
      console.log(item)
      if (index === i) {
        item.SkuImageUrl = value
      }
    })
    this.setData({
      tempFilePaths: tempFilePaths,
      items: items
    })
  },

  // 确定
  nextTap: function () {
    let items = this.data.items
    let skusItem = ''
    let skusList = []
    items.forEach(item => {
      console.log(item)
      skusItem = `${item.SkuProperty1_Name},${item.SkuProperty1_Value},${item.SkuProperty2_Name},${item.SkuProperty2_Value},${item.SellerPrice},${item.StockNum},${item.SkuImageUrl}`
      skusList.push(skusItem)
    })
    let skus = skusList.join('|') // 传入格式分别为：规格名称1,规格1值,规格2名称,规格2值,SKU售价,SKU库存量,Sku图片URL，多个SKU使用|分隔，SKU如果有图片的话请先用平台API进行上传后取得URL
    let pages = getCurrentPages() // 获取页面栈
    let currPage = pages[pages.length - 1] // 当前页面
    let prevPage = pages[pages.length - 2] // 上一个页面
    console.log('当前页面', currPage)
    console.log('上一个页面', prevPage)
    console.log('skus', skus)
    prevPage.setData({
      skus: skus
    })
    util.navigateBack('-1')
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