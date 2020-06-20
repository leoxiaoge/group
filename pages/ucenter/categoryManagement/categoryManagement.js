// pages/ucenter/categoryManagement/categoryManagement.js
const util = require('../../../utils/util.js')
const api = require('../../../config/api.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    teamID: 0, // 团队id
    categoryID: 0, // 要更新名称的类别id
    showPopup: false, // 弹窗
    categoryTitle: '', // 类别名称，限制最长4个中文以内
    tags: [], // 标签列表
    operatingIcon: '/static/images/operating_icon.png',
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
    this.getProductTagsList()
    this.getCategorysList()
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

  // 添加操作
  addCategorysTap: function () {
    if (this.data.categoryID) {
      this.updateCategorys()
    } else {
      this.addCategorys()
    }
  },

  // 添加商品分类
  addCategorys: function () {
    let CategoryTitle = this.data.categoryTitle
    let data = {
      CategoryTitle: CategoryTitle
    }
    util.request(api.CategorysAdd, data).then((res) => {
      console.log(res)
      util.showToast('添加成功！')
      this.getCategorysList()
      this.setData({
        showPopup: false,
      })
    })
  },

  // 操作商品类别
  operatingTap: function (e) {
    let that = this;
    let categoryID = e.currentTarget.dataset.id
    let categoryTitle = e.currentTarget.dataset.title
    this.setData({
      categoryID: categoryID,
      categoryTitle: categoryTitle
    })
    wx.showActionSheet({
      itemList: ['移到最前', '修改分类名称', '删除'],
      success (res) {
        console.log(res.tapIndex)
        let tapIndex = res.tapIndex
        if (tapIndex === 0) {
          that.sortTap()
        } else if (tapIndex === 1) {
          let showPopup = !that.data.showPopup
          that.setData({
            showPopup: showPopup
          })
        } else if (tapIndex === 2) {
          that.deleteCategorys()
        }
      },
      fail (res) {
        console.log(res.errMsg)
      }
    })
  },

  // 设置排序
  sortTap: function () {
    let categoryID = this.data.categoryID // 当前选中的ID
    let categorys = this.data.categorys
    let OrderLists = this.data.orderLists // 顺序列表，类别ID和类目ID之间使用半角逗号分隔
    categorys.forEach(item => {
      console.log(item)
      if (item.ID === categoryID) {
        let previousID = categorys[0].ID // 第一个ID
        OrderLists = `${previousID},${categoryID}`
      }
    })
    console.log(OrderLists)
    let data = {
      OrderLists: OrderLists
    }
    util.request(api.CategorysOrdersSet, data).then((res) => {
      console.log(res)
      util.showToast('设置成功！')
      this.getCategorysList()
    })
  },

  // 修改商品类别
  updateCategorys: function () {
    let CategoryID = this.data.categoryID
    let CategoryTitle = this.data.categoryTitle
    let data = {
      CategoryID: CategoryID,
      CategoryTitle: CategoryTitle
    }
    util.request(api.CategorysUpdate, data).then((res) => {
      console.log(res)
      util.showToast('修改成功！')
      this.getCategorysList()
      this.setData({
        showPopup: false,
      })
    })
  },

  // 删除商品类别
  deleteCategorys: function () {
    let CategoryID = this.data.categoryID // 要删除的商品类别ID，如果该类别下有商品，则不允许进行删除？
    let data = {
      CategoryID: CategoryID
    }
    util.request(api.CategorysDelete, data).then((res) => {
      console.log(res)
      util.showToast('删除成功！')
      this.getCategorysList()
    })
  },

  // 弹窗显示
  popupTap: function () {
    let showPopup = !this.data.showPopup
    this.setData({
      showPopup: showPopup,
      categoryID: 0,
      categoryTitle: ''
    })
  },

  // 输入名称
  catchInput: function (e) {
    let categoryTitle = e.detail.value
    this.setData({
      categoryTitle: categoryTitle
    })
  },

  // 添加常见标签到列表
  addTagTap: function (e) {
    let categoryTitle = e.currentTarget.dataset.item
    this.setData({
      categoryTitle: categoryTitle
    })
    this.addCategorys()
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