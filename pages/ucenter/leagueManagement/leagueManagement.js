// pages/ucenter/leagueManagement/leagueManagement.js
const util = require('../../../utils/util.js')
const api = require('../../../config/api.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isSuper: false, // 是否是超级管理员
    isContent: false, // 是否有内容
    title: '', // 标题
    items: [], // 团队列表
    deleteIcon: '/static/images/delete_operating_icon.png',
    emptyIcon: '/static/images/league_no.png',
    emptyText: '团队暂无团员，马上邀请吧'
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
    this.getTeam()
  },

  // 获取团长注册信息详情
  getTeam: function () {
    let data = {}
    util.request(api.TeamGet, data).then((res) => {
      console.log(res)
      let isSuper = res.IsTeamSuper
      let items = res.TeamUsers
      items.map(item => {
        item.userFace = item.UserInfo.userFace
        item.userNick = decodeURIComponent(item.UserInfo.userNick)
      })
      if (items.length <= 0) {
        this.setData({
          isContent: true
        })
      } else {
        this.setData({
          isContent: false
        })
      }
      if (items.length > 0) {
        let title = `共有团员${items.length}人`
        this.setData({
          title: title
        })
      }
      this.setData({
        isSuper: isSuper,
        items: items
      })
    })
  },

  // 删除成员
  deleteTap: function (e) {
    console.log(e)
    let items = this.data.items
    let index = e.currentTarget.dataset.index
    let UserId = e.currentTarget.dataset.id
    let data = {
      UserId: UserId
    }
    util.request(api.TeamUserRemove, data).then((res) => {
      console.log(res)
      items.splice(index, 1)
      if (items.length <= 0) {
        this.setData({
          isContent: true
        })
      } else {
        this.setData({
          isContent: false
        })
      }
      if (items.length > 0) {
        let title = `共有团员${items.length}人`
        this.setData({
          title: title
        })
      }
      this.setData({
        items: items
      })
      util.showToast('删除成功！')
    })
  },

  // 退出团队
  quitTap: function () {
    let data = {}
    util.request(api.TeamUserLeave, data).then((res) => {
      console.log(res)
      util.showToast('退出成功！')
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
    this.getTeam()
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