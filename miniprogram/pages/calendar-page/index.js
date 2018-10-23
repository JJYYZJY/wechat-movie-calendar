// miniprogram/pages/calendar-page/index.js
const util = require('../../utils/util.js');
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    year:2000,
  },

  getCalendarPage: function() {
    const that = this;
    const date = util.formatTime(new Date());
    console.log('date',date);
    db.collection('calendar-pages').where({
      date:date
    }).get().then(res => {
      console.log(res);
      that.setData({
        task:res.data[0]
      });
      console.log(wx.getSystemInfoSync().windowWidth);
      // wx.cloud.downloadFile({
      //   fileID: this.data.task.images,
      //   success: function(res){
      //     console.log('getTempFileURL',res);
      //     that.setData({
      //       painting: {
      //         width: wx.getSystemInfoSync().windowWidth,
      //         height: wx.getSystemInfoSync().windowHeight,
      //         views: [
      //           {
      //             type: 'image',
      //             url: res.tempFilePath,
      //             top: 0,
      //             left: 0,
      //             width: 375,
      //             height: 555
      //           },{
      //             type: 'text',
      //             content: '发现一件好货，邀请你一起0元免费拿！',
      //             fontSize: 15,
      //             color: '#563D20',
      //             textAlign: 'left',
      //             top: 59.5,
      //             left: 96
      //           }
      //         ]
      //       }
      //     })
      //   }
      // })

      
    });
  },

  eventGetImage: function(event) {
      console.log(event);
      wx.saveImageToPhotosAlbum({
        filePath: event.detail.tempFilePath,
        success: function(res){
          console.log('success',res);
        },
        fail: function(res){
          console.log('fail',res);
        }
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.getCalendarPage();
      var date = new Date();
      console.log(util.getDate(date))
      this.setData({
        year: util.getFullYear(date),
        month: util.getMonth(date),
        date: util.getDate(date),
        week: util.getDay(date)
      })
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