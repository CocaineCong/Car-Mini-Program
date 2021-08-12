var api = require('./config/api.js')


let app = {
  globalData: {
    userInfoKey: "userinfo",
    hasUserInfo: wx.getStorageSync("userInfo"), //是否获取用户信息成功标志
    userInfo: wx.getStorageSync("userInfo"), //用户信息
    token : wx.getStorageSync('token')
  },
  onLaunch: function () {

  },
  
  //获取用户信息
  setUserinfo: function (e) {
    //先判断缓存中时候存在用户信息
    let token = wx.getStorageSync('token')
    if (!token) {
      wx.setStorageSync('token', e.token)
      wx.reLaunch({
        url: '/pages/index/index'
      })
    } else {
      wx.reLaunch({
        url: '/pages/auth/auth'
      })
    }
  },
  getUserinfo : function() {
    return wx.getStorageSync('userInfo')
  },

};


App(app)