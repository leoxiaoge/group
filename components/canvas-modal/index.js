// components/canvas/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    show: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    _width: 0, //手机屏宽
    _heigth: 0, //手机屏高
    swiperHeight: 300, //主图图片高度
    canvasType: false, //canvas是否显示
    loadImagePath: '', //下载的图片
    imageUrl: 'https://cos.myfaka.com/car/service/1.jpg', //主图网络路径
    codeUrl: 'https://cos.myfaka.com/car/service/1.jpg',//二维码网络路径
    localImageUrl: '', //绘制的商品图片本地路径
    localCodeUrl: '', //绘制的二维码图片本地路径
  },

  ready () {
    console.log('初始化')
    this.creatQrcodePictures()
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 处理冒泡事件，禁止滚动
    preventdefault () {
      console.log('冒泡事件')
    },
    // 显示或者隐藏事件
    popupTap () {
      let show = !this.data.show
      this.setData({
        show: show
      })
    },
    /*按生成图片按钮时*/
    creatQrcodePictures: function () {
      wx.showLoading({
        title: '正在绘制图片',
      })
      /*获取手机宽高*/
      let that = this
      let imgHeigth = this.data.swiperHeight
      let imgUrl = this.data.imageUrl
      let qrcodeUrl = this.data.codeUrl
      wx.getSystemInfo({
        success (res) {
          that.setData({
            _width: res.windowWidth,
            _heigth: res.windowHeight,
            canvasType: true,
          })
          // 获取图片信息生成canvas
          that.getImginfo([imgUrl, qrcodeUrl], 0);
        }
      })
    },
    // 获取图片信息
    getImginfo: function (urlArr, _type) {
      let that = this;
      console.log(urlArr, _type)
      wx.getImageInfo({
        src: urlArr[_type],
        success: function (res) {
          //res.path是网络图片的本地地址
          if (_type === 0) { //商品图片
            that.setData({
              localImageUrl: res.path,
            })
            that.getImginfo(urlArr, 1)
          } else {
            that.setData({ //二维码
              localCodeUrl: res.path,
            })
            console.log(res.path)
            // 创建canvas图片
            that.drawImage();
          }
        },
        fail: function (res) {
          //失败回调
          console.log('Fail：', _type, res)
        }
      });
    },
    drawImage () {
      that = this;
      // 使用 wx.createContext 获取绘图上下文 context
      let _width = this.data._width,
        _heigth = this.data._heigth; //屏幕宽与高
      let imgHeigth = this.data.swiperHeight, //原图片高度
        scale = (_width - 40) / _width, //缩小比例
      let imgH = imgHeigth * scale; //绘制时图片显示高度  
      let ctx = wx.createCanvasContext('mycanvas', this);
      // 绘制背景
      ctx.setFillStyle("#fff");
      ctx.fillRect(0, 0, _width - 40, imgH + 160);
      // 绘制小程序名称
      ctx.setFontSize(20);
      ctx.setFillStyle('red');
      ctx.fillText('澳洲进口牛尾巴 入口即化 1500g/份', 10, imgH + 105, txtWidth);
      // 绘制提示信息
      ctx.setFontSize(14);
      ctx.setFillStyle('#999');
      ctx.fillText('牛排，或称牛扒，是块状的牛肉，是西餐中最常见的食物之一。是西餐中最常见的食物之一', 10, imgH + 125, txtWidth);
      //绘制图片
      ctx.drawImage(this.data.localImageUrl, 10, 10, _width - 60, imgH);
      // 绘制标题
      ctx.setFontSize(18);
      ctx.setFillStyle('#333');
      let txtWidth = _width - 60 + 30 - 100 - 50; //文字的宽度
      //商品名称
      ctx.fillText('团长助理', 10, imgH + 40, txtWidth);
      // 绘制价格单位 '￥'
      ctx.setFontSize(14);
      ctx.setFillStyle('#d2aa68');
      ctx.fillText('￥', 10, imgH + 65, txtWidth);
      // 绘制价格
      ctx.setFontSize(18);
      ctx.fillText('90元/次', 26, imgH + 65, txtWidth);
      // 绘制二维码
      ctx.drawImage(this.data.localCodeUrl, _width - 80 + 80 - 150, imgH + 20, 100, 100);
      // 显示绘制
      ctx.draw();
      wx.hideLoading();
    },
    previewImg () {
      if (this.poster) {
        //预览图片，预览后可长按保存或者分享给朋友
        wx.previewImage({
          urls: [this.poster]
        })
      }
    },
    savePoster () {
      console.log(this.poster)
      if (this.poster) {
        wx.saveImageToPhotosAlbum({
          filePath: this.poster,
          success: (res) => {
            console.log(res)
            wx.showToast({
              title: '海报已保存，快去分享给好友吧。',
              icon: 'none'
            })
          }
        })
      }
    }
  }
})
