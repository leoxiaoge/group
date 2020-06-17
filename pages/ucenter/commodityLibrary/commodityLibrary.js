// pages/ucenter/commodityLibrary/commodityLibrary.js
const util = require('../../../utils/util.js')
const api = require('../../../config/api.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageNum: 1, // 页码
    pageSize: 10, // 每页条数
    productTitle: '', // 搜索的商品名称
    categoryID: 0, // 限定商品类别，如果不指定请传入0
    teamID: 0, // 要查询类别列表的团队ID，如果TeamID传0且当前用户身份是团长身份，则获取当前团队的商品类别列表，否则获取对应团队ID的商品类别列表
    cancelButton: '取消选择', // 取消选择文字
    confirmButoon: '确定选择', // 确定选择文字
    categorySettingIcon: '/static/images/category_setting_icon',
    deleteIcon: '/static/images/delete_icon.png',
    editIcon: '/static/images/edit_icon.png',
    emptyIcon: '/static/images/league_no.png',
    emptyText: '团队暂无团员，马上邀请吧',
    categoryList: [{
      name: '1223321'
    },{
      name: '1223321'
    },{
      name: '1223321'
    }],
    currentCategory: {},
    items: [{
      name: '1232131eee'
    }],
    scrollLeft: 0,
    scrollTop: 0,
    goodsCount: 0,
    scrollHeight: 0,
    searchIcon: '/static/images/search_icon.png',
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

  // 获取团长注册信息
  getTeam: function () {
    let data = {}
    util.request(api.TeamGet, data).then((res) => {
      console.log(res)
      let teamID = res.TeamInfo.teamID
      this.setData({
        teamID: teamID
      })
    })
  },

  // 获得指定团队ID的商品类别列表
  getProductsList: async function () {
    await this.getTeam()
    let TeamID = this.data.teamID
    let data = {
      TeamID: TeamID
    }
    util.request(api.CategorysListGet, data).then((res) => {
      console.log(res)
    })
  },

  // 选择分类
  switchCate: function (e) {
    let categoryID = e.currentTarget.dataset.id
    this.setData({
      categoryID: categoryID
    })
    this.getCurrentCategory()
  },

  // 获取商品相关基本信息
  ProductsListGet: function () {
    let PageID = this.data.pageNum
    let PageSize = this.data.pageSize
    let ProductTitle = this.data.productTitle
    let CategoryID = this.data.categoryID
    let data = {
      PageID: PageID,
      PageSize: PageSize,
      ProductTitle: ProductTitle,
      CategoryID: CategoryID
    }
    util.request(api.CategorysListGet, data).then((res) => {
      console.log(res)
    })
  },

  //手指触摸动作开始 记录起点X坐标
  touchstart: function (e) {
    console.log(e)
    //开始触摸时 重置所有删除
    this.data.items.forEach(function (v) {
      if (v.isTouchMove) //只操作为true的
        v.isTouchMove = false;
    })
    this.setData({
      startX: e.changedTouches[0].clientX,
      startY: e.changedTouches[0].clientY,
      items: this.data.items
    })
  },
  //滑动事件处理
  touchmove: function (e) {
    var that = this,
      index = e.currentTarget.dataset.index, //当前索引
      startX = that.data.startX, //开始X坐标
      startY = that.data.startY, //开始Y坐标
      touchMoveX = e.changedTouches[0].clientX, //滑动变化坐标
      touchMoveY = e.changedTouches[0].clientY, //滑动变化坐标
      //获取滑动角度
      angle = that.angle({
        X: startX,
        Y: startY
      }, {
        X: touchMoveX,
        Y: touchMoveY
      });
    that.data.items.forEach(function (v, i) {
      v.isTouchMove = false
      //滑动超过30度角 return
      if (Math.abs(angle) > 30) return;
      if (i == index) {
        if (touchMoveX > startX) //右滑
          v.isTouchMove = false
        else //左滑
          v.isTouchMove = true
      }
    })
    //更新数据
    that.setData({
      items: that.data.items
    })
  },
  /**
   * 计算滑动角度
   * @param {Object} start 起点坐标
   * @param {Object} end 终点坐标
   */
  angle: function (start, end) {
    var _X = end.X - start.X,
      _Y = end.Y - start.Y
    //返回角度 /Math.atan()返回数字的反正切值
    return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
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
    this.ProductsListGet()
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