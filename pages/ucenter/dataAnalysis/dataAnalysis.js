// pages/ucenter/dataAnalysis/dataAnalysis.js
const util = require('../../../utils/util.js')
const api = require('../../../config/api.js')
const wxCharts = require('../../../lib/wxcharts/wxcharts.js')
var areaChart = null;
// https://github.com/xiaolin3303/wx-charts/issues/56
// https://github.com/xiaolin3303/wx-charts/issues/58

Page({

  /**
   * 页面的初始数据
   */
  data: {
    salesRankingIcon: '/static/images/sales_ranking_icon.png',
    merchantRankingIcon: '/static/images/merchant_ranking_icon.png',
    items: [{
      'name': '今日销售金额',
      'data': '7365',
      'num': '12.3%'
    }, {
      'name': '今日销售金额',
      'data': '7365',
      'num': '12.3%'
    }, {
      'name': '今日销售金额',
      'data': '7365',
      'num': '12.3%'
    }, {
      'name': '今日销售金额',
      'data': '7365',
      'num': '12.3%'
    }, {
      'name': '今日销售金额',
      'data': '7365',
      'num': '12.3%'
    }, {
      'name': '今日销售金额',
      'data': '7365',
      'num': '12.3%'
    }, {
      'name': '今日销售金额',
      'data': '7365',
      'num': '-5.9%'
    }, ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.areaChartTap()
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

  touchHandler: function (e) {
    console.log(areaChart.getCurrentDataIndex(e));
    areaChart.showToolTip(e);
  },

  areaChartTap: function () {
    var windowWidth = 320;
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }

    areaChart = new wxCharts({
      canvasId: 'areaCanvas',
      type: 'area',
      categories: ['2016-08', '2016-09', '2016-08', '2016-09', '2016-10', '2016-11', '2016-12', '2017'],
      series: [{
        name: '成交量1',
        color:"#118be4",
        data: [70, 40, 65, 100, 34, 18, 21, 123],
        format: function (val) {
          return val.toFixed(2) + '万';
        }
      }, {
        name: '成交量2',
        color:"#ff5c27",
        data: [15, 20, 45, 37, 4, 80, 123, 12],
        format: function (val) {
          return val.toFixed(2) + '万';
        }
      }],
      yAxis: {
        format: function (val) {
          return val + '万';
        }
      },
      width: windowWidth,
      height: 200
    });
  },

  // 商品销售排行
  salesRankingTap: function () {
    util.navigateTo('/pages/ucenter/salesRanking/salesRanking')
  },

  // 商户排行榜
  merchantRankingTap: function () {
    util.navigateTo('/pages/ucenter/merchantRanking/merchantRanking')
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
