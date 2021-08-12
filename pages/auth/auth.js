// pages/auth/auth.js
let app = getApp()
var api = require('../../config/api.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: '',
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    hasUserInfo: false,
    canIUseGetUserProfile: false,
    canIUseOpenData: false,
    //canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName') // 如需尝试获取用户信息可改为false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(wx.getStorageSync('token')){
      this.setData({
        hasUserInfo : true
      })
    }
    
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
    if (this.data.hasUserInfo && wx.getStorageSync('token')) {
      wx.reLaunch({
        url: "/pages/index/index",
      })
    }
  },

  Login() {
    this.getUserProfile()
    var that = this;
    wx.request({
      url: api.CheckToken,
      method: "GET",
      header: {
        "Authorization": wx.getStorageSync('token'),
      },
      success: (res) => {
        // console.log(res)
        if (res.data.status != 200) { //没有的话用code换token
          wx.login({
            success: res => {
              wx.request({
                url: api.Login, //登陆注册请求
                method: "POST",
                header: {
                  "AuthCode": res.code,
                },
                data: {
                  username: this.data.userInfo.nickName,
                  avatar: this.data.userInfo.avatarUrl,
                },
                success: (res) => {
                  // console.log("RESSSS")
                  // console.log(res)
                  if (res.data.status == 200) {
                    wx.setStorageSync('token', res.data.data.token)
                    console.log("TOKEN")
                    console.log(res.data.data.token)
                    // console.log(this.data.userInfo)
                    wx.reLaunch({
                      url: "/pages/index/index",
                    })
                  } else {
                    console.log(res)
                  }
                }
              })
            }
          })
        } else if (res.status == 200) {
          console.log("SUCCESS")
          app.setUserinfo(this.data.userInfo)
          wx.reLaunch({
            url: "/pages/index/index",

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

  },


  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        // console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        console.log(res.userInfo)
        this.Login()
        wx.setStorageSync('userInfo', res.userInfo) 
      }
    })

  },
  // bindGetUserInfo: function (e) {
  //   app.setUserinfo(e)
  // }
})