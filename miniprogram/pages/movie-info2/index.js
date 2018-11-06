// miniprogram/pages/movie-info2/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    item: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('onLoad options',options);
    var that = this;

    if (options.source == 'movieInfo' && options.movieId){

      wx.cloud.database().collection('calendar-pages').where({
        _id:options.movieId
      }).get().then(res => {
        console.log('getItemsResult',res);
        this.setData({
          item:res.data[0]
        })
      });

    }else{
      let task = JSON.parse(options.task);
      console.log('onLoad task', task);
      this.setData({
        item: task
      })
    }
    
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
  onShareAppMessage: function (res) {
    console.log('onShareAppMessage',res);
    return {
      title: "今日电影《"+this.data.item.title+"》",
      path: this.route+'?source=movieInfo&movieId='+this.data.item._id
    }
  }
})