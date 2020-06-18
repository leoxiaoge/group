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

  // 添加新商品或者更新商品信息
  addProducts: function () {
    let ProductTitle = this.data.productTitle
    let ProductDesc = this.data.productDesc
    let SellerPrice = this.data.sellerPrice
    let StockNum = this.data.stockNum
    let CategoryID = this.data.categoryID
    let Tags = this.data.tags
    let ImageUrl = this.data.imageUrl
    let Skus = this.data.skus
    let data = {
      ProductTitle: ProductTitle,
      ProductDesc: ProductDesc,
      SellerPrice: SellerPrice,
      StockNum: StockNum,
      CategoryID: CategoryID,
      Tags: Tags,
      ImageUrl: ImageUrl,
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