// miniprogram/pages/calendar-home/index.js
const util = require('../../utils/util.js');
const systemInfoUtil = require('../../utils/systemInfoUtil.js');
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
    })
    .orderBy('date','desc')
    .limit(15)
    .get()
    .then(res => {
      console.log(res);
      var tasks = res.data;
      tasks = tasks.reverse();
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
    var that = this;
    systemInfoUtil.initSystemInfo( res => {
      console.log(res);
      that.setData({
        rpxRate: res.windowWidth/750
      })
    });
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
    console.log('showMenu', this.data.isShowMenu)
    var that = this;
    var isShowMenu = !this.data.isShowMenu;
    this.setData({
      isShowMenu: isShowMenu
    })
    var moiveAnimation = wx.createAnimation({
      duration: 300,
      timingFunction: 'ease-out'
    });
    var shareAnimation = wx.createAnimation({
      duration: 300,
      timingFunction: 'ease-out'
    });
    moiveAnimation.translateY(isShowMenu ? -240 * this.data.rpxRate : 0)
      .step();
    shareAnimation.translateY(isShowMenu ? -120 * this.data.rpxRate : 0)
      .step();
    this.setData({
      btnMovieAnimation: moiveAnimation.export(),
      btnShareAnimation: shareAnimation.export()
    })
  },
  
  onBindChange: function(e) {
    this.setData({
      currentItem: this.data.tasks[e.detail.current]
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