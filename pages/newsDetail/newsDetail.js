// pages/newsDetail/newsDetail.js

var api = require("../../config/api.js")

Page({
  data: {
    news: {},
    id: "",
    isShowCommentModal: false,
    reply: null,
    comment : [],
    total:"",
    content:"",
    userInfo:wx.getStorageSync('userInfo')
  },

  onClickShowCommentModal: function (e) {
    var replyInfo = e.currentTarget.dataset;
    this.setData({
      isShowCommentModal: true,
      reply: replyInfo,
    });
  },
  onClickCancelCommentModal: function () {
    this.setData({
      isShowCommentModal: false,
      reply: null
    });
  },
  onClickClearReply: function () {
    this.setData({
      ["reply.reply"]: null,
      ["reply.nickname"]: null,
      ["reply.depth"]: 1,
    });
  },
  inputComment: function (e) {
    this.setData({
      content: e.detail.value
    });
  },
  onClickPostComment: function () {
    if (!this.data.reply) {
      wx.showToast({
        title: '请输入评论内容',
        icon: 'none'
      })
      return
    }
    var that = this
    // console.log(wx.getStorageSync('userInfo'))
    // console.log(this.data.news)
    var info = this.data.news
    wx.request({
      url: api.CreateComment,
      data: {
        Content : this.data.content,
        social_id : info.id,
        Avatar : wx.getStorageSync('userInfo').avatar,
        user_id : wx.getStorageSync('userInfo').id,
        user_name : wx.getStorageSync('userInfo').user_name,
      },
      header:{
          "Context-Type":"application/json",
      },
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: (res) => {
        // console.log(res)
        if (res.data.status == 200) {
            wx.showToast({
              title: '发表成功',
              duration:2000,
            })
            that.onload()
        }else{
          wx.showToast({
            title: '发表失败',
            duration:2000,
          })
          that.onload()
        }
      },
    })
  },

  getNewsDetail: function (newsId) {
    wx.request({
      url: api.GetSocialDetail + newsId,
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      header: {
        "Authorization": wx.getStorageSync('token'),
      },
      success: (res) => {
        // console.log(res)
        if (res.data.status == 200) {
          this.setData({
            news: res.data.data
          })
        }
      }
    })
  },

  onClickFollow:function(){
    var info = this.data.news
    // console.log(info)
      wx.request({
        url: api.CreateMyFriend+info.user_id,
        data: {
          user_id : wx.getStorageSync('userInfo').id,
        },
        header:{
            "Context-Type":"application/json",
        },
        method: 'POST',
        dataType: 'json',
        responseType: 'text',
        success :function(res){
          console.log(res)
          if(res.data.status==200){
               wx.showToast({
                 title: '关注成功',
                 duration:2000,
                 icon:'success',
                })
                wx.navigateTo({
                  url: '/pages/friends/friends?detail='+ wx.getStorageSync('userInfo').id,
                })
          }else{
            wx.showToast({
              title: '关注失败',
            })
          }
        }
      })
  },

  onLoad: function (options) {
    var newsId = options.detail;
    this.getNewsDetail(newsId);
    this.getNewsComment(newsId);
  },

  getNewsComment(newsId) {
    wx.request({
      url: api.GetComment + newsId,
      dataType: 'json',
      responseType: 'text',
      success: (res) => {
        console.log(res)
        if (res.data.status == 200) {
          this.setData({
            comment: res.data.data,
            total : res.data.data.length
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