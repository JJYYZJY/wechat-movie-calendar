// miniprogram/pages/share-image/index.js
const { $Message } = require('../../dist/base/index');
const systemInfoUtil = require('../../utils/systemInfoUtil.js');
const db = wx.cloud.database();
var screenWidth = null;
var screenHeight = null;
var windowHeight = null;
var image_tempFileUrl = null;
var acode_tempFileUrl = null;
var mainImageInfo = null;
var task = null;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageType: 1,
    imageUrl: null
  },

  canvasDayImage: function () {
    if(this.data.imageType == 1){
      return;
    }
    this.setData({
      imageType:1
    })
    this.drawNewImage(this, task, image_tempFileUrl, acode_tempFileUrl, mainImageInfo)
  },

  canvasSayingImage: function () {
    if (this.data.imageType == 2) {
      return;
    }
    this.setData({
      imageType: 2
    })
    this.drawSayingImage(this, task, image_tempFileUrl, acode_tempFileUrl, mainImageInfo)
  },

  eventGetImage: function (event) {
    console.log(event);
    this.setData({
      imageUrl: event.detail.tempFilePath
    })
  },

  seeImage: function () {
    wx.previewImage({
      urls: [this.data.imageUrl]
    });
  },

  saveCanvasImage() {
    wx.saveImageToPhotosAlbum({
      filePath: this.data.imageUrl,
      success: function (res) {
        console.log('success', res);
        $Message({
          content: '保存成功，已保存到手机相册',
          type: 'success'
        });
      },
      fail: function (res) {
        console.log('fail', res);
      }
    })
  },

  drawImage: function(that,task,imageUrl,acodeUrl,mainImageInfo){
    console.log('drawImage task',task,'imageUrl',imageUrl,'acodeUrl',acodeUrl);

    var width = 375;
    var height = 625;

    var imageWidth = width;
    var imageHeight = 250;

    var line1Top = imageHeight + 4;
    var line1Size = 14;
    var line2Top = 300;
    var line2Size = 80;
    var line3Top = line2Top + line2Size + 16;
    var line3Size = 14;    
    var line4Top = line3Top + line3Size + 6;
    var line4Size = 14;
    var line5Top = line4Top + line4Size + 30;

    var imageSourceWidth = 0;
    var imageSourceHeight = 0;
    var mwr = mainImageInfo.width / imageWidth;
    var mhr = mainImageInfo.height / imageHeight;
    console.log(mwr,mhr)
    var imageSourceTop = 0;    
    var imageSourceLeft = 0;
    if (mwr < mhr){
      imageSourceWidth = mainImageInfo.width;
      imageSourceHeight = imageHeight * mwr;
      imageSourceTop = (mainImageInfo.height - imageSourceHeight) / 2;
    }else if (mhr < mwr){
      imageSourceWidth = imageWidth * mhr;
      imageSourceHeight = mainImageInfo.height;
      imageSourceLeft = (mainImageInfo.width - imageSourceWidth) / 2;
    }
    console.log(mainImageInfo.width, mainImageInfo.height, mainImageInfo.width / mainImageInfo.height)
    console.log(imageSourceWidth,imageSourceHeight,imageSourceWidth/imageSourceHeight)
    console.log(imageWidth, imageHeight, imageWidth / imageHeight)
    console.log(imageSourceTop, imageSourceLeft)
    that.setData({
      painting: {
        width: width,
        height: height,
        views: [
          {
            type: 'rect',
            background: '#FFFFFF',
            top: 0,
            left: 0,
            width: width,
            height: height
          },
          {
            type: 'image',
            url: imageUrl,
            top: 0,
            left: 0,
            width: imageWidth,
            height: imageHeight,
            sTop: imageSourceTop,
            sLeft: imageSourceLeft,
            sWidth: imageSourceWidth,
            sHeight: imageSourceHeight
          }
          ,
          {
            type: 'text',
            content: task._year,
            fontSize: line1Size,
            textAlign: 'left',
            top: line1Top,
            left: 0
          }
          ,
          {
            type: 'text',
            content: task._month,
            fontSize: line1Size,
            textAlign: 'center',
            top: line1Top,
            left: width/2
          }
          ,
          {
            type: 'text',
            content: task._week,
            fontSize: line1Size,
            textAlign: 'right',
            top: line1Top,
            left: width
          }
          ,
          {
            type: 'text',
            content: task._day,
            fontSize: line2Size,
            textAlign: 'center',
            top: line2Top,
            left: width/2
          }
          ,
          {
            type: 'text',
            content: task.history_today_name,
            fontSize: line3Size,
            textAlign: 'center',
            top: line3Top,
            left: width / 2
          }
          ,
          {
            type: 'text',
            content: task.history_today_info,
            fontSize: line4Size,
            textAlign: 'center',
            top: line4Top,
            left: width / 2
          }
          ,
          {
            type: 'text',
            content: task.saying,
            textAlign: 'center',
            top: line5Top,
            left: width / 2,
            fontSize: 16,
            width: 335,
            MaxLineNumber: 3,
            breakWord: true,
            lineHeight: 21
          }
          ,
          {
            type: 'text',
            content: "《" + task.title +"》",
            fontSize: 18,
            textAlign: 'left',
            top: height-58,
            left: 0
          }
          ,
          {
            type: 'text',
            content: task.rating,
            fontSize: 32,
            textAlign: 'left',
            top: height - 40,
            left: 6
          }
          ,{
            type: 'text',
            content: "豆瓣" + task.collect_count+"人评分",
            fontSize: 12,
            textAlign: 'left',
            top: height - 20,
            left: 58
          }
          ,
          {
            type: 'image',
            url: task.rating >= 2 ? "../../images/star_02.png" : task.rating >= 1 ? "../../images/star_04.png" : "../../images/star_01.png",
            top: height - 34,
            left: 58,
            width: 14,
            height: 14
          }
          ,
          {
            type: 'image',
            url: task.rating >= 4 ? "../../images/star_02.png" : task.rating >= 3 ? "../../images/star_04.png" : "../../images/star_01.png",
            top: height - 34,
            left: 72,
            width: 14,
            height: 14
          }
          ,
          {
            type: 'image',
            url: task.rating >= 6 ? "../../images/star_02.png" : task.rating >= 5 ? "../../images/star_04.png" : "../../images/star_01.png",
            top: height - 34,
            left: 86,
            width: 14,
            height: 14
          }
          ,
          {
            type: 'image',
            url: task.rating >= 8 ? "../../images/star_02.png" : task.rating >= 7 ? "../../images/star_04.png" : "../../images/star_01.png",
            top: height - 34,
            left: 100,
            width: 14,
            height: 14
          }
          ,
          {
            type: 'image',
            url: task.rating >= 9.5 ? "../../images/star_02.png" : task.rating >= 8.5 ? "../../images/star_04.png" : "../../images/star_01.png",
            top: height - 34,
            left: 114,
            width: 14,
            height: 14
          }
          ,
          {
            type: 'image',
            url: acodeUrl,
            top: height - 60,
            left: width - 60,
            width: 50,
            height: 50
          }
        ]
      }
    })


  },

  drawNewImage: function (that, task, imageUrl, acodeUrl, mainImageInfo) {
    console.log('drawNewImage task', task, 'imageUrl', imageUrl, 'acodeUrl', acodeUrl);

    var rpxRate = screenWidth / 750;

    var width = screenWidth;
    var height = screenHeight;

    var paddingTop = (screenHeight - windowHeight) / 2;

    var headWidth = width;
    var headHeight = screenHeight * 0.2 + paddingTop;

    var imageWidth = width;
    var imageHeight = 422 * rpxRate;

    var dateWidth = width;
    var dateHeight = (screenHeight - headHeight - imageHeight) * 0.6;
    var sayingHeight = (screenHeight - headHeight - imageHeight) * 0.36;

    var line1Height = 48 * rpxRate;
    var line2Height = 20 * rpxRate;
    var linePadding = 10 * rpxRate;

    var paddingLeft = 16 * rpxRate;

    var headContentHeight = line1Height+line2Height*4+linePadding*4;

    var line1Top = (headHeight - headContentHeight - paddingTop) / 2 + paddingTop
    var line2Top = line1Top+line1Height+linePadding;
    var line3Top = line2Top + line2Height + linePadding;
    var line4Top = line3Top + line2Height + linePadding;
    var line5Top = line4Top + line2Height + linePadding;

    var dateSize = 225 * rpxRate;
    var dateTop = (dateHeight - dateSize) / 2 + headHeight + imageHeight;

    var sayingSize = 34 * rpxRate;
    var sayingTop = headHeight + imageHeight + dateHeight;
    var footerTop = sayingTop + sayingHeight;

    var imageSourceWidth = 0;
    var imageSourceHeight = 0;
    var mwr = mainImageInfo.width / imageWidth;
    var mhr = mainImageInfo.height / imageHeight;
    console.log(mwr, mhr)
    var imageSourceTop = 0;
    var imageSourceLeft = 0;
    if (mwr < mhr) {
      imageSourceWidth = mainImageInfo.width;
      imageSourceHeight = imageHeight * mwr;
      imageSourceTop = (mainImageInfo.height - imageSourceHeight) / 2;
    } else if (mhr < mwr) {
      imageSourceWidth = imageWidth * mhr;
      imageSourceHeight = mainImageInfo.height;
      imageSourceLeft = (mainImageInfo.width - imageSourceWidth) / 2;
    }
    console.log(mainImageInfo.width, mainImageInfo.height, mainImageInfo.width / mainImageInfo.height)
    console.log(imageSourceWidth, imageSourceHeight, imageSourceWidth / imageSourceHeight)
    console.log(imageWidth, imageHeight, imageWidth / imageHeight)
    console.log(imageSourceTop, imageSourceLeft)

    that.setData({
      painting: {
        width: width,
        height: height,
        views: [
          {
            type: 'rect',
            background: '#FFFFFF',
            top: 0,
            left: 0,
            width: width,
            height: height
          },
          {
            type: 'image',
            url: imageUrl,
            top: headHeight,
            left: 0,
            width: imageWidth,
            height: imageHeight,
            sTop: imageSourceTop,
            sLeft: imageSourceLeft,
            sWidth: imageSourceWidth,
            sHeight: imageSourceHeight
          }
          ,
          {
            type: 'text',
            content: "《" + task.title + "》",
            fontSize: line1Height,
            textAlign: 'left',
            top: line1Top,
            left: 0
          }
          ,
          {
            type: 'text',
            content: task.genres,
            fontSize: line2Height,
            textAlign: 'left',
            top: line2Top,
            left: paddingLeft
          }
          ,
          {
            type: 'text',
            content: '导演: '+task.director,
            fontSize: line2Height,
            textAlign: 'left',
            top: line3Top,
            left: paddingLeft
          }
          ,
          {
            type: 'text',
            content: task.release + '上映',
            fontSize: line2Height,
            textAlign: 'left',
            top: line4Top,
            left: paddingLeft
          }
          ,
          {
            type: 'text',
            content: '豆瓣评分 ' + task.rating,
            fontSize: line2Height,
            textAlign: 'left',
            top: line5Top,
            left: paddingLeft
          }
          ,
          {
            type: 'image',
            url: task.rating >= 2 ? "../../images/star_02.png" : task.rating >= 1 ? "../../images/star_04.png" : "../../images/star_01.png",
            top: line5Top + line2Height - 8 * rpxRate,
            left: 136 * rpxRate,
            width: 8 * rpxRate,
            height: 8 * rpxRate
          }
          ,
          {
            type: 'image',
            url: task.rating >= 4 ? "../../images/star_02.png" : task.rating >= 3 ? "../../images/star_04.png" : "../../images/star_01.png",
            top: line5Top + line2Height - 8 * rpxRate,
            left: 148 * rpxRate,
            width: 8 * rpxRate,
            height: 8 * rpxRate
          }
          ,
          {
            type: 'image',
            url: task.rating >= 6 ? "../../images/star_02.png" : task.rating >= 5 ? "../../images/star_04.png" : "../../images/star_01.png",
            top: line5Top + line2Height - 8 * rpxRate,
            left: 160 * rpxRate,
            width: 8 * rpxRate,
            height: 8 * rpxRate
          }
          ,
          {
            type: 'image',
            url: task.rating >= 8 ? "../../images/star_02.png" : task.rating >= 7 ? "../../images/star_04.png" : "../../images/star_01.png",
            top: line5Top + line2Height - 8 * rpxRate,
            left: 172 * rpxRate,
            width: 8 * rpxRate,
            height: 8 * rpxRate
          }
          ,
          {
            type: 'image',
            url: task.rating >= 9.5 ? "../../images/star_02.png" : task.rating >= 8.5 ? "../../images/star_04.png" : "../../images/star_01.png",
            top: line5Top + line2Height - 8 * rpxRate,
            left: 184 * rpxRate,
            width: 8 * rpxRate,
            height: 8 * rpxRate
          }
          ,
          {
            type: 'text',
            content: task.title_e,
            fontSize: 28 * rpxRate,
            textAlign: 'right',
            top: line1Top + 20 * rpxRate,
            left: width - paddingLeft
          }
          ,
          {
            type: 'text',
            content: task._month_zh,
            fontSize: line2Height,
            textAlign: 'right',
            top: line2Top,
            left: width - paddingLeft
          }
          ,
          {
            type: 'text',
            content: task._week_zh,
            fontSize: line2Height,
            textAlign: 'right',
            top: line3Top,
            left: width - paddingLeft
          }
          ,
          {
            type: 'text',
            content: task._lunar,
            fontSize: line2Height,
            textAlign: 'right',
            top: line4Top,
            left: width - paddingLeft
          }
          ,
          {
            type: 'text',
            content: task.history_today_message,
            fontSize: line2Height,
            textAlign: 'right',
            top: line5Top,
            left: width - paddingLeft,
            color: 'rgb(219, 88, 127)'
          }
          ,
          {
            type: 'text',
            content: task._day,
            fontSize: dateSize,            
            textAlign: 'center',
            top: dateTop,
            left: width / 2,
          }
          ,
          {
            type: 'text',
            content: task.saying,
            fontSize: sayingSize,
            textAlign: 'center',
            top: headHeight + imageHeight + dateHeight,
            left: width / 2,
            width: width - paddingLeft * 8,
            MaxLineNumber: 3,
            breakWord: true,
            lineHeight: sayingSize + 16 * rpxRate
          }
          ,
          {
            type: 'rect',
            background: '#f00',
            top: footerTop,
            left: width/2 - 60 * rpxRate,
            width: 120 * rpxRate,
            height: 2
          },
          {
            type: 'image',
            url: acodeUrl,
            top: height - 120 * rpxRate,
            left: width - 120 * rpxRate,
            width: 100 * rpxRate,
            height: 100 * rpxRate
          }
        ]
      }
    })


  },

  drawSayingImage: function (that, task, imageUrl, acodeUrl, mainImageInfo) {
    console.log('drawSayingImage task', task, 'imageUrl', imageUrl, 'acodeUrl', acodeUrl);

    var width = 375;
    var height = 625;

    var imageWidth = width;
    var imageHeight = 250;

    var line5Top = imageHeight + 100;

    var imageSourceWidth = 0;
    var imageSourceHeight = 0;
    var mwr = mainImageInfo.width / imageWidth;
    var mhr = mainImageInfo.height / imageHeight;
    console.log(mwr, mhr)
    var imageSourceTop = 0;
    var imageSourceLeft = 0;
    if (mwr < mhr) {
      imageSourceWidth = mainImageInfo.width;
      imageSourceHeight = imageHeight * mwr;
      imageSourceTop = (mainImageInfo.height - imageSourceHeight) / 2;
    } else if (mhr < mwr) {
      imageSourceWidth = imageWidth * mhr;
      imageSourceHeight = mainImageInfo.height;
      imageSourceLeft = (mainImageInfo.width - imageSourceWidth) / 2;
    }
    console.log(mainImageInfo.width, mainImageInfo.height, mainImageInfo.width / mainImageInfo.height)
    console.log(imageSourceWidth, imageSourceHeight, imageSourceWidth / imageSourceHeight)
    console.log(imageWidth, imageHeight, imageWidth / imageHeight)
    console.log(imageSourceTop, imageSourceLeft)
    that.setData({
      painting: {
        width: width,
        height: height,
        views: [
          {
            type: 'rect',
            background: '#FFFFFF',
            top: 0,
            left: 0,
            width: width,
            height: height
          },
          {
            type: 'image',
            url: imageUrl,
            top: 0,
            left: 0,
            width: imageWidth,
            height: imageHeight,
            sTop: imageSourceTop,
            sLeft: imageSourceLeft,
            sWidth: imageSourceWidth,
            sHeight: imageSourceHeight
          }
          ,
          {
            type: 'text',
            content: task.saying,
            textAlign: 'left',
            top: line5Top,
            left: 20,
            fontSize: 18,
            width: 295,
            MaxLineNumber: 3,
            breakWord: true,
            lineHeight: 34
          }
          ,
          {
            type: 'text',
            content: "《" + task.title + "》",
            fontSize: 18,
            textAlign: 'left',
            top: height - 58,
            left: 0
          }
          ,
          {
            type: 'text',
            content: task.rating,
            fontSize: 32,
            textAlign: 'left',
            top: height - 40,
            left: 6
          }
          , {
            type: 'text',
            content: "豆瓣" + task.collect_count + "人评分",
            fontSize: 12,
            textAlign: 'left',
            top: height - 20,
            left: 58
          }
          ,
          {
            type: 'image',
            url: task.rating >= 2 ? "../../images/star_02.png" : task.rating >= 1 ? "../../images/star_04.png" : "../../images/star_01.png",
            top: height - 34,
            left: 58,
            width: 14,
            height: 14
          }
          ,
          {
            type: 'image',
            url: task.rating >= 4 ? "../../images/star_02.png" : task.rating >= 3 ? "../../images/star_04.png" : "../../images/star_01.png",
            top: height - 34,
            left: 72,
            width: 14,
            height: 14
          }
          ,
          {
            type: 'image',
            url: task.rating >= 6 ? "../../images/star_02.png" : task.rating >= 5 ? "../../images/star_04.png" : "../../images/star_01.png",
            top: height - 34,
            left: 86,
            width: 14,
            height: 14
          }
          ,
          {
            type: 'image',
            url: task.rating >= 8 ? "../../images/star_02.png" : task.rating >= 7 ? "../../images/star_04.png" : "../../images/star_01.png",
            top: height - 34,
            left: 100,
            width: 14,
            height: 14
          }
          ,
          {
            type: 'image',
            url: task.rating >= 9.5 ? "../../images/star_02.png" : task.rating >= 8.5 ? "../../images/star_04.png" : "../../images/star_01.png",
            top: height - 34,
            left: 114,
            width: 14,
            height: 14
          }
          ,
          {
            type: 'image',
            url: acodeUrl,
            top: height - 60,
            left: width - 60,
            width: 50,
            height: 50
          }
        ]
      }
    })


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log('options',options);
    task = JSON.parse(options.task);
    console.log('item',task);
    wx.cloud.downloadFile({
      fileID: task.images,
      success: function(res){
        console.log('image getTempFileURL', res);
        image_tempFileUrl = res.tempFilePath
        wx.getImageInfo({
          src: res.tempFilePath,
          success: imageInfoRes => {
            console.log('getImageInfo',imageInfoRes);
            mainImageInfo = imageInfoRes
            if (acode_tempFileUrl) {
              that.drawNewImage(that, task, res.tempFilePath, acode_tempFileUrl, imageInfoRes)
            }
          }
        })
        
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let systemInfo = systemInfoUtil.getSystemInfo();
    screenWidth = systemInfo.screenWidth;
    screenHeight = systemInfo.screenHeight;
    windowHeight = systemInfo.windowHeight;
    var that = this;
    acode_tempFileUrl = '../../images/movie_code.jpg';
    if (image_tempFileUrl) {
      that.drawNewImage(that,task, image_tempFileUrl, res.tempFilePath, mainImageInfo)
    }
    // db.collection('acode-images').where({
    //   name: 'acode-small'
    // }).get().then(res => {
    //   console.log('acode result ', res);
    //   wx.cloud.downloadFile({
    //     fileID: res.data[0].url,
    //     success: function (res) {
    //       console.log('acode getTempFileURL', res);
    //       acode_tempFileUrl = res.tempFilePath
    //       if(image_tempFileUrl){
    //         that.drawNewImage(that,task, image_tempFileUrl, res.tempFilePath, mainImageInfo)
    //       }
    //     }
    //   });
    // })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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
    console.log('onShareAppMessage');
    return {
      path: '/pages/calendar-home/index?source=shareImage'
    }
  }
})