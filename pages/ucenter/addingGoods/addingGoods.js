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
    stockNum: '', // 库存数量或可售数量，-1表示不限量，0表示无库存，其他值表示对应的库存量
    categoryID: 0, // 商品类别ID
    tags: '', // 标签列表，多个标签使用/分隔，并且前后缀使用/分隔，每个标签限制6个中文以内
    imageUrl: [], // 商品主图1，除主图1是必传，其它另外4个主图可选择性上传
    skus: '', // 商品规格属性信息，特别注意：如果是普通规格商品，则直接传规格字符串，如果是多规格商品，传入格式分别为：规格名称1,规格1值,规格2名称,规格2值,SKU售价,SKU库存量,Sku图片URL，多个SKU使用|分隔，SKU如果有图片的话请先用平台API进行上传后取得URL
    showPopup: false, // 窗口显示隐藏
    showSlotPopup: false, // 提示窗口显示隐藏
    popupImage: '', // 提示窗口背景图片
    addIcon: '/static/images/add_icon.png',
    cameraIcon: '/static/images/add_camera_icon.png',
    addSpecificationsIcon: '/static/images/add_specifications_icon.png',
    addTagIcon: '/static/images/add_tag_icon.png',
    promptIcon: '/static/images/prompt_icon.png',
    arrowIcon: '/static/images/arrow_icon.png',
    closeTagIcon: '/static/images/close_tag_icon.png',
    elementsTag: '', // 标签输入值
    elementsTagNum: 10,
    tagsList: [], // 常见标签列表id
    tagsSelectList: [], // 已选择标签列表
    teamID: 0, // 团队id
    categorys: [], // 商品分类列表
    categoryTitle: '', // 已选中的分类名称
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
    this.getCategorysList()
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

  // 获取团长注册信息
  getTeam: function () {
    let data = {}
    util.request(api.TeamGet, data).then((res) => {
      console.log(res)
      let teamID = res.TeamInfo.ID
      this.setData({
        teamID: teamID
      })
    })
  },

  // 获得指定团队ID的商品类别列表
  getCategorysList: async function () {
    await this.getTeam()
    let TeamID = this.data.teamID
    let data = {
      TeamID: TeamID
    }
    util.request(api.CategorysListGet, data).then((res) => {
      console.log(res)
      let categorys = res.Categorys
      this.setData({
        categorys: categorys
      })
    })
  },

  // 获取常用标签列表
  getProductTagsList: function () {
    let data = {}
    util.request(api.ProductTagsListGet, data).then((res) => {
      console.log(res)
      let tagsList = res.Tags
      this.setData({
        tagsList: tagsList
      })
    })
  },

  // 上传图片
  chooseFaceImage: function () {
    wx.chooseImage({
      count: 9, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: (res) => {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        let tempFilePaths = res.tempFilePaths
        console.log('tempFilePaths', tempFilePaths)
        this.uploadFile(tempFilePaths)
      }
    })
  },

  // 上传图片到服务器
  uploadFile: function (tempFilePaths) {
    let data = {}
    let imageUrl = []
    tempFilePaths.forEach(item => {
      console.log(item)
      let path = item
      util.uploadFile(api.ImageVideoUpload, data, path).then((res) => {
        console.log(res)
        let data = JSON.parse(res)
        imageUrl.push(data.UploadFiles[0].Value)
        console.log('ImageUrls', imageUrl)
        this.setData({
          imageUrl: imageUrl
        })
      })
    })
    console.log(imageUrl)
    this.setData({
      tempFilePaths: tempFilePaths
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

  // 多规格提示窗口
  specificationsPromptTap: function () {
    let showSlotPopup = !this.data.showSlotPopup
    let popupImage = this.data.popupImage
    this.setData({
      showSlotPopup: showSlotPopup,
      popupImage: popupImage
    })
  },

  // 标签提示窗口
  tagPromptTap: function () {
    let showSlotPopup = !this.data.showSlotPopup
    let popupImage = this.data.popupImage
    this.setData({
      showSlotPopup: showSlotPopup,
      popupImage: popupImage
    })
  },

  // 分类选择
  bindPickerChange: function (e) {
    console.log(e)
    let index = e.detail.value
    let categorys = this.data.categorys
    let categoryID = categorys[index].ID
    let categoryTitle = categorys[index].CategoryTitle
    this.setData({
      categoryTitle: categoryTitle,
      categoryID: categoryID
    })
  },

  // 标签输入
  tagInput: function (e) {
    console.log(e)
    let elementsTag = e.detail.value
    let elementsTagNum = 10 - elementsTag.length
    this.setData({
      elementsTag: elementsTag,
      elementsTagNum: elementsTagNum
    })
  },

  // 确定输入标签
  determineTap: function () {
    let elements = this.data.elementsTag
    let tagsSelectList = this.data.tagsSelectList
    tagsSelectList.push(elements)
    this.setData({
      tagsSelectList: tagsSelectList
    })
  },

  // 添加参见标签
  addTagTap: function (e) {
    let index = e.currentTarget.dataset.index
    let tagsList = this.data.tagsList
    let elements = tagsList[index]
    let tagsSelectList = this.data.tagsSelectList
    tagsSelectList.forEach((item, i) => {
      if (item === elements) {
        tagsSelectList.splice(i, 1)
      }
    })
    tagsSelectList.push(elements)
    console.log(tagsSelectList)
    this.setData({
      tagsSelectList: tagsSelectList,
      tagsList: tagsList
    })
  },

  // 取消标签
  closeTagTap: function (e) {
    let index = e.currentTarget.dataset.index
    let tagsSelectList = this.data.tagsSelectList
    tagsSelectList.splice(index, 1)
    this.setData({
      tagsSelectList: tagsSelectList
    })
  },

  // 取消选择标签
  cancel: function () {
    this.setData({
      tagsSelectList: []
    })
  },

  // 标题输入
  titleInput: function (e) {
    let productTitle = e.detail.value
    this.setData({
      productTitle: productTitle
    })
  },

  // 商品介绍输入
  descInput: function (e) {
    let productDesc = e.detail.value
    this.setData({
      productDesc: productDesc
    })
  },

  // 团购价格输入
  sellerPriceInput: function (e) {
    console.log(e)
    let sellerPrice = e.detail.value
    this.setData({
      sellerPrice: sellerPrice
    })
  },

  // 库存
  stockNumInput: function (e) {
    let stockNum = e.detail.value
    this.setData({
      stockNum: stockNum
    })
  },

  // 添加新商品或者更新商品信息
  addProductsTap: function () {
    let ProductID = this.data.productID
    let ProductTitle = this.data.productTitle
    let ProductDesc = this.data.productDesc
    let SellerPrice = this.data.sellerPrice
    let StockNum = Number(this.data.stockNum)
    if (!StockNum) {
      StockNum = -1
    }
    let CategoryID = this.data.categoryID
    let Tags = this.data.tagsList.join('/')
    let ImageUrls = this.data.imageUrl.join(',')
    let Skus = this.data.skus
    // let Skus = '颜色,黑色,尺码,S,18.80,-1,|颜色,黑色,尺码,M,19.80,-1,'
    if (!ProductTitle) {
      util.showToast('请输入团购名称！')
      return
    }
    if (!ProductDesc) {
      util.showToast('请输入商品介绍！')
      return
    }
    if (!ImageUrls) {
      util.showToast('请选择图片！')
      return
    }
    if (!Skus) {
      util.showToast('请填写多规格！')
      return
    }
    if (!CategoryID) {
      util.showToast('请选择分类！')
      return
    }
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