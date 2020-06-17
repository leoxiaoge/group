// pages/ucenter/categoryManagement/categoryManagement.js
const util = require('../../../utils/util.js')
const api = require('../../../config/api.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    categoryTitle: '', // 类别名称，限制最长4个中文以内
    tags: [], // 标签列表
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

  // 获取商品常用标签列表
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

  // 添加商品分类
  addCategorys: function () {
    let CategoryTitle = this.data.categoryTitle
    let data = {
      CategoryTitle: CategoryTitle
    }
    util.request(api.CategorysAdd, data).then((res) => {
      console.log(res)
    })
  },

  setCategorysOrders: function () {
    let OrderLists = this.data.orderLists // 顺序列表，类别ID和类目ID之间使用半角逗号分隔
    let data = {
      OrderLists: OrderLists
    }
    util.request(api.CategorysOrdersSet, data).then((res) => {
      console.log(res)
    })
  },

  // 删除商品类别
  deleteCategorys: function (e) {
    let CategoryID = e.currentTarget.dataset.id // 要删除的商品类别ID，如果该类别下有商品，则不允许进行删除？
    let data = {
      CategoryID: CategoryID
    }
    util.request(api.CategorysDelete, data).then((res) => {
      console.log(res)
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