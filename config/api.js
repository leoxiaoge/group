// 以下是业务服务器API地址
module.exports = {
  // 平台API - Platform(全局相关API接口)
  Login: 'API.Platform.Login', //首页数据接口

  // 商品API - Products(和商品操作相关的API接口)
  CategorysListGet: 'API.Products.CategorysListGet', // 提供获取商品类别列表的API接口
  CategorysAdd: 'API.Products.CategorysAdd', // 添加商品分类API
  CategorysDelete: 'API.Products.CategorysDelete', // 删除商品类别API
  CategorysUpdate: 'API.Products.CategorysUpdate', // 商品类别修改API
  CategorysOrdersSet: 'API.Products.CategorysOrdersSet', // 商品类别排序设置API
  ProductsListGet: 'API.Products.ProductsListGet', // 团长获取需要管理的商品列表API
  ProductsAdd: 'API.Products.ProductsAdd', // 团长添加/更新商品API
  ProductsGet: 'API.Products.ProductsGet', // 获取商品详情API
  SkusListGet: 'API.Products.SkusListGet', // 多规格SKU转换API
  ProductDelete: 'API.Products.ProductDelete', // 删除单个商品API
  ProductTagsListGet: 'API.Products.ProductTagsListGet',// 获取商品常用标签列表API
  HotCategoryNameListGet: 'API.Products.HotCategoryNameListGet', // 获取常用商品分类名称API

  // 团长API - Teams(和团长、设置、团队管理相关的操作API)
  TeamAdd: 'API.Teams.TeamAdd', // 团长注册API
  TeamGet: 'API.Teams.TeamGet', // 获取团长注册信息详情API
  TeamUsersAdd: 'API.Teams.TeamUsersAdd', // 团长邀请团队成员验证API
  TeamUserRemove: 'API.Teams.TeamUserRemove', // 团长踢除团队成员API
  TeamUserLeave: 'API.Teams.TeamUserLeave', // 团队成员脱离团队API
  TeamDistAdd: 'API.Teams.TeamDistAdd', // 团长批量添加新小区API
  TeamDistRemove: 'API.Teams.TeamDistRemove', // 团长业务脱离某个小区的API接口
  TeamParaListGet: 'API.Teams.TeamParaListGet', // 团长获取相关设置API
  TeamParaSet: 'API.Teams.TeamParaSet', // 设置团购团队系统参数API
  TeamUserCodeGet: 'API.Teams.TeamUserCodeGet', // 团队成员邀请码获取API
  TeamAboutSet: 'API.Teams.TeamAboutSet', // 团长设置团队介绍API

  // 团购API - Buying(和开团团购、团购分享、发布等相关操作API)
  BuyingCreate: 'API.Buying.BuyingCreate', // 团长新建团购API
  BuyingGet: 'API.Buying.BuyingGet', // 团长获取团购详情API
  BuyingDelete: 'API.Buying.BuyingDelete', // 团长删除已创建的团购活动API
  BuyingListGet: 'API.Buying.BuyingListGet', // 团长分页获取可管理的团购活动列表API
  BuyingOrdersListGet: 'API.Buying.BuyingOrdersListGet', // 团长分页获取团购订单列表API
  BuyingOrderGet: 'API.Buying.BuyingOrderGet', // 团长获取订单详情API
  BuyingGetGoodsMessagesSend: 'API.Buying.BuyingGetGoodsMessagesSend', // 团长向指定团购活动订单用户推送到货通知API
  BuyingSharedImagesGet: 'API.Buying.BuyingSharedImagesGet', // 获取团购分享图片API
  UserBuyingGet: 'API.Buying.UserBuyingGet', // 用户获取团购活动详情API
  UserBuyingAdd: 'API.Buying.UserBuyingAdd', // 用户参与团购API
  UserBuyingOrdersListGet: 'API.Buying.UserBuyingOrdersListGet', // 用户获取订单列表API
  UserBuyingOrderCancel: 'API.Buying.UserBuyingOrderCancel', // 用户取消已参团的团购订单API
  BuyingOrderStatusSet: 'API.Buying.BuyingOrderStatusSet', // 团长更改团购订单的交易状态API
  BuyingOrderPayStatusSet: 'API.Buying.BuyingOrderPayStatusSet', // 团长更改订单的付款状态API
  BuyingUpdate: 'API.Buying.BuyingUpdate', // 团长编辑更新团购活动API
  BuyingEnd: 'API.Buying.BuyingEnd', // 团长结束指定的团购活动API
  BuyingCopy: 'API.Buying.BuyingCopy', // 团长复制已有团购活动API
  UserBuyingConfirmationGoods: 'API.Buying.UserBuyingConfirmationGoods', // 用户批量确认订单收货API
  BuyingPaySendGoodsListGet: 'API.Buying.BuyingPaySendGoodsListGet', // 团长分页获取活动订单列表API
  BuyingTagsListGet: 'API.Buying.BuyingTagsListGet', // 获取常用团购标签API
  RedPackOpen: 'API.Buying.RedPackOpen', // 用户参团和分享拆红包API
  InputTagsListGet: 'API.Buying.InputTagsListGet', // 新建团购常用输入项获取API

  // 分析API - Analyses(提供和数据报表、分析相关的API接口，大部份API提供给团长使用)
  SalesAnalyseGet: 'API.Analyses.SalesAnalyseGet', // 日销售曲线统计API
  PutOrderUsersAnalyseGet: 'API.Analyses.PutOrderUsersAnalyseGet', // 下单人数趋势曲线API
  CustomerSalePriceAnalyseGet: 'API.Analyses.CustomerSalePriceAnalyseGet', // 客单价趋势曲线API
  UserFlowsAnalyseGet: 'API.Analyses.UserFlowsAnalyseGet', // 每日客流量趋势曲线API
  CustomerSalesOrderListGet: 'API.Analyses.CustomerSalesOrderListGet', // 客户排行榜API
  ProductSalesOrderListGet: 'API.Analyses.ProductSalesOrderListGet', // 热卖商品排行榜API
  NewCustomerAnalyseGet: 'API.Analyses.NewCustomerAnalyseGet', // 客户拉新趋势曲线API
  DefaultAnalyseItemsGet: 'API.Analyses.DefaultAnalyseItemsGet', // 团长分析系统概况API

  // 综合API - Synthesizes(综合类API接口列表)
  UserHomePageGet: 'API.Synthesizes.UserHomePageGet', // 用户首页综合API
};