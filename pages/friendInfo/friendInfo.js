var api = require("../../config/api.js")

Page({
  /**
   * 页面的初始数据
   */
  data: {
      UserInfo:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.getInfo(options.detail)
  },
  getInfo(id){
    var that = this
    wx.request({
      url: api.GetMyFriendInfo+id,
      method : "GET",
      dataType: 'json',
      responseType: 'text',
      header: {
        "Authorization": wx.getStorageSync('token'),
      },
      success:function(res){
          console.log(res)
          if(res.data.status==200){
            that.setData({
                UserInfo : res.data.data
              })
          }else{
            wx.showToast({
              title: '出现错误了',
              duration: 2000,
            })
          }
      }
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