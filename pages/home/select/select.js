// pages/home/select/select.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading: true,
    selectIcon: '/static/images/select_icon.png',
    locateIcon: '/static/images/locate_icon.png',
    locate: '龙胜市场',
    items: [{
      value: 0,
      name: '龙胜市场',
      distance: 110
    }, {
      value: 0,
      name: '龙胜市场',
      distance: 110
    }, {
      value: 0,
      name: '龙胜市场',
      distance: 110
    }, {
      value: 0,
      name: '龙胜市场',
      distance: 110
    }, {
      value: 0,
      name: '龙胜市场',
      distance: 110
    }, {
      value: 0,
      name: '龙胜市场',
      distance: 110
    }, {
      value: 0,
      name: '龙胜市场',
      distance: 110
    }, {
      value: 0,
      name: '龙胜市场',
      distance: 110
    }, {
      value: 0,
      name: '龙胜市场',
      distance: 110
    }, {
      value: 0,
      name: '龙胜市场',
      distance: 110
    }, {
      value: 0,
      name: '龙胜市场',
      distance: 110
    }, {
      value: 0,
      name: '龙胜市场',
      distance: 110
    }, {
      value: 0,
      name: '龙胜市场',
      distance: 110
    }, {
      value: 0,
      name: '龙胜市场',
      distance: 110
    }, {
      value: 0,
      name: '龙胜市场',
      distance: 110
    }, {
      value: 0,
      name: '龙胜市场',
      distance: 110
    }, {
      value: 0,
      name: '龙胜市场',
      distance: 110
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  // 计算scroll-view高度
  calculateScrollViewHeight: function () {
    let query = wx.createSelectorQuery()
    //根据节点id查询节点部分的高度（px单位）
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