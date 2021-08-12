var api = require("../../config/api.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
      friendlist:[],
      num:"",
      user_id:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.detail
    this.setData({
      user_id:id
    })
    this.GetMyFriend(id)
  },


  GetMyFriend(id) {

    var that = this
    wx.request({
      url: api.GetMyFriends+id,
      header: {
        "Context-Type": "application/json",
        "Authorization": wx.getStorageSync('token'),
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success:function(res){
        console.log(res)
        if (res.data.status == 200){
          that.setData({
              friendlist : res.data.data,
              num : res.data.data.length
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

  NoFriendMore:function(e){
    var that = this
    var id = e.currentTarget.dataset.id
    wx.request({
      url: api.DeleteMyFriend+id,
      data:{
        user_id :this.data.user_id
      },
      header: {
        "Context-Type": "application/json",
        "Authorization": wx.getStorageSync('token'),
      },
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success:function(res){
        console.log(res)
        if (res.data.status == 200){
           wx.showToast({
             title: '取消关注成功',
             duration: 2000,
           })
           that.onLoad()
        }else{
          wx.showToast({
            title: '出了点状况',
            duration:2000
          })
        }
      }
    })
  },

  showDetailInfo:function(e){
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/friendInfo/friendInfo?detail='+id,
    })    

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