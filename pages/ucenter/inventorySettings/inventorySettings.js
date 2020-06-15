// pages/ucenter/inventorySettings/inventorySettings.js
const util = require('../../../utils/util.js')
const api = require('../../../config/api.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    paraValue: 0,
    inventory: [{
      title: '下单扣减库存',
      remark: '用户取消订单后恢复库存'
    }, {
      title: '付款成功扣减库存',
      remark: '退款、从付款切换到待付款、订单取消时恢复库存'
    }]
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
    this.getTeamParaList()
  },

  // 获取团长相关设置
  getTeamParaList: function () {
    let paraValue = this.data.paraValue
    let data = {}
    util.request(api.TeamParaListGet, data).then((res) => {
      console.log(res)
      let parament = res.Paraments
      parament.forEach(item => {
        if (item.ParaKey === 'SubStockOpt') {
          paraValue = item.ParaValue
        }
      })
      this.setData({
        paraValue: paraValue
      })
    })
  },

  // 选择改变
  radioChange: function (e) {
    console.log(e)
    let paraValue = e.detail.value
    this.setData({
      paraValue: paraValue
    })
  },

  // 确定
  submitTap: function () {
    let ParaKey = 'SubStockOpt'
    let ParaValue = this.data.paraValue
    let data = {
      ParaKey: ParaKey,
      ParaValue: ParaValue
    }
    util.request(api.TeamParaSet, data).then((res) => {
      console.log(res)
      util.showToast('修改成功！')
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