// pages/ucenter/addSpecifications/addSpecifications.js
const util = require('../../../utils/util.js')
const api = require('../../../config/api.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    prompt: '共1个规格',
    itemList: [{
      title: '',
      list: ['']
    }],
    items: [{
      title: '',
      list: ['']
    }],
    addSpecificationsIcon: '/static/images/add_specifications_icon.png',
    addTagIcon: '/static/images/add_tag_icon.png',
    cutIcon: '/static/images/cut_icon.png',
    promptIcon: '/static/images/prompt_icon.png',
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

  // 添加多规格
  addSpecTap: function () {
    let itemList = this.data.itemList
    let items = this.data.items
    items = [...items, ...itemList]
    console.log(items)
    let prompt = `共${items.length}个规格`
    this.setData({
      items: items,
      prompt: prompt
    })
  },

  // 添加子类多规格
  addSpecChildTap: function (e) {
    let index =  e.currentTarget.dataset.index
    let items = this.data.items
    let obj = ''
    items[index].list.push(obj)
    console.log(items)
    this.setData({
      items: items
    })
  },

  // 删除多规格
  delectdSpecTap: function (e) {
    let index =  e.currentTarget.dataset.index
    let items = this.data.items
    items.splice(index, 1)
    this.setData({
      items: items
    })
  },

  // 删除子多规格
  delectChildSpecTap: function (e) {
    let index = e.currentTarget.dataset.index
    let y =  e.currentTarget.dataset.y
    let items = this.data.items
    console.log(items[index].list)
    items.map((item, i) => {
      console.log(item)
      if (index === i) {
        item.list.splice(y, 1)
      }
    })
    this.setData({
      items: items
    })
  },

  // 输入规格标题
  titleInput: function (e) {
    let value = e.detail.value
    let index = e.currentTarget.dataset.index
    let items = this.data.items
    items.forEach((item, i) => {
      console.log(item)
      if (index === i) {
        item.title = value
      }
    })
    this.setData({
      items: items
    })
  },

  // 输入子规格标题
  childInput: function (e) {
    let value = e.detail.value
    let index = e.currentTarget.dataset.index
    let y = e.currentTarget.dataset.y
    let items = this.data.items
    console.log(value)
    items.map((item, i) => {
      if (index === i) {
        item.list[y] = value
      }
    })
    console.log(items)
    this.setData({
      items: items
    })
  },

  // 下一步
  nextTap: function () {
    let items = this.data.items
    console.log(items)
    let element = []
    items.forEach(item => {
      console.log(item)
      let itemData = `${item.title}/${item.list.join(',')}`
      element.push(itemData)
    })
    let SkuNameValues = element.join('|')
    console.log(SkuNameValues)
    // 多规格SKU转换
    let data = {
      SkuNameValues: SkuNameValues
    }
    util.request(api.SkusListGet, data).then((res) => {
      console.log(res)
      let Skus = res.Skus
      util.navigateTo('/pages/ucenter/settingSpecifications/settingSpecifications')
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