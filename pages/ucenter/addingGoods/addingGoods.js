// pages/ucenter/addingGoods/addingGoods.js
const util = require('../../../utils/util.js')
const api = require('../../../config/api.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    productID: 0, // 商品ID
    productInfo: '', // 商品详情
    productTitle: '', // 商品标题
    productDesc: '', // 商品描述信息
    sellerPrice: '', // 商品售价
    stockNum: -1, // 库存数量或可售数量，-1表示不限量，0表示无库存，其他值表示对应的库存量
    categoryID: 0, // 商品类别ID
    tags: '', // 标签列表，多个标签使用/分隔，并且前后缀使用/分隔，每个标签限制6个中文以内
    imageUrl: [], // 商品主图1，除主图1是必传，其它另外4个主图可选择性上传
    skus: '', // 商品规格属性信息，特别注意：如果是普通规格商品，则直接传规格字符串，如果是多规格商品，传入格式分别为：规格名称1,规格1值,规格2名称,规格2值,SKU售价,SKU库存量,Sku图片URL，多个SKU使用|分隔，SKU如果有图片的话请先用平台API进行上传后取得URL
    showPopup: false,
    addIcon: '/static/images/add_icon.png',
    cameraIcon: '/static/images/add_camera_icon.png',
    addSpecificationsIcon: '/static/images/add_specifications_icon.png',
    addTagIcon: '/static/images/add_tag_icon.png',
    promptIcon: '/static/images/prompt_icon.png',
    arrowIcon: '/static/images/arrow_icon.png',
    closeTagIcon: '/static/images/close_tag_icon.png',
    tags: [], // 常见标签列表
    tagsList: [], // 已选择标签列表
    list: ['afadfa', 'adffsfasf', 'adfsadfaf']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    if (options.id) {
      let productID = options.id
      this.setData({
        productID: productID
      })
      this.getProducts()
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
    this.getProductTagsList()
  },

  // 获取商品详情，用于商品编辑
  getProducts: function () {
    let ProductID = this.data.productID
    let data = {
      ProductID: ProductID
    }
    util.request(api.ProductsGet, data).then((res) => {
      console.log(res)
      let productInfo = res.ProductInfo
      this.setData({
        productInfo: productInfo
      })
    })
  },

  // 获取常用标签列表
  getProductTagsList: function () {
    let data = {}
    util.request(api.ProductTagsListGet, data).then((res) => {
      console.log(res)
      let tags = res.Tags
      this.setData({
        tags: tags
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

  // 添加多规格
  specificationsTap: function () {
    util.navigateTo('/pages/ucenter/addSpecifications/addSpecifications')
  },

  // 显示或者隐藏事件
  popupTap () {
    let showPopup = !this.data.showPopup
    this.setData({
      showPopup: showPopup
    })
  },

  // 添加参见标签
  addTagTap: function (e) {
    let index = e.currentTarget.dataset.index
    let tags = this.data.tags
    let tag = tags[index]
    let tagsList = this.data.tagsList
    tagsList.forEach((item, i) => {
      if (item == tag) {
        tagsList.splice(i, 1)
      }
    })
    tagsList.push(tag)
    console.log(tags)
    this.setData({
      tagsList: tagsList,
      tags: tags
    })
  },

  // 取消标签
  closeTagTap: function (e) {
    let index = e.currentTarget.dataset.index
    let tagsList = this.data.tagsList
    tagsList.splice(index, 1)
    this.setData({
      tagsList: tagsList
    })
  },

  // 添加新商品或者更新商品信息
  addProductsTap: function () {
    let ProductID = this.data.productID
    // let ProductTitle = this.data.productTitle
    // let ProductDesc = this.data.productDesc
    // let SellerPrice = this.data.sellerPrice
    // let StockNum = this.data.stockNum
    // let CategoryID = this.data.categoryID
    let Tags = this.data.tagsList.join('/')
    // let ImageUrl = this.data.imageUrl
    // let Skus = this.data.skus
    // let ProductTitle = '新鲜水果源自泰国亚热带'
    // let ProductDesc = '商品描述信息'
    // let SellerPrice = '12.00'
    // let StockNum = '-1'
    // let CategoryID = 22
    // let Tags = '高端优选/特别优惠'
    // let ImageUrls = 'https://api.tuan399.com/Upload/ApiUpload/20200618121916268.jpg,https://api.tuan399.com/Upload/ApiUpload/20200618121916268.jpg'
    // let Skus = '颜色,黑色,尺码,S,18.80,-1,|颜色,黑色,尺码,M,19.80,-1,'
    let data = {
      ProductID: ProductID,
      ProductTitle: ProductTitle,
      ProductDesc: ProductDesc,
      SellerPrice: SellerPrice,
      StockNum: StockNum,
      CategoryID: CategoryID,
      Tags: Tags,
      ImageUrls: ImageUrls,
      Skus: Skus
    }
    util.request(api.ProductsAdd, data).then((res) => {
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