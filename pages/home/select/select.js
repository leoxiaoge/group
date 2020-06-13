// pages/home/select/select.js
const util = require('../../../utils/util.js')
const api = require('../../../config/api.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isSubmit: false, // 是否显示按钮
    longitude: '', // 经纬度
    latitude: '', // 经纬度
    keyword: '', // 搜索词
    locate: '', // 小区名称
    distID: 0, // 小区id
    districts: [], // 搜索列表
    selectIcon: '/static/images/select_icon.png',
    closeIcon: '/static/images/close_icon.png',
    locateIcon: '/static/images/locate_icon.png',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.location()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.calculateScrollViewHeight()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  // 获取搜索词的值
  getkeyword: function (e) {
    let keyword = e.detail.value
    this.setData({
      keyword: keyword
    })
  },

  // 清除搜索框
  closeTap: function () {
    this.setData({
      keyword: ''
    })
  },

  // 定位
  location: async function () {
    wx.showLoading({
      title: '定位中...',
    })
    await util.location().then((res) => {
      let locat = res
      wx.hideLoading()
      this.setData({
        longitude: locat.longitude,
        latitude: locat.latitude
      })
      if (locat) {
        this.selectTap()
      }
    }).catch((err) => {
      console.log(err)
      util.showToast('更好的体验，请授权设置！')
    })
  },

  // 搜索列表
  selectTap: function () {
    console.log(api)
    let LngLat = `${this.data.longitude},${this.data.latitude}`
    let keyword = this.data.keyword
    let data = {
      LngLat: LngLat,
      keyword: keyword
    }
    util.request(api.DistSearchListGet, data).then((res) => {
      console.log(res)
      let districts = res.Districts
      let correct = false
      districts.forEach(item => {
        if (this.data.distID === item.DistrictID) {
          correct = true
        }
      })
      if (!correct) {
        this.setData({
          locate: '',
          distID: 0,
          checked: false
        })
      }
      this.setData({
        districts: districts
      })
    })
  },

  // 选择小区
  radioChange: function (e) {
    console.log(e)
    let index = e.detail.value
    let locate = this.data.districts[index].DistrictName
    let distID = this.data.districts[index].DistrictID
    this.setData({
      locate: locate
    })
    let data = {
      DistID: distID
    }
    util.request(api.UserDistSelect, data).then((res) => {
      console.log(res)
      let title = `选择${locate}成功！`
      util.showToast(title)
      util.navigateBack('-1')
    }).catch((err) => {
      console.log(err)
    })
  },

  // 上拉刷新
  upper: function () {
    console.log('upper')
  },

  //下拉加载
  lower: function () {
    console.log('lower')
  },

  // 计算scroll-view高度
  calculateScrollViewHeight: function () {
    let isSubmit = this.data.isSubmit
    let query = wx.createSelectorQuery()
    //根据节点id查询节点部分的高度（px单位）
    query.select('#select-header').boundingClientRect()
    query.select('#select-locate').boundingClientRect()
    query.select('#select-title').boundingClientRect()
    if (isSubmit) {
      query.select('#select-header').boundingClientRect()
      query.select('#select-locate').boundingClientRect()
      query.select('#select-title').boundingClientRect()
      query.select('#select-footer').boundingClientRect()
      query.exec((res) => {
        // 分别取出节点的高度
        let imageHeight = res[0].height;
        let groupInfoHeight = res[1].height;
        let dividerHeight = res[2].height;
        let bottomHeight = res[3].height;
        // 然后窗口高度（wx.getSystemInfoSync().windowHeight）减去其他不滑动界面的高度
        let scrollViewHeight = wx.getSystemInfoSync().windowHeight - imageHeight - groupInfoHeight - dividerHeight - bottomHeight
        // 算出来之后存到data对象里面
        this.setData({
          scrollHeight: scrollViewHeight
        })
      })
    } else {
      query.select('#select-header').boundingClientRect()
      query.select('#select-locate').boundingClientRect()
      query.select('#select-title').boundingClientRect()
      query.exec((res) => {
        // 分别取出节点的高度
        let imageHeight = res[0].height;
        let groupInfoHeight = res[1].height;
        let dividerHeight = res[2].height;
        // 然后窗口高度（wx.getSystemInfoSync().windowHeight）减去其他不滑动界面的高度
        let scrollViewHeight = wx.getSystemInfoSync().windowHeight - imageHeight - groupInfoHeight - dividerHeight
        // 算出来之后存到data对象里面
        this.setData({
          scrollHeight: scrollViewHeight
        })
      })
    }
    
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