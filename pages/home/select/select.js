// pages/home/select/select.js
const util = require('../../../utils/util.js')
const api = require('../../../config/api.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isCheckbox: false, // 是否多选
    isFrom: false, // 是否表单
    isDisabled: false, // 是否可点击
    longitude: '', // 经纬度
    latitude: '', // 经纬度
    keyword: '', // 搜索词
    locate: '', // 小区名称
    distID: 0, // 小区id
    districts: [], // 搜索列表
    distList: [], // 多选列表
    detailValue: [], // 多选列表id
    selectIcon: '/static/images/select_icon.png',
    closeIcon: '/static/images/close_icon.png',
    locateIcon: '/static/images/locate_icon.png',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    // 选择小区显示提交按钮
    if (options.isCheckbox) {
      this.setData({
        isCheckbox: options.isCheckbox
      })
    }
    if (options.isFrom) {
      this.setData({
        isFrom: options.isFrom
      })
    }
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
    if (this.data.isFrom) {
      let pages = getCurrentPages() // 获取页面栈
      let prevPage = pages[pages.length - 2] // 上一个页面
      let distList = prevPage.data.distList
      if (distList.length > 0) {
        this.setData({
          isDisabled: true
        })
      } else {
        this.setData({
          isDisabled: false
        })
      }
      this.setData({
        distList: distList
      })
      this.districtsPrevPage()
    }
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
        item.checked = false
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
      this.districtsPrevPage()
    })
  },

  // 处理列表跟上个对比
  districtsPrevPage: function () {
    let districts = this.data.districts
    let pages = getCurrentPages() // 获取页面栈
    let prevPage = pages[pages.length - 2] // 上一个页面
    console.log(prevPage)
    districts.forEach(item => {
      prevPage.data.distList.forEach(element => {
        if (item.DistrictID === element.DistrictID) {
          item.checked = true
        }
      })
    })
    console.log(districts)
    this.setData({
      districts: districts
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
    })
  },

  // 多选小区
  selectRadioTap: function (e) {
    let index = e.currentTarget.dataset.index
    let item = this.data.districts[index]
    let districts = this.data.districts
    let distList = this.data.distList
    districts[index].checked = !districts[index].checked
    if (districts[index].checked) {
      distList.push(item)
    } else {
      distList.forEach((element, y) => {
        console.log(element)
        if (element.DistrictID === item.DistrictID) {
          distList.splice(y, 1)
        }
      })
    }
    if (distList.length > 0) {
      this.setData({
        isDisabled: true
      })
    } else {
      this.setData({
        isDisabled: false
      })
    }
    let detailValue = []
    distList.forEach(item => {
      detailValue.push(item.DistrictID)
    })
    this.setData({
      districts: districts,
      distList: distList,
      detailValue: detailValue
    })
  },

  // 确定
  definiteTap: function () {
    let distList = this.data.distList // 选中小区列表
    let distId = this.data.detailValue.join(',') // 选中小区id
    let pages = getCurrentPages() // 获取页面栈
    let currPage = pages[pages.length - 1] // 当前页面
    let prevPage = pages[pages.length - 2] // 上一个页面
    console.log(currPage)
    console.log(distId)
    console.log(distList)
    prevPage.setData({
      distId: distId,
      distList: distList
    })
    util.navigateBack('-1')
  },

  // 提交
  submitTap: function () {
    console.log(this.data.detailValue)
    let DistIDs = this.data.detailValue.join(',')
    let data = {
      DistIDs: DistIDs
    }
    util.request(api.TeamDistAdd, data).then((res) => {
      console.log(res)
      util.showToast('提交成功！')
      util.navigateBack('-1')
    })
  },

  // 全国销售
  submitAllTap: function () {
    let DistIDs = 0
    let data = {
      DistIDs: DistIDs
    }
    util.request(api.TeamDistAdd, data).then((res) => {
      console.log(res)
      util.showToast('提交成功！')
      util.navigateBack('-1')
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
    let isCheckbox = this.data.isCheckbox
    let query = wx.createSelectorQuery()
    //根据节点id查询节点部分的高度（px单位）
    query.select('#select-header').boundingClientRect()
    query.select('#select-locate').boundingClientRect()
    query.select('#select-title').boundingClientRect()
    if (isCheckbox) {
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
    this.selectTap()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (e) {
    return util.onShareAppMessage(e)
  }
})