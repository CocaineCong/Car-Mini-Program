// pages/message/message.js
var utils = require("../../utils/util.js")
var api = require("../../config/api.js")

var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:null,
    focus:false,
    isShowView:true,
    normalDataTime:'',
    message :"",
    // messages:[
    //   {
    //     title:"马云",
    //     url:"touxiang/1.jpg",
    //     message:"什么鬼，我有支付宝",
    //     time:"15:15",
    //     count:0
    //   },
    //   {
    //     title:"马化腾",
    //     url:"touxiang/2.jpg",
    //     message:"哈哈哈，我要一统江湖啦，",
    //     time:"15:15",
    //     count:0
    //     }, 
    //   {
    //     title:"团支书浩宇同志",
    //     url:"touxiang/3.jpg",
    //     message:"我们的春天来啦，哈哈哈",
    //     time:"11:35",
    //     count:0
    //     },
    //   {
    //     title:"舒俊大哥",
    //     url:"touxiang/4.jpeg",
    //     message:"谁有内测资格啊啊，300万买一个",
    //     time:"08:23",
    //     count:0
    //     },
    //   {
    //     title:"刘洋老师",
    //     url:"touxiang/5.jpeg",
    //     message:"这个IDE方便都不要配置了",
    //     time:"03:21",
    //     count:0
    //     },
    // ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
         normalDataTime: utils.formatTime(new Date()), 
    })
    this.GetMessageList()
  },

  GetMessageList:function(){
    // var 
    var that= this;
    wx.request({
      url: api.GetMessageList+"1",
      header: {
        token: wx.getStorageSync('token'),
      },
      success:res=>{
        // console.log("TESTMessageList")
        console.log(res)
        this.setData({
          messages:res.data
        })
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
    this.setData({ userInfo: app.globalData.userInfo });
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
  bindtap:function(event){
          wx.navigateTo({
          url: "search/search"
      })
      },
      bindfocus:function(){
        this.setData({
              focus:true
        })
        this.setData({
          isShowView:false
        })
          },
      bindblur:function(){
        this.setData({
        focus:false
        })
        this.setData({
            isShowView:true
    })
    },
    onShareAppMessage: function () {
        return {
        title: '分享给好友',
        desc: '将小程序推荐给其他好友',
        path: '/page/user?id=123'
    }
    },
})