// pages/ucenter/openGroup/openGroup.js
const util = require('../../../utils/util.js')
const api = require('../../../config/api.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tagsList: [], // 常见标签列表id
    tagsSelectList: [], // 已选择标签列表
    showPopup: false, // 窗口显示隐藏
    showSlotPopup: false, // 提示窗口显示隐藏
    popupImage: '', // 提示窗口背景图片
    elementsTag: '', // 标签输入值
    elementsTagNum: 10,
    addIcon: '/static/images/add_icon.png',
    cameraIcon: '/static/images/add_camera_icon.png',
    addSpecificationsIcon: '/static/images/add_specifications_icon.png',
    addTagIcon: '/static/images/add_tag_icon.png',
    promptIcon: '/static/images/prompt_icon.png',
    arrowIcon: '/static/images/arrow_icon.png',
    closeTagIcon: '/static/images/close_tag_icon.png',
    productsListJson: [],
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

  // 添加新商品
  addGoodsTap: function () {
    util.navigateTo('/pages/ucenter/commodityLibrary/commodityLibrary')
  },

  // 发布团购
  addProductsTap: function () {
    let Title = '海鲜团购 20120-04-30-1 期'
    let BuyingText = '饶平新鲜海捕采购'
    let BuyingSmallImages = '/upload/images/201923203203.png,/upload/images/201923203204.png'
    let BuyingBigImages = ''
    let BuyingVideos = ''
    let Tags = ''
    let BuyingType = 0
    let BeginTime = '2020-07-28'
    let EndTime = '2020-09-14'
    let IsPrePay = 0
    let ShardType = 1
    let UserDisplayType = 1
    let IsSharedDiscount = 0
    let AutoInputs = ''
    let AutoAdds = 0
    let AutoAddSpans = 60
    let ProductsListJson =  this.data.productsListJson
    let SelectedProductIds = []
    ProductsListJson.forEach(item => {
      console.log(item)
      SelectedProductIds.push(item.ID)
    })
    SelectedProductIds.join(',')
    let UserCancelOrder = 0
    let BuyingAddRedPack = ''
    let ShareRedPack = ''
    console.log(SelectedProductIds)
    let data = {
      Title: Title,
      BuyingText: BuyingText,
      BuyingSmallImages: BuyingSmallImages,
      BuyingBigImages: BuyingBigImages,
      BuyingVideos: BuyingVideos,
      Tags: Tags,
      BuyingType: BuyingType,
      BeginTime: BeginTime,
      EndTime: EndTime,
      IsPrePay: IsPrePay,
      ShardType: ShardType,
      UserDisplayType: UserDisplayType,
      IsSharedDiscount: IsSharedDiscount,
      AutoInputs: AutoInputs,
      AutoAdds: AutoAdds,
      AutoAddSpans: AutoAddSpans,
      SelectedProductIds: SelectedProductIds,
      UserCancelOrder: UserCancelOrder,
      BuyingAddRedPack: BuyingAddRedPack,
      ShareRedPack: ShareRedPack,
    }
    util.request(api.BuyingCreate, data).then((res) => {
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