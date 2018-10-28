// miniprogram/pages/calendar-home/index.js
const util = require('../../utils/util.js');
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShowMenu: false,
    initIndex: 0,
    recyle: false,
    tasks: null,
    options: {},//透传到模版中的数据
    currentItem: null
  },

  getCalendarPage: function () {
    const that = this;
    const date = parseInt(util.formatTime(new Date()));
    console.log('date', date);
    const _ = db.command
    db.collection('calendar-pages').where({
      date: _.lte(date)
    }).get().then(res => {
      console.log(res);
      var tasks = res.data;
      tasks.forEach(task=>{
        util.innerDate(task,task._date)
      })
      that.setData({
        initIndex: tasks.length-1,
        tasks: tasks,
        currentItem: tasks[tasks.length-1]
      });
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    this.getCalendarPage();

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

  },

  showMenu: function () {
    this.setData({
      isShowMenu:!this.data.isShowMenu
    })
  },
  
  afterViewChange: function(e) {
    console.log('afterViewChange', e)
    this.setData({
      currentItem:e.detail.item
    })
  },

  gotoShareImage: function() {
      wx.navigateTo({
        url: '../share-image/index?task='+JSON.stringify(this.data.currentItem),
      })
  },

  gotoMovieInfo: function() {
    wx.navigateTo({
      url: '../movie-info2/index?task=' + JSON.stringify(this.data.currentItem),
    })
  }

})